import { useUser } from "./useUser";
import { useLocalStorage } from "./useLocalStorage";
import { TOKEN_NAME } from "../services/apiService";
import { normalizeUserData } from "../utils/normalizeUserData";
import UserService from "../services/userService.js";
import React from "react";

export const useAuth = () => {
    const timeout = React.useRef(null)
    const { user, addUser, removeUser } = useUser();
    const { getItem } = useLocalStorage();

    const normalizeCredentials = ({ expires_in, ...credentials }) => {
        credentials.expires_at = new Date().getTime() + (expires_in || 3600) * 1000
        return credentials;
    }

    const refreshToken = async () => {
        try {
            const token = getItem(TOKEN_NAME);
            if (token?.credentials) {
                const { expires_at, refresh_token } = token.credentials;
                if (!expires_at || new Date().getTime() + 2700 * 1000 < expires_at /* 15 min left before id_token expires */) {
                    const { data: credentials } = await UserService.refreshIdToken(refresh_token);
                    token.credentials.id_token = credentials.id_token;
                    await addUser({
                        user: token.user,
                        credentials: normalizeCredentials(token.credentials)
                    })
                    timeout.current = setTimeout(refreshToken, 900 * 1000);
                }
            }
        } catch (err) {
            console.log(err);
        }
    }
    const init = () => {
        const token = getItem(TOKEN_NAME);
        if (token?.user && token?.credentials?.id_token) {
            addUser({ user: token.user });
            refreshToken()
            return;
        }
        removeUser();
    }

    const login = async code => {
        "use server"
        try {
            const { data: credentials } = await UserService.getIdToken(code)
            const { data: user } = await UserService.getUserData(credentials.access_token);
            credentials.expires_at = new Date().getTime() + (credentials.expires_in || 3600) * 1000;
            await addUser({
                user: normalizeUserData(user),
                credentials: normalizeCredentials(credentials)
            });
            return true;

        } catch (err) {
            console.log(err);
            return false;
        }
    };

    const logout = () => {
        removeUser();
    };

    return { user, login, logout, init };
};

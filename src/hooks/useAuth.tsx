import { useUser } from "./useUser";
import { useLocalStorage } from "./useLocalStorage";
import { TOKEN_NAME } from "@/services/apiService";
import { normalizeUserData } from "@/utils/normalizeUserData";
import UserService from "@/services/userService.js";
import React from "react";

export const useAuth = () => {
    const [timeRemaining, setTimeRemaining] = React.useState<ReturnType<typeof setTimeout>>()
    const { user, addUser, removeUser } = useUser();
    const { getItem } = useLocalStorage();

    const normalizeCredentials = ({ expires_in, ...credentials }: { expires_in: number; expires_at: number }) => {
        credentials.expires_at = new Date().getTime() + (expires_in || 3600) * 1000
        return credentials;
    }
    React.useEffect(() => {
        return () => {
            window.clearTimeout(timeRemaining);
        }
    }, [])

    async function refreshToken(token?: { credentials: { refresh_token: string }, user: any }) {
        try {
            console.log(token)
            if (!token) {
                token = getItem(TOKEN_NAME);
            }
            if (!token?.credentials?.refresh_token) return;
            const { data: credentials } = await UserService.refreshToken(token.credentials.refresh_token);
            credentials.expires_at = new Date().getTime() + (credentials.expires_in || 3600) * 1000;
            addUser({
                user: token.user,
                credentials: normalizeCredentials(credentials)
            });

        } catch (err) {
            console.log(err);
        }
    }
    const init = async () => {
        const token = getItem(TOKEN_NAME);
        if (token?.user && token?.credentials?.id_token) {
            if (token.credentials.expires_at < new Date().getTime() + 900 * 1000) {
                await refreshToken(token);
            } else {
                addUser(token);
                setNewTimer();
            }
        } else {
            removeUser();
        }
    }

    const login = async (code: string) => {
        try {
            const { data: credentials } = await UserService.getIdToken(code)
            const { data: user } = await UserService.getUserData(credentials.access_token);
            credentials.expires_at = new Date().getTime() + (credentials.expires_in || 3600) * 1000;
            addUser({
                user: normalizeUserData(user),
                credentials: normalizeCredentials(credentials)
            });
            setNewTimer();

            return true;

        } catch (err) {
            console.log(err);
            return false;
        }
    };

    const logout = () => {
        removeUser();
    };

    function setNewTimer() {
        if (timeRemaining) {
            clearTimeout(timeRemaining);
        }
        const newTimer = setTimeout(refreshToken, 900 * 1000); // 15 min
        setTimeRemaining(newTimer);
    }

    return { user, login, logout, init };
};

import axios from 'axios';
import { useUser } from "./useUser";
import { useLocalStorage } from "./useLocalStorage";
import { TOKEN_NAME } from "../services/apiService";
import { normalizeUserData } from "../lib/utils/normalizeUserData";

export const useAuth = () => {
    const { user, addUser, removeUser } = useUser();
    const { getItem } = useLocalStorage();

    const init = () => {
        const token = getItem(TOKEN_NAME);
        if (token?.user && token?.credentials?.id_token) {
            addUser(token.user);
            return;
        }

        removeUser();
    }
    const login = async code => {
        "use server"
        let { PROD: isProd, VITE_CLIENT_SECRET: clientSecret, VITE_CLIENT_ID: clientID } = import.meta.env;
        if (isProd) {
            clientSecret = process.env.client_secret;
            clientID = process.env.client_id;
        }
        try {
            const { data: credentials } = await axios.post(`https://oauth2.googleapis.com/token`, {
                grant_type: "authorization_code",
                redirect_uri: isProd ? "https://shabtsak.top" : "http://localhost:5173",
                client_secret: clientSecret,
                client_id: clientID,
                code,
            });
            const { data: user } = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo`, {
                headers: {
                    "Authorization": `Bearer ${credentials.access_token}`
                }
            });
            await addUser(normalizeUserData(user), credentials);
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

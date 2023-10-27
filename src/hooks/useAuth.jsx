import React from "react";
import axios from 'axios';
import { useUser } from "./useUser";
import { useLocalStorage } from "./useLocalStorage";
import { TOKEN_NAME } from "../services/apiService";
import { mockUserData } from "../constants/mockUserData";
import { normalizeUserData } from "../lib/utils/normalizeUserData";
export const useAuth = () => {
    const [firstLoad, setFirstLoad] = React.useState(true);
    const { user, addUser, removeUser, authUserToken, createUser } = useUser();
    const { getItem } = useLocalStorage();

    const login = async firebaseToken => {
        try {
            const { data } = await getFirebaseUser(firebaseToken);
            const firebaseUser = normalizeUserData(data);
            const { user, token } = await createUser(firebaseUser);
            addUser(user, token);
            return true;

        } catch (err) {
            console.log(err);
            return false;
        }
    };
    const getFirebaseUser = async firebaseToken => await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
            "Authorization": `Bearer ${firebaseToken}`
        }
    });

    const test = async () => {
        const mockFirebaseUser = normalizeUserData(mockUserData);
        const { user, token } = await createUser(mockFirebaseUser);
        addUser(user, token);
        return true;
    }

    const init = async () => {
        try {
            const userToken = getItem(TOKEN_NAME);
            if (!userToken) {
                return;
            }
            /*
            TODO: Create user by sending firebase user details to our server, returns user and user token.
             Example: const { data, status } = await doApi...()?user=true
             if (status === 200) { ... }
             */
            return authUserToken(userToken);

        } catch (err) {
            console.log(err);
        }
    };

    const logout = () => {
        removeUser();
    };

    React.useEffect(() => {
        if (!user) {
            init().then()
        }
        setFirstLoad(false);

    }, [])

    return { user, login, logout, test, init, firstLoad };
};

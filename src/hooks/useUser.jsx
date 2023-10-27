import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { useLocalStorage } from "./useLocalStorage.jsx";
import {TOKEN_NAME} from "../services/apiService.js";
import {normalizeUserData} from "../lib/utils/normalizeUserData.js";
import {mockUserData, testToken} from "../constants/mockUserData.js";

export const useUser = () => {
    const { user, setUser } = useContext(AuthContext);
    const { setItem, removeItem } = useLocalStorage();

    const addUser = (user, token) => {
        setUser(user);
        if (token) {
            setItem(TOKEN_NAME, JSON.stringify(token));
        }
    };

    const createUser = async firebaseUser => {
        try {
            /*
            TODO: Create user by sending firebase user details to our server, returns user and user token.
             Example: const { data, status } = await doApi...()?user=true&token=true
             if (status === 201) { ... }
             */
            return { user: firebaseUser /* TODO: replace with data.user */, token: testToken /* TODO: replace with data.token */ };
        } catch (err) {
            console.log(err);
        }
    }
    const authUserToken = async token => {
        try {
            if (token === testToken/* TODO: remove in production */) {
                const user = normalizeUserData(mockUserData);
                addUser(user);
            }
            /*
            TODO: Authenticate user using token and, returns user
             Example: const { data, status } = await doApi...({ token })?user=true
             if (status === 200) { ... }
             addUser(data.user);
             */
            return true;

        } catch (err) {
            console.log(err);
            return false;
        }
    }
    const removeUser = () => {
        setUser(null);
        removeItem(TOKEN_NAME);
    };
    //
    return { user, addUser, removeUser, setUser, authUserToken, createUser };
};

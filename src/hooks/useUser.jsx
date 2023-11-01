import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { useLocalStorage } from "./useLocalStorage.jsx";
import { TOKEN_NAME } from "../services/apiService.js";
export const useUser = () => {
    const { user, setUser } = useContext(AuthContext);
    const { setItem, removeItem } = useLocalStorage();

    const addUser = ({ credentials, user }) => {
        setUser(user);
        if (credentials) {
            setItem(TOKEN_NAME, JSON.stringify({ credentials, user }));
        }
    }

    const removeUser = () => {
        setUser(null);
        removeItem(TOKEN_NAME);
    };

    return { user, addUser, removeUser };
};

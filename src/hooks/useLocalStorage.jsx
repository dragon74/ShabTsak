import { useState } from "react";

export const useLocalStorage = () => {
    const [value, setValue] = useState(null);

    const setItem = (key, value) => {
        localStorage.setItem(key, value);
        setValue(value);
    };

    const getItem = (key) => {
        const value = localStorage.getItem(key);
        setValue(value);
        return JSON.parse(value);
    };

    const removeItem = (key) => {
        localStorage.removeItem(key);
        setValue(null);
    };

    return { value, setItem, getItem, removeItem };
};

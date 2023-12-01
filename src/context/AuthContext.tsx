import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import UserService, { UserInfo } from "@/services/userService";

const AuthContext = createContext<{
    user: UserInfo | undefined | null;
    login: (authCode: string) => void;
    logout: () => void;
    init: () => void;
}>({
    user: undefined,
    login: () => {},
    logout: () => {},
    init: () => {},
});

export const refreshTokenInterval = 1000 * 60 * 15; // 15 minute
export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserInfo | null | undefined>();
    const refreshTokenTimeout = useRef<ReturnType<typeof setTimeout>>();
    const refreshToken = async () => {
        const userInfo = await UserService.refreshToken();
        if (userInfo) {
            setUser(userInfo);
            clearTimeout(refreshTokenTimeout.current);
            refreshTokenTimeout.current = setTimeout(refreshToken, refreshTokenInterval);
        } else {
            setUser(null);
        }
    }

    async function init() {
        const userInfo = await UserService.getUser();
        if (userInfo) {
            setUser(userInfo);
            clearTimeout(refreshTokenTimeout.current);
            refreshTokenTimeout.current = setTimeout(refreshToken, refreshTokenInterval);
        } else {
            setUser(null);
        }
    }

    async function login(authCode: string) {
        const userInfo = await UserService.login(authCode);
        setUser(userInfo);
        clearTimeout(refreshTokenTimeout.current);
        refreshTokenTimeout.current = setTimeout(refreshToken, refreshTokenInterval);
    }

    async function logout() {
        await UserService.logout();
        setUser(null);
    }

    useEffect(() => {
        init();

        return () => {
            clearTimeout(refreshTokenTimeout.current);
        }
    }, []);


    return <AuthContext.Provider value={{ user, init, login, logout }}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }

    return context;
}


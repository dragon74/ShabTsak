import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import UserService, { UserInfo } from "@/services/userService";
import {toast} from "react-toastify";
import {useQueryClient} from "react-query";

type AuthContextType = {
    user: UserInfo | undefined | null;
    login: (authCode: string) => void;
    logout: () => void;
    init: () => void;
}

const AuthContext = createContext<AuthContextType>({
    user: undefined,
    login: () => {},
    logout: () => {},
    init: () => {},
});

export const refreshTokenInterval = 1000 * 60; // 15 minutes
export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserInfo | null | undefined>();
    const refreshTokenTimeout = useRef<ReturnType<typeof setTimeout>>();
    const queryClient = useQueryClient();
    const _refreshToken = async () => {
        try {
            await UserService.refreshToken();
            clearTimeout(refreshTokenTimeout.current);
            refreshTokenTimeout.current = setTimeout(_refreshToken, refreshTokenInterval);

        } catch (e) {
            if (!navigator.onLine) {
                toast.error("אין חיבור לאינטרנט");
            } else {
                toast.error("אירעה שגיאה בעדכון המידע, נסה שוב מאוחר יותר");
            }
            clearTimeout(refreshTokenTimeout.current);
            refreshTokenTimeout.current = setTimeout(_refreshToken, refreshTokenInterval);
        }
    }

    async function init() {
        try {
            const userInfo = await UserService.getUser();
            setUser(userInfo);
            if (userInfo) {
                clearTimeout(refreshTokenTimeout.current);
                refreshTokenTimeout.current = setTimeout(_refreshToken, refreshTokenInterval);
            }
        } catch(err) {
            if (!navigator.onLine) {
                console.error("Auth init: client is offline");
                toast.warning("לא נמצא חיבור לרשת", { onClick: () => setTimeout(init, 500) })
            } else {
                console.error("Auth init: client init failed")

                toast.warning("אירעה שגיאה בהתחברות", { onClick: () => setTimeout(init, 500) })
            }
            setUser(null);
        }
    }

    async function login(authCode: string) {
        const userInfo = await UserService.login(authCode);
        setUser(userInfo);
        clearTimeout(refreshTokenTimeout.current);
        refreshTokenTimeout.current = setTimeout(_refreshToken, refreshTokenInterval);
    }

    async function logout() {
        setUser(null);
        await UserService.logout();
        queryClient.invalidateQueries();
    }

    useEffect(() => {
        if (user === undefined) {
            init();
        }

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


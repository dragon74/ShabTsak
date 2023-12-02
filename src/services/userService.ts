import axios from "axios";
import localStorageService from "@/services/localStorageService";
import { TOKEN_NAME } from "@/services/apiService";
import { refreshTokenInterval } from "@/context/AuthContext";

type TokenType = {
    access_token: string,
    expires_in: number,
    refresh_token: string,
    scope: string,
    token_type: string,
    id_token: string,
}

export type UserInfoType = {
    sub: string,
    name: string,
    given_name: string,
    family_name: string,
    picture: string,
    email: string,
    verified_email: boolean,
    locale: string,
}

export type UserInfo = {
    id: string;
    email: string;
    name: string;
    picture: string;
}

export type LoginReturnType = {
    token: TokenType,
    userInfo: UserInfoType,
    lastLogin: number,
}

async function login(authCode: string) {
    const token = await _getAccessToken(authCode);
    const userInfo = await _getUserInfo(token.access_token);
    const lastLogin = new Date().getTime();
    localStorageService.set<LoginReturnType>(TOKEN_NAME, { token, userInfo, lastLogin });
    return _normalizeUserInfo(userInfo);
}

async function logout() {
    localStorageService.remove(TOKEN_NAME);
}

async function refreshToken(): Promise<UserInfo | null> {
    try {
        const refreshToken = localStorageService.get<LoginReturnType>(TOKEN_NAME)?.token.refresh_token;
        if (!refreshToken) {
            return null;
        }
        const newToken = await _refreshToken(refreshToken);
        newToken.refresh_token = refreshToken;
        const userInfo = await _getUserInfo(newToken.access_token);
        const lastLogin = new Date().getTime();
        localStorageService.set<LoginReturnType>(TOKEN_NAME, { token: newToken, userInfo, lastLogin });
        return _normalizeUserInfo(userInfo);
    } catch (error) {
        console.error(error);
        if (navigator.onLine) {
            localStorageService.remove(TOKEN_NAME);
        }
        return null;
    }
}

async function getUser(): Promise<UserInfo | null> {
    try {
        const loginInfo = localStorageService.get<LoginReturnType>(TOKEN_NAME);
        if (!loginInfo) {
            return null;
        }
        const { token, userInfo, lastLogin } = loginInfo;
        const now = new Date().getTime();
        const diff = now - lastLogin;
        if (diff > refreshTokenInterval) {
            const newToken = await _refreshToken(token.refresh_token);
            localStorageService.set<LoginReturnType>(TOKEN_NAME, { token: newToken, userInfo, lastLogin: now });
        }
        return _normalizeUserInfo(userInfo);
    } catch (err) {
        console.error(err);
        return null;
    }
}

async function _getAccessToken(authCode: string): Promise<TokenType> {
    const response = await axios.post("https://oauth2.googleapis.com/token", {
        redirect_uri: import.meta.env.PROD ? "https://shabtsak.top" : "http://localhost:5173",
        client_id: import.meta.env.VITE_CLIENT_ID,
        client_secret: import.meta.env.VITE_CLIENT_SECRET,
        grant_type: "authorization_code",
        code: authCode,
    });
    return response.data;
}

async function _getUserInfo(accessToken: string): Promise<UserInfoType> {
    const response = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    return response.data;
}

async function _refreshToken(refreshToken: string) {
    const response = await axios.post("https://oauth2.googleapis.com/token", {
        client_id: import.meta.env.VITE_CLIENT_ID,
        client_secret: import.meta.env.VITE_CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: refreshToken,
    });
    return response.data;
}

function _normalizeUserInfo(userInfo: UserInfoType) {
    return {
        id: userInfo.sub,
        name: userInfo.given_name,
        email: userInfo.email,
        picture: userInfo.picture,
    }
}


const UserService = {
    login,
    logout,
    getUser,
    refreshToken,
}

export default UserService;
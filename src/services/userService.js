"use server"

import axios from "axios";
let { PROD: isProd, VITE_CLIENT_SECRET: client_secret, VITE_CLIENT_ID: client_id } = import.meta.env;
import.meta.env.VITE_CLIENT_ID = "";
import.meta.env.VITE_CLIENT_SECRET = "";

const UserService = {
    refreshToken(refresh_token) {
        return axios.post(`https://oauth2.googleapis.com/token`, {
            grant_type: "refresh_token",
            client_secret,
            client_id,
            refresh_token
        })
    },
    getIdToken(code) {
        return axios.post(`https://oauth2.googleapis.com/token`, {
            grant_type: "authorization_code",
            redirect_uri: isProd ? "https://shabtsak.top" : "http://localhost:5173",
            client_secret,
            client_id,
            code,
        });
    },
    getUserData(access_token) {
        return axios.get(`https://www.googleapis.com/oauth2/v3/userinfo`, {
            headers: {
                "Authorization": `Bearer ${access_token}`
            }
        })
    }
}

export default UserService;
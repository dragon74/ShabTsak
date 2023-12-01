import axios from "axios";

import localStorageService from "@/services/localStorageService.js";
import { LoginReturnType } from "@/services/userService";
export const TOKEN_NAME = "FOODS_TOKEN";

const getIdTokenFromLocalStorage = (): `${string} ${string}` => {
    const token = localStorageService.get<LoginReturnType>(TOKEN_NAME);
    if (!token) {
        throw new Error("No token found in local storage");
    }
    return `${token.token.token_type} ${token.token.id_token}`;
}

export const doApiGet = async (_url: string, params = {}) => {
  try {
    return await axios.get(_url, {
      params,
      headers: {
        Authorization: getIdTokenFromLocalStorage(),
      },
    });
  } catch (err) {
    // throw-> in promise asks recognize this as error return
    throw err;
  }
};

export const doApiMethod = async (url: string, method: 'DELETE' | 'PUT' | 'POST', body = {}) => {
  try {
    const config = {
      url,
      method,
      headers: {
        Authorization: getIdTokenFromLocalStorage(),
      },
    };

    if (!(["get", "delete"] as any).includes(method.toLowerCase())) {
      (config as any).data = body;
    }

    const response = await axios(config);
    return response;
  } catch (error: any) {
    console.error(`Error during API ${method.toUpperCase()} request:`, error.response || error);
    throw error;
  }
};

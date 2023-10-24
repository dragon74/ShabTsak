import { create } from 'zustand';
import { doApiMethod, TOKEN_NAME } from "./apiService";
import { API_URL } from "../constants/apiConstants.js";

const normalizeUserData = (data) => {
  return {
    email: data.email,
    emailVerified: data.email_verified,
    firstName: data.given_name,
    locale: data.locale,
    fullName: data.name,
    avatar: data.picture,  // e.g. https:// lh3.googleusercontent.com/a/jhkaskdjfhjkahsewr71
    googleId: data.sub  // e.g. 891028308129038123021
  }
}

export const useUserStore = create((set) => ({
  user: null,

  // Initialize user data from local storage on app start
  init: async () => {
    try {
      const userToken = localStorage.getItem(TOKEN_NAME);
      if (!userToken) {
        set(() => ({ user: null }))
        return;
      }
      const res = await doApiMethod(API_URL +'/login', 'POST', {
        token: userToken
      });
      if (res.status === 200) {
        set(() => ({ user: JSON.parse(res.data?.user) || null }));
      }
    } catch (err) {
      console.log(err);
    }
  },

  login: async (data) => {
    try {
      const user = normalizeUserData(data)
      const res = await doApiMethod(API_URL + '/auth', 'POST', { user });

      if (res.status === 200 && res.data?.token) {
        // Save user data to local storage
        localStorage.setItem(TOKEN_NAME, JSON.stringify(res.data.token));
        set(() => ({ user: JSON.parse(res.data?.user) || null }));
        return true;
      }

    } catch (err) {
      console.log(err);
      return false;
    }
  },

  logout: () => {
    // Clear user data from local storage
    localStorage.removeItem(TOKEN_NAME);

    set(() => ({ user: null }));
  },

  test: (data) => {
    const user = normalizeUserData(data)
    console.log(user);

    set(() => ({ user }));
    return true;
  }
}));

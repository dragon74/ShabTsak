import { create } from 'zustand';
import { doApiMethod, TOKEN_NAME } from "./apiService";
import { API_URL } from "../constants/apiConstants.js";

export const useUserStore = create((set) => ({
  user: null,

  // Initialize user data from local storage on app start
  login: async () => {
    try {
      const userToken = localStorage.getItem(TOKEN_NAME);
      if (!userToken) {
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

  logout: () => {
    // Clear user data from local storage
    localStorage.removeItem(TOKEN_NAME);

    set(() => ({ user: null }));
  },

  authenticate: async (data) => {
    try {
      const res = await doApiMethod(API_URL + '/auth', 'POST', {
        user: {
          email: data.email,
          emailVerified: data.email_verified,
          firstName: data.given_name,
          locale: data.locale,
          fullName: data.name,
          avatar: data.picture,  // e.g. https:// lh3.googleusercontent.com/a/jhkaskdjfhjkahsewr71
          sub: data.sub  // e.g. 891028308129038123021
        }
      });

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

  test: (data) => {
    console.log(data);
    const user = {
      // firstName: 'אופיר',
      // position: "WTF",
      // avatar: "https://lh3.googleusercontent.com/a/ACg8ocKAHr5c5trXvdfcB5MBzNKn6qNuKiHQFh2YzCp14rI-eCA=s96-c"
      email: data.email,
      emailVerified: data.email_verified,
      firstName: data.given_name,
      locale: data.locale,
      fullName: data.name,
      avatar: data.picture,  // e.g. https:// lh3.googleusercontent.com/a/jhkaskdjfhjkahsewr71
      sub: data.sub  // e.g. 891028308129038123021
    }

    set(() => ({ user }));
    return true;
  }
}));

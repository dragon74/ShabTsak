import { create } from 'zustand';
import { API_URL, doApiMethod, TOKEN_NAME } from "./apiService";

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

  authenticate: async (user) => {
    try {
      const res = await doApiMethod(API_URL + '/auth', 'POST', {
        user: {
          email: user.email,
          emailVerified: user.email_verified,
          firstName: user.given_name,
          locale: user.locale,
          fullName: user.name,
          avatar: user.picture,  // e.g. https:// lh3.googleusercontent.com/a/jhkaskdjfhjkahsewr71
          sub: user.sub  // e.g. 891028308129038123021
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
      firstName: 'אופיר',
      position: "WTF",
      avatar: "https://lh3.googleusercontent.com/a/ACg8ocKAHr5c5trXvdfcB5MBzNKn6qNuKiHQFh2YzCp14rI-eCA=s96-c"
    }

    set(() => ({ user }));
    return true;
  }
}));

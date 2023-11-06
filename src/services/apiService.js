import axios from "axios";

export const TOKEN_NAME = "FOODS_TOKEN";

const getIdTokenFromLocalStorage = () => {
  const token = JSON.parse(localStorage[TOKEN_NAME]);
  if (!token?.credentials?.token_type || !token?.credentials?.id_token) return;
  return `${token.credentials.token_type} ${token.credentials.id_token}`;
}

export const doApiGet = async (_url, params = {}) => {
  try {
    return await axios.get(_url, {
      params,
      headers: {
        "Authorization": getIdTokenFromLocalStorage(),
      },
    });
  } catch (err) {
    // throw-> in promise asks recognize this as error return
    throw err;
  }
};

// For Post,delete, put, patch
export const doApiMethod = async (_url, _method, _body = {}) => {
  try {
    return await axios({
      url: _url,
      method: _method,
      data: _body,
      headers: {
        "Authorization": getIdTokenFromLocalStorage(),
      },
    });
  } catch (err) {
    throw err;
  }
};


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

export const doApiMethod = async (url, method, body = {}) => {
  try {
    const config = {
      url,
      method,
      headers: {
        Authorization: getIdTokenFromLocalStorage(),
      },
    };

    if (!["get", "delete"].includes(method.toLowerCase())) {
      config.data = body;
    }

    const response = await axios(config);
    return response;
  } catch (error) {
    console.error(`Error during API ${method.toUpperCase()} request:`, error);
    throw error;
  }
};

export const doApiMethodSignUp = async (_url, _method, _body = {}) => {
  try {
    return await axios({
      url: _url,
      method: _method,
      data: _body,
    });
  } catch (err) {
    throw err;
  }
};
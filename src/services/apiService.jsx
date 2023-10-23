/* eslint-disable no-useless-catch */
import axios from "axios";

export const API_URL = "https://shabtsak.onrender.com"

export const TOKEN_NAME = "FOODS_TOKEN";


export const doApiGet = async (_url, params = {}) => {
  try {
    let resp = await axios.get(_url, {
      params,
      headers: {
        "x-api-key": localStorage[TOKEN_NAME],
      },
    });
    return resp;
  } catch (err) {
    // throw-> in promise asks recognize this as error return
    throw err;
  }
};

// For Post,delete, put, patch
export const doApiMethod = async (_url, _method, _body = {}) => {
  try {
    // console.log(_body);
    let resp = await axios({
      url: _url,
      method: _method,
      data: _body,
      // headers: {
      //   "x-api-key": localStorage[TOKEN_NAME],
      // },
    });
    return resp;
  } catch (err) {
    throw err;
  }
};

export const doApiMethodSignUp = async (_url, _method, _body = {}) => {
  try {
    // console.log(_body);
    let resp = await axios({
      url: _url,
      method: _method,
      data: _body,
    });
    return resp;
  } catch (err) {
    throw err;
  }
};
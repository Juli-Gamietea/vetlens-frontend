import axios from "axios";
import { getToken, renewToken } from "./auth/TokenManager.js";
import { API_URL } from '@env';

export const callBackendAPI = async (url, method = 'GET', data = null, headers = {}, contentType = 'application/json') => {
  try {

    let config;
    
    if (url.includes('/auth')){
      config = {
        url: `${API_URL}${url}`,
        method: method,
        data: data,
        headers: {
          'Content-Type': contentType,
          ...headers,
        },
      }
    } else {
      const token = await getToken();
      config = {
        url: `${API_URL}${url}`,
        method: method,
        data: data,
        headers: {
          'Content-Type': contentType,
          'Authorization': `Bearer ${token}`,
          ...headers,
        },
      }
    }

    const response = await axios(config);

    if (response.status === 403) {
      const new_token = await renewToken();
      const retry_req_res = await axios({ headers: { 'Authorization': `Bearer ${new_token}`, ...config.headers }, ...config })
      return retry_req_res;
    }

    return response;

  } catch (error) {
    throw Error(error);
  }
}
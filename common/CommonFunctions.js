import axios from "axios";
import { getToken, renewToken } from "../utils/TokenManager.js";
import { API_URL } from '@env';

export const callBackendAPI = async (url, method = 'GET', data = null, headers = {}, contentType = 'application/json') => {
  try {

    const token = await getToken();
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
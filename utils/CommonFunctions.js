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
        method: method,
        url: `${API_URL}${url}`,
        headers: {
          'Content-Type': contentType,
          'Authorization': `Bearer ${token}`,
          ...headers,
        },
        data: data
      }
    }
    
    return await axios.request(config);

  } catch (error) {
    console.log(error)
    const config = {
      url: `${API_URL}${url}`,
      method: method,
      data: data,
      headers: {
        'Content-Type': contentType,
        ...headers,
      },
    }
    
    if (error.response.status === 403) {
      const new_token = await renewToken();
      
      const retry_req_res = await axios({ headers: { 'Authorization': `Bearer ${new_token}`, ...config.headers }, ...config })
      return retry_req_res;
    } else {
      throw Error("callBackendAPI()_error_" + error);
    }
  }
}

export const parseDate = (date) => {
  let newDate = date.split("-");
  newDate = `${newDate[2]}/${newDate[1]}/${newDate[0]}`
  return newDate;
}

export const compareDiseaseName = (disease, result) => {
  if (disease.replace(" ", "_").replace("á", "a").toUpperCase() === result.toUpperCase()) {
    return true
  }
  return false
}

export const isNotDiscernible = (result) => {
  if (result.toUpperCase() === "NO_DISCERNIBLE") {
    return true;
  }
  return false;
} 
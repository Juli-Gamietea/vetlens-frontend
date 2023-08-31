import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { API_URL } from '@env';

export async function setToken(username, password) {
    try {

        const config = {
            url: `${API_URL}/auth/login`,
            method: 'post',
            data: {
                "username": username,
                "password": password,
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios(config);
        
        const access_token = {
            token: res.data.accessToken,
            expiryDate: Date.now() + 86400000,
        };

        const refresh_token = {
            token: res.data.refreshToken,
            expiryDate: Date.now() + 31536000000,
        };

        await storeToken(access_token, refresh_token);
        return res;


    } catch (error) {

        throw Error("error_" + (error) + "_from_setToken()");
    }
}

async function storeToken(acces_token, refresh_token) {
    await SecureStore.setItemAsync('token', String(acces_token.token));
    await SecureStore.setItemAsync('tokenExpiryDate', String(acces_token.expiryDate));
    await SecureStore.setItemAsync('refreshToken', String(refresh_token.token));
    await SecureStore.setItemAsync('refreshTokenExpiryDate', String(refresh_token.expiryDate));
}

export async function getToken() {
    try {

        const token = await SecureStore.getItemAsync('token');
        const expiryDate = await SecureStore.getItemAsync('tokenExpiryDate');

        if (token && expiryDate) {
            if (Date.now() > Date.parse(expiryDate)) {
                throw Error('token_expired');
            }
    
            return token;
        } else {
            throw Error('no_token_saved');
        }

    } catch (error) {
        
        if (error.message === 'token_expired') {
            const rtExpiryDate = await SecureStore.getItemAsync('refreshTokenExpiryDate');

            if (Date.now() > Date.parse(rtExpiryDate)) {
                throw Error('no_valid_tokens');

            } else {
                const newToken = await renewToken();
                return newToken;
            }
        }
        else {
            throw Error('no_token_saved');
        }
    }
}

export async function renewToken() {
    try {

        const refresh_token = await SecureStore.getItemAsync('refreshToken');
        
        const config = {
            url: `${API_URL}/auth/refresh`,
            method: 'post',
            data: {},
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${refresh_token}`
            }
        }
        
        const res = await axios(config);

        if (res.data) {
            
            const access_token = {
                token: res.data.acces_token,
                expiryDate: Date.now + 86400000,
            };
            
            const refresh_token = {
                token: res.data.refresh_token,
                expiryDate: Date.now + 31536000000,
            };

            
            
            
            await storeToken(access_token, refresh_token);
            return access_token.token;

        }
        else {
            throw Error('refresh_error');
        }

    } catch (error) {

        throw Error(error.message);
    }
}

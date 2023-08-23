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
                "password": password
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios(config);
        await storeToken(res.data.access_token, res.data.refresh_token);
        return res;

    } catch (error) {
        throw Error("Codigo: " + error.response.status + ". Credenciales incorrectas.");
    }
}

async function storeToken(token, refreshToken) {
    await SecureStore.setItemAsync('token', token);
    await SecureStore.setItemAsync('refreshToken', refreshToken);
}

export async function getToken() {
    const token = await SecureStore.getItemAsync('token');
    return token;
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
            await SecureStore.setItemAsync('token', res.data.access_token);
            await SecureStore.setItemAsync('refresh_token', res.data.refresh_token);
        }
        else {
            throw Error('No se pudo renovar el')
        }

        return res.data.access_token;

    } catch (error) {
        throw Error(error);
    }
}

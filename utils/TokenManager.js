import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

const backendEndpoint = "http://10.0.2.2:8080/auth/login"
const backendEndpointRefreshToken = "http://10.0.2.2:8080/auth/refresh"

export async function setToken(username, password) {
    try {

        const config = {
            url: `${backendEndpoint}`,
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
            url: `${backendEndpointRefreshToken}`,
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

import { btoa } from 'abab';
import axios from 'axios';

const API_BASE_URL = 'https://ikcount.com/iklab';

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export async function login(username, password) {
    const auth = btoa(`${username}:${password}:IKLAB005`);
    const response = await api.post('/api/login', {
        auth,
        privilegesDetail: true,
    });

    return response.data;
}

async function sendCounterCommand(commandType, accessToken, quantity = 1, client, location, macaddress, username, email) {
    const response = await api.post(`/ikcount/api/livecommand?atoken=${accessToken}`, {
        type: commandType,
        quantity,
        client,
        location,
        macaddress,
        username,
        email,
    });

    return response.data;
}


export { sendCounterCommand };
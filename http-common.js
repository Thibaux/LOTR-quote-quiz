import axios from 'axios';

export const HTTP = axios.create({
    baseURL: `https://the-one-api.dev/v2/`,
    headers: {
        Authorization: `Bearer ${process.env.VUE_APP_API_KEY}`
    }
})
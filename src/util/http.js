import axios from 'axios';
import config from '../config';

export const http =  axios.create({
    baseURL: config.APIADDR,
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    },
    timeout: 3000
});

export const require = axios.create({
    // baseURL: config.APIADDR,
    baseURL: 'https://api.laoergege.cn/',
    headers: {
        'Content-Type': 'text/plain; charset=utf-8'
    },
    method:'get',
    timeout: 3000
});
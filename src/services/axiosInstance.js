import axios from 'axios';
import { PRPO_SERVICE_URL } from '../constants';

export const AxiosPrivateInstance = axios.create({
    baseURL: PRPO_SERVICE_URL,
    // withCredentials: true,
});

export const AxiosMockupInstance = axios.create({
    baseURL: 'https://mock.apidog.com/m1/453241-0-default/api/v1',
    // withCredentials: true,
});

export const AxiosAuthInstance = axios.create({
    baseURL: 'https://api-prpo-dev.i-soft.com.vn/api/v1/Auth',
    withCredentials: true,
});

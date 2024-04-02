import { IconHome } from './icons';

const DEV_ENDPOINT = 'https://api-prpo-dev.i-soft.com.vn/api/v1';
const PRO_ENDPOINT = 'https://api-prpo-dev.i-soft.com.vn/api/v1';

export const PRPO_SERVICE_URL =
    process.env.NODE_ENV === 'production' ? PRO_ENDPOINT : DEV_ENDPOINT;

export const ResponseStatus = {
    success: 'Success',
    error: 'Error',
};

export const StatusMapping = {
    NOT_STARTED: 'warning',
    IN_PROGRESS: 'info',
    PENDING: 'info',
    DONE: 'success',
    CANCELLED: 'error',
    PAST_DUE: 'error',
    ON_TIME: 'info',
    EARLY: 'success',
    DISABLED: 'disabled',
};

export const PathList = {
    loginPage: '/login',
    homePage: '/home',
};

export const Menu = [
    {
        path: '/home',
        title: 'Home',
        icon: <IconHome width="2rem" height="2rem" fill="#F0F0F0" />,
    },
];

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

export const timeListDisplay = [
    '12 AM',
    '1 AM',
    '2 AM',
    '3 AM',
    '4 AM',
    '5 AM',
    '6 AM',
    '7 AM',
    '8 AM',
    '9 AM',
    '10 AM',
    '11 AM',
    '12 PM',
    '1 PM',
    '2 PM',
    '3 PM',
    '4 PM',
    '5 PM',
    '6 PM',
    '7 PM',
    '8 PM',
    '9 PM',
    '10 PM',
    '11 PM',
    '12 AM',
];

export const timeList = [
    {
        id: 0,
        display: '12 AM',
    },
    {
        id: 1,
        display: '1 AM',
    },
    {
        id: 2,
        display: '2 AM',
    },
    {
        id: 3,
        display: '3 AM',
    },
    {
        id: 4,
        display: '4 AM',
    },
    {
        id: 5,
        display: '5 AM',
    },
    {
        id: 6,
        display: '6 AM',
    },
    {
        id: 7,
        display: '7 AM',
    },
    {
        id: 8,
        display: '8 AM',
    },
    {
        id: 9,
        display: '9 AM',
    },
    {
        id: 10,
        display: '10 AM',
    },
    {
        id: 11,
        display: '11 AM',
    },
    {
        id: 12,
        display: '12 PM',
    },
    {
        id: 13,
        display: '1 PM',
    },
    {
        id: 14,
        display: '2 PM',
    },
    {
        id: 15,
        display: '3 PM',
    },
    {
        id: 16,
        display: '4 PM',
    },
    {
        id: 17,
        display: '5 PM',
    },
    {
        id: 18,
        display: '6 PM',
    },
    {
        id: 19,
        display: '7 PM',
    },
    {
        id: 20,
        display: '8 PM',
    },
    {
        id: 21,
        display: '9 PM',
    },
    {
        id: 22,
        display: '10 PM',
    },
    {
        id: 23,
        display: '11 PM',
    },
];

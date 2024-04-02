import { AxiosAuthInstance } from './axiosInstance';

export default class AuthenService {
    static async getLogin() {
        try {
            const response = await AxiosAuthInstance.get(
                '/flows/excutor/prpo-authentication/'
            );
            const data = await response.data;
            return data.data;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    static async login({ component, username, password }) {
        try {
            const response = await AxiosAuthInstance.post(
                '/flows/excutor/prpo-authentication/',
                {
                    component,
                    uid_field: username,
                    password,
                }
            );
            const data = await response.data;
            if (data.status === 'Success' && data.data?.type === 'redirect')
                return true;
            throw new Error('Username or password is not correct!');
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async getUserInfo() {
        try {
            const response = await AxiosAuthInstance.get('/users/me/');
            const data = await response.data;
            const user = data.data.user;
            return user;
        } catch (error) {
            return {};
        }
    }

    static async logout() {
        try {
            await AxiosAuthInstance.get('/logout');
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

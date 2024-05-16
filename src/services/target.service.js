import { ResponseStatus } from '../constants';
import { AxiosPrivateInstance } from './axiosInstance';

const serviceHandle = async ({ method = 'get', payload, endpoint }) => {
    try {
        const response = await AxiosPrivateInstance[method](
            endpoint,
            payload ?? null
        );
        const data = await response.data;
        console.log(response);
        if (response.status === ResponseStatus.success) return data.data;
        throw new Error(data.message);
    } catch (error) {
        console.log(error);
        return false;
    }
};

export default class TargetService {
    static async createTask(payload) {
        return serviceHandle({ method: 'post', payload });
    }

    static async updateTask(task_id) {
        try {
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    static async getAllTargets() {
        return serviceHandle({ method: 'get', endpoint: '/target/get-all' });
    }
}

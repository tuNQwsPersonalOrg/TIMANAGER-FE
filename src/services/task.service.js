import { ResponseStatus } from '../constants';
import { AxiosPrivateInstance } from './axiosInstance';

const serviceHandle = async ({
    method = 'get',
    payload,
    queryObject,
    endpoint,
}) => {
    try {
        var queryString = '';
        if (queryObject) {
            if (typeof queryObject == 'object') {
                queryString = '?';
                const keys = Object.keys(queryObject);
                keys.forEach((key) => {
                    queryString =
                        queryString +
                        key +
                        '=' +
                        queryObject[key].toString() +
                        '&';
                });
            } else throw Error('invalid argument datatype');
        }

        const response = await AxiosPrivateInstance[method](
            endpoint + queryString,
            payload ?? null
        );
        const data = await response.data;
        console.log(response);
        if (response.status === ResponseStatus.success) {
            return method === 'post' ? true : data.data;
        }
        throw new Error(data.message);
    } catch (error) {
        console.log(error);
        return false;
    }
};

export default class TaskService {
    static async createTask(payload) {
        return serviceHandle({
            method: 'post',
            payload,
            endpoint: '/task/create',
        });
    }

    static async updateTask(task_id) {
        try {
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    static async getTaskList(queryObject) {
        return serviceHandle({
            method: 'get',
            endpoint: '/task/get-list',
            queryObject,
        });
    }

    static async deleteTask(id) {
        return serviceHandle({
            method: 'post',
            endpoint: `/task/delete-task/${id}`,
        });
    }
}

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

export default class TargetService {
    static async createTarget(payload) {
        return serviceHandle({
            method: 'post',
            payload,
            endpoint: '/target/create',
        });
    }

    static async updateTarget(target_id, payload) {
        return serviceHandle({
            method: 'post',
            endpoint: `/target/update/${target_id}`,
            payload,
        });
    }

    static async getTargetDetail(target_id) {
        return serviceHandle({
            method: 'get',
            endpoint: `/target/get-target/${target_id}`,
        });
    }

    static async getAllTargets() {
        return serviceHandle({ method: 'get', endpoint: '/target/get-all' });
    }

    static async deleteTarget(target_id) {
        return serviceHandle({
            method: 'post',
            endpoint: `/target/delete-target/${target_id}`,
        });
    }

    static async getAllDeadlines() {
        return serviceHandle({ method: 'get', endpoint: '/deadline/get-all' });
    }
}

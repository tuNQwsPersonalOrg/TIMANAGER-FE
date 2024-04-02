import { useEffect, useRef, useState } from 'react';
import { ResponseStatus } from '../constants';

const useFetch = (serviceCallback, revalidateKey) => {
    const [response, setResponse] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const rerenderRef = useRef(false);
    const callbackRef = useRef(serviceCallback);

    const handleSetData = (data) => {
        if (data === null || data === undefined)
            return setError('Something went wrong!');
        return setResponse(data);
    };

    useEffect(() => {
        callbackRef.current = serviceCallback;
    }, [serviceCallback]);

    useEffect(() => {
        if (rerenderRef.current === false || revalidateKey) {
            const getService = async () => {
                try {
                    const data = await callbackRef.current?.();
                    if (data === null) return setError('Something went wrong!');
                    if (data.status === ResponseStatus.error)
                        return setError(data.message);
                    setResponse(data);
                } catch (error) {
                    setError(error);
                } finally {
                    setIsLoading(false);
                }
            };
            getService();
        }
        return () => (rerenderRef.current = true);
        // eslint-disable-next-line
    }, [revalidateKey]);

    return { isLoading, error, response, setResponse: handleSetData };
};

export default useFetch;

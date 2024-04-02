import { useRef } from "react";

const useThrottle = (callback, delay = 250) => {
    const lastRun = useRef(Date.now());
    const timerRef = useRef();

    return (...args) => {
        if (Date.now() - lastRun.current >= delay) {
            callback(...args);
            lastRun.current = Date.now();
        } else {
            clearTimeout(timerRef.current);
            timerRef.current = setTimeout(() => callback(...args), delay);
        }
    };
};

export default useThrottle;

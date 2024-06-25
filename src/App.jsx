import React from 'react';
import { RouterProvider } from 'react-router-dom';
import useRouter from './hooks/useRouter';
import LoaderComponent from './components/Loader/LoaderComponent';

const App = () => {
    const router = useRouter();
    return (
        <>
            <LoaderComponent />
            <RouterProvider router={router} />;
        </>
    );
};

export default App;

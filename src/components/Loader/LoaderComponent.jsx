import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';

const LoaderComponent = () => {
    return ReactDOM.createPortal(
        <div className="fixed top-0 left-0 max-h-screen w-full h-full">
            <div className="h-4 w-full bg-slate-300">
                <div className="loader w-[33%] h-full bg-blue-500"></div>
            </div>
            <div className="h-full w-full backdrop-blur-md" />
        </div>,
        document.body
    );
};

export default LoaderComponent;

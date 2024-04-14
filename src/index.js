import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/styles.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalContextProvider from './contexts/Global/GlobalContext';
import AuthContextProvider from './contexts/AuthContext/AuthContext';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <GlobalContextProvider>
            <AuthContextProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <App />
                </LocalizationProvider>
            </AuthContextProvider>
        </GlobalContextProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

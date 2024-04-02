import React from 'react';
import iSoftLogo from '../../assets/images/i-Soft-logo-white.png';
import AILogo from '../../assets/images/ai-team-logo.png';
import AppLogo from '../../assets/images/vms-logo.png';
import LoginForm from './LoginForm';
import './styles.css';

const LoginPage = () => {
    return (
        <div className="page bg-login login-page">
            <div className="login-page-logo-container">
                <img
                    src={iSoftLogo}
                    alt="Purchase Text Logo"
                    className="login-page-isoft-logo"
                />
                <img
                    src={AILogo}
                    alt="Purchase Text Logo"
                    className="login-page-ai-team-logo"
                />
            </div>
            <LoginForm />
            <div className="login-animation-group">
                <div className="polygon-light" />
                <img
                    src={AppLogo}
                    alt="Purchase Logo"
                    className="animation-app-logo"
                />
                <div className="animation-ai-hand" />
            </div>
            <div className="login-loader" />
        </div>
    );
};

export default LoginPage;

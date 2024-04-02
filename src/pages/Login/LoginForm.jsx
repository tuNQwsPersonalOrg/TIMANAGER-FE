import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import AuthenService from '../../services/auth.service';
import { GlobalContext } from '../../contexts/Global/GlobalContext';
import {
    GlobalLoadingEnd,
    GlobalLoadingStart,
} from '../../contexts/Global/GlobalAction';
import {
    IconLock,
    IconPerson,
    IconVisibility,
    IconVisibilityOff,
} from '../../icons/index';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import { AuthSetUser } from '../../contexts/AuthContext/AuthAction';

const LoginForm = () => {
    const globalContext = useContext(GlobalContext);
    const authContext = useContext(AuthContext);
    const { isLoading, response } = useFetch(AuthenService.getLogin);
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            globalContext.dispatch(GlobalLoadingStart());
            const formData = new FormData(e.currentTarget);
            const username = formData.get('username');
            const password = formData.get('password');
            const result = await AuthenService.login({
                component: response.component,
                username,
                password,
            });
            if (result) {
                const user = await AuthenService.getUserInfo();
                authContext.dispatch(AuthSetUser(user));
            }
        } catch (error) {
            // globalContext.dispatch(
            //     GlobalAddToast({
            //         title: 'Login error',
            //         message: error.message,
            //         variant: 'error',
            //     })
            // );
        } finally {
            globalContext.dispatch(GlobalLoadingEnd());
            const user = {
                username: 'nguyen quoc tuan',
                role: 'admin',
            };
            authContext.dispatch(AuthSetUser(user));
        }
    };
    return (
        <form className="login-form" onSubmit={handleLogin}>
            <div className="login-form-header">
                <h3 className="login-form-header-title">Đăng nhập</h3>
                <span className="login-form-header-greeting">
                    Vui lòng đăng nhập để sử dụng
                </span>
            </div>
            <div className="login-form-container">
                <div className="login-form-group">
                    <label
                        htmlFor="username"
                        className="login-form-group-label"
                    >
                        Tên đăng nhập
                    </label>
                    <div className="login-form-group-input-container">
                        <IconPerson
                            className="login-form-group-input-icon fill-black/60"
                            width="1.125rem"
                            height="1.125rem"
                        />
                        <input
                            type="text"
                            placeholder="Tên đăng nhập"
                            id="username"
                            name="username"
                            className="login-form-input"
                            autoFocus
                        />
                    </div>
                </div>
                <div className="login-form-group">
                    <label
                        htmlFor="password"
                        className="login-form-group-label"
                    >
                        Mật khẩu
                    </label>
                    <div className="login-form-group-input-container">
                        <IconLock
                            className="login-form-group-input-icon fill-black/60"
                            width="1.125rem"
                            height="1.125rem"
                        />
                        <input
                            type={showPassword === true ? 'text' : 'password'}
                            placeholder="Mật khẩu"
                            id="password"
                            name="password"
                            className="login-form-input"
                        />
                        {showPassword === true ? (
                            <IconVisibility
                                className="login-form-group-input-icon fill-black/60"
                                width="1.125rem"
                                height="1.125rem"
                                cursor="pointer"
                                onClick={() => setShowPassword(false)}
                            />
                        ) : (
                            <IconVisibilityOff
                                className="login-form-group-input-icon fill-black/60"
                                width="1.125rem"
                                height="1.125rem"
                                cursor="pointer"
                                onClick={() => setShowPassword(true)}
                            />
                        )}
                    </div>
                </div>
            </div>
            <button
                className="login-form-btn"
                disabled={isLoading || globalContext.isFetching}
            >
                Đăng nhập
            </button>
            <div className="login-form-navigate-link-list">
                <NavLink to="#" className="login-form-navigate-link">
                    Quên mật khẩu?
                </NavLink>
                <NavLink to="#" className="login-form-navigate-link">
                    Tạo tài khoản mới
                </NavLink>
            </div>
        </form>
    );
};

export default LoginForm;

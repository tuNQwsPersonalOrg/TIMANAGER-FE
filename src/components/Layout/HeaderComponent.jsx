import React, { useContext, useEffect, useRef, useState } from 'react';
import groupClass from '../../utils/ClassNameUtil';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import { AuthLogout } from '../../contexts/AuthContext/AuthAction';

const HeaderComponent = () => {
    const dropdownRef = useRef();
    const [expandUserMenu, setExpandUserMenu] = useState(false);
    const userContext = useContext(AuthContext);

    // const user = userContext.user;
    const user = { name: 'Nguyen Quoc Tuan', username: 'tunqws' };

    const handleLogout = async () => {
        try {
            userContext.dispatch(AuthLogout());
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const handleBlur = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target))
                setExpandUserMenu(false);
        };
        document.addEventListener('click', handleBlur);

        return () => document.removeEventListener('click', handleBlur);
    }, []);

    return (
        <header className="flex items-center w-full justify-between p-2 bg-half-white">
            <div
                className="mr-5 flex items-center gap-[0.625rem]"
                ref={dropdownRef}
            >
                <span className="text-medium font-bold">{user.name}</span>
                <div className="relative">
                    <button
                        className="transition-[transform] active:scale-90"
                        onClick={() => setExpandUserMenu((prev) => !prev)}
                    >
                        <img
                            // src={userContext.user.avatar}
                            alt={user.name}
                            className="h-8 w-8 rounded-full"
                        />
                    </button>
                    <div
                        className={groupClass(
                            'absolute right-0 top-full z-10 divide-y divide-gray-100 rounded bg-slate-500 p-1 shadow',
                            { hidden: !expandUserMenu }
                        )}
                    >
                        <div className="flex flex-col gap-1 px-4 py-2">
                            <span className="whitespace-nowrap text-nowrap">
                                {user.name}
                            </span>
                            <span className="truncate text-small font-bold">
                                {user.username}@gmail.com
                            </span>
                        </div>
                        <ul className="py-1">
                            <li>
                                <span className="block cursor-pointer rounded px-4 py-2 transition-[background-color] hover:bg-slate-400">
                                    Settings
                                </span>
                            </li>
                        </ul>
                        <div className="py-1">
                            <span
                                className="block cursor-pointer rounded px-4 py-2 transition-[background-color] hover:bg-slate-400"
                                onClick={handleLogout}
                            >
                                Sign out
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default HeaderComponent;

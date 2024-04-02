export const AuthType = {
    setUser: "AUTH_LOGIN_SUCCESS",
    logout: "AUTH_LOGOUT",
};
export const AuthSetUser = (user) => ({
    type: AuthType.setUser,
    payload: user,
});
export const AuthLogout = () => ({
    type: AuthType.logout,
});

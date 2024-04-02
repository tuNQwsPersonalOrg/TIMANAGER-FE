import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INIT_STATE = {
    user: JSON.parse(localStorage.getItem("user")),
    dispatch: () => {},
};

export const AuthContext = createContext(INIT_STATE);

export default function AuthContextProvider({ children }) {
    const [state, dispatch] = useReducer(AuthReducer, INIT_STATE);

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                dispatch,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

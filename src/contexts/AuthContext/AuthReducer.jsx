import { AuthType } from "./AuthAction";

export default function AuthReducer(state, action) {
    switch (action.type) {
        case AuthType.setUser:
            localStorage.setItem("user", JSON.stringify(action.payload));
            return {
                isLoading: false,
                error: null,
                user: action.payload,
            };
        case AuthType.logout:
            localStorage.removeItem("user");
            return {
                isLoading: false,
                user: null,
                error: null,
            };
        default:
            return { ...state };
    }
}

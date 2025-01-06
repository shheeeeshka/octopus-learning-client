import { createContext, useCallback, useState } from "react";
import AuthService from "../services/AuthService";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthLoading, setIsAuthLoading] = useState(false);
    const [authError, setAuthError] = useState(null);
    const [authInfo, setAuthInfo] = useState({
        email: "",
        password: "",
    });

    const updateAuthInfo = useCallback((updatedAuthInfo) => {
        setAuthInfo(updatedAuthInfo);
    }, []);

    const registerUser = useCallback(() => {
        setIsAuthLoading(true);
        AuthService.registration(authInfo)
            .then((response) => console.log(response))
            .then((data) => {
                localStorage.setItem("token", JSON.stringify(data.accessToken));
                localStorage.setItem("user", JSON.stringify(data.user));
                setUser(data.user);
            })
            .catch((err) => setAuthError(err.message))
            .finally(() => setIsAuthLoading(false));
    }, [authInfo]);

    const loginUser = useCallback(() => {
        setIsAuthLoading(true);
        AuthService.login(authInfo)
            .then((response) => console.log(response))
            .then((data) => {
                localStorage.setItem("token", JSON.stringify(data.accessToken));
                localStorage.setItem("user", JSON.stringify(data.user));
                setUser(data.user);
            })
            .catch((err) => setAuthError(err.message))
            .finally(() => setIsAuthLoading(false));
    }, [authInfo]);

    const logoutUser = useCallback(() => {
        setIsAuthLoading(true);
        AuthService.logout()
            .then((response) => console.log(response))
            .then(() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                setUser(null);
            })
            .catch((err) => setAuthError(err.message))
            .finally(() => setIsAuthLoading(false));
    }, []);

    const checkAuth = useCallback(() => {
        setIsAuthLoading(true);
        AuthService.refresh()
            .then((response) => console.log(response))
            .then((data) => {
                localStorage.setItem("token", JSON.stringify(data.accessToken));
                localStorage.setItem("user", JSON.stringify(data.user));
                setUser(data.user);
            })
            .catch((err) => setAuthError(err.message))
            .finally(() => setIsAuthLoading(false));
    }, []);

    return <AuthContext.Provider
        value={{
            user,
            authInfo,
            updateAuthInfo,
            isAuthLoading,
            authError,
            registerUser,
            loginUser,
            logoutUser,
            checkAuth,
        }}
    >
        {children}
    </AuthContext.Provider>
}
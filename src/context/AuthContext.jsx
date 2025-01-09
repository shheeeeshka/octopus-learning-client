import { createContext, useCallback, useEffect, useState } from "react";
import AuthService from "../services/AuthService";
import UserService from "../services/UserService";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);
    const [userStatistics, setUserStatistics] = useState(() => JSON.parse(localStorage.getItem("user-statistics")) || null);
    const [userAchievements, setUserAchievements] = useState(() => JSON.parse(localStorage.getItem("user-achievements")) || [
        {
            title: "Ворота открыты",
            img: "achievement-1.png",
        },
        {
            title: "10 верных ответов",
            img: "achievement-1.png",
        },
        {
            title: "Ворота открыты",
            img: "achievement-2.png",
        },
        {
            title: "10 верных ответов",
            img: "achievement-4.png",
        },
        {
            title: "Ворота открыты",
            img: "achievement-1.png",
        },
        {
            title: "10 верных ответов",
            img: "achievement-1.png",
        },
        {
            title: "Ворота открыты",
            img: "achievement-4.png",
        },
        {
            title: "10 верных ответов",
            img: "achievement-3.png",
        },
    ]);
    const [isAuthLoading, setIsAuthLoading] = useState(false);
    const [authError, setAuthError] = useState(null);
    const [authInfo, setAuthInfo] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
    });
    const [preferedTheme, setPreferedTheme] = useState(() => localStorage.getItem("theme") || "light");

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", preferedTheme);
    }, [preferedTheme]);

    const toggleTheme = () => {
        const newTheme = preferedTheme === "dark" ? "light" : "dark";
        setPreferedTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };

    const updateAuthInfo = useCallback((updatedAuthInfo) => {
        setAuthInfo(prevAuthInfo => {
            const newAuthInfo = {
                ...prevAuthInfo,
                ...updatedAuthInfo
            };
            return newAuthInfo;
        });
    }, []);

    const registerUser = useCallback(async () => {
        try {
            setIsAuthLoading(true);
            const { data } = await AuthService.registration(authInfo);
            localStorage.setItem("token", JSON.stringify(data.accessToken));
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("user-statistics", JSON.stringify(data.userStatistics));
            localStorage.setItem("user-achievements", JSON.stringify([...userAchievements, data.newUserAchievement]));
            setUser(data.user);
            setUserStatistics(data.userStatistics);
            setUserAchievements(p => [...p, data.newUserAchievement]);
        } catch (err) {
            setAuthError(err.message);
            console.error(err);
        } finally {
            setIsAuthLoading(false);
        }
    }, [authInfo]);

    const loginUser = useCallback(async () => {
        try {
            setIsAuthLoading(true);
            const { data } = await AuthService.login(authInfo);
            localStorage.setItem("token", JSON.stringify(data.accessToken));
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("user-statistics", JSON.stringify(data.userStatistics));
            localStorage.setItem("user-achievements", JSON.stringify(data.userAchievements));
            setUser(data.user);
            setUserStatistics(data.userStatistics);
            setUserAchievements(data.userAchievements);
        } catch (err) {
            setAuthError(err.message);
            console.error(err);
        } finally {
            setIsAuthLoading(false);
        }
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
                setUserAchievements(data.userAchievements);
                localStorage.setItem("user-achievements", JSON.stringify(data.userAchievements));
            })
            .catch((err) => setAuthError(err.message))
            .finally(() => setIsAuthLoading(false));
    }, []);

    const updateUserStatistics = useCallback(async (newStatistics) => {
        try {
            setIsAuthLoading(true);
            const { data } = await UserService.updateUserStatistics({ ...newStatistics, userId: user?._id, topicId: "2gj29gj2" });
            localStorage.setItem("user-statistics", JSON.stringify(data));
            setUserStatistics(data.updatedStatistics);
            if (data.newUserAchievement) {
                setUserAchievements(data.newUserAchievement);
                localStorage.setItem("user-achievements", JSON.stringify([...userAchievements, data.newUserAchievement]));
            }
            console.log(data);
        } catch (err) {
            setAuthError(err.message);
            console.error(err);
        } finally {
            setIsAuthLoading(false);
        }
    }, [user?._id, userAchievements]);

    return <AuthContext.Provider
        value={{
            userAchievements,
            updateUserStatistics,
            userStatistics,
            preferedTheme,
            toggleTheme,
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
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

import Layout from "../Layout/Layout";
import HomePage from "../../pages/Home/HomePage";
import UserPage from "../../pages/User/UserPage";
import AdminPage from "../../pages/Admin/AdminPage";
import AuthPage from "../../pages/Auth/AuthPage";
import ModulePage from "../../pages/Module/ModulePage";
import QuizPage from "../../pages/Quiz/QuizPage";

const AppRouter = () => {
    const { user } = useContext(AuthContext);

    return (
        <Routes>
            <Route path="/" element={!user ? <Navigate to="auth" /> : <Layout />}>
                <Route index element={<HomePage />} />
                <Route path="user-profile" element={<UserPage />} />
                <Route path="module" element={<ModulePage />} />
                <Route path="quiz" element={<QuizPage />} />
                <Route path="user-profile" element={<UserPage />} />
                <Route path="admin" element={user?.role?.includes("admin") ? <AdminPage /> : <HomePage />} />
                {/* <Route path="admin" element={<AdminPage />} /> */}
                <Route path="*" element={<Navigate to="/" />} />
            </Route>
            <Route path="auth" element={!user ? <AuthPage /> : <Navigate to="/" />} />
        </Routes>
    );
}

export default AppRouter;
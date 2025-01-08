import { useContext, useState } from "react";
import styles from "./AuthPage.module.css";
import { AuthContext } from "../../context/AuthContext";

const AuthPage = () => {
    const { updateAuthInfo, authInfo, registerUser, loginUser } = useContext(AuthContext);
    const [isLogin, setIsLogin] = useState(false);

    return (
        <div className={styles["auth-page-container"]}>
            <div className={styles["a-p-window"]}>
                <h3 style={{ fontWeight: 600 }}>{isLogin ? "Вход" : "Регистрация"}</h3>
                <div className="d-flex flex-column" style={{ gap: 45 }}>
                    {
                        !isLogin && <div className="d-flex flex-wrap justify-content-center flex-wrap" style={{ gap: 20 }}>
                            <div className="d-flex flex-column" style={{}}>
                                <label htmlFor="" className={styles["auth-window-label"]}>Имя</label>
                                <input onChange={(e) => updateAuthInfo({ name: e.target.value })} value={authInfo["name"]} type="text" className={styles["auth-window-input"]} />
                            </div>
                            <div className="d-flex flex-column" style={{}}>
                                <label htmlFor="" className={styles["auth-window-label"]}>Фамилия</label>
                                <input onChange={(e) => updateAuthInfo({ surname: e.target.value })} value={authInfo["surname"]} type="text" className={styles["auth-window-input"]} />
                            </div>
                        </div>
                    }
                    <div className="d-flex flex-wrap justify-content-center flex-wrap" style={{ gap: 20 }}>
                        <div className="d-flex flex-column" style={{}}>
                            <label htmlFor="" className={styles["auth-window-label"]}>Почта</label>
                            <input onChange={(e) => updateAuthInfo({ email: e.target.value })} value={authInfo["email"]} type="text" className={styles["auth-window-input"]} />
                        </div>
                        <div className="d-flex flex-column" style={{}}>
                            <label htmlFor="" className={styles["auth-window-label"]}>Пароль</label>
                            <input onChange={(e) => updateAuthInfo({ password: e.target.value })} value={authInfo["password"]} type="password" className={styles["auth-window-input"]} />
                        </div>
                    </div>
                </div>
                <div>
                    <span style={{ fontWeight: 600 }}>Уже есть аккаунт? <span
                        style={{ fontWeight: 500, color: "blue", cursor: "pointer" }}
                        onClick={() => setIsLogin(p => !p)}>{!isLogin ? "Вход" : "Регистрация"}</span></span>

                    <span>{isLogin ? "Вход" : "Регистрация"}</span>
                </div>
            </div>
        </div>
    );
}

export default AuthPage;
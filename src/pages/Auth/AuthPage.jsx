import styles from "./AuthPage.module.css";

import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Spinner from "react-bootstrap/Spinner";

const AuthPage = () => {
    const { updateAuthInfo, authInfo, registerUser, loginUser, isAuthLoading } = useContext(AuthContext);
    const [isLogin, setIsLogin] = useState(false);

    return (
        <div className={styles["auth-page-container"]}>
            <div className={styles["a-p-window"]}>
                <h3 style={{ fontWeight: 600, textAlign: "center" }}>{isLogin ? "Вход" : "Регистрация"}</h3>
                <div className="d-flex flex-column" style={{ gap: 30 }}>
                    {
                        !isLogin && <div className="d-flex flex-wrap align-items-center flex-column" style={{ gap: 20 }}>
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
                    <div className="d-flex flex-wrap align-items-center flex-column" style={{ gap: 20 }}>
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
                <div className="d-flex align-items-center flex-column" style={{ width: "100%", justifyContent: "space-around", padding: "0 100px", gap: 10 }}>
                    <span onClick={() => isLogin ? loginUser() : registerUser()} className={styles["auth-btn"]}>{!isAuthLoading ? (isLogin ? "Вход" : "Регистрация") : <Spinner size="sm" />}</span>
                    <span style={{ fontWeight: 600 }}>Уже есть аккаунт? <span
                        style={{ fontWeight: 500, color: "blue", cursor: "pointer" }}
                        onClick={() => setIsLogin(p => !p)}>{!isLogin ? "Вход" : "Регистрация"}</span>
                    </span>
                </div>
            </div>
            <div className={styles["auth-photo-container"]}>
                <div className={styles["auth-details-wrapper"]}>
                    <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: "75%", position: "absolute", bottom: 40, right: 0 }}>
                        <div className={styles["logo-info-wrapper"]}>
                            <img style={{ width: 50 }} src="/logo-book.png" alt="" />
                            <span style={{ color: "#fff", fontSize: 24, fontWeight: 600 }}>Octopus</span>
                        </div>
                        <p style={{ width: "50%", color: "#fff", textAlign: "start" }}>Мы поможем Вам освоить SQL легко и эффективно. Готовы к новым знаниям?</p>
                        <img style={{ height: "65%" }} src="/auth-photo.png" alt="auth" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthPage;
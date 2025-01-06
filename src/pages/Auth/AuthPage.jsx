import { useState } from "react";
import styles from "./AuthPage.module.css";

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(false);

    return (
        <div className={styles["auth-page-container"]}>
            <div className={styles["a-p-window"]}>
                <h3>Регистрация</h3>
                <span style={{ fontWeight: 600 }}>Уже есть аккаунт? <span style={{ fontWeight: 500, color: "blue", cursor: "pointer" }}>Вход</span></span>
                <div className="d-flex flex-wrap justify-content-center" style={{ gap: 20 }}>
                    <div className="d-flex flex-column" style={{}}>
                        <label htmlFor="" className={styles["auth-window-label"]}>Имя</label>
                        <input type="text" className={styles["auth-window-input"]} />
                    </div>
                    <div className="d-flex flex-column" style={{}}>
                        <label htmlFor="" className={styles["auth-window-label"]}>Фамилия</label>
                        <input type="text" className={styles["auth-window-input"]} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthPage;
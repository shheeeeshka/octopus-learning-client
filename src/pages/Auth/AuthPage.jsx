import styles from "./AuthPage.module.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Spinner from "react-bootstrap/Spinner";

const AuthPage = () => {
  const { updateAuthInfo, authInfo, registerUser, loginUser, isAuthLoading } =
    useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className={styles.authContainer}>
      <div className={styles.authFormContainer}>
        <div className={styles.authLogo}>
          <img src="/logo-book.png" alt="Logo" />
          <h1>Octopus</h1>
        </div>

        <h2 className={styles.authTitle}>
          {isLogin ? "Вход в систему" : "Создать аккаунт"}
        </h2>

        <form className={styles.authForm}>
          {!isLogin && (
            <div className={styles.nameFields}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Имя</label>
                <input
                  type="text"
                  value={authInfo["name"]}
                  onChange={(e) => updateAuthInfo({ name: e.target.value })}
                  className={styles.formInput}
                  placeholder="Введите ваше имя"
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Фамилия</label>
                <input
                  type="text"
                  value={authInfo["surname"]}
                  onChange={(e) => updateAuthInfo({ surname: e.target.value })}
                  className={styles.formInput}
                  placeholder="Введите вашу фамилию"
                />
              </div>
            </div>
          )}

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Email</label>
            <input
              type="email"
              value={authInfo["email"]}
              onChange={(e) => updateAuthInfo({ email: e.target.value })}
              className={styles.formInput}
              placeholder="example@mail.com"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Пароль</label>
            <input
              type="password"
              value={authInfo["password"]}
              onChange={(e) => updateAuthInfo({ password: e.target.value })}
              className={styles.formInput}
              placeholder="Не менее 6 символов"
            />
          </div>

          <button
            type="button"
            onClick={isLogin ? loginUser : registerUser}
            className={styles.authButton}
            disabled={isAuthLoading}
          >
            {isAuthLoading ? (
              <Spinner size="sm" />
            ) : isLogin ? (
              "Войти"
            ) : (
              "Зарегистрироваться"
            )}
          </button>

          <p className={styles.authToggle}>
            {isLogin ? "Нет аккаунта?" : "Уже есть аккаунт?"}
            <span
              onClick={() => setIsLogin(!isLogin)}
              className={styles.toggleLink}
            >
              {isLogin ? " Зарегистрироваться" : " Войти"}
            </span>
          </p>
        </form>
      </div>

      <div className={styles.authImageContainer}>
        <div className={styles.authContent}>
          <h3>Мы поможем вам освоить SQL легко и эффективно</h3>
          <p>
            Интерактивные уроки, практические задания и персонализированный
            подход к обучению
          </p>
          <img
            src="/auth-photo.png"
            alt="Learning"
            className={styles.authImage}
          />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

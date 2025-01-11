import styles from "./Sidebar.module.css";

import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Icons from "../../Icons/Icons";

const Sidebar = ({ isMenuOpened, setIsMenuOpened }) => {
    const { user } = useContext(AuthContext);

    return (
        <div className={styles["sidebar-wrapper"] + `${isMenuOpened ? " " + styles["sidebar-active"] : ""}` + " " + "no-select"}>
            <div className={styles["sidebar"]}>
                <div className="d-flex align-items-center" style={{ gap: "10px" }}>
                    <img src="/logo-book.png" alt="logo" style={{ height: 50 }} />
                    <span style={{ fontWeight: 900, fontSize: 22 }}>Octopus</span>
                </div>

                <Link to="user-profile" className="d-flex align-items-center flex-column" style={{ gap: "10px" }}>
                    <img src="/avtr.png" alt="avatar" style={{ cursor: "pointer", height: 95, width: 95, borderRadius: 60, background: "linear-gradient(185deg, #e4c4df, #c59ee9)" }} />
                    <span style={{ fontWeight: 600, fontSize: 20, cursor: "pointer" }}>{user?.name || "Анатолий"} {user?.surname?.slice(0, 1) || "В"}.</span>
                </Link>

                <ul className={styles["nav-list"]}>
                    <li><NavLink
                        className={({ isActive }) => isActive ? styles["nav-link"] + " " + styles["nav-link-active"] : styles["nav-link"]}
                        onClick={() => setIsMenuOpened(false)} to="/"><Icons variant="home" size="22" /><span>Главная</span></NavLink></li>
                    <li><NavLink
                        className={({ isActive }) => isActive ? styles["nav-link"] + " " + styles["nav-link-active"] : styles["nav-link"]}
                        onClick={() => setIsMenuOpened(false)} to="friends"><Icons variant="friends" size="22" /><span>Друзья</span></NavLink></li>
                    <li><NavLink
                        className={({ isActive }) => isActive ? styles["nav-link"] + " " + styles["nav-link-active"] : styles["nav-link"]}
                        onClick={() => setIsMenuOpened(false)} to="support"><Icons variant="support" size="22" /><span>Поддержка</span></NavLink></li>
                    <li><NavLink
                        className={({ isActive }) => isActive ? styles["nav-link"] + " " + styles["nav-link-active"] : styles["nav-link"]}
                        onClick={() => setIsMenuOpened(false)} to="user-profile"><Icons variant="user" size="22" /><span>Профиль</span></NavLink></li>
                    {
                        (user && user?.role?.includes("admin")) && <li><NavLink
                        className={({ isActive }) => isActive ? styles["nav-link"] + " " + styles["nav-link-active"] : styles["nav-link"]}
                        onClick={() => setIsMenuOpened(false)} to="admin"><Icons variant="user" size="22" /><span>Админ</span></NavLink></li>
                    }
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
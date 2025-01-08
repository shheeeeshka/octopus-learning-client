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
                    <img src="/logo.png" alt="logo" style={{ height: 40 }} />
                    <span style={{ fontWeight: 900, fontSize: 22 }}>SkillSet</span>
                </div>

                <Link to="user-profile" className="d-flex align-items-center flex-column" style={{ gap: "10px" }}>
                    <span style={{ cursor: "pointer", height: 75, width: 75, borderRadius: 40, background: "#c7a6f3" }}></span>
                    <span style={{ fontWeight: 600, fontSize: 20, cursor: "pointer" }}>{user?.name || "Анатолий"} {user?.surname[0] || "В"}.</span>
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
                        (user && user?.role?.includes("admin")) && <li><Link to="admin">Админ</Link></li>
                    }
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
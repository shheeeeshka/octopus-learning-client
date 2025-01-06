import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Icons from "../../Icons/Icons";

const Sidebar = ({ isMenuOpened, setIsMenuOpened }) => {
    const { user } = useContext(AuthContext);

    return (
        <div className={styles["sidebar"] + `${isMenuOpened ? " " + styles["sidebar-active"] : ""}` + " " + "no-select"}>
            <div className="d-flex align-items-center" style={{ gap: "10px" }}>
                <img src="/logo.png" alt="logo" style={{ height: 60 }} />
                <span style={{ fontWeight: 700, fontSize: 20 }}>Octopus</span>
                <div style={{ cursor: "pointer" }} onClick={() => console.log("logout")}>
                    <Icons variant="logout" size="23" />
                </div>
            </div>

            <ul className={styles["nav-list"]}>
                <li><Link onClick={() => setIsMenuOpened(false)} to="/"><Icons variant="home" size="22" /><span>Главная</span></Link></li>
                <li><Link onClick={() => setIsMenuOpened(false)} to=""><Icons variant="friends" size="22" /><span>Друзья</span></Link></li>
                <li><Link onClick={() => setIsMenuOpened(false)} to="support"><Icons variant="support" size="22" /><span>Поддержка</span></Link></li>
                <li><Link onClick={() => setIsMenuOpened(false)} to="user-profile"><Icons variant="user" size="22" /><span>Профиль</span></Link></li>
                {
                    (user && user?.role?.includes("admin")) && <li><Link to="admin">Админ</Link></li>
                }
            </ul>

            <Link to="user-profile" className="d-flex align-items-center" style={{ gap: "10px" }}>
                <span style={{ cursor: "pointer", height: 35, width: 35, border: "1px solid", borderRadius: 40, background: "black" }}></span>
                <span style={{ fontWeight: 600, fontSize: 20, cursor: "pointer" }}>{user?.name || "Анатолий"} {user?.surname[0] || "В"}.</span>
            </Link>
        </div>
    );
}

export default Sidebar;
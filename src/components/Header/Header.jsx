import styles from "./Header.module.css";

import Icons from "../../Icons/Icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { EducationContext } from "../../context/EducationContext";
import { AuthContext } from "../../context/AuthContext";

const Header = () => {
    const { searchValue, updateSearchValue } = useContext(EducationContext);
    const { preferedTheme, toggleTheme } = useContext(AuthContext);

    return (
        <header className={styles["header"]}>
            <div>
                <input value={searchValue} onChange={e => updateSearchValue(e.target.value)} className={styles["search-input"]} type="text" placeholder="Поиск..." />
            </div>
            <div className={styles["header-right-wrapper"]}>
                <div style={{ cursor: "pointer" }} onClick={() => toggleTheme()}>
                    <Icons size="20" variant={preferedTheme === "dark" ? "sun" : "moon"} />
                </div>
                <div style={{ cursor: "pointer" }}>
                    <Icons size="20" variant="bell" />
                </div>
                <Link to="user-profile" className={styles["header-avatar"]}>
                    <img src="/avtr.png" alt="avatar" style={{ width: "100%" }} />
                </Link>
            </div>
        </header>
    );
}

export default Header;
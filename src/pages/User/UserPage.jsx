import styles from "./UserPage.module.css";

import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import Icons from "../../Icons/Icons";
import ProgressBar from "react-bootstrap/ProgressBar";

const UserPage = () => {
    const { user } = useContext(AuthContext);
    const now = 60;

    return (
        <div className={styles["user-page-container"] + " " + "no-select"}>
            <div className={styles["user-header"]}>
                <h1>Friends</h1>
            </div>
            <div className={styles["user-card"]}>
                <div className={styles["photo-wrapper"]}>
                    <img src="/dino-avtr.png" alt="user avatar" style={{ height: "100%" }} />
                </div>
                <div className="d-flex flex-column justify-content-around">
                    <div className="d-flex flex-column">
                        <span style={{ fontWeight: 600, fontSize: 25 }}>{user?.name || "Анатолий"} {user?.surname || "Волочков"}</span>
                        <span style={{ color: "#dadee1" }}>Bonus Buster, 24 lvl</span>
                    </div>
                    <div className="d-flex flex-column" style={{ gap: 20 }}>
                        <ProgressBar now={now} label={`${now}%`} visuallyHidden />
                        <div className="d-flex flex-wrap justify-content-center" style={{ gap: 30 }}>
                            <div className="d-flex align-items-center" style={{ gap: 20, width: 220 }}>
                                <div className={styles["st-icon-wrapper"]}>
                                    <Icons variant="support" />
                                </div>
                                <div className="d-flex flex-column">
                                    <span style={{ fontWeight: 700, fontSize: 22 }}>7</span>
                                    <span style={{ color: "#dadee1" }}>Тем пройдено</span>
                                </div>
                            </div>
                            <div className="d-flex align-items-center" style={{ gap: 20, width: 220 }}>
                                <div className={styles["st-icon-wrapper"]}>
                                    <Icons variant="support" />
                                </div>
                                <div className="d-flex flex-column">
                                    <span style={{ fontWeight: 700, fontSize: 22 }}>2.4 мин</span>
                                    <span style={{ color: "#dadee1" }}>Лучшее время</span>
                                </div>
                            </div>
                            <div className="d-flex align-items-center" style={{ gap: 20, width: 220 }}>
                                <div className={styles["st-icon-wrapper"]}>
                                    <Icons variant="support" />
                                </div>
                                <div className="d-flex flex-column">
                                    <span style={{ fontWeight: 700, fontSize: 22 }}>2.4 мин</span>
                                    <span style={{ color: "#dadee1" }}>Лучшее время</span>
                                </div>
                            </div>
                            <div className="d-flex align-items-center" style={{ gap: 20, width: 220 }}>
                                <div className={styles["st-icon-wrapper"]}>
                                    <Icons variant="support" />
                                </div>
                                <div className="d-flex flex-column">
                                    <span style={{ fontWeight: 700, fontSize: 22 }}>127</span>
                                    <span style={{ color: "#dadee1" }}>Правильных ответов</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h1>Achievements</h1>
            </div>
        </div>
    );
}

export default UserPage;
import styles from "./UserPage.module.css";

import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import Icons from "../../Icons/Icons";
import ProgressBar from "react-bootstrap/ProgressBar";
import { API_URL } from "../../utils/constants";
import { Link } from "react-router-dom";

const UserPage = () => {
    const { user, userStatistics, userAchievements } = useContext(AuthContext);
    const now = 60;

    return (
        <div className={styles["user-page-container"] + " " + "no-select"}>
            <div className={styles["user-header"]}>
                <Link to="/friends" className="d-flex" style={{ position: "relative", width: 140, height: "auto" }}>
                    <div className={styles["friend-icon"]}>
                        <img src="/avtr.png" alt="friend" style={{ height: "90%", width: "90%" }} />
                    </div>
                    <div className={styles["friend-icon"]}>
                        <img src="/avtr.png" alt="friend" style={{ height: "90%", width: "90%" }} />
                    </div>
                    <div className={styles["friend-icon"]}>
                        <img src="/avtr.png" alt="friend" style={{ height: "90%", width: "90%" }} />
                    </div>
                </Link>
            </div>
            <div className={styles["user-card"]}>
                <div className={styles["photo-wrapper"]}>
                    <img src="/avtr.png" alt="user avatar" style={{ height: "100%" }} />
                </div>
                <div className="d-flex flex-column justify-content-around">
                    <div className="d-flex flex-column">
                        <span style={{ fontWeight: 600, fontSize: 25, textAlign: "center" }}>{user?.name || "Анатолий"} {user?.surname || "Волочков"}</span>
                        <span style={{ color: "#dadee1" }}>Bonus Buster, 1 lvl</span>
                    </div>
                    <div className="d-flex flex-column" style={{ gap: 30 }}>
                        <ProgressBar now={now} label={`${now}%`} visuallyHidden />
                        <div className="d-flex flex-wrap justify-content-center" style={{ gap: 30 }}>
                            <div className="d-flex align-items-center" style={{ gap: 20, width: 250 }}>
                                <div className={styles["st-icon-wrapper"]}>
                                    <Icons variant="book" size="20" />
                                </div>
                                <div className="d-flex flex-column">
                                    <span style={{ fontWeight: 700, fontSize: 22 }}>{userStatistics?.coveredTopicsCount || 0}</span>
                                    <span style={{ color: "#dadee1" }}>Тем пройдено</span>
                                </div>
                            </div>
                            <div className="d-flex align-items-center" style={{ gap: 20, width: 250 }}>
                                <div className={styles["st-icon-wrapper"]}>
                                    <Icons variant="alarm" size="20" />
                                </div>
                                <div className="d-flex flex-column">
                                    <span style={{ fontWeight: 700, fontSize: 22 }}>{userStatistics?.bestTime || "0 мин"}</span>
                                    <span style={{ color: "#dadee1" }}>Лучшее время</span>
                                </div>
                            </div>
                            <div className="d-flex align-items-center" style={{ gap: 20, width: 250 }}>
                                <div className={styles["st-icon-wrapper"]}>
                                    <Icons variant="bar-chart" size="20" />
                                </div>
                                <div className="d-flex flex-column">
                                    <span style={{ fontWeight: 700, fontSize: 22 }}>{userStatistics?.totalAnswersCount || 0}</span>
                                    <span style={{ color: "#dadee1" }}>Всего ответов</span>
                                </div>
                            </div>
                            <div className="d-flex align-items-center" style={{ gap: 20, width: 250 }}>
                                <div className={styles["st-icon-wrapper"]}>
                                    <Icons variant="check-circle" size="20" />
                                </div>
                                <div className="d-flex flex-column">
                                    <span style={{ fontWeight: 700, fontSize: 22 }}>{userStatistics?.correctAnswersCount || 0}</span>
                                    <span style={{ color: "#dadee1" }}>Правильных ответов</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles["achievements-container"]}>
                <ul className={styles["achievements-list"]}>
                    {
                        userAchievements?.map((ach, ind) => (
                            <li className={styles["achievement-list-item"]} key={ind}>
                                <img src={API_URL + "/" + ach.img || ""} alt="achievement" />
                                <div className="d-flex flex-column">
                                    <span style={{ fontSize: 18, fontWeight: 800 }}>{ach.title}</span>
                                    <span style={{ fontSize: 14, fontWeight: 500 }}>{ach.description || "Bii"}</span>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
}

export default UserPage;
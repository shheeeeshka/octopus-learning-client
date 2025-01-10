import styles from "./HomePage.module.css";

import { useContext, useEffect, useState } from "react";
import { EducationContext } from "../../context/EducationContext";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import Calendar from "react-calendar";
import ProgressBar from "react-bootstrap/ProgressBar";
import Header from "../../components/Header/Header";
import { API_URL } from "../../utils/constants";

const HomePage = () => {
    const { user } = useContext(AuthContext);
    const { modules, searchValue, isEducationLoading } = useContext(EducationContext);

    const [filteredModules, setFilteredModules] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const previewImgBgColors = ["#e09c62", "#1ec85b", "#d46866", "#65a9d9", "#c563da", "#4f61ec", "#8a63f4", "#8c7146", "#e5b600"];

    useEffect(() => {
        if (!searchValue && modules && modules?.length) return setFilteredModules(modules);
        const newFilteredModules = modules?.filter((m) => {
            const title = m.title?.toLowerCase();
            const description = m.description?.toLowerCase();
            const search = searchValue.toLowerCase();
            return title.startsWith(search) || description.startsWith(search);
        });
        setFilteredModules(newFilteredModules);
    }, [modules, searchValue]);

    const handleCalendarDateChange = (newDate) => {
        setSelectedDate(newDate);
    };

    return (
        <div className={styles["home-page-container"]}>
            <Header />
            <div className={styles["welcome-container"]}>
                <img src="/photo-banner-2.png" alt="left image" style={{ height: 200 }} />
                <div style={{ width: 400, textAlign: "center" }}>
                    <span style={{ fontSize: 20, fontWeight: 500 }}>Здравствуйте, {user?.name || "Анатолий"}!</span>
                    <p style={{ textAlign: "center", color: "#99abf3" }}>Наше приложение было создано, чтобы Вы прокачали свои навыки в языке запросов SQL</p>
                </div>
                <img src="/photo-banner-1.png" alt="right image" style={{ height: 200 }} />
            </div>
            <div className={styles["home-page-main-container"]}>
                <div className={styles["h-p-modules-wrapper"]}>
                    <ul className={styles["h-p-modules"]}>
                        {
                            (!isEducationLoading && Array.isArray(filteredModules) && filteredModules?.length < 1) && <div>
                                <h3>Урок не найден :(</h3>
                            </div>
                        }
                        {
                            isEducationLoading && <div>
                                <h3>Подгружаем уроки для Вас</h3>
                            </div>
                        }
                        {
                            (Array.isArray(filteredModules) && filteredModules?.length > 0) && filteredModules?.map((module, ind) => (
                                <Link to={`module?topic=${module.title}`} key={ind} className={styles["module-card"]}>
                                    <div style={{ height: 40 }}>
                                        <div style={{ height: 65, position: "relative", width: 65 }}>
                                            <div
                                                className="d-flex justify-content-center align-items-center"
                                                style={{ borderRadius: 15, width: "100%", height: "100%", position: "absolute", top: "-52%", background: previewImgBgColors[ind % previewImgBgColors.length] }}>
                                                <img
                                                    src={API_URL + "/" + module.previewImg} alt="preview"
                                                    style={{ borderRadius: 15, width: "100", height: "100%" }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-column align-items-center" style={{ gap: 20, padding: "0px 25px 15px 25px", width: "100%" }}>
                                        <div className="d-flex flex-column" style={{ width: "75%", textAlign: "center", height: "100px", gap: 20 }}>
                                            <span style={{ fontWeight: 600, fontSize: 17, color: "black" }}>{module.title}</span>
                                            <span style={{ fontSize: 14, color: "rgb(168 168 168)" }}>{module.description}</span>
                                        </div>
                                        <div className="d-flex flex-column" style={{ width: "100%", fontSize: 14, gap: 10 }}>
                                            <div className="d-flex justify-content-between" style={{ color: "black", fontSize: 16 }}>
                                                <span>Пройдено</span>
                                                <span>{75}%</span>
                                            </div>
                                            <ProgressBar variant="success" now={75} style={{ height: 10 }} />
                                        </div>
                                    </div>
                                </Link>
                            ))
                        }
                    </ul>
                </div>
                <div className={styles["home-right-sidebar"]}>
                    <div className={styles["achievements-widget"]}>
                        <div className={styles["achievement-wrapper"]}>
                            <div style={{ height: 75, width: 75 }}>
                                <img src="/achievement-1.png" alt="" style={{ height: "100%" }} />
                            </div>
                            <span style={{ fontSize: 18, fontWeight: 600 }}>{"Ворота открыты"}</span>
                        </div>
                        <div className={styles["achievement-wrapper"]}>
                            <div style={{ height: 75, width: 75 }}>
                                <img src="/achievement-2.png" alt="" style={{ height: "100%" }} />
                            </div>
                            <span style={{ fontSize: 18, fontWeight: 600 }}>{"Успешный старт"}</span>
                        </div>
                    </div>
                    <div className={styles["calendar-wrapper"]}>
                        <Calendar
                            onChange={() => handleCalendarDateChange()}
                            value={selectedDate}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
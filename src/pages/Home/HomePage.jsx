import styles from "./HomePage.module.css";

import { useContext, useEffect, useState } from "react";
import { EducationContext } from "../../context/EducationContext";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import Calendar from "react-calendar";
import ProgressBar from "react-bootstrap/ProgressBar";
import Header from "../../components/Header/Header";

const HomePage = () => {
    const { user } = useContext(AuthContext);
    const { modules, searchValue, isEducationLoading } = useContext(EducationContext);

    const [filteredModules, setFilteredModules] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());

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
                                    <div style={{ height: 60, position: "relative", width: 60 }}>
                                        <img
                                            src={module.previewImg} alt="preview"
                                            style={{ borderRadius: 15, width: "100%", position: "absolute", top: "-52%" }}
                                        />
                                    </div>
                                </div>
                                <div className="d-flex flex-column align-items-center" style={{ gap: 20, padding: "0px 25px 15px 25px", width: "100%" }}>
                                    <div className="d-flex flex-column" style={{ width: "70%", textAlign: "center", height: "100px", gap: 20 }}>
                                        <span style={{ fontWeight: 600, fontSize: 17, color: "black" }}>{module.title}</span>
                                        <span style={{ fontSize: 14, color: "#dadee1" }}>{module.description}</span>
                                    </div>
                                    <div className="d-flex flex-column" style={{ width: "100%", fontSize: 14, gap: 10 }}>
                                        <div className="d-flex justify-content-between" style={{ color: "black" }}>
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
    );
}

export default HomePage;
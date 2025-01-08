import styles from "./HomePage.module.css";

import { useContext, useEffect, useState } from "react";
import { EducationContext } from "../../context/EducationContext";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import ProgressBar from "react-bootstrap/ProgressBar";
import Header from "../../components/Header/Header";

const HomePage = () => {
    const { user } = useContext(AuthContext);
    const { modules, searchValue } = useContext(EducationContext);

    const [filteredModules, setFilteredModules] = useState([]);

    useEffect(() => {
        if (!searchValue) return setFilteredModules(modules);
        const newFilteredModules = modules?.filter((m) => {
            const title = m.title?.toLowerCase();
            const description = m.description?.toLowerCase();
            const search = searchValue.toLowerCase();
            return title.startsWith(search) || description.startsWith(search);
        });
        setFilteredModules(newFilteredModules);
    }, [modules, searchValue]);

    return (
        <div className={styles["home-page-container"]}>
            <Header />
            <div className={styles["welcome-container"]}>
                <span>Photo 1</span>
                <div style={{ width: 400 }}>
                    <span style={{ fontSize: 20, fontWeight: 500, textAlign: "center" }}>Здравствуйте, {user?.name}</span>
                    <p style={{ textAlign: "center" }}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate, nihil!</p>
                </div>
                <span>Photo 2</span>
            </div>
            <div className={styles["h-p-modules-wrapper"]}>
                <ul className={styles["h-p-modules"]}>
                    {
                        filteredModules?.length < 1 && <div>
                            <h3>Урок не найден :(</h3>
                        </div>
                    }
                    {
                        filteredModules?.map((module, ind) => (
                            <Link to={`module?topic=${module.title}`} key={ind} className={styles["module-card"]}>
                                <div style={{ border: "0px solid", height: 75, width: 75, padding: 3, position: "relative" }}>
                                    <img src={module.previewImg} alt="preview" style={{ height: "100%", borderRadius: 15, position: "absolute", left: 0, top: "-50%" }} />
                                </div>
                                <div className="d-flex flex-column align-items-center" style={{ gap: 20, padding: "0px 25px 15px 25px" }}>
                                    <div className="d-flex justify-content-between flex-column" style={{ width: "50%", textAlign: "center" }}>
                                        <span style={{ fontWeight: 600, fontSize: 15, color: "black" }}>{module.title}</span>
                                        <span style={{ fontSize: 13, color: "#dadee1" }}>{module.description}</span>
                                    </div>
                                    <div style={{ width: "100%", fontSize: 14 }}>
                                        <div className="d-flex justify-content-between" style={{ color: "black" }}>
                                            <span>Progress</span>
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
                <div>
                    <h4>Widget</h4>
                </div>
                <div className={styles["calendar-wrapper"]}>
                    <h4>Calendar</h4>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
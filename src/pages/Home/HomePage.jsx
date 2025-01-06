import styles from "./HomePage.module.css";

import { useContext } from "react";
import { EducationContext } from "../../context/EducationContext";
import { Link } from "react-router-dom";

const HomePage = () => {
    const { modules } = useContext(EducationContext);

    return (
        <div className={styles["home-page-container"]}>
            <ul className={styles["h-p-modules"]}>
                {
                    modules?.map((module, ind) => (
                        <Link to={`module?topic=${module.title}`} key={ind} className={styles["module-card"]}>
                            <div style={{ border: "0px solid", height: "100%", width: "190px" }}>
                                <img src={module.previewImg} alt="preview" style={{ height: 90, width: 90, borderRadius: 15 }} />
                            </div>
                            <div className="d-flex flex-column" style={{ gap: 20, padding: "0 25px" }}>
                                <div className="d-flex justify-content-between" style={{}}>
                                    <span style={{ fontWeight: 600, fontSize: 22 }}>{module.name}</span>
                                    <div className="d-flex" style={{ gap: 10 }}>
                                        <span style={{ color: "#dadee1" }}>Добавлено</span>
                                        <span style={{ fontSize: 19 }}>{module.createdAt}</span>
                                    </div>
                                </div>
                                <p className={styles["module-card-description"]}>{module.description}</p>
                            </div>
                        </Link>
                    ))
                }
            </ul>
            <div className={styles["home-right-sidebar"]}>
                <h3>Achievements</h3>
            </div>
        </div>
    );
}

export default HomePage;
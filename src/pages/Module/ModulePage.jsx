import styles from "./ModulePage.module.css";

import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { EducationContext } from "../../context/EducationContext";
import Header from "../../components/Header/Header";

const ModulePage = () => {
    const { searchValue, modules, fetchTest } = useContext(EducationContext);
    const [pageContent, setPageContent] = useState("");
    const [selectedModule, setSelectedModule] = useState({});

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const moduleId = queryParams.get("module");

    useEffect(() => {
        const content = modules?.filter(module => module._id === moduleId);
        setPageContent(content[0]?.content);
        setSelectedModule(content[0]);
    }, [modules, moduleId]);

    function highlightText(content, search) {
        console.log(content);
        if (!content) return <div></div>;
        if (!search) return content;
        const regex = new RegExp(`(${search})`, 'gi');
        return content.replace(regex, '<span style="background-color: yellow;">$1</span>');
    }

    return (
        <div className={styles["module-page-container"]}>
            <Header />
            <div className={styles["module-window"]}>
                <div className={styles["module-content-wrapper"]}>
                    <h1>{selectedModule?.title || ""}</h1>
                    <div className={styles["module-content"]} dangerouslySetInnerHTML={{ __html: highlightText(pageContent, searchValue) }}></div>
                    <Link onClick={() => fetchTest(moduleId)} to={`/quiz?module=${moduleId}`} className={styles["open-test-button"]}>Пройти тест</Link>
                </div>
                <div className={styles["module-nav-wrapper"]}>
                    <div className="d-flex flex-column" style={{ gap: 20, height: "90%" }}>
                        {
                            modules?.map((module, moduleIndex) => (
                                <NavLink
                                    to={`/module?module=${module._id || ""}`}
                                    className={({ isActive }) => (isActive && moduleId === module._id) ? styles["module-nav-block"] + " " + styles["module-nav-block-active"] : styles["module-nav-block"]}
                                    key={moduleIndex}
                                >
                                    <span>{moduleIndex + 1}.</span>
                                    <span>{module.title || ""}</span>
                                </NavLink>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModulePage;
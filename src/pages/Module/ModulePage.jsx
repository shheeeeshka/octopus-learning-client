import styles from "./ModulePage.module.css";

import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { EducationContext } from "../../context/EducationContext";
import Header from "../../components/Header/Header";

const ModulePage = () => {
    const { searchValue, modules, fetchTest } = useContext(EducationContext);
    const [pageContent, setPageContent] = useState("");
    const [selectedModule, setSelectedModule] = useState(null);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const moduleId = queryParams.get("module");

    useEffect(() => {
        const content = modules?.filter(module => module._id === moduleId);
        setPageContent(content[0]?.content);
        setSelectedModule(content[0]);
    }, [modules, moduleId]);

    function highlightText(content, search) {
        if (!search) return content;
        const regex = new RegExp(`(${search})`, 'gi');
        return content.replace(regex, '<span style="background-color: yellow;">$1</span>');
    }

    return (
        <div className={styles["module-page-container"]}>
            <Header />
            <div className={styles["module-window"]}>
                <h1>{selectedModule?.title || ""}</h1>
                <div className={styles["module-content"]} dangerouslySetInnerHTML={{ __html: highlightText(pageContent, searchValue) }}></div>
                <Link onClick={() => fetchTest(moduleId)} to={`/quiz?module=${moduleId}`} className={styles["open-test-button"]}>Пройти тест</Link>
            </div>
        </div>
    );
}

export default ModulePage;
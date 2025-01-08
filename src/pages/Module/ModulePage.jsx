import styles from "./ModulePage.module.css";

import { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { EducationContext } from "../../context/EducationContext";
import Header from "../../components/Header/Header";

const ModulePage = () => {
    const { selectedTopicContent, searchValue } = useContext(EducationContext);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const topicName = queryParams.get("topic");

    function highlightText(content, search) {
        if (!search) return content;
        const regex = new RegExp(`(${search})`, 'gi');
        return content.replace(regex, '<span style="background-color: yellow;">$1</span>');
    }

    return (
        <div className={styles["module-page-container"]}>
            <Header />
            <div className={styles["module-window"]}>
                <h1>{topicName}</h1>
                <div className={styles["module-content"]} dangerouslySetInnerHTML={{ __html: highlightText(selectedTopicContent, searchValue) }}></div>
                <Link to={`/quiz?topic=${topicName}`} className={styles["open-test-button"]}>Пройти тест</Link>
            </div>
        </div>
    );
}

export default ModulePage;
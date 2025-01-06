import styles from "./ModulePage.module.css";

import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { EducationContext } from "../../context/EducationContext";

const ModulePage = () => {
    const { selectedTopicContent } = useContext(EducationContext);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const topicName = queryParams.get("topic");

    function createMarkup() {
        return { __html: selectedTopicContent };
    }

    return (
        <div className={styles["module-page-container"]}>
            <div className={styles["module-window"]}>
                <h1>{topicName}</h1>
                <div className={styles["module-content"]} dangerouslySetInnerHTML={createMarkup()}></div>
                <Link to={`/quiz?topic=${topicName}`} className={styles["open-test-button"]}>Пройти тест</Link>
            </div>
        </div>
    );
}

export default ModulePage;
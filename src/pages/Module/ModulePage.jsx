import styles from "./ModulePage.module.css";
import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { EducationContext } from "../../context/EducationContext";
import Header from "../../components/Header/Header";
import Spinner from "react-bootstrap/esm/Spinner";

const ModulePage = () => {
  const { searchValue, modules, fetchTest, isEducationLoading } =
    useContext(EducationContext);
  const [pageContent, setPageContent] = useState("");
  const [selectedModule, setSelectedModule] = useState({});
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const moduleId = queryParams.get("module");

  useEffect(() => {
    if (modules && modules.length > 0) {
      const content = modules.filter((module) => module._id === moduleId);
      if (content.length > 0) {
        setPageContent(content[0]?.content);
        setSelectedModule(content[0]);
      } else {
        setPageContent("");
        setSelectedModule({});
      }
    }
  }, [modules, moduleId]);

  function unescapeHtml(escapedHtml) {
    const htmlEntities = {
      "&lt;": "<",
      "&gt;": ">",
      "&amp;": "&",
      "&quot;": '"',
      "&#39;": "'",
      "&nbsp;": " ",
    };

    return escapedHtml.replace(
      /&(lt|gt|amp|quot|#39|nbsp);/g,
      (match) => htmlEntities[match]
    );
  }

  function highlightText(content, search) {
    if (!content) return <div></div>;

    let unescapedContent = unescapeHtml(content);

    let processedContent = unescapedContent
      .replace(/<h1/g, `<h1 class="${styles["module-h1"]}"`)
      .replace(/<h2/g, `<h2 class="${styles["module-h2"]}"`)
      .replace(/<h3/g, `<h3 class="${styles["module-h3"]}"`)
      .replace(/<p>/g, `<p class="${styles["module-p"]}">`)
      .replace(/<ul>/g, `<ul class="${styles["module-ul"]}">`)
      .replace(/<li>/g, `<li class="${styles["module-li"]}">`)
      .replace(/<pre>/g, `<pre class="${styles["module-pre"]}">`)
      .replace(/<code>/g, `<code class="${styles["module-code"]}">`)
      .replace(/<table>/g, `<table class="${styles["module-table"]}">`)
      .replace(/<th>/g, `<th class="${styles["module-th"]}">`)
      .replace(/<td>/g, `<td class="${styles["module-td"]}">`)
      .replace(
        /<div class="ql-task"/g,
        `<div class="${styles["module-task"]}"`
      );

    if (search) {
      const regex = new RegExp(`(${search})`, "gi");
      processedContent = processedContent.replace(
        regex,
        '<span style="background-color: yellow;">$1</span>'
      );
    }

    return processedContent;
  }

  return (
    <div className={styles["module-page-container"]}>
      <Header />
      <div className={styles["module-window"]}>
        <div className={styles["module-content-wrapper"]}>
          {isEducationLoading ? (
            <div className={styles["loading-container"]}>
              <Spinner animation="border" />
              <p>Загрузка модуля...</p>
            </div>
          ) : (
            <>
              <h1 className={styles["module-title"]}>
                {selectedModule?.title || ""}
              </h1>
              {pageContent && (
                <div
                  className={styles["module-content"]}
                  dangerouslySetInnerHTML={{
                    __html: highlightText(pageContent, searchValue),
                  }}
                ></div>
              )}
              {pageContent && (
                <div className={styles["module-footer"]}>
                  <Link
                    onClick={() => fetchTest(moduleId)}
                    to={`/quiz?module=${moduleId}`}
                    className={styles["test-button"]}
                  >
                    <span>Пройти тест</span>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 12H19M19 12L12 5M19 12L12 19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </div>
              )}
            </>
          )}
        </div>

        {!isEducationLoading && (
          <div
            className={`${styles["module-nav-wrapper"]} ${
              sidebarCollapsed ? styles["collapsed"] : ""
            }`}
          >
            <button
              className={styles["sidebar-toggle"]}
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              {sidebarCollapsed ? (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 18L15 12L9 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 18L9 12L15 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>

            <div className={styles["module-nav-content"]}>
              <h3 className={styles["nav-title"]}>Содержание</h3>
              <div className={styles["module-nav-list"]}>
                {modules?.map((module, moduleIndex) => (
                  <NavLink
                    to={`/module?module=${module._id || ""}`}
                    className={({ isActive }) =>
                      `${styles["module-nav-item"]} ${
                        isActive && moduleId === module._id
                          ? styles["active"]
                          : ""
                      }`
                    }
                    key={moduleIndex}
                  >
                    <span className={styles["module-number"]}>
                      {moduleIndex + 1}
                    </span>
                    <span
                      className={styles["module-name"]}
                      title={module.title}
                    >
                      {module.title || ""}
                    </span>
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModulePage;

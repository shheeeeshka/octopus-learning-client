import styles from "./HomePage.module.css";
import { useContext, useEffect, useState } from "react";
import { EducationContext } from "../../context/EducationContext";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Calendar from "react-calendar";
import ProgressBar from "react-bootstrap/ProgressBar";
import Header from "../../components/Header/Header";
import { API_URL } from "../../utils/constants";
import Spinner from "react-bootstrap/esm/Spinner";

const HomePage = () => {
  const { user } = useContext(AuthContext);
  const { modules, searchValue, isEducationLoading } =
    useContext(EducationContext);

  const [filteredModules, setFilteredModules] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const previewImgBgColors = [
    "#e09c62",
    "#1ec85b",
    "#d46866",
    "#65a9d9",
    "#c563da",
    "#4f61ec",
    "#8a63f4",
    "#8c7146",
    "#e5b600",
  ];

  useEffect(() => {
    if (!searchValue && modules && modules?.length)
      return setFilteredModules(modules);
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
        <img
          src="/photo-banner-2.png"
          alt="left image"
          className={styles["welcome-image"]}
        />
        <div className={styles["welcome-text"]}>
          <h2>Здравствуйте, {user?.name || "Анатолий"}!</h2>
          <p>
            Наше приложение было создано, чтобы Вы прокачали свои навыки в языке
            запросов SQL
          </p>
        </div>
        <img
          src="/photo-banner-1.png"
          alt="right image"
          className={styles["welcome-image"]}
        />
      </div>
      <div className={styles["home-page-main-container"]}>
        <div className={styles["modules-section"]}>
          <h2 className={styles["section-title"]}>Доступные уроки</h2>
          <div className={styles["modules-grid"]}>
            {isEducationLoading ? (
              [...Array(6)].map((_, index) => (
                <div key={index} className={styles["module-card-skeleton"]}>
                  <div className={styles["skeleton-preview"]}></div>
                  <div className={styles["skeleton-content"]}>
                    <div className={styles["skeleton-line"]}></div>
                    <div className={styles["skeleton-line"]}></div>
                    <div className={styles["skeleton-line"]}></div>
                  </div>
                  <div className={styles["skeleton-progress"]}></div>
                </div>
              ))
            ) : filteredModules?.length > 0 ? (
              filteredModules?.map((module, ind) => (
                <Link
                  to={`module?module=${module._id}`}
                  key={ind}
                  className={styles["module-card"]}
                >
                  <div
                    className={styles["module-preview"]}
                    style={{
                      background:
                        previewImgBgColors[ind % previewImgBgColors.length],
                    }}
                  >
                    {module.previewImg && (
                      <img
                        src={API_URL + "/" + module.previewImg}
                        alt="preview"
                      />
                    )}
                  </div>
                  <div className={styles["module-content"]}>
                    <h3>{module.title}</h3>
                    <p>{module.description}</p>
                  </div>
                  <div className={styles["module-progress"]}>
                    <div className={styles["progress-text"]}>
                      <span>Пройдено</span>
                      <span>75%</span>
                    </div>
                    <ProgressBar variant="success" now={75} />
                  </div>
                </Link>
              ))
            ) : (
              <div className={styles["no-modules"]}>
                <h3>Уроки не найдены</h3>
                <p>Попробуйте изменить параметры поиска</p>
              </div>
            )}
          </div>
        </div>
        <div className={styles["sidebar-section"]}>
          <div className={styles["achievements-widget"]}>
            <h3 className={styles["widget-title"]}>Ваши достижения</h3>
            <div className={styles["achievements-list"]}>
              <div className={styles["achievement-item"]}>
                <div className={styles["achievement-icon"]}>
                  <img src="/achievement-1.png" alt="achievement" />
                </div>
                <div className={styles["achievement-info"]}>
                  <h4>Ворота открыты</h4>
                  <p>Пройдите первый урок</p>
                </div>
              </div>
              <div className={styles["achievement-item"]}>
                <div className={styles["achievement-icon"]}>
                  <img src="/achievement-2.png" alt="achievement" />
                </div>
                <div className={styles["achievement-info"]}>
                  <h4>Успешный старт</h4>
                  <p>Пройдите 5 уроков</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles["calendar-widget"]}>
            <h3 className={styles["widget-title"]}>Календарь</h3>
            <Calendar
              onChange={handleCalendarDateChange}
              value={selectedDate}
              className={styles["custom-calendar"]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

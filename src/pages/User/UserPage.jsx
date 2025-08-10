import styles from "./UserPage.module.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Icons from "../../Icons/Icons";
import ProgressBar from "react-bootstrap/ProgressBar";
import { API_URL } from "../../utils/constants";
import { Link } from "react-router-dom";

const UserPage = () => {
  const { user, userStatistics, userAchievements } = useContext(AuthContext);
  const now = 60;

  return (
    <div className={styles["user-page-container"] + " " + "no-select"}>
      <div className={styles["user-header"]}>
        <div className={styles["progress-container"]}>
          <div className={styles["level-badge"]}>
            <span>1</span>
          </div>
          <ProgressBar now={now} label={`${now}%`} visuallyHidden />
          <span className={styles["level-text"]}>Bonus Buster</span>
        </div>
        <Link to="/friends" className={styles["friends-preview"]}>
          <div className={styles["friend-icon"]}>
            <img src="/avtr.png" alt="friend" />
          </div>
          <div className={styles["friend-icon"]}>
            <img src="/avtr.png" alt="friend" />
          </div>
          <div className={styles["friend-icon"]}>
            <img src="/avtr.png" alt="friend" />
          </div>
          <span>3 друзей</span>
        </Link>
      </div>

      <div className={styles["user-card"]}>
        <div className={styles["user-avatar"]}>
          <img src="/avtr.png" alt="user avatar" />
          <div className={styles["edit-profile"]}>
            <Icons variant="edit" size="16" />
          </div>
        </div>
        <div className={styles["user-info"]}>
          <h2>
            {user?.name || "Анатолий"} {user?.surname || "Волочков"}
          </h2>
          <p className={styles["user-bio"]}>
            SQL-энтузиаст с 2 годами опыта. Люблю сложные запросы и оптимизацию.
          </p>

          <div className={styles["stats-grid"]}>
            <div className={styles["stat-item"]}>
              <div className={styles["stat-icon"]}>
                <Icons variant="book" size="20" />
              </div>
              <div>
                <h3>{userStatistics?.coveredTopicsCount || 0}</h3>
                <p>Тем пройдено</p>
              </div>
            </div>
            <div className={styles["stat-item"]}>
              <div className={styles["stat-icon"]}>
                <Icons variant="alarm" size="20" />
              </div>
              <div>
                <h3>{userStatistics?.bestTime || "0 мин"}</h3>
                <p>Лучшее время</p>
              </div>
            </div>
            <div className={styles["stat-item"]}>
              <div className={styles["stat-icon"]}>
                <Icons variant="bar-chart" size="20" />
              </div>
              <div>
                <h3>{userStatistics?.totalAnswersCount || 0}</h3>
                <p>Всего ответов</p>
              </div>
            </div>
            <div className={styles["stat-item"]}>
              <div className={styles["stat-icon"]}>
                <Icons variant="check-circle" size="20" />
              </div>
              <div>
                <h3>{userStatistics?.correctAnswersCount || 0}</h3>
                <p>Правильных ответов</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles["achievements-section"]}>
        <h2>Достижения</h2>
        <div className={styles["achievements-grid"]}>
          {userAchievements?.map((ach, ind) => (
            <div className={styles["achievement-card"]} key={ind}>
              <div className={styles["achievement-badge"]}>
                <img src={`${API_URL}/${ach.img || ""}`} alt="achievement" />
              </div>
              <div className={styles["achievement-info"]}>
                <h4>{ach.title || "Title"}</h4>
                <p>{ach.description || ""}</p>
                <span className={styles["achievement-date"]}>
                  Получено: 12.05.2023
                </span>
              </div>
            </div>
          ))}
          {[...Array(6 - userAchievements?.length)].map((_, i) => (
            <div
              className={styles["achievement-card"] + " " + styles["locked"]}
              key={`locked-${i}`}
            >
              <div className={styles["achievement-badge"]}>
                <Icons variant="lock" size="24" />
              </div>
              <div className={styles["achievement-info"]}>
                <h4>Скрытое достижение</h4>
                <p>Пройдите больше уроков, чтобы разблокировать</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles["activity-section"]}>
        <h2>Активность</h2>
        <div className={styles["activity-timeline"]}>
          <div className={styles["timeline-item"]}>
            <div className={styles["timeline-dot"]}></div>
            <div className={styles["timeline-content"]}>
              <p>Завершил урок "Сложные JOIN-запросы"</p>
              <span>2 дня назад</span>
            </div>
          </div>
          <div className={styles["timeline-item"]}>
            <div className={styles["timeline-dot"]}></div>
            <div className={styles["timeline-content"]}>
              <p>Получено достижение "SQL Мастер"</p>
              <span>1 неделю назад</span>
            </div>
          </div>
          <div className={styles["timeline-item"]}>
            <div className={styles["timeline-dot"]}></div>
            <div className={styles["timeline-content"]}>
              <p>Начал изучение темы "Оптимизация запросов"</p>
              <span>2 недели назад</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;

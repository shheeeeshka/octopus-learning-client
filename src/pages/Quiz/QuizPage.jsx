import styles from "./QuizPage.module.css";
import { Link, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { EducationContext } from "../../context/EducationContext";

const QuizPage = () => {
  const { updateUserStatistics } = useContext(AuthContext);
  const { quiz, fetchTest, modules, isEducationLoading } =
    useContext(EducationContext);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const moduleId = queryParams.get("module");

  const [questionIndex, setQuestionIndex] = useState(0);
  const [now, setNow] = useState(0);
  const [showTestResults, setShowTestResults] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalAnswers, setTotalAnswers] = useState(0);
  const [remainingTime, setRemainingTime] = useState(-1);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isTestOver, setIsTestOver] = useState(false);
  const [test, setTest] = useState(null);
  const [moduleInfo, setModuleInfo] = useState(null);

  useEffect(() => {
    if (modules && modules.length > 0) {
      const content = modules?.filter((module) => module._id === moduleId);
      if (content.length > 0) {
        setModuleInfo(content[0]);
      } else {
        setModuleInfo({});
      }
    }
  }, [modules, moduleId]);

  useEffect(() => {
    if (remainingTime === -1) return;
    const interval = setInterval(() => {
      setElapsedTime((prevTime) => prevTime + 1);
      setRemainingTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          setIsTestOver(true);
          setShowTestResults(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    if (isTestOver) return clearInterval(interval);

    return () => {
      clearInterval(interval);
    };
  }, [remainingTime, isTestOver]);

  useEffect(() => {
    if (!quiz) {
      fetchTest(moduleId);
    } else {
      setTest(quiz);
      if (quiz.timer && !isNaN(+quiz.timer)) {
        setRemainingTime(+quiz.timer * 60);
      } else {
        setRemainingTime(-1);
      }
    }
  }, [quiz, moduleId, fetchTest]);

  useEffect(() => {
    if (totalAnswers === 0) {
      setNow(0);
    } else {
      setNow(Math.round((correctAnswers / totalAnswers) * 100));
    }
  }, [correctAnswers, totalAnswers]);

  const handleGoToPreviousQuestion = () => {
    if (questionIndex === 0 || isTestOver) return;
    setQuestionIndex((p) => p - 1);
  };

  const handleGoToNextQuestion = () => {
    if (isTestOver) return;
    const move = test?.questions[questionIndex].answers?.some(
      (ans) => ans["displayCorrectAnswers"]
    );

    setTest((test) => {
      const p = { ...test };
      p.questions[questionIndex].answers?.forEach((answer) => {
        if (answer.isCorrect) {
          answer["displayCorrectAnswers"] = true;
        } else {
          answer["displayCorrectAnswers"] = false;
        }
      });
      return p;
    });

    const isCorrectAnswer = test?.questions[questionIndex].answers?.every(
      (ans) =>
        (!ans.isCorrect && !ans.isChecked) || (ans.isCorrect && ans.isChecked)
    );

    if (isCorrectAnswer && !move) {
      updateUserStatistics({ correctAnswersCount: 1 });
      setCorrectAnswers((p) => p + 1);
    }

    if (test?.questions?.length === questionIndex + 1) {
      updateUserStatistics({ coveredTopicsCount: 1 });
      setTotalAnswers((p) => p + 1);
      setIsTestOver(true);
      return setShowTestResults(true);
    }

    if (move) return setQuestionIndex((p) => p + 1);
    setTotalAnswers((p) => p + 1);
    updateUserStatistics({ totalAnswersCount: 1 });
  };

  const handleAnswer = (i) => {
    const clickable = !test?.questions[questionIndex].answers?.some(
      (ans) => ans["displayCorrectAnswers"]
    );
    if (!clickable) return;

    setTest((prevTest) => {
      const newTest = JSON.parse(JSON.stringify(prevTest));
      newTest.questions[questionIndex].answers[i].isChecked =
        !newTest.questions[questionIndex].answers[i].isChecked;
      return newTest;
    });
  };

  const getTimeString = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.round(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const calculateScoreColor = (percentage) => {
    if (percentage >= 80) return "#4CAF50";
    if (percentage >= 50) return "#FFC107";
    return "#F44336";
  };

  if (test)
    return (
      <div className={styles["quiz-page-container"]}>
        <div className={styles["quiz-container"]}>
          {!isEducationLoading && (
            <div className={styles["quiz-card"]}>
              <div className={styles["quiz-header"]}>
                <div className={styles["quiz-progress"]}>
                  <div className={styles["progress-bar"]}>
                    <div
                      className={styles["progress-fill"]}
                      style={{
                        width: `${
                          ((questionIndex + 1) / test.questions.length) * 100
                        }%`,
                        backgroundColor: calculateScoreColor(now),
                      }}
                    ></div>
                  </div>
                  <span className={styles["progress-text"]}>
                    Вопрос {questionIndex + 1} из {test.questions.length}
                  </span>
                </div>

                {test?.timer && (
                  <div className={styles["quiz-timer"]}>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>{getTimeString(remainingTime)}</span>
                  </div>
                )}
              </div>

              <div className={styles["quiz-content"]}>
                <h3 className={styles["quiz-question"]}>
                  {test.questions[questionIndex].question}
                </h3>

                <ul className={styles["quiz-answers"]}>
                  {test.questions[questionIndex].answers?.map((ans, ind) => (
                    <li
                      key={ind}
                      onClick={() => handleAnswer(ind)}
                      className={`${styles["quiz-answer"]} ${
                        ans.isChecked && !ans.displayCorrectAnswers
                          ? styles["selected"]
                          : ans.displayCorrectAnswers
                          ? ans.isCorrect
                            ? styles["correct"]
                            : styles["incorrect"]
                          : ""
                      }`}
                    >
                      <div className={styles["answer-checkbox"]}>
                        {ans.isChecked && !ans.displayCorrectAnswers && (
                          <div className={styles["checkbox-selected"]}></div>
                        )}
                        {ans.displayCorrectAnswers && ans.isCorrect && (
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13 4L6 12L3 9"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                        {ans.displayCorrectAnswers &&
                          !ans.isCorrect &&
                          ans.isChecked && (
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4 4L12 12M12 4L4 12"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                      </div>
                      <span>{ans.answer}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles["quiz-footer"]}>
                <button
                  className={styles["quiz-button"]}
                  onClick={handleGoToPreviousQuestion}
                  disabled={questionIndex === 0}
                >
                  Назад
                </button>
                <button
                  className={`${styles["quiz-button"]} ${styles["primary"]}`}
                  onClick={handleGoToNextQuestion}
                >
                  {test.questions.length - 1 === questionIndex
                    ? "Завершить"
                    : test.questions[questionIndex].answers?.some(
                        (ans) => ans["displayCorrectAnswers"]
                      )
                    ? "Далее"
                    : "Проверить"}
                </button>
              </div>
            </div>
          )}
        </div>

        {showTestResults && (
          <div className={styles["results-overlay"]}>
            <div className={styles["results-card"]}>
              <button
                className={styles["close-button"]}
                onClick={() => setShowTestResults(false)}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <div className={styles["results-content"]}>
                <div
                  className={styles["score-circle"]}
                  style={{ borderColor: calculateScoreColor(now) }}
                >
                  <span style={{ color: calculateScoreColor(now) }}>
                    {now}%
                  </span>
                </div>

                <h3 className={styles["results-title"]}>
                  {now >= 80
                    ? "Отличный результат!"
                    : now >= 50
                    ? "Хорошая работа!"
                    : "Попробуйте еще раз!"}
                </h3>

                <p className={styles["results-description"]}>
                  Вы ответили правильно на {correctAnswers} из {totalAnswers}{" "}
                  вопросов
                </p>

                <div className={styles["results-stats"]}>
                  <div className={styles["stat-item"]}>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>
                      {Math.floor(elapsedTime / 60)} мин {elapsedTime % 60} сек
                    </span>
                  </div>

                  <div className={styles["stat-item"]}>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22 16.92V19.92C22 20.47 21.55 20.92 21 20.92H19C18.45 20.92 18 20.47 18 19.92V16.92C18 16.37 18.45 15.92 19 15.92H21C21.55 15.92 22 16.37 22 16.92ZM22 9.92001V4.92001C22 4.37001 21.55 3.92001 21 3.92001H19C18.45 3.92001 18 4.37001 18 4.92001V9.92001C18 10.47 18.45 10.92 19 10.92H21C21.55 10.92 22 10.47 22 9.92001ZM10 12.92V19.92C10 20.47 9.55 20.92 9 20.92H3C2.45 20.92 2 20.47 2 19.92V12.92C2 12.37 2.45 11.92 3 11.92H9C9.55 11.92 10 12.37 10 12.92ZM22 12.92V15.92C22 16.47 21.55 16.92 21 16.92H11C10.45 16.92 10 16.47 10 15.92V12.92C10 12.37 10.45 11.92 11 11.92H21C21.55 11.92 22 12.37 22 12.92Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>{moduleInfo?.title || "Тест"}</span>
                  </div>
                </div>

                <Link to="/" className={styles["home-button"]}>
                  На главную
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    );

  return (
    <div className={styles["loading-container"]}>
      <div className={styles["loading-spinner"]}></div>
      <p>Загрузка теста...</p>
    </div>
  );
};

export default QuizPage;

import styles from "./QuizPage.module.css";
import ProgressBar from "react-bootstrap/ProgressBar";

import { Link, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { EducationContext } from "../../context/EducationContext";

const QuizPage = () => {
    const { updateUserStatistics, userStatistics } = useContext(AuthContext);
    const { test, setTest } = useContext(EducationContext);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const topicName = queryParams.get("topic");

    const [questionIndex, setQuestionIndex] = useState(0);
    const [now, setNow] = useState(0);
    const [showTestResults, setShowTestResults] = useState(false);

    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [totalAnswers, setTotalAnswers] = useState(0);
    const [elapsedTime, setElapsedTime] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setElapsedTime(prevTime => prevTime + 1);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        setNow(Math.round((correctAnswers / totalAnswers) * 100));
        // setNow(Math.round(((questionIndex + 1) / test["questions"].length) * 100));
    }, [correctAnswers, totalAnswers]);

    const handleGoToPreviousQuestion = () => {
        if (questionIndex === 0) return;
        setQuestionIndex(p => p - 1);
    };

    const handleGoToNextQuestion = () => {
        const move = test?.questions[questionIndex].answers?.some(ans => ans["displayCorrectAnswers"]);
        setTest(test => {
            const p = { ...test };
            p.questions[questionIndex].answers?.forEach((questions) => {
                if (questions.isCorrect) {
                    questions["displayCorrectAnswers"] = true;
                } else {
                    questions["displayCorrectAnswers"] = false;
                }
            });
            return p;
        });
        const isCorrectAnswer = test?.questions[questionIndex].answers?.every((ans) => (!ans.isCorrect && !ans.isChecked) || (ans.isCorrect && ans.isChecked));
        if (isCorrectAnswer && !move) {
            updateUserStatistics({ correctAnswersCount: 1 });
            setCorrectAnswers(p => p + 1);
        };
        if (test["questions"].length === questionIndex + 1) {
            updateUserStatistics({ coveredTopicsCount: 1 });
            setTotalAnswers(p => p + 1);
            return setShowTestResults(true);
        }
        if (move) return setQuestionIndex(p => p + 1);
        setTotalAnswers(p => p + 1);
        updateUserStatistics({ totalAnswersCount: 1 });
    };

    const handleAnswer = (i) => {
        // if (test["questions"].length === questionIndex + 1) return;
        const clickable = !test?.questions[questionIndex].answers?.some(ans => ans["displayCorrectAnswers"]);
        if (!clickable) return;

        const isC = !!test?.questions[questionIndex].answers[i].isChecked;
        setTest(test => {
            const p = { ...test };
            p.questions[questionIndex].answers[i].isChecked = !isC;
            return p;
        });
        console.log(test)
        // setQuestionIndex(p => p + 1);
    };

    if (test) return (
        <div className={styles["quiz-page-container"]}>
            <div className={styles["t-p-window"]}>
                <div className={styles["t-p-window-head"]}>
                    <div>
                        <h3 style={{ fontSize: "1.7rem" }}>{topicName}</h3>
                    </div>
                    <div style={{ width: "40%", height: "1.6rem" }}>
                        <ProgressBar
                            now={now}
                            label={`${now}%`}
                            style={{ height: 18, borderRadius: 10 }}
                            variant={now > 70 ? "success" : (now > 49 ? "warning" : "danger")}
                        />
                    </div>
                </div>
                <div className={styles["quiz-main-content"]}>
                    <span className={styles["question-span"]}>{test["questions"][questionIndex].question || "Подгружаем материалы..."}</span>
                    <ul className={styles["answers-block"]}>
                        {
                            test["questions"][questionIndex].answers?.map((ans, ind) => (
                                <li
                                    key={ind}
                                    onClick={() => handleAnswer(ind)}
                                    className={styles["answer-option"] + `${ans.isChecked && !ans.displayCorrectAnswers ? " " + styles["a-o-checked"] : ""}` + `${ans.displayCorrectAnswers ? " " + styles["a-o-display-correct-ans"] : ""}`}
                                >{ans.answer}</li>
                            ))
                        }
                    </ul>
                </div>
                <div className={styles["bottom-block"]}>
                    <div className={styles["t-p-window-bottom-btn"] + " no-select"} onClick={() => handleGoToPreviousQuestion()}><span>Назад</span></div>
                    <div className={styles["t-p-window-bottom-pagin"]}><span>{questionIndex + 1}/{test?.questions?.length}</span></div>
                    <div className={styles["t-p-window-bottom-btn"] + " no-select"} onClick={() => handleGoToNextQuestion()}><span>{test?.questions?.length - 1 === questionIndex ? "Завершить" : (test?.questions[questionIndex].answers?.some(ans => ans["displayCorrectAnswers"]) ? "Далее" : "Проверить")}</span></div>
                </div>
            </div>
            <img src="/photo_518863.png" alt="robot" className={styles["auth-bg-robot"]} />
            {
                showTestResults && <div className={styles["quiz-results-modal"]}>
                    <div style={{ position: "relative", height: "100%", width: "100%" }}>
                        <span style={{ position: "absolute", cursor: "pointer", right: 25, top: 10 }} onClick={() => setShowTestResults(false)}>X</span>
                    </div>
                    <div className={styles["quiz-info-wrapper"]}>
                        <div className="d-flex flex-column" style={{ gap: 15 }}>
                            <h3>Результаты теста : {correctAnswers} / {totalAnswers}</h3>
                            <ProgressBar
                                now={now}
                                label={`${now}%`}
                                style={{ height: 20, borderRadius: 10 }}
                                variant={now > 70 ? "success" : (now > 49 ? "warning" : "danger")}
                            />
                        </div>
                        <h4 style={{ fontWeight: 700, fontSize: 20, marginTop: 45 }}>Вы успешно прошли тест!</h4>
                        <div className={styles["imgg-robot-test-results"]}>
                            <img src="/photo_518862.png" alt="robot" style={{ height: "100%" }} />
                        </div>
                        <div>
                            <Link to="/" style={{ textAlign: "center", border: "1px solid", borderRadius: 15, padding: 10 }}>На главную</Link>
                        </div>
                    </div>
                </div>
            }
        </div>
    );

    return (
        <div>
            <h3>Loading...</h3>
        </div>
    );
}

export default QuizPage;
import styles from "./AdminPage.module.css";
import "react-quill/dist/quill.snow.css";

import { useContext, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import TestService from "../../services/TestService";
import ModuleService from "../../services/ModuleService";
import Spinner from "react-bootstrap/esm/Spinner";
import { EducationContext } from "../../context/EducationContext";

const AdminPage = () => {
    const { modules } = useContext(EducationContext);
    const [lessonContent, setLessonContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [lessonInfo, setLessonInfo] = useState({
        title: "",
        description: "",
        img: null,
    });
    const [displayAddAnswerModal, setDisplayAddAnswerModal] = useState(false);
    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
    const [testInfo, setTestInfo] = useState({
        moduleId: "",
        withTimer: false,
        testType: "default",
        questions: [],
    });
    const [selected, setSelected] = useState("test");

    const toolbarOptions = [
        ["bold", "italic", "underline", "strike"], // toggled buttons
        ["blockquote", "code-block"],
        ["link", "image", "video", "formula"],

        [{ "header": 1 }, { "header": 2 }], // custom button values
        [{ "list": "ordered" }, { "list": "bullet" }, { "list": "check" }],
        [{ "script": "sub" }, { "script": "super" }], // superscript/subscript
        [{ "indent": "-1" }, { "indent": "+1" }], // outdent/indent
        [{ "direction": "rtl" }], // text direction

        [{ "size": ["small", false, "large", "huge"] }], // custom dropdown
        [{ "header": [1, 2, 3, 4, 5, 6, false] }],

        [{ "color": [] }, { "background": [] }], // dropdown with defaults from theme
        [{ "font": [] }],
        [{ "align": [] }],

        ["clean"], // remove formatting button
    ];

    useEffect(() => console.log(lessonContent), [lessonContent]);

    useEffect(() => console.log(testInfo), [testInfo]);

    const createTest = async () => {
        setIsLoading(true);
        try {
            const { data } = await TestService.createTest(testInfo);
            setIsLoading(false);
            console.log(data);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const addModule = async () => {
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append("title", lessonInfo.title);
            formData.append("description", lessonInfo.description);
            formData.append("img", lessonInfo.img);
            formData.append("content", lessonContent);
            const { data } = await ModuleService.addModule(formData);
            setIsLoading(false);
            console.log(data);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const addAnswer = () => {
        const updatedQuestions = [...testInfo.questions];
        if (!updatedQuestions[selectedQuestionIndex].answers) {
            updatedQuestions[selectedQuestionIndex].answers = [];
        }
        setTestInfo(test => {
            updatedQuestions[selectedQuestionIndex].answers.push({ answer: "", isCorrect: false });
            return { ...test, questions: updatedQuestions };
        });
    };

    const removeAnswer = (answerIndex) => {
        setTestInfo(test => {
            const updatedQuestions = [...test.questions];
            updatedQuestions[selectedQuestionIndex].answers = updatedQuestions[selectedQuestionIndex].answers.filter((_, index) => index !== answerIndex);
            return { ...test, questions: updatedQuestions };
        });
    };

    return (
        <div className={styles["admin-page-container"]}>
            <div className="d-flex align-items-center justify-content-around" style={{ padding: 3, gap: 0, background: "rgba(255, 255, 255, .2)", borderRadius: 15, height: 55, width: 170 }}>
                <span className={`${styles["modify-select"]}${selected === "test" ? " " + styles["modify-select-active"] : ""}`} onClick={() => setSelected("test")}>Тест</span>
                <span className={`${styles["modify-select"]}${selected === "theory" ? " " + styles["modify-select-active"] : ""}`} onClick={() => setSelected("theory")}>Теория</span>
            </div>
            {
                selected === "theory" && <div className={styles["a-p-quill-wrapper"]}>
                    <div className="d-flex" style={{ gap: 20, padding: "20px 0" }}>
                        <input className={styles["t-inp"]} type="text" placeholder="Заголовок модуля" value={lessonInfo.title} onChange={(e) => setLessonInfo(info => ({ ...info, title: e.target.value }))} />
                        <input className={styles["t-inp"]} type="text" placeholder="Описание модуля" value={lessonInfo.description} onChange={(e) => setLessonInfo(info => ({ ...info, description: e.target.value }))} />
                        <input className={styles["t-inp"]} type="file" onChange={(e) => {
                            const file = e.target.files[0];
                            setLessonInfo(info => ({ ...info, img: file }));
                        }} />
                    </div>
                    <ReactQuill
                        theme="snow"
                        modules={{ toolbar: toolbarOptions }}
                        className="quill-editor"
                        value={lessonContent}
                        onChange={setLessonContent}
                        placeholder="Введите содержание статьи"
                    />
                    <div dangerouslySetInnerHTML={{ __html: lessonContent }} className={styles["a-p-quill-lesson-content"]} />
                </div>
            }
            {
                selected === "test" && <div className={styles["admin-test-mod-wrapper"]}>
                    <div className="d-flex flex-column" style={{ gap: 30 }}>
                        <div className="d-flex align-items-center justify-content-between" style={{ gap: 10, width: 280 }}>
                            <label>Module</label>
                            <select
                                style={{ borderRadius: 10, padding: 4, width: 191, height: 34 }}
                                value={testInfo?.moduleId}
                                onChange={(e) => setTestInfo(p => ({ ...p, moduleId: e.target.value }))}
                            >
                                <option value="" disabled>Select a module</option>
                                {
                                    modules?.map(module => (
                                        <option key={module._id} value={module._id}>
                                            {module.title}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="d-flex align-items-center justify-content-between" style={{ gap: 10, width: 280 }}>
                            <label>Timer</label>
                            <input className={styles["t-inp"]} type="text" value={testInfo?.withTimer} onChange={(e) => setTestInfo(p => ({ ...p, withTimer: e.target.value }))} />
                        </div>
                        <div className="d-flex align-items-center justify-content-between" style={{ gap: 10, width: 280 }}>
                            <label>Type</label>
                            <input className={styles["t-inp"]} type="text" value={testInfo?.testType} onChange={(e) => setTestInfo(p => ({ ...p, testType: e.target.value }))} />
                        </div>
                    </div>
                    {
                        testInfo?.questions?.length > 0 && <div className="d-flex flex-column" style={{ gap: 10, height: 350, padding: 10, overflowX: "auto", position: "relative" }}>
                            {
                                testInfo?.questions?.map((q, ind) => (
                                    <div key={ind} className="d-flex" style={{ gap: 10 }}>
                                        <input
                                            className={styles["t-inp"]}
                                            type="text"
                                            placeholder="Вопрос"
                                            value={q.question}
                                            onChange={(e) => {
                                                const updatedQuestions = [...testInfo.questions];
                                                updatedQuestions[ind].question = e.target.value;
                                                setTestInfo(test => ({ ...test, questions: updatedQuestions }));
                                            }} />
                                        <input
                                            className={styles["t-inp"]}
                                            type="text"
                                            placeholder="Подсказка"
                                            value={q.hint}
                                            onChange={(e) => {
                                                const updatedQuestions = [...testInfo.questions];
                                                updatedQuestions[ind].hint = e.target.value;
                                                setTestInfo(test => ({ ...test, questions: updatedQuestions }));
                                            }} />
                                        <span
                                            style={{ cursor: "pointer", border: "1px solid", alignItems: "center", display: "flex", borderRadius: 10, padding: 7 }}
                                            onClick={() => {
                                                setDisplayAddAnswerModal(true);
                                                setSelectedQuestionIndex(ind);
                                            }}
                                        >Добавить ответ</span>
                                        <span
                                            style={{ border: "1px solid red", color: "red", padding: 10, borderRadius: 10, cursor: "pointer" }}
                                            onClick={() => setTestInfo(p => {
                                                const newQuestions = p.questions.filter((_, index) => index !== ind);
                                                return { ...p, questions: newQuestions };
                                            })}
                                        >Удалить</span>
                                    </div>
                                ))
                            }
                            {
                                displayAddAnswerModal && <div className={styles["add-answer-modal"]}>
                                    <div className="d-flx" style={{ gap: 20, width: "100%", height: 80 }}>
                                        <span
                                            onClick={() => addAnswer()}
                                            style={{ cursor: "pointer", border: "1px solid", padding: 8, borderRadius: 10 }}
                                        >Добавить ответ</span>
                                        <span style={{ position: "absolute", border: "1px solid", padding: 6, borderRadius: 10, cursor: "pointer" }} onClick={() => setDisplayAddAnswerModal(false)}>Закрыть окно</span>
                                    </div>
                                    <div className="d-flex flex-column" style={{ gap: 10, overflowY: "auto", height: 200 }}>
                                        {
                                            testInfo?.questions[selectedQuestionIndex]?.answers?.map((ans, answerIndex) => (
                                                <div key={answerIndex} className="d-flex" style={{ gap: 10 }}>
                                                    <input
                                                        type="text"
                                                        value={ans.answer}
                                                        style={{ borderRadius: 10, border: "none", padding: "3px 7px" }}
                                                        onChange={(e) => {
                                                            setTestInfo(test => {
                                                                const updatedQuestions = [...test.questions];
                                                                updatedQuestions[selectedQuestionIndex].answers[answerIndex].answer = e.target.value;
                                                                return { ...test, questions: updatedQuestions };
                                                            });
                                                        }} />
                                                    <span
                                                        style={{ cursor: "pointer", border: "1px solid", padding: 5, borderRadius: 10 }}
                                                        onClick={() => {
                                                            const updatedQuestions = [...testInfo.questions];
                                                            const isCorrect = updatedQuestions[selectedQuestionIndex].answers[answerIndex].isCorrect;
                                                            setTestInfo(test => {
                                                                updatedQuestions[selectedQuestionIndex].answers[answerIndex].isCorrect = !isCorrect;
                                                                return { ...test, questions: updatedQuestions };
                                                            });
                                                        }}
                                                    >{ans.isCorrect ? "Верный" : "Неверный"}</span>
                                                    <span
                                                        style={{ cursor: "pointer", border: "1px solid red", color: "red", padding: 5, borderRadius: 10 }}
                                                        onClick={() => removeAnswer(answerIndex)}
                                                    >Удалить ответ</span>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            }
                        </div>
                    }
                    <div>
                        <span
                            style={{ border: "1px solid", padding: 10, borderRadius: 10, cursor: "pointer" }}
                            onClick={() => setTestInfo(test => {
                                const newQuestion = { question: "", hint: "", answers: [] };
                                return { ...test, questions: [...test.questions, newQuestion] };
                            })}
                        >Добавить вопрос</span>
                    </div>
                </div>
            }
            {
                selected === "test" && <span style={{ cursor: "pointer", border: "1px solid", padding: 8, borderRadius: 10 }} onClick={() => createTest()}>{isLoading ? <Spinner size="sm" /> : "Создать тест"}</span>
            }
            {
                selected === "theory" && <span style={{ cursor: "pointer", border: "1px solid", padding: 8, borderRadius: 10 }} onClick={() => addModule()}>{isLoading ? <Spinner size="sm" /> : "Добавить модуль"}</span>
            }
        </div>
    );
}

export default AdminPage;

// const questions = [
//     {
//         question: "Какой язык программирования используется для разработки веб-приложений?",
//         hint: "Это язык, который часто используется с HTML и CSS.",
//         answers: [
//             { answer: "JavaScript", isCorrect: true },
//             { answer: "Python", isCorrect: false }
//         ]
//     },
//     {
//         question: "Что такое MongoDB?",
//         hint: "Это NoSQL база данных.",
//         answers: [
//             { answer: "База данных", isCorrect: true },
//             { answer: "Система управления версиями", isCorrect: false }
//         ]
//     }
// ]

// moduleId, withTimer, testType
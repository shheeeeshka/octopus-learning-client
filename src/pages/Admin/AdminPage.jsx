import styles from "./AdminPage.module.css";
import "react-quill/dist/quill.snow.css";
import { useContext, useState, useEffect } from "react";
import ReactQuill from "react-quill";
import TestService from "../../services/TestService";
import ModuleService from "../../services/ModuleService";
import Spinner from "react-bootstrap/esm/Spinner";
import { EducationContext } from "../../context/EducationContext";

const AdminPage = () => {
  const { modules, fetchTest, setModules } = useContext(EducationContext);
  const [lessonContent, setLessonContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [deleteLessonId, setDeleteLessonId] = useState("");
  const [lessonInfo, setLessonInfo] = useState({
    title: "",
    description: "",
    img: null,
  });
  const [testInfo, setTestInfo] = useState({
    moduleId: "",
    timer: "",
    testType: "default",
    questions: [],
  });
  const [selected, setSelected] = useState("test");
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [showAnswerModal, setShowAnswerModal] = useState(false);
  const [newAnswer, setNewAnswer] = useState({ answer: "", isCorrect: false });

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],
    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],
    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
    ["clean"],
  ];

  const refreshModules = async () => {
    try {
      const { data } = await ModuleService.fetchModules();
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  const createTest = async () => {
    setIsLoading(true);
    try {
      await TestService.createTest(testInfo);
      setTestInfo({
        moduleId: "",
        timer: "",
        testType: "default",
        questions: [],
      });
      alert("Тест успешно создан!");
    } catch (err) {
      console.error(err);
      alert("Ошибка при создании теста");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteModule = async () => {
    setIsLoading(true);
    try {
      await ModuleService.deleteLesson(deleteLessonId);
      const updatedModules = await refreshModules();
      setModules(updatedModules);
      setDeleteLessonId("");
      alert("Модуль успешно удален!");
    } catch (err) {
      console.error(err);
      alert("Ошибка при удалении модуля");
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
      await ModuleService.addModule(formData);
      const updatedModules = await refreshModules();
      setModules(updatedModules);
      setLessonInfo({ title: "", description: "", img: null });
      setLessonContent("");
      alert("Модуль успешно добавлен!");
    } catch (err) {
      console.error(err);
      alert("Ошибка при добавлении модуля");
    } finally {
      setIsLoading(false);
    }
  };

  const addAnswer = () => {
    const updatedQuestions = [...testInfo.questions];
    if (!updatedQuestions[selectedQuestionIndex].answers) {
      updatedQuestions[selectedQuestionIndex].answers = [];
    }
    updatedQuestions[selectedQuestionIndex].answers.push(newAnswer);
    setTestInfo({ ...testInfo, questions: updatedQuestions });
    setNewAnswer({ answer: "", isCorrect: false });
    setShowAnswerModal(false);
  };

  const removeAnswer = (questionIndex, answerIndex) => {
    const updatedQuestions = [...testInfo.questions];
    updatedQuestions[questionIndex].answers.splice(answerIndex, 1);
    setTestInfo({ ...testInfo, questions: updatedQuestions });
  };

  const toggleCorrectAnswer = (questionIndex, answerIndex) => {
    const updatedQuestions = [...testInfo.questions];
    updatedQuestions[questionIndex].answers[answerIndex].isCorrect =
      !updatedQuestions[questionIndex].answers[answerIndex].isCorrect;
    setTestInfo({ ...testInfo, questions: updatedQuestions });
  };

  return (
    <div className={styles["admin-container"]}>
      <div className={styles["admin-header"]}>
        <h2>Административная панель</h2>
        <div className={styles["toggle-switch"]}>
          <button
            className={`${styles["toggle-button"]} ${
              selected === "test" ? styles["active"] : ""
            }`}
            onClick={() => setSelected("test")}
          >
            Управление тестами
          </button>
          <button
            className={`${styles["toggle-button"]} ${
              selected === "theory" ? styles["active"] : ""
            }`}
            onClick={() => setSelected("theory")}
          >
            Управление теорией
          </button>
        </div>
      </div>

      {selected === "theory" && (
        <div className={styles["theory-section"]}>
          <div className={styles["form-group"]}>
            <div className={styles["input-group"]}>
              <label>Название модуля</label>
              <input
                type="text"
                value={lessonInfo.title}
                onChange={(e) =>
                  setLessonInfo({ ...lessonInfo, title: e.target.value })
                }
                className={styles["form-input"]}
              />
            </div>

            <div className={styles["input-group"]}>
              <label>Описание модуля</label>
              <input
                type="text"
                value={lessonInfo.description}
                onChange={(e) =>
                  setLessonInfo({ ...lessonInfo, description: e.target.value })
                }
                className={styles["form-input"]}
              />
            </div>

            <div className={styles["input-group"]}>
              <label>Изображение модуля</label>
              <label className={styles["file-upload"]}>
                <span>
                  {lessonInfo.img ? lessonInfo.img.name : "Выберите файл"}
                </span>
                <input
                  type="file"
                  onChange={(e) =>
                    setLessonInfo({ ...lessonInfo, img: e.target.files[0] })
                  }
                  hidden
                />
              </label>
            </div>
          </div>

          <div className={styles["delete-section"]}>
            <div className={styles["setting-group"]}>
              <label>Удалить модуль</label>
              <div className={styles["custom-select"]}>
                <select
                  value={deleteLessonId}
                  onChange={(e) => setDeleteLessonId(e.target.value)}
                >
                  <option value="">Выберите модуль</option>
                  {modules?.map((module) => (
                    <option key={module._id} value={module._id}>
                      {module.title}
                    </option>
                  ))}
                </select>
                <span className={styles["select-arrow"]}>▼</span>
              </div>
            </div>
            <button
              onClick={deleteModule}
              className={styles["delete-button"]}
              disabled={!deleteLessonId || isLoading}
            >
              {isLoading ? <Spinner size="sm" /> : "Удалить модуль"}
            </button>
          </div>

          <ReactQuill
            theme="snow"
            modules={{ toolbar: toolbarOptions }}
            value={lessonContent}
            onChange={setLessonContent}
            placeholder="Содержание урока..."
            className={styles["quill-editor"]}
          />

          <button
            onClick={addModule}
            className={styles["submit-button"]}
            disabled={
              isLoading ||
              !lessonInfo.title ||
              !lessonInfo.description ||
              !lessonContent
            }
          >
            {isLoading ? <Spinner size="sm" /> : "Создать модуль"}
          </button>
        </div>
      )}

      {selected === "test" && (
        <div className={styles["test-section"]}>
          <div className={styles["test-settings"]}>
            <div className={styles["setting-group"]}>
              <label>Модуль</label>
              <div className={styles["custom-select"]}>
                <select
                  value={testInfo.moduleId}
                  onChange={(e) =>
                    setTestInfo({ ...testInfo, moduleId: e.target.value })
                  }
                >
                  <option value="">Выберите модуль</option>
                  {modules?.map((module) => (
                    <option key={module._id} value={module._id}>
                      {module.title}
                    </option>
                  ))}
                </select>
                <span className={styles["select-arrow"]}>▼</span>
              </div>
            </div>

            <div className={styles["setting-group"]}>
              <label>Таймер (минуты)</label>
              <input
                type="number"
                value={testInfo.timer}
                onChange={(e) =>
                  setTestInfo({ ...testInfo, timer: e.target.value })
                }
                className={styles["form-input"]}
                min="1"
              />
            </div>

            <div className={styles["setting-group"]}>
              <label>Тип теста</label>
              <div className={styles["custom-select"]}>
                <select
                  value={testInfo.testType}
                  onChange={(e) =>
                    setTestInfo({ ...testInfo, testType: e.target.value })
                  }
                >
                  <option value="default">Стандартный</option>
                  <option value="exam">Экзамен</option>
                  <option value="practice">Практика</option>
                </select>
                <span className={styles["select-arrow"]}>▼</span>
              </div>
            </div>
          </div>

          <div className={styles["questions-container"]}>
            {testInfo.questions.map((question, questionIndex) => (
              <div key={questionIndex} className={styles["question-card"]}>
                <div className={styles["question-header"]}>
                  <div className={styles["input-group"]}>
                    <label>Вопрос {questionIndex + 1}</label>
                    <input
                      type="text"
                      value={question.question}
                      onChange={(e) => {
                        const updatedQuestions = [...testInfo.questions];
                        updatedQuestions[questionIndex].question =
                          e.target.value;
                        setTestInfo({
                          ...testInfo,
                          questions: updatedQuestions,
                        });
                      }}
                      className={styles["question-input"]}
                    />
                  </div>

                  <div className={styles["input-group"]}>
                    <label>Подсказка</label>
                    <input
                      type="text"
                      value={question.hint}
                      onChange={(e) => {
                        const updatedQuestions = [...testInfo.questions];
                        updatedQuestions[questionIndex].hint = e.target.value;
                        setTestInfo({
                          ...testInfo,
                          questions: updatedQuestions,
                        });
                      }}
                      className={styles["hint-input"]}
                    />
                  </div>

                  <div className={styles["question-actions"]}>
                    <button
                      onClick={() => {
                        setSelectedQuestionIndex(questionIndex);
                        setShowAnswerModal(true);
                      }}
                      className={styles["action-button"]}
                    >
                      Добавить ответ
                    </button>
                    <button
                      onClick={() => {
                        const updatedQuestions = testInfo.questions.filter(
                          (_, index) => index !== questionIndex
                        );
                        setTestInfo({
                          ...testInfo,
                          questions: updatedQuestions,
                        });
                      }}
                      className={styles["delete-button"]}
                    >
                      Удалить вопрос
                    </button>
                  </div>
                </div>

                {question.answers?.length > 0 && (
                  <div className={styles["answers-list"]}>
                    {question.answers.map((answer, answerIndex) => (
                      <div key={answerIndex} className={styles["answer-item"]}>
                        <input
                          type="text"
                          value={answer.answer}
                          onChange={(e) => {
                            const updatedQuestions = [...testInfo.questions];
                            updatedQuestions[questionIndex].answers[
                              answerIndex
                            ].answer = e.target.value;
                            setTestInfo({
                              ...testInfo,
                              questions: updatedQuestions,
                            });
                          }}
                          className={styles["answer-input"]}
                        />
                        <button
                          onClick={() =>
                            toggleCorrectAnswer(questionIndex, answerIndex)
                          }
                          className={`${styles["correct-button"]} ${
                            answer.isCorrect ? styles["correct"] : ""
                          }`}
                        >
                          {answer.isCorrect ? "✓ Верный" : "Неверный"}
                        </button>
                        <button
                          onClick={() =>
                            removeAnswer(questionIndex, answerIndex)
                          }
                          className={styles["delete-answer-button"]}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <button
              onClick={() =>
                setTestInfo({
                  ...testInfo,
                  questions: [
                    ...testInfo.questions,
                    { question: "", hint: "", answers: [] },
                  ],
                })
              }
              className={styles["add-question-button"]}
            >
              + Добавить вопрос
            </button>
          </div>

          <button
            onClick={createTest}
            className={styles["submit-button"]}
            disabled={
              isLoading ||
              !testInfo.moduleId ||
              testInfo.questions.length === 0 ||
              testInfo.questions.some(
                (q) => !q.question || q.answers.length === 0
              )
            }
          >
            {isLoading ? <Spinner size="sm" /> : "Создать тест"}
          </button>
        </div>
      )}

      {showAnswerModal && (
        <div className={styles["modal-overlay"]}>
          <div className={styles["modal-content"]}>
            <h3>Добавить ответ</h3>
            <div className={styles["input-group"]}>
              <label>Текст ответа</label>
              <input
                type="text"
                value={newAnswer.answer}
                onChange={(e) =>
                  setNewAnswer({ ...newAnswer, answer: e.target.value })
                }
                className={styles["form-input"]}
              />
            </div>
            <div className={styles["checkbox-group"]}>
              <input
                type="checkbox"
                id="isCorrect"
                checked={newAnswer.isCorrect}
                onChange={(e) =>
                  setNewAnswer({ ...newAnswer, isCorrect: e.target.checked })
                }
              />
              <label htmlFor="isCorrect">Правильный ответ</label>
            </div>
            <div className={styles["modal-buttons"]}>
              <button
                onClick={() => setShowAnswerModal(false)}
                className={styles["cancel-button"]}
              >
                Отмена
              </button>
              <button
                onClick={addAnswer}
                className={styles["confirm-button"]}
                disabled={!newAnswer.answer}
              >
                Добавить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;

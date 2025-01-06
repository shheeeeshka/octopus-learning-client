import styles from "./AdminPage.module.css";
import "react-quill/dist/quill.snow.css";

import { useEffect, useState } from "react";
import ReactQuill from "react-quill";

const AdminPage = () => {
    const [lessonContent, setLessonContent] = useState("");

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

    return (
        <div className={styles["admin-page-container"]}>
            <div className={styles["a-p-quill-wrapper"]}>
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
        </div>
    );
}

export default AdminPage;
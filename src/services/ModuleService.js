import $api from "../http";

export default class ModuleService {
    static async fetchModules() {
        return $api.get("/lessons/all-modules");
    }

    static async addModule(moduleInfo) {
        return $api.post("/lessons/create-lesson", moduleInfo, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    }

    static async deleteLesson(lessonId = "") {
        return $api.delete(`/lessons/delete-lesson/${lessonId}`);
    }
}
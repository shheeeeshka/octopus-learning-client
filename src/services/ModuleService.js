import $api from "../http";

export default class ModuleService {
    static async fetchModules() {
        return $api.get("/lessons/all-modules");
    }
}
import $api from "../http";

export default class TestService {
    static async createTest(testInfo) {
        return $api.post("/tests/create-test", testInfo);
    }

    static async fetchTest(moduleId = "") {
        return $api.get(`/tests/find-test/${moduleId}`);
    }
}
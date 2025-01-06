import $api from "../http";

export default class AuthService {
    static async register(info) {
        return $api.post("/auth/registration", info);
    }

    static async login(info) {
        return $api.post("/auth/login", info);
    }

    static async logout() {
        return $api.post("/auth/logout");
    }

    static async refresh() {
        return $api.get("/auth/refresh");
    }
}
import $api from "../http";

export default class UserService {
    static async updateUserStatistics(info) {
        return $api.put("/users/update-user-statistics", info);
    }

    static async fetchUsers() {
        return $api.get("/users/get-users");
    }
}
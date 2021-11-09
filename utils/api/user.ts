import instance from "../../http/index"
import LoginRequest from "../../models/request/LoginRequest";
import AuthResponse from "../../models/response/AuthResponse"

export default {
    login: (user: LoginRequest) => instance.post<AuthResponse>("auth/login", {user}),
}
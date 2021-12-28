import axios from "axios";
import instance from "../../http/index"
import LoginRequest from "../../models/request/LoginRequest";
import AuthResponse from "../../models/response/AuthResponse"
import RegistrationRequest from "../../models/request/RegistrationRequest";

const baseURL = "http://localhost:5000"

export default {
    login: (user: LoginRequest) => instance.post<AuthResponse>(`${baseURL}/auth/login`, user),
    registration: (user: RegistrationRequest) => instance.post<RegistrationRequest>("auth/register", user),
    checkAuthUser: () => axios.get<AuthResponse>(`${baseURL}/auth/refresh`, {withCredentials: true})
}
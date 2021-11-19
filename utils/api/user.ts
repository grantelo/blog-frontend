import axios from "axios";
import instance from "../../http/index"
import LoginRequest from "../../models/request/LoginRequest";
import AuthResponse from "../../models/response/AuthResponse"
import RegistrationRequest from "../../models/request/RegistrationRequest";


export default {
    login: (user: LoginRequest) => axios.post<AuthResponse>("http://localhost:5000/auth/login", user),
    registration: (user: RegistrationRequest) => instance.post<RegistrationRequest>("auth/register", user)
}
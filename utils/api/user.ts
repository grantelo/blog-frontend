import axios, { AxiosInstance } from "axios";
import LoginRequest from "../../models/request/LoginRequest";
import AuthResponse from "../../models/response/AuthResponse";
import RegistrationRequest from "../../models/request/RegistrationRequest";
import { IUser } from "../../models/IUser";
import { ChangePasswordRequest } from "../../models/request/ChangePasswordRequest";

const baseURL = "http://localhost:5000";

const UserApi = (instance: AxiosInstance) => ({
  getMe: () => instance.get<IUser>("users/me"),
  login: (user: LoginRequest) =>
    instance.post<AuthResponse>(`${baseURL}/auth/login`, user),
  registration: (user: RegistrationRequest) =>
    instance.post<RegistrationRequest>("auth/register", user),
  checkAuthUser: () =>
    axios.get<AuthResponse>(`${baseURL}/auth/refresh`, {
      withCredentials: true,
    }),
  changePassword: (token: string, dto: ChangePasswordRequest) =>
    axios.post<ChangePasswordRequest>(
      `${baseURL}/auth/change-password?token=${token}`,
      dto
    ),
});

export default UserApi;

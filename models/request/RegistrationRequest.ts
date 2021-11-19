import LoginRequest from "./LoginRequest";

export default interface RegistrationRequest extends LoginRequest{
    fullName: string
}
import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:5000/",

})

instance.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`
    return config
})

instance.interceptors.response.use(config => {
    return config
}, async error => {
    const originalRequest = error.config
    if(error.response.status === 401 && !error?.config._isRetry) {
        originalRequest._isRetry = true
        try {
            const response = await axios.get("users/refresh", {withCredentials: true})
            localStorage.setItem("accessToken", response.data.accessToken)
            return instance.request(originalRequest)
        } catch (e) {
            console.log("не авторизован")
        }
    }

    throw error
})

export default instance
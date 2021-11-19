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

    if (error.response.status === 401 && !error?.config._isRetry) {
        originalRequest._isRetry = true
        const response = await axios.get("http://localhost:5000/auth/refresh", {withCredentials: true})
        localStorage.setItem("accessToken", response.data.accessToken)
        return instance.request(originalRequest)
    }

    throw error
})

export default instance
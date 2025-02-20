import axios from "axios";

export const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',

})

const Useaxiosecure = () => {
    axiosSecure.interceptors.request.use(
        function (config) {
            const token = localStorage.getItem("access-token");
            if (token) {
                config.headers.authorization = `Bearer ${token}`;
            }
            return config;
        },
        function (error) {
            return Promise.reject(error);
        }
    );

    axiosSecure.interceptors.response.use(
        function (response) {
            return response;
        },
        function (error) {
            if (error.response) {
                // Handle 401 (Unauthorized) or token expiration
                if (error.response.status === 401) {
                    console.error("Unauthorized! Redirecting to login...");
                    localStorage.removeItem("access-token");
                    window.location.href = "/login"; // Redirect to login page
                }
            }
            return Promise.reject(error);
        }
    );

    return axiosSecure;
};

export default Useaxiosecure;
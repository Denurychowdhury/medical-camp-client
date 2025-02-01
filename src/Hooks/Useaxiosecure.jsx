import axios from "axios";

export const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',

})

const Useaxiosecure = () => {
    return axiosSecure;
};

export default Useaxiosecure;
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL:( process.env.REACT_APP_BASE_URL || 'http://localhost:5000' )+ '/api',
});

axiosInstance.interceptors.response.use(
    (res) => {
        return res;
    },
    (error) =>Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;


export const fetcher = (url: string) => axiosInstance.get(url).then((res) => res.data);
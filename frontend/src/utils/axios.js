import axios from "axios";

const API_SVC = process.env.REACT_APP_API_SVC || 'http:/localhost:3000'
const TIMEOUT_WINDOW = 4000

const axiosInstance = axios.create({
    baseURL: `${API_SVC}`,
    timeout: TIMEOUT_WINDOW,
  });

export function postRequest(url, data = {}) {
    return axiosInstance.get(url, data);
}

export function getRequest(url, params = {}) {
    return axiosInstance.get(url, params);
}

export function patchRequest(url, data = {}) {
    return axiosInstance.patch(url, data);
}

export function deleteRequest(url, params = {}) {
    return axiosInstance.delete(url, params);
}
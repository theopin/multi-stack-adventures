import axios from "axios";

const API_SVC = process.env.REACT_APP_API_SVC || "http:/localhost:3000";
const TIMEOUT_WINDOW = 4000;

const axiosInstance = axios.create({
  baseURL: `${API_SVC}`,
  timeout: TIMEOUT_WINDOW,
});

const setAuthToken = (req) => {
  try {
    let accessToken = "AccessToken";
    req.headers.Authorization = `Bearer ${accessToken}`;
    return req;
  } catch (err) {
    console.error(err);
  }
};

axiosInstance.interceptors.request.use(setAuthToken);

axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    })

export function postRequest(url, data = {}) {
  return axiosInstance.post(url, data);
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

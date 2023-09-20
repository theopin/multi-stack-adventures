import axios from "axios";

const API_SVC = process.env.REACT_APP_LAMBDA_SVC;
const TIMEOUT_WINDOW = 4000;

const axiosInstance = axios.create({
  baseURL: `${API_SVC}`,
  timeout: TIMEOUT_WINDOW,
});

export function getLambdaRequest(url, params = {}) {
  return axiosInstance.get(url, params);
}

import axios, { InternalAxiosRequestConfig } from "axios";
import { camelizeKeys, decamelizeKeys } from "humps";

const apiClient = axios.create({
  baseURL: "https://novel-api.queueter.com/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  function (response) {
    if (
      response.data &&
      response.headers["content-type"] === "application/json"
    ) {
      response.data = camelizeKeys(response.data);
    }
    return response.data;
  },
  function (error) {
    const res = error.response;
    console.error("Looks like there was a problem. Status", res.status);
    return Promise.reject(error);
  }
);
// Axios middleware to convert all api requests to snake_case
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig<unknown>) => {
    const newConfig = { ...config }
    newConfig.url = `${config.url}`
    if (newConfig.headers['Content-Type'] === 'multipart/form-data')
      return newConfig
    if (config.params) {
      newConfig.params = decamelizeKeys(config.params)
    }
    if (config.data) {
      newConfig.data = decamelizeKeys(config.data)
    }
    return newConfig
  }
)
export { apiClient };

export const disabledFetch = () => {
  return new Promise<unknown>((resolve) => {
    resolve({
      status: {
        code: "200",
        message: "",
        remark: "",
      },
      data: [],
    });
  });
};

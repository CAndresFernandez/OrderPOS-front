import axios from "axios";

const myAxiosInstance = axios.create({
  baseURL: "https://orecipes-api.onrender.com/api",
  timeout: 1000,
});

export default myAxiosInstance;

import axios from "axios";

const myAxiosInstance = axios.create({
  baseURL: "http://localhost/Apo/back/projet-8-o-commande-back/public/api",
  timeout: 1000,
});

export default myAxiosInstance;

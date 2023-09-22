import axios from "axios";

const myAxiosInstance = axios.create({
  baseURL:
    "http://johann-gourmelon.vpnuser.lan/apotheose/projet-8-o-commande-back/public/api",
  timeout: 1000,
});

export default myAxiosInstance;

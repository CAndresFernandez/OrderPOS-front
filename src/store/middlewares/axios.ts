import axios from "axios";

const myAxiosInstance = axios.create({
  baseURL: "http://localhost/Apo/back/projet-8-o-commande-back/public/api",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});
// const myAxiosInstance = axios.create({
//   baseURL:
//     "http://johann-gourmelon.vpnuser.lan/apotheose/projet-8-o-commande-back/public/api/",

//   timeout: 1000,
//  headers: {
//     "Content-Type": "application/json",
//   },
// });
export default myAxiosInstance;

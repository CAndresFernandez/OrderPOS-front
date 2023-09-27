import axios from "axios";

const myAxiosLogInstance = axios.create({
  baseURL:
    "http://maxime-capette.vpnuser.lan/Apo/back/projet-8-o-commande-back/public/api",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});
// const myAxiosLogIstance = axios.create({
//   baseURL:
//     "http://johann-gourmelon.vpnuser.lan/apotheose/projet-8-o-commande-back/public/api/",

//   timeout: 1000,
//  headers: {
//     "Content-Type": "application/json",
//   },
// });
export default myAxiosLogInstance;

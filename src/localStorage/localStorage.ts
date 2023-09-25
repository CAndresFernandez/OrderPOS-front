/**
 * On stocke le JWT dans le local storage au moment ou on se connecte (dans le loginThunk)
 * En arrivant sur la page (dans un useEffect du composant principal) on dispatche une action qui check si y'a un token dans le localstorage si oui : elle l'enregistre dans le'instance axios + elle demande au reducer de faire les modifs de state
 */

export const saveJWTToLocalStorage = (jwtValue: string) => {
  localStorage.setItem("jwt", jwtValue);
};

export const getJWTFromLocalStorage = () => {
  return localStorage.getItem("jwt");
};

import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import Navbar from "./components/Navbar/Navbar";
import Tables from "./components/Tables/Tables";
import CurrentOrder from "./components/CurrentOrder/CurrentOrder";
import Orders from "./components/Orders/Orders";
import Login from "./components/Login/Login";
import "./App.scss";

function App() {
  const dispatch = useAppDispatch();
  // const token = getJWTFromLocalStorage();
  // const base64Url = token.split(".")[1]; // Obtenez la partie payload du JWT
  // const base64 = base64Url.replace("-", "+").replace("_", "/");
  // const payload = JSON.parse(atob(base64));

  // console.log(payload);

  // const userId = payload.username;
  // console.log(userId);
  const userId = useAppSelector((state) => state.user.id);
  console.log(userId);

  // const userId = useAppSelector((state) => state.user.id); // on va chercher l'id de l'utilisateur
  useEffect(() => {
    console.log(userId);
    // APRES le premier chargement de l'app on veut aller chercher les tables
    // App va dispatcher une action vers le thunk middleware qui s'occupe de l'appel API
    // dispatch(fetchTablesThunk());
    // dispatch(fetchOrdersThunk());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);
  return (
    <>
      <div className="body">
        <Routes>
          {userId ? (
            <>
              <Route path="/" element={<Tables />} />
              <Route path="/tables/30/order" element={<CurrentOrder />} />
              <Route
                path={`/users/${userId}/orders`}
                element={<Orders userId={userId} />}
              />
            </>
          ) : (
            <Route path="/login" element={<Login />} />
          )}
        </Routes>
      </div>
      {userId && <Navbar userId={userId} />}
    </>
  );
}

export default App;

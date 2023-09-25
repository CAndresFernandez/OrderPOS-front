import { Route, Routes } from "react-router-dom";
import "./App.scss";
import { useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Tables from "./components/Tables/Tables";
import CurrentOrder from "./components/CurrentOrder/CurrentOrder";
import Orders from "./components/Orders/Orders";
import { useAppDispatch } from "./hooks/redux";
import { fetchTablesThunk } from "./store/middlewares/tables";
import { fetchItemsThunk } from "./store/middlewares/items";
import Login from "./components/Login/Login";

function App() {
  const dispatch = useAppDispatch();
  const logged = false;
  useEffect(() => {
    // APRES le premier chargement de l'app on veut aller chercher les tables
    // App va dispatcher une action vers le thunk middleware qui s'occupe de l'appel API
    dispatch(fetchTablesThunk());
    dispatch(fetchItemsThunk());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {logged ? (
        <>
          <div className="body">
            <Routes>
              <Route path="/" element={<Tables />} />
              <Route path="/current-order" element={<CurrentOrder />} />
              <Route path="/orders" element={<Orders />} />
            </Routes>
          </div>
          <Navbar />
        </>
      ) : (
        // Vous pouvez ajouter ici ce que vous voulez afficher si logged est false
        <div className="body">
          <Login />
        </div>
      )}
    </>
  );
}

export default App;

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

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    // APRES le premier chargement de l'app on veut aller chercher les tables
    // App va dispatcher une action vers le thunk middleware qui s'occupe de l'appel API
    dispatch(fetchTablesThunk());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    // APRES le premier chargement de l'app on veut aller chercher les tables
    // App va dispatcher une action vers le thunk middleware qui s'occupe de l'appel API

    dispatch(fetchItemsThunk());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
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
  );
}

export default App;

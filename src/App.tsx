import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch } from "./hooks/redux";
import { fetchTablesThunk } from "./store/middlewares/tables";
import { fetchItemsThunk } from "./store/middlewares/items";
import Navbar from "./components/Navbar/Navbar";
import Tables from "./components/Tables/Tables";
import CurrentOrder from "./components/CurrentOrder/CurrentOrder";
import Orders from "./components/Orders/Orders";
import Login from "./components/Login/Login";
import "./App.scss";
import { fetchOrdersThunk } from "./store/middlewares/orders";

function App() {
  const dispatch = useAppDispatch();
  const logged = true;
  useEffect(() => {
    // APRES le premier chargement de l'app on veut aller chercher les tables
    // App va dispatcher une action vers le thunk middleware qui s'occupe de l'appel API
    dispatch(fetchTablesThunk());
    dispatch(fetchItemsThunk());
    dispatch(fetchOrdersThunk());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="body">
        <Routes>
          <Route path="/" element={<Tables />} />
          <Route path="/tables/19/order" element={<CurrentOrder />} />
          <Route path="/users/17/orders" element={<Orders />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
      {logged && <Navbar />}
    </>
  );
}

export default App;

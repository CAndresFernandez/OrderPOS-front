import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppSelector } from "./hooks/redux";
// import Navbar from "./components/Navbar/Navbar";
import Tables from "./components/Tables/Tables";
import CurrentOrder from "./components/CurrentOrder/CurrentOrder";

import Login from "./components/Login/Login";
import Logout from "./components/Login/Logout";
import "./App.scss";
import isLogged from "./store/selectors/user";

function App() {
  const tables = useAppSelector((state) => state.tables.list);
  // console.log(tables);

  const logged = useAppSelector((state) => state.user.logged);
  // console.log(userId);
  const navigate = useNavigate();

  useEffect(() => {
    if (!logged) {
      navigate("/login");
    }

    // console.log(userId);
  }, [logged, navigate]);
  return (
    <>
      <div className="body">
        <Routes>
          {logged ? (
            <>
              <Route path="/" element={<Tables />} />
              <Route
                path="/tables/:tableId/orders"
                element={<CurrentOrder />}
              />
              {/* <Route
                path={`/users/${userId}/orders`}
                element={<Orders userId={userId} />}
              /> */}
              <Route path="/logout" element={<Logout />} />
            </>
          ) : (
            <Route path="/login" element={<Login />} />
          )}
        </Routes>
      </div>
      {/* {isLogin && <Navbar userId={userId} />} */}
    </>
  );
}

export default App;

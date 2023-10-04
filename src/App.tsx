import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppSelector } from "./hooks/redux";
// import Navbar from "./components/Navbar/Navbar";
import Tables from "./components/Tables/Tables";
import CurrentOrder from "./components/CurrentOrder/CurrentOrder";

import Login from "./components/Login/Login";
import Logout from "./components/Login/Logout";
import "./App.scss";
import CollapseOrder from "./components/CollapseOrder/CollapseOrder";

function App() {
  const tables = useAppSelector((state) => state.tables.list);
  // console.log(tables);

  const logged = useAppSelector((state) => state.user.logged);
  const navigate = useNavigate();

  useEffect(() => {
    if (!logged) {
      navigate("/login");
    }

    // console.log(userId);
  }, [logged, navigate]);
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  return (
    <>
      <div className="container1">
        <Routes>
          {logged ? (
            <>
              <Route path="/" element={<Tables />} />
              <Route path="/orders/:orderId" element={<CurrentOrder />} />
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
      <CollapseOrder />
    </>
  );
}

export default App;

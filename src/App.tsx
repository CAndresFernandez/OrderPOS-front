import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppSelector } from "./hooks/redux";
import Navbar from "./components/Navbar/Navbar";
import Tables from "./components/Tables/Tables";
import CurrentOrder from "./components/CurrentOrder/CurrentOrder";
import Orders from "./components/Orders/Orders";
import Login from "./components/Login/Login";
import Logout from "./components/Login/Logout";
import "./App.scss";

function App() {
  const userId = useAppSelector((state) => state.user.id);
  console.log(userId);
  const navigate = useNavigate();
  const isLogin = useAppSelector((state) => state.user.logged);
  console.log(isLogin);

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }

    console.log(userId);
  }, [isLogin, navigate]);
  return (
    <>
      <div className="body">
        <Routes>
          {isLogin ? (
            <>
              <Route path="/" element={<Tables />} />
              <Route path="/tables/30/order" element={<CurrentOrder />} />
              <Route
                path={`/users/${userId}/orders`}
                element={<Orders userId={userId} />}
              />
              <Route path="/logout" element={<Logout />} />
            </>
          ) : (
            <Route path="/login" element={<Login />} />
          )}
        </Routes>
      </div>
      {isLogin && <Navbar userId={userId} />}
    </>
  );
}

export default App;

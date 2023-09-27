import { NavLink } from "react-router-dom";
import "./Navbar.scss";

function Navbar() {
  return (
    <section className="section">
      <nav className="btm-nav">
        <NavLink className="btm-nav-label" to="/">
          Menu
        </NavLink>
        <NavLink className="btm-nav-label" to="/tables/36/order">
          Current
        </NavLink>
        <NavLink className="btm-nav-label" to="/users/29/orders">
          Orders
        </NavLink>
      </nav>
    </section>
  );
}

export default Navbar;

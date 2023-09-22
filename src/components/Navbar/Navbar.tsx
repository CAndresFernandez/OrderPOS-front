import { NavLink } from "react-router-dom";
import './Navbar.scss';
function Navbar() {
  return (
    <nav className="btm-nav">
      <NavLink className="btm-nav-label" to="/">
        Menu
      </NavLink>
      <NavLink className="btm-nav-label" to="/current-order">
        Current
      </NavLink>
      <NavLink className="btm-nav-label" to="/orders">
        Order
      </NavLink>
    </nav >
  )
}


export default Navbar;
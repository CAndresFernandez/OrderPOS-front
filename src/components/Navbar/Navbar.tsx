import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="btm-nav">
      <NavLink className="btm-nav-label" to="/">
        Menu
      </NavLink>
      <button className="active">

        <span className="btm-nav-label">Current</span>
      </button>
      <button>

        <span className="btm-nav-label">Order</span>
      </button>
    </nav >
  )
}


export default Navbar;
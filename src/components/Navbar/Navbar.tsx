
function Navbar() {
  return (
    <div className="btm-nav">
      <button>

        <span className="btm-nav-label">Menu</span>
      </button>
      <button className="active">

        <span className="btm-nav-label">Current</span>
      </button>
      <button>

        <span className="btm-nav-label">Order</span>
      </button>
    </div>
  )
}


export default Navbar;
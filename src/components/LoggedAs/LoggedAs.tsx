import { Link } from "react-router-dom";
import "./LoggedAs.scss";

function LoggedAs() {
  return (
    <Link to="/login_check" className="logged-as">
      <p>
        Logged as: <span>John Doe</span>
      </p>
    </Link>
  );
}
export default LoggedAs;

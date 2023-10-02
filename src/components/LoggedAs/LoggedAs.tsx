import { Link } from "react-router-dom";
import "./LoggedAs.scss";
import { useAppSelector } from "../../hooks/redux";

function LoggedAs() {
  return (
    <Link to="/logout" className="logged-as">
      <p>
        Logged as: <span></span>
      </p>
    </Link>
  );
}
export default LoggedAs;

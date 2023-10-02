import { Link } from "react-router-dom";
import "./LoggedAs.scss";
import { useAppSelector } from "../../hooks/redux";

function LoggedAs() {
  return (
    <Link to="/logout">
      <p className="logged-as">
        Logged as: <span>George Abitbol</span>
      </p>
    </Link>
  );
}
export default LoggedAs;

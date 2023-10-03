import { Link } from "react-router-dom";
import "./LoggedAs.scss";
import { useAppSelector } from "../../hooks/redux";

function LoggedAs() {
  const login = useAppSelector((state) => state.user.login.username);
  console.log(login);

  return (
    <Link to="/logout">
      <p className="logged-as">
        Logged as: <span>George Abitbol</span>
      </p>
    </Link>
  );
}
export default LoggedAs;

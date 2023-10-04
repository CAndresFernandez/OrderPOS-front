import { Link } from "react-router-dom";
import "./LoggedAs.scss";
import { useAppSelector } from "../../hooks/redux";
import { getUserIdFromLocalStorage } from "../../localStorage/localStorage";

function LoggedAs() {
  const login = useAppSelector((state) => state.user.login);
  const tokenUserId = getUserIdFromLocalStorage();
  // console.log(tokenUserId);

  return (
    <Link to="/logout">
      <p className="logged-as">
        Logged as: <span>George Abitbol</span>
      </p>
    </Link>
  );
}
export default LoggedAs;

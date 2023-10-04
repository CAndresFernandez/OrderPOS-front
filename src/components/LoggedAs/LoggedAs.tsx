import { Link } from "react-router-dom";
import "./LoggedAs.scss";
import { useAppSelector } from "../../hooks/redux";
import { getUserIdFromLocalStorage } from "../../localStorage/localStorage";

function LoggedAs() {
  const currentUser = useAppSelector((state) => state.user);
  console.log(currentUser);

  return (
    <Link to="/logout">
      <p className="logged-as">
        Logged as: <span>{currentUser?.id}</span>
      </p>
    </Link>
  );
}
export default LoggedAs;

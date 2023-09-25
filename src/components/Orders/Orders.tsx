import LoggedAs from "../LoggedAs/LoggedAs";
import Order from "../Order/Order";
import "./Orders.scss";

function Orders() {
  return (
    <>
      <header>
        <LoggedAs />
        <h2>Orders</h2>
      </header>
      <ul>
        <li>
          <Order />
        </li>
        <li>
          <Order />
        </li>
        <li>
          <Order />
        </li>
        <li>
          <Order />
        </li>
        <li>
          <Order />
        </li>
      </ul>
    </>
  );
}
export default Orders;

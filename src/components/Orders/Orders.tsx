import { IOrder } from "../../@types/order";
import { useAppSelector } from "../../hooks/redux";
import LoggedAs from "../LoggedAs/LoggedAs";
import Order from "../Order/Order";
import "./Orders.scss";

function Orders() {
  const orders: IOrder[] = useAppSelector((state) => state.orders.list);
  return (
    <>
      <header>
        <LoggedAs />
        <h2>Orders</h2>
      </header>
      <ul className="orders-list">
        {orders.map((order, number) => (
          <li key={number}>
            <Order order={order} />
          </li>
        ))}
      </ul>
    </>
  );
}
export default Orders;

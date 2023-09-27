import { useEffect } from "react";
import { IOrder } from "../../@types/order";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchOrdersThunk } from "../../store/middlewares/orders";
import LoggedAs from "../LoggedAs/LoggedAs";
import Order from "../Order/Order";
import "./Orders.scss";

function Orders() {
  const dispatch = useAppDispatch();
  const orders: IOrder[] = useAppSelector((state) => state.orders.list);
  useEffect(() => {
    dispatch(fetchOrdersThunk());
  }, []);
  return (
    <>
      <header>
        <LoggedAs />
        <h2>Orders</h2>
      </header>
      <ul className="orders-list">
        {orders.map((order) => (
          <li key={order.id}>
            <Order order={order} />
          </li>
        ))}
      </ul>
    </>
  );
}
export default Orders;

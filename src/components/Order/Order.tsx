import { IOrder } from "../../@types/order";
import "./Order.scss";

function Order({ order }: IOrder[]) {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <h3 className="card-title">Order {order.id}</h3>
    </div>
  );
}

export default Order;

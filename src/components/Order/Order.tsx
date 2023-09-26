import { Link } from "react-router-dom";
import { IOrder } from "../../@types/order";
import "./Order.scss";

function Order({ order }: IOrder) {
  return (
    <Link to="/current-order">
      <div className="card w-96 bg-base-100 shadow-xl">
        <h3 className="card-title">Order {order.id}</h3>
      </div>
    </Link>
  );
}

export default Order;

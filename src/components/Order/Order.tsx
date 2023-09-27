import { Link } from "react-router-dom";
import { IOrder } from "../../@types/order";
import "./Order.scss";
import { useAppDispatch } from "../../hooks/redux";
// import { editOrderThunk } from "../../store/middlewares/orders";

function Order({ order }: { order: IOrder }) {
  // const dispatch = useAppDispatch();
  console.log(order);

  // dispatch(editOrderThunk(order.id));
  return (
    <Link to="/tables/36/order">
      <div className="order-card card w-96 bg-base-100 shadow-xl">
        <h3 className="card-title">Order {order.id}</h3>
        <p className="card-title">Table {order.relatedTable_id}</p>
        <p className="card-title">Status {order.status}</p>
      </div>
    </Link>
  );
}

export default Order;

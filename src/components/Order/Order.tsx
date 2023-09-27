import { Link } from "react-router-dom";
import { IOrder } from "../../@types/order";
import "./Order.scss";
import { useAppDispatch } from "../../hooks/redux";
import { editOrderThunk } from "../../store/middlewares/orders";

function Order({ order }: { order: IOrder }) {
  const dispatch = useAppDispatch();
  console.log(order);

  dispatch(editOrderThunk(order.id));
  return (
    <Link to={`/tables/${order.relatedTable_id}/orders`}>
      <div className="card w-96 bg-base-100 shadow-xl">
        <h3 className="card-title">Order {order.id}</h3>
        <h3 className="card-title">Table {order.relatedTable_id}</h3>
        <h3 className="card-title">Status {order.status}</h3>
      </div>
    </Link>
  );
}

export default Order;

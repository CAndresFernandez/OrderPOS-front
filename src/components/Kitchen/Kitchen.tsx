import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  changeStatusOrderThunk,
  fetchOrdersKitchenThunk,
} from "../../store/middlewares/orders";

import LoggedAs from "../LoggedAs/LoggedAs";
import "./Kitchen.scss";

function Kitchen() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOrdersKitchenThunk());
  }, [dispatch]);

  const orders = useAppSelector((state) => state.orders.list);
  console.log(orders);

  const handleStatusClick = (orderId: number, orderStatus: number) => {
    dispatch(
      changeStatusOrderThunk({
        orderId,
        orderStatus,
      })
    ).then(() => {
      // Refetch the orders after updating the status
      dispatch(fetchOrdersKitchenThunk());
    });
  };
  return (
    <>
      <header>
        <LoggedAs />
        <h2>Orders</h2>
        <button
          type="button"
          className="kitchen-NavBtnBack"
          onClick={() => navigate("/")}
        >
          Home
        </button>
      </header>
      <div className="kitchen-list">
        <ul className="kitchen-order-list">
          {orders.map((order) => (
            <li key={order.id} className="kitchen-list-li">
              <h4>Order {order.id}</h4>
              {order.orderItems?.map((item) => (
                <>
                  <div className="kitchen-list-li-div">
                    <p>{item.quantity}</p>
                    <p>{item.item.name}</p>
                  </div>

                  {item.comment && (
                    <div className="comment">{item.comment}</div>
                  )}
                </>
              ))}{" "}
              <button
                type="button"
                className="btn"
                onClick={() => handleStatusClick(order.id, order.status)}
              >
                Finish
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Kitchen;

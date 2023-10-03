import React, { useEffect, useState } from "react";
import "./CollapseOrder.scss";
import { IOrderItem } from "../../@types/order";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  addItemToCurrentOrderThunk,
  changeStatusOrderThunk,
} from "../../store/middlewares/orders";

function CollapseOrder() {
  const [isVisible, setIsVisible] = useState(false);
  const currentOrder = useAppSelector((state) => state.orders.currentOrder);
  console.log(currentOrder);
  const [localItems, setLocalItems] = useState<IOrderItem[]>([]);
  const dispatch = useAppDispatch();
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  useEffect(() => {
    if (currentOrder?.orderItems) {
      setLocalItems(currentOrder.orderItems);
    }
  }, [currentOrder]);
  // useEffect(() => {
  //   if (currentOrder) {
  //     dispatch(editOrderThunk(currentOrder.id, { orderItems: items }));
  //   }
  // }, [dispatch, items, currentOrder]);
  const handlePlusClick = (itemId: number) => {
    dispatch(
      addItemToCurrentOrderThunk({
        orderId: parseInt(orderId, 10),
        itemId,
      })
    );
  };
  const handleStatusClick = (orderId: number) => {
    if (currentOrder) {
      dispatch(
        changeStatusOrderThunk({
          orderId: parseInt(orderId, 10),
          orderStatus: currentOrder.status,
        })
      );
    }
  };
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {currentOrder && (
        <div className="collapse-container">
          <div className={`collapse ${isVisible ? "visible" : ""}`}>
            <ul className="list">
              {localItems.map((item) => (
                <li className="list-li" key={item.id}>
                  <span>{item.item.name}</span>
                  <span>{item.quantity}</span>
                  {item.comment?.length > 0 && (
                    <div className="comment">{item.comment}</div>
                  )}
                  <div className="counter">
                    <button
                      type="button"
                      className="btn"
                      onClick={() => handlePlusClick(item.id)}
                      key={item.id}
                    >
                      -
                    </button>
                    <button type="button" className="btn">
                      +
                    </button>
                    <button type="button" className="btn">
                      comm
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="btn"
              onClick={() => handleStatusClick(currentOrder.id)}
            >
              {currentOrder.status === 0 && "send"}
              {[1, 2].includes(currentOrder.status) && "modify"}
            </button>
            {currentOrder.status === 2 && <button>Pay</button>}
          </div>
          <button
            type="button"
            className="toggle-button"
            onClick={toggleVisibility}
          >
            {isVisible ? "\u25BC" : "\u25B2"}
          </button>
        </div>
      )}
    </>
  );
}
export default CollapseOrder;

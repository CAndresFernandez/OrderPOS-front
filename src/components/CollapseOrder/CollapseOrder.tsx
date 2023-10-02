import React, { useEffect, useState } from "react";
import "./CollapseOrder.scss";
import { IOrderItem } from "../../@types/order";
import { useAppSelector } from "../../hooks/redux";

function CollapseOrder() {
  const [isVisible, setIsVisible] = useState(false);
  const currentOrder = useAppSelector((state) => state.orders.currentOrder);
  const [localItems, setLocalItems] = useState<IOrderItem[]>([]);

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
                    <button type="button" className="btn">
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

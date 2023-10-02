import React, { useEffect, useMemo, useState } from "react";
import "./CollapseOrder.scss";
import { IItem, IOrderItem } from "../../@types/order";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { editOrderThunk } from "../../store/middlewares/orders";

function CollapseOrder() {
  const dispatch = useAppDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const currentOrder = useAppSelector((state) => state.orders.currentOrder);
  const [localItems, setLocalItems] = useState<IOrderItem[]>([]);
  const items: IItem[] = useMemo(() => {
    return currentOrder?.orderItems || [];
  }, [currentOrder]);
  console.log(items);

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
        <div className="container">
          <button
            type="button"
            className="toggle-button"
            onClick={toggleVisibility}
          >
            {isVisible ? "\u25BC" : "\u25B2"}
          </button>
          <div className={`collapse ${isVisible ? "visible" : ""}`}>
            <ul className="list">
              {localItems.map((item) => (
                <li key={item.id}>
                  {item.item.name}
                  {item.quantity}
                  {item.comment?.length > 0 && (
                    <span className="comment">{item.comment}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
export default CollapseOrder;

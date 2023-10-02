import React, { useState } from "react";
import "./CollapseOrder.scss";
import { IOrderItem } from "../../@types/order";
import { useAppSelector } from "../../hooks/redux";

function CollapseOrder() {
  const [isVisible, setIsVisible] = useState(false);
  const currentOrder = useAppSelector((state) => state.orders.currentOrder);
  const items: IOrderItem[] = currentOrder?.orderItems || [];
  console.log(items);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
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
            <ul>
              {items.map((item) => (
                <li key={item.id}>{item.item.name}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
export default CollapseOrder;

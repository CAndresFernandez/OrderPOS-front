import React, { useState } from "react";
import "./CollapseOrder.scss";
import { IOrder } from "../../@types/order";
import { useAppSelector } from "../../hooks/redux";

function CollapseOrder({ orderId }: { orderId: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const CurrentOrder = useAppSelector((state) => state.orders.list);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="container">
      <button
        type="button"
        className="toggle-button"
        onClick={toggleVisibility}
      >
        {isVisible ? "\u25BC" : "\u25B2"}
      </button>
      <div className={`collapse ${isVisible ? "visible" : ""}`}>
        <div>STARTERS</div>
        <h3>Order</h3>
        <div>facilis</div>
        <div>doloremque</div>
        <div>STARTERS</div>
        <div>ratione</div>
        <div>DRINK</div>
        <div>DESSERTS</div>
        <div>STARTERS</div>
        <div>MAIN COURSE</div>
        <div>DRINK</div>
        <div>DESSERTS</div>
      </div>
    </div>
  );
}

export default CollapseOrder;

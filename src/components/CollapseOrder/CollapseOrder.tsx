import React, { useState } from "react";
import "./CollapseOrder.scss";

function CollapseOrder() {
  const [isVisible, setIsVisible] = useState(false);

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
        {isVisible ? "▼" : "▲"}
      </button>
      <div className={`collapse ${isVisible ? "visible" : ""}`}>
        <div>STARTERS</div>
        <div>MAIN COURSE</div>
        <div>DESSERTS</div>
        <div>STARTERS</div>
        <div>MAIN COURSE</div>
        <div>DESSERTS</div>
        <div>STARTERS</div>
      </div>
    </div>
  );
}

export default CollapseOrder;

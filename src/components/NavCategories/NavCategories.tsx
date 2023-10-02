import React from "react";
import "./NavCategories.scss";
import { useNavigate } from "react-router-dom";

function NavCategories() {
  return (
    <div className="NavCat">
      <button type="button" className="NavBtn">
        STARTERS
      </button>
      <button type="button" className="NavBtn">
        MAIN COURSE
      </button>
      <button type="button" className="NavBtn">
        DRINKS
      </button>
      <button type="button" className="NavBtn">
        SOUPS
      </button>
    </div>
  );
}
export default NavCategories;

import React from "react";
import "./NavCategories.scss";
import { useNavigate } from "react-router-dom";

function NavCategories() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/");
  };
  return (
    <div className="NavCat">
      <button type="button" className="NavBtnBack" onClick={goBack}>
        BACK
      </button>
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

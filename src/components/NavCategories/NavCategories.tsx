import React, { useEffect } from "react";
import "./NavCategories.scss";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { ICategory } from "../../@types/order";
import { fetchCategoriesThunk } from "../../store/middlewares/categories";

function NavCategories() {
  const dispatch = useAppDispatch();
  const categories: ICategory[] = useAppSelector(
    (state) => state.categories?.list
  );
  useEffect(() => {
    // APRES le premier chargement de l'app on veut aller chercher les categories
    // App va dispatcher une action vers le thunk middleware qui s'occupe de l'appel API
    dispatch(fetchCategoriesThunk());
  }, [dispatch]);

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

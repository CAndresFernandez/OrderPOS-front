import React, { useEffect } from "react";
import "./NavCategories.scss";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { ICategory } from "../../@types/order";
import { fetchCategoriesThunk } from "../../store/middlewares/categories";

function NavCategories() {
  const dispatch = useAppDispatch();
  const categories: ICategory[] = useAppSelector(
    (state) => state.categories.list
  );
  console.log(categories);

  useEffect(() => {
    // APRES le premier chargement de l'app on veut aller chercher les categories
    // App va dispatcher une action vers le thunk middleware qui s'occupe de l'appel API
    dispatch(fetchCategoriesThunk());
  }, [dispatch]);

  return (
    <div className="NavCat">
      {categories.map((category) => (
        <NavLink
          className="NavLink"
          // to={`/categories/${category.id}`}
          key={category.id}
        >
          {category.name}
        </NavLink>
      ))}
    </div>
  );
}
export default NavCategories;

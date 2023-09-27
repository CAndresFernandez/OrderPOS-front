import { useEffect } from "react";
import CollapseOrder from "../CollapseOrder/CollapseOrder";
import Dish from "../Dish/Dish";
import LoggedAs from "../LoggedAs/LoggedAs";
import NavCategories from "../NavCategories/NavCategories";
import { IItem } from "../../@types/order";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import "./CurrentOrder.scss";
import { fetchItemsThunk } from "../../store/middlewares/items";

function CurrentOrder() {
  const items: IItem[] = useAppSelector((state) => state.items.list);
  // console.log(items);
  const dispatch = useAppDispatch();
  useEffect(() => {
    // APRES le premier chargement de l'app on veut aller chercher les tables
    // App va dispatcher une action vers le thunk middleware qui s'occupe de l'appel API
    dispatch(fetchItemsThunk());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <header>
        <LoggedAs />
        <h2>Order n 21</h2>
        <NavCategories />
      </header>
      <ul className="dish-list">
        {items.map((item) => (
          <li key={item.id}>
            <Dish dish={item} />
          </li>
        ))}
        <CollapseOrder />
      </ul>
    </>
  );
}
export default CurrentOrder;

import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CollapseOrder from "../CollapseOrder/CollapseOrder";
import Dish from "../Dish/Dish";
import LoggedAs from "../LoggedAs/LoggedAs";
import NavCategories from "../NavCategories/NavCategories";
import { IItem } from "../../@types/order";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import "./CurrentOrder.scss";
import { fetchItemsThunk } from "../../store/middlewares/items";
import { fetchOrderThunk } from "../../store/middlewares/orders";

function CurrentOrder() {
  const items: IItem[] = useAppSelector((state) => state.items.list);
  const navigate = useNavigate();
  const { orderId } = useParams();

  const currentOrder = useAppSelector((state) => state.orders.currentOrder);
  console.log(items, currentOrder);

  const dispatch = useAppDispatch();
  useEffect(() => {
    // APRES le premier chargement de l'app on veut aller chercher les tables
    // App va dispatcher une action vers le thunk middleware qui s'occupe de l'appel API
    dispatch(fetchItemsThunk());
    if (orderId) dispatch(fetchOrderThunk(parseInt(orderId, 10)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);
  return (
    <>
      <header>
        <LoggedAs />
        <h2>Order n {orderId}</h2>
        <NavCategories />
        <button
          type="button"
          className="NavBtnBack"
          onClick={() => navigate("/")}
        >
          BACK
        </button>
      </header>

      <ul className="dish-list">
        {items.map((item) => (
          <li key={item.id}>
            <Dish dish={item} />
          </li>
        ))}
      </ul>
    </>
  );
}
export default CurrentOrder;

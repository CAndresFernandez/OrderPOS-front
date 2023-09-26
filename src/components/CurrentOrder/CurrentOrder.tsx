import CollapseOrder from "../CollapseOrder/CollapseOrder";
import Dish from "../Dish/Dish";
import LoggedAs from "../LoggedAs/LoggedAs";
import NavCategories from "../NavCategories/NavCategories";
import { IItem } from "../../@types/order";
import { useAppSelector } from "../../hooks/redux";
import "./CurrentOrder.scss";

function CurrentOrder() {
  const items: IItem[] = useAppSelector((state) => state.items.list);
  // console.log(items);

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
      </ul>
      <CollapseOrder />
    </>
  );
}
export default CurrentOrder;

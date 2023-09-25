import CollapseOrder from "../CollapseOrder/CollapseOrder";
import Dish from "../Dish/Dish";
import LoggedAs from "../LoggedAs/LoggedAs";
import NavCategories from "../NavCategories/NavCategories";
import { IItem } from "../../@types/order";
import { useAppSelector } from "../../hooks/redux";

function CurrentOrder() {
  const items: IItem[] = useAppSelector((state) => state.items.list);
  console.log(items);

  return (
    <>
      <header>
        <LoggedAs />
        <h2>Order n 21</h2>
        <NavCategories />
      </header>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <Dish name={item.name} />
          </li>
        ))}
      </ul>
      <CollapseOrder />
    </>
  );
}
export default CurrentOrder;

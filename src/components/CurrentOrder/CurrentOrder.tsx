import CollapseOrder from "../CollapseOrder/CollapseOrder";
import Dish from "../Dish/Dish";
import LoggedAs from "../LoggedAs/LoggedAs";
import NavCategories from "../NavCategories/NavCategories";

function CurrentOrder() {
  return (
    <>
      <header>
        <LoggedAs />
        <h2>Order n 21</h2>
        <NavCategories />
      </header>
      <ul>
        <li>
          <Dish />
        </li>
        <li>
          <Dish />
        </li>
        <li>
          <Dish />
        </li>
        <li>
          <Dish />
        </li>
        <li>
          <Dish />
        </li>
      </ul>
      <CollapseOrder />
    </>
  );
}
export default CurrentOrder;

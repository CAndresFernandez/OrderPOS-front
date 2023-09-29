import { IItem } from "../../@types/order";

import "./Dish.scss";

function Dish({ dish }: { dish: IItem }) {
  // console.log(item.id);

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <h3 className="card-title"> {dish.name}</h3>
    </div>
  );
}

export default Dish;

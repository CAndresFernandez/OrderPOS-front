import { IOrder } from "../../@types/order";

/**
 * prend en parmaètre le tableau des recettes, le slug cherché
 * renvoie la recette correspondante au slug
 */
export default function findOrder(orders: IOrder[], orderId = 1) {
  const order = orders.find((testedTable) => {
    return testedTable.id === orderId;
  });
  return order;
}

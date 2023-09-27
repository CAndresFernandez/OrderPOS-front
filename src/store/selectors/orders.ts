import { IOrder } from "../../@types/order";

export default function findOrder(orders: IOrder[], orderId = 1) {
  const order = orders.find((testedTable) => {
    return testedTable.id === orderId;
  });
  return order;
}

import { IUser } from "./user";

export interface ITable {
  id: int;
  orderId?: int;
  number: int;
  covers: int;
  active: boolean;
  relatedOrder?: IOrder;
}
export interface IItem {
  id: int;
  category_id: int;
  name: string;
  description: string;
  active: boolean;
  category: ICategory[];
}

export interface ICategory {
  id: int;
  name: string;
  description: string;
  active: boolean;
}

export interface IOrder {
  id: int;
  relatedTable_id?: int;
  user?: IUser;
  status?: int;
  orderItems?: IItem[];
}

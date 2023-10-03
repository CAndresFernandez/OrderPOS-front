import { IUser } from "./user";

export interface ITable {
  id: int;
  number: int;
  covers: int;
  active: boolean;
  relatedOrder?: IOrder;
}
export interface IItem {
  id: int;
  category_id: int;
  name: string;
  price: number;
  description?: string;
  active: boolean;
  category: ICategory[];
}

export interface ICategory {
  id: int;
  name: string;
  description: string;
  active: boolean;
  items: IItem[];
}

export interface IOrder {
  id: int;
  relatedTable_id?: int;
  user?: IUser;
  status?: int;
  orderItems?: IOrderItem[];
}
export interface IOrderItem {
  id: number;
  item: IItem;
  name: string;
  relatedTable?: ITable;
  sent: boolean;
  quantity: number;
  comment?: string | null;
  sent: boolean;
}

interface IClosedOrder {
  id: number;
  items: string;
  paid: boolean;
  total: number;
  count: number;
  user_id: string;
}

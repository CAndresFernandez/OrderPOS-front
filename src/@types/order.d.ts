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
  orderItems?: IItem[];
}
export interface IOrderItem {
  id: number;
  item: IItem;
  name: string;
  relatedTable?: ITable;
  status?: number;
  quantity: number;
  comment?: IComment | null;
  sent: boolean;
}

interface IComment {
  id: number;
  comment: string;
  orderItem_id: number;
  quantity: number;
}
interface IClosedOrder {
  id: number;
  items: string;
  paid: boolean;
  total: number;
  count: number;
  user_id: string;
}

export interface ITable {
  id: int;
  number: int;
  covers: int;
  active: boolean;
}
export interface IItem {
  id: int;
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
  relatedTable_id: int;
  user_id: int;
  status: int;
  orderItems: IItem[];
}

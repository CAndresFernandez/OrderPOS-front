export interface ITable {
  id: int;
  number: int;
  covers: int;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface IItem {
  id: int;
  name: string;
  description: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  category: ICategory[];
}

export interface ICategory {
  id: int;
  name: string;
  description: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

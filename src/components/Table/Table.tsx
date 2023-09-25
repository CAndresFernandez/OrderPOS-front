import { ITable } from "../../@types/order";
import "./Table.scss";

function Table({ table }: ITable) {
  //console.log(table);

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <h3 className="card-title">Table {table.id}</h3>
    </div>
  );
}

export default Table;

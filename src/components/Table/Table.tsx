import { useAppSelector } from "../../hooks/redux";
import "./Table.scss";

function Table() {
  const table = useAppSelector((state) => state.table);
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <h3 className="card-title">Table</h3>
    </div>
  );
}

export default Table;

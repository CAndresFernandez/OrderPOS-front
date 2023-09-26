import { Link } from "react-router-dom";
import { ITable } from "../../@types/order";
import "./Table.scss";
import { useAppDispatch } from "../../hooks/redux";
import { addOrderThunk } from "../../store/middlewares/orders";

function Table({ table }: { table: ITable }) {
  const dispatch = useAppDispatch();

  const handleTableClick = () => {
    const newOrderData = {
      relatedTableId: table.id,
      userId: 1,
      // ...
    };
    dispatch(addOrderThunk(newOrderData));
  };

  return (
    <Link to="/current-order" onClick={handleTableClick}>
      <div className="card w-96 bg-base-100 shadow-xl">
        <h3 className="card-title">Table {table.id}</h3>
      </div>
    </Link>
  );
}

export default Table;

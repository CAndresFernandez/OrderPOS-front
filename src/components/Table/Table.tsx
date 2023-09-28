import { Link } from "react-router-dom";
import { ITable } from "../../@types/order";
import "./Table.scss";
import { useAppDispatch } from "../../hooks/redux";
import { addOrderThunk } from "../../store/middlewares/orders";

function Table({ table }: { table: ITable }) {
  const dispatch = useAppDispatch();

  const handleTableClick = () => {
    const newOrderData = {
      relatedTable_id: table.id,
      user_id: 12,
      // ...
    };
    dispatch(addOrderThunk(newOrderData));
    // console.log(newOrderData);
  };

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {table.active === true ? (
        <div className="card w-96 bg-base-100 shadow-xl">
          <h3 className="card-title">Table {table.id}</h3>
          <div>{table.covers} covers</div>
        </div>
      ) : (
        <Link to={`/tables/${table.id}/orders`} onClick={handleTableClick}>
          <div className="card w-96 bg-base-100 shadow-xl">
            <h3 className="card-title">Table {table.id}</h3>
          </div>
        </Link>
      )}
    </>
  );
}

export default Table;

import { Link } from "react-router-dom";
import { ITable } from "../../@types/order";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { addOrderThunk, fetchOrderThunk } from "../../store/middlewares/orders";
import "./Table.scss";

function Table({ table }: { table: ITable }) {
  const dispatch = useAppDispatch();
  // table = {
  //   id: 52,
  //   number: 3,
  //   covers: 3,
  //   active: false,
  //   relatedOrder: {
  //     id: 3,
  //     user: {
  //       id: 39,
  //     },
  //   },
  // };
  const userId = table.relatedOrder?.user?.id;
  const currentUser = useAppSelector((state) => state.user);
  // console.log(table);

  const isOwner = userId === currentUser.id; // Comparer l'userId de la table avec l'userId actuel
  console.log(
    isOwner,
    userId,
    currentUser.id,
    table.relatedOrder.user.lastname
  );

  const isUnowned = !userId; // Vérifier si la table n'a pas de propriétaire
  const handleTableClick = () => {
    if (isUnowned) {
      dispatch(addOrderThunk());
    } else if (isOwner) {
      dispatch(fetchOrderThunk());
    }
  };

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {!isOwner ? (
        <div className="card w-96 bg-base-100 shadow-xl">
          <h3 className="card-title">Table {table.id}</h3>
          <div>{table.covers} covers</div>
          <div>{table.relatedOrder?.user?.lastname}</div>
        </div>
      ) : (
        <Link to={`/tables/${table.id}/orders`} onClick={handleTableClick}>
          <div className="card active-link w-96 bg-base-100 shadow-xl">
            <h3 className="card-title">Table {table.id}</h3>
          </div>
        </Link>
      )}
    </>
  );
}

export default Table;

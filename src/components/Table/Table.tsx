import { Link } from "react-router-dom";
import { ITable } from "../../@types/order";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { addOrderThunk, fetchOrderThunk } from "../../store/middlewares/orders";
import "./Table.scss";

function Table({ table }: { table: ITable }) {
  const dispatch = useAppDispatch();
  const userId = table.relatedOrder?.user?.id;
  const currentUser = useAppSelector((state) => state.user);
  const isOwner = userId === currentUser.id; // Comparer l'userId de la table avec l'userId actuel
  const isUnowned = !userId; // Vérifier si la table n'a pas de propriétaire
  const statusMapping = {
    0: "In progress",
    1: "Cooking",
    2: "Waiting payment",
  };
  const statusClassMapping = {
    0: "status-in-progress",
    1: "status-cooking",
    2: "status-waiting-payment",
  };
  const handleTableClick = () => {
    if (isUnowned) {
      dispatch(addOrderThunk());
    }
  };

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {!isOwner ? (
        <div className={`card w-96 bg-base-100 shadow-xl `}>
          <h3 className="card-title">Table {table.id}</h3>
          <p>{table.relatedOrder?.user?.lastname}</p>
          <p
            className={`card-title ${
              statusClassMapping[table.relatedOrder.status] || ""
            }`}
          >
            {statusMapping[table.relatedOrder.status] || "Unknown"}
          </p>
        </div>
      ) : (
        table.relatedOrder && (
          <Link
            to={`/orders/${table.relatedOrder.id}`}
            onClick={handleTableClick}
          >
            <div
              className={`card active-link w-96 bg-base-100 shadow-xl ${
                statusClassMapping[table.relatedOrder.status] || ""
              }`}
            >
              <div className="card-title">
                <h3 className="card-title">Table {table.id}</h3>
                <p>{table.covers} covers</p>
                <p>{statusMapping[table.relatedOrder.status] || "Unknown"}</p>
              </div>
            </div>
          </Link>
        )
      )}
    </>
  );
}

export default Table;

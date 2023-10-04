import { Link, useNavigate } from "react-router-dom";
import { ITable } from "../../@types/order";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { addOrderThunk, fetchOrderThunk } from "../../store/middlewares/orders";
import "./Table.scss";

function Table({ table }: { table: ITable }) {
  const dispatch = useAppDispatch();
  let navigate = useNavigate();
  const userId = table.relatedOrder?.user?.id;
  const currentUser = useAppSelector((state) => state.user);
  const isOwner = userId === currentUser.id; // Comparer l'userId de la table avec l'userId actuel
  const isUnowned = !userId;
  // console.log(isUnowned);
  // Vérifier si la table n'a pas de propriétaire
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
  const handleTableClick = async (event) => {
    event.preventDefault();
    if (isUnowned) {
      try {
        const actionResult = await dispatch(
          addOrderThunk({ user_id: currentUser.id, relatedTable_id: table.id })
        );
        const createdOrder = actionResult.payload;
        const createdOrderId = createdOrder.id;
        console.log("Created order ID:", createdOrderId);
        // Navigate to the created order's page
        navigate(`/orders/${createdOrderId}`);
      } catch (error) {
        console.error("Failed to create order:", error);
      }
    } else if (isOwner) {
      // If there's already an order, navigate to its page
      navigate(`/orders/${table.relatedOrder?.id}`);
    }
  };

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {isOwner || isUnowned ? (
        <Link
          to={`/orders/${table.relatedOrder?.id}`}
          onClick={handleTableClick}
        >
          <div
            className={`card active-link w-96 bg-base-100 shadow-xl ${
              statusClassMapping[table.relatedOrder?.status] || "freeTable"
            }`}
          >
            <div className="card-title">
              <h3 className="card-title">Table {table.number}</h3>
              <p>{table.covers} covers</p>
              <p>Order {table.relatedOrder?.id}</p>
              <p>{statusMapping[table.relatedOrder?.status] || "Free"}</p>
            </div>
          </div>
        </Link>
      ) : (
        <div className="card w-96 bg-base-100 shadow-xl">
          <h3 className="card-title">Table {table.number}</h3>
          <div>{table.covers} covers</div>
          <div>{table.relatedOrder?.user?.lastname}</div>
        </div>
      )}
    </>
  );
}

export default Table;

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  changeStatusOrderThunk,
  fetchOrdersKitchenThunk,
} from "../../store/middlewares/orders";

import LoggedAs from "../LoggedAs/LoggedAs";
import "./Kitchen.scss";

// Définition de la fonction Kitchen.
function Kitchen() {
  // Utilisation du hook navigate pour la navigation.
  const navigate = useNavigate();

  // Utilisation du hook dispatch pour envoyer des actions à Redux.
  const dispatch = useAppDispatch();

  // Utilisation du hook useEffect pour exécuter du code après le rendu du composant.
  useEffect(() => {
    // Envoi d'une action pour récupérer les commandes destinées à la cuisine.
    dispatch(fetchOrdersKitchenThunk());
  }, [dispatch]);

  // Utilisation du sélecteur Redux pour obtenir la liste des commandes.
  const orders = useAppSelector((state) => state.orders.list);
  console.log(orders);
  const currentOrder = useAppSelector((state) => state.orders.currentOrder);
  const hasSomeItems = currentOrder?.orderItems?.some((orderItem) => orderItem);
  // Définition de la fonction handleStatusClick qui sera appelée pour changer le statut d'une commande.
  const handleStatusClick = (orderId: number, orderStatus: number) => {
    // Envoi d'une action pour changer le statut de la commande.
    dispatch(
      changeStatusOrderThunk({
        orderId,
        orderStatus,
      })
    ).then(() => {
      // Récupération des commandes après la mise à jour du statut.
      dispatch(fetchOrdersKitchenThunk());
    });
  };

  return (
    <>
      <header>
        <LoggedAs />
        <h2>Orders</h2>
        <button
          type="button"
          className="kitchen-NavBtnBack"
          onClick={() => navigate("/")}
        >
          Home
        </button>
      </header>
      <div className="kitchen-list">
        <ul className="kitchen-order-list">
          {orders.map((order) => (
            <li key={order.id} className="kitchen-list-li">
              <h4>Order {order.id}</h4>
              {order.orderItems?.map((item) => (
                <>
                  <div
                    className={`kitchen-list-li-div ${
                      item.sent ? "item-sent" : ""
                    }`}
                  >
                    <p>{item.quantity}</p>
                    <p>{item.item.name}</p>
                  </div>

                  {item.comment && (
                    <div className="comment">{item.comment}</div>
                  )}
                </>
              ))}

              <button
                type="button"
                className="btn"
                onClick={() => handleStatusClick(order.id, order.status)}
              >
                {hasSomeItems && "send"}
                {!hasSomeItems && "cancel"}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Kitchen;

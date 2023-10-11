import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { IOrderItem } from "../../@types/order";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

import {
  changeStatusOrderThunk,
  deleteOrderThunk,
  editCommOrderThunk,
  minusItemToCurrentOrderThunk,
  plusItemToCurrentOrderThunk,
} from "../../store/middlewares/orders";

import "./CollapseOrder.scss";
import { IUser } from "../../@types/user";

function CollapseOrder() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const [isVisible, setIsVisible] = useState(false);
  const currentOrder = useAppSelector((state) => state.orders.currentOrder);
  console.log(currentOrder);
  const currentUser: IUser = useAppSelector((state) => state.user);
  console.log(currentUser);

  const isOnCurrentOrderPage =
    location.pathname === `/orders/${currentOrder?.id}`;
  const [comment, setComment] = useState("");
  const [modalItemId, setModalItemId] = useState<number | null>(null);
  const [localItems, setLocalItems] = useState<IOrderItem[]>([]);
  const emoji = "\ud83d\udd89";
  const hasSomeUnsentItems =
    Array.isArray(currentOrder?.orderItems) &&
    currentOrder?.orderItems?.some((orderItem) => !orderItem.sent);
  // const hasSomeSentItems = currentOrder?.orderItems?.some(
  //   (orderItem) => orderItem.sent
  // );
  // const hasSomeItems = currentOrder?.orderItems?.some((orderItem) => orderItem);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    if (currentOrder?.orderItems) {
      setLocalItems(currentOrder.orderItems);
    }
  }, [currentOrder?.orderItems, currentOrder?.status]);

  const handleOpenModal = (itemId: number) => {
    const itemComment =
      localItems.find((item) => item.id === itemId)?.comment || "";
    setComment(itemComment);
    setModalItemId(itemId);
  };

  const handleCloseModal = () => {
    setModalItemId(null);
  };

  // Utilisation de `useCallback` pour mémoriser la fonction et éviter des re-rendus inutiles.
  // Cette fonction est appelée lorsque l'utilisateur clique sur le bouton "moins" pour un article.
  const handleMinusClick = useCallback(
    (itemId: number) => {
      // Vérifie si une commande actuelle existe.
      if (currentOrder) {
        // Si oui, déclenche l'action pour soustraire un article de la commande actuelle.
        // L'action prend l'ID de la commande actuelle et l'ID de l'article comme arguments.
        dispatch(
          minusItemToCurrentOrderThunk({ orderId: currentOrder.id, itemId })
        );
      }
    },
    // Les dépendances de `useCallback` sont `currentOrder` et `dispatch`.
    // Cela signifie que la fonction sera mémorisée tant que `currentOrder` et `dispatch` ne changent pas.
    [currentOrder, dispatch]
  );

  // Utilisation de `useCallback` pour mémoriser la fonction et éviter des re-rendus inutiles.
  // Cette fonction est appelée lorsque l'utilisateur clique sur le bouton "plus" pour un article.

  const handlePlusClick = useCallback(
    (itemId: number) => {
      // Vérifie si une commande actuelle existe.
      if (currentOrder) {
        // Si oui, déclenche l'action pour ajouter un article à la commande actuelle.
        // L'action prend l'ID de la commande actuelle et l'ID de l'article comme arguments.
        dispatch(
          plusItemToCurrentOrderThunk({ orderId: currentOrder.id, itemId })
        );
      }
    },
    // Les dépendances de `useCallback` sont `currentOrder` et `dispatch`.
    // Cela signifie que la fonction sera mémorisée tant que `currentOrder` et `dispatch` ne changent pas.
    [currentOrder, dispatch]
  );
  // Fonction pour gérer le changement de statut de la commande.
  const handleStatusClick = (orderId: number) => {
    if (currentOrder) {
      dispatch(changeStatusOrderThunk({ orderId }));
      toggleVisibility();
      navigate("/");
    }
  };
  // Fonction pour soumettre le commentaire d'un article.
  const handleSubmit = () => {
    if (currentOrder && modalItemId !== null) {
      dispatch(
        editCommOrderThunk({
          orderId: currentOrder.id,
          itemId: modalItemId,
          comment,
        })
      );
      handleCloseModal();
    }
  };
  // Fonction pour gérer le clic sur le bouton de paiement.
  const handleCheckoutClick = () => {
    if (currentOrder) {
      setLocalItems([]);
      dispatch(deleteOrderThunk(currentOrder.id));
      toggleVisibility();
      navigate("/");
    }
  };
  // Fonction pour ajuster la hauteur du textarea en fonction de son contenu.
  const adjustTextareaHeight = (event) => {
    const textarea = event.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {currentOrder && (
        <div className="collapse-container">
          <div className={`collapse ${isVisible ? "visible" : ""}`}>
            <h5>Order {currentOrder.id}</h5>
            <h5>Table {currentOrder.relatedTable?.number}</h5>
            <button
              type="button"
              className="btn"
              onClick={() => navigate(`/orders/${currentOrder.id}`)}
            >
              View Order Details
            </button>
            <ul className="list">
              <li className="list-titles">
                <h4>Name</h4>
                <h4>Quantity</h4>
                <h4>Comment</h4>
              </li>
              {localItems &&
                localItems.map((item) => (
                  <li className="list-li" key={item.id}>
                    <div
                      className={`list-li-div ${item.sent ? "item-sent" : ""}`}
                    >
                      {item.item.name}
                    </div>
                    <div className="list-li-div">{item.quantity}</div>
                    {isOnCurrentOrderPage && (
                      <div className="counter list-li-div">
                        <button
                          type="button"
                          className={`btn minusPlusBtn ${
                            item.sent ? "notclickable" : ""
                          }`}
                          onClick={() => handleMinusClick(item.id)}
                          key={`minus-${item.id}`}
                        >
                          -
                        </button>
                        <button
                          type="button"
                          className={`btn minusPlusBtn ${
                            item.sent ? "notclickable" : ""
                          }`}
                          onClick={() => handlePlusClick(item.id)}
                          key={`plus-${item.id}`}
                        >
                          +
                        </button>
                        <button
                          onClick={() => handleOpenModal(item.id)}
                          type="button"
                          className={`btn ${item.sent ? "notclickable" : ""}`}
                          key={`comm-${item.id}`}
                        >
                          {emoji}
                        </button>
                        {modalItemId === item.id && (
                          <div className="modal">
                            <div className="modal-content">
                              <h2>Add Comment</h2>
                              <textarea
                                value={comment}
                                onChange={(e) => {
                                  setComment(e.target.value);
                                  adjustTextareaHeight(e);
                                }}
                                onInput={adjustTextareaHeight}
                                placeholder="Write your comment here..."
                              />
                              <button
                                type="button"
                                className="btn"
                                onClick={handleSubmit}
                              >
                                Submit
                              </button>
                              <button
                                type="button"
                                className="btn"
                                onClick={handleCloseModal}
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </li>
                ))}
              {currentOrder.status !== 1 && hasSomeUnsentItems ? (
                <button
                  type="button"
                  className="btn"
                  onClick={() => handleStatusClick(currentOrder.id)}
                >
                  {currentOrder.status === 0 && "send"}
                  {currentOrder.status === 2 && "edit"}
                </button>
              ) : (
                currentOrder.status === 2 && (
                  <button
                    type="button"
                    className={`btn ${
                      hasSomeUnsentItems ? "notclickable" : ""
                    }`}
                    onClick={
                      !hasSomeUnsentItems ? handleCheckoutClick : undefined
                    }
                  >
                    checkout
                  </button>
                )
              )}
            </ul>
          </div>
          <button
            type="button"
            className="toggle-button"
            onClick={toggleVisibility}
          >
            {isVisible ? "\u25BC" : "\u25B2"}
          </button>
        </div>
      )}
    </>
  );
}

export default CollapseOrder;

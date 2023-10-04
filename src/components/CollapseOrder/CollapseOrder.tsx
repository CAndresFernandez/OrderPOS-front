import React, { useEffect, useState } from "react";
import "./CollapseOrder.scss";
import { IOrderItem } from "../../@types/order";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  addItemToCurrentOrderThunk,
  changeStatusOrderThunk,
  deleteOrderThunk,
  editCommOrderThunk,
  minusItemToCurrentOrderThunk,
  plusItemToCurrentOrderThunk,
} from "../../store/middlewares/orders";
import ModalCom from "./ModalCom";

function CollapseOrder() {
  const [isVisible, setIsVisible] = useState(false);
  const currentOrder = useAppSelector((state) => state.orders.currentOrder);
  const [comment, setComment] = useState("");
  const [modalItemId, setModalItemId] = useState<number | null>(null);
  console.log(currentOrder);
  const [localItems, setLocalItems] = useState<IOrderItem[]>([]);
  const emoji = "\ud83d\udd89";
  const dispatch = useAppDispatch();
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  useEffect(() => {
    if (currentOrder?.orderItems) {
      setLocalItems(currentOrder.orderItems);
    }
  }, [currentOrder]);

  const handleMinusClick = (itemId: number) => {
    dispatch(
      minusItemToCurrentOrderThunk({
        orderId: currentOrder.id,
        itemId,
      })
    );
  };
  const handlePlusClick = (itemId: number) => {
    dispatch(
      plusItemToCurrentOrderThunk({
        orderId: currentOrder.id,
        itemId,
      })
    );
  };
  const handleStatusClick = (orderId: number) => {
    if (currentOrder) {
      dispatch(
        changeStatusOrderThunk({
          orderId: parseInt(orderId, 10),
          orderStatus: currentOrder.status,
        })
      );
    }
  };
  const handleOpenModal = (itemId: number) => {
    const itemComment =
      localItems.find((item) => item.id === itemId)?.comment || "";
    setComment(itemComment);
    setModalItemId(itemId);
  };
  const handleCloseModal = () => {
    setModalItemId(null);
  };

  const handleSubmit = () => {
    // onAddComment(comment);

    dispatch(
      editCommOrderThunk({
        orderId: currentOrder.id,
        itemId: modalItemId,
        comment: comment,
      })
    );
    handleCloseModal();
  };

  const handleCheckoutClick = () => {
    dispatch(deleteOrderThunk(currentOrder.id));
  };

  const adjustTextareaHeight = (event) => {
    const textarea = event.target;
    textarea.style.height = "auto"; // Réinitialise la hauteur
    textarea.style.height = `${textarea.scrollHeight}px`; // Ajuste la hauteur en fonction du contenu
  };
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {currentOrder && (
        <div className="collapse-container">
          <div className={`collapse ${isVisible ? "visible" : ""}`}>
            <ul className="list">
              <li className="list-titles">
                <h4>Name</h4>
                <h4>Quantity</h4>
                <h4>Comment</h4>
              </li>
              {localItems.map((item) => (
                <li className="list-li" key={item.id}>
                  <div className="list-li-div">{item.item.name}</div>
                  <div className="list-li-div">{item.quantity}</div>
                  <div className="counter list-li-div">
                    <button
                      type="button"
                      className="btn minusPlusBtn"
                      onClick={() => handleMinusClick(item.id)}
                      key={`minus-${item.id}`} // Unique key for the minus button
                    >
                      -
                    </button>
                    <button
                      type="button"
                      className="btn minusPlusBtn"
                      onClick={() => handlePlusClick(item.id)}
                      key={`plus-${item.id}`} // Unique key for the plus button
                    >
                      +
                    </button>
                    <button
                      onClick={() => handleOpenModal(item.id)}
                      type="button"
                      className="btn"
                      key={`comm-${item.id}`} // Unique key for the comm button
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
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="btn"
              onClick={() => handleStatusClick(currentOrder.id)}
            >
              {currentOrder.status === 0 && "send"}
              {[1, 2].includes(currentOrder.status) && "modify"}
            </button>
            {currentOrder.status === 2 && (
              <button
                type="button"
                className="btn"
                onClick={handleCheckoutClick}
              >
                checkout
              </button>
            )}
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

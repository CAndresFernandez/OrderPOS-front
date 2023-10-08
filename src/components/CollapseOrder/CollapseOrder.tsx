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

function CollapseOrder() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const [isVisible, setIsVisible] = useState(false);
  const currentOrder = useAppSelector((state) => state.orders.currentOrder);
  const isOnCurrentOrderPage =
    location.pathname === `/orders/${currentOrder?.id}`;
  const [comment, setComment] = useState("");
  const [modalItemId, setModalItemId] = useState<number | null>(null);
  const currentOrderItems = useAppSelector(
    (state) => state.orders.currentOrder?.orderItems
  );
  const [localItems, setLocalItems] = useState<IOrderItem[]>([]);
  const emoji = "\ud83d\udd89";
  const hasSomeUnsentItems = currentOrder?.orderItems?.some(
    (orderItem) => !orderItem.sent
  );
  const hasSomeSentItems = currentOrder?.orderItems?.some(
    (orderItem) => orderItem.sent
  );
  const hasSomeItems = currentOrder?.orderItems?.some((orderItem) => orderItem);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    if (currentOrder?.orderItems) {
      setLocalItems(currentOrder.orderItems);
    }
  }, [currentOrder?.orderItems, currentOrder?.status]);

  const handleMinusClick = useCallback(
    (itemId: number) => {
      if (currentOrder) {
        dispatch(
          minusItemToCurrentOrderThunk({ orderId: currentOrder.id, itemId })
        );
      }
    },
    [currentOrder, dispatch]
  );

  const handlePlusClick = useCallback(
    (itemId: number) => {
      if (currentOrder) {
        dispatch(
          plusItemToCurrentOrderThunk({ orderId: currentOrder.id, itemId })
        );
      }
    },
    [currentOrder, dispatch]
  );

  const handleStatusClick = (orderId: number) => {
    if (currentOrder) {
      dispatch(changeStatusOrderThunk({ orderId }));
      toggleVisibility();
      navigate("/");
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

  const handleCheckoutClick = () => {
    if (currentOrder) {
      setLocalItems([]);
      dispatch(deleteOrderThunk(currentOrder.id));
      toggleVisibility();
      navigate("/");
    }
  };

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
            <h4>Order {currentOrder.id}</h4>
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
              {localItems.map((item) => (
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
              {currentOrder.status !== 1 && hasSomeUnsentItems && (
                <button
                  type="button"
                  className="btn"
                  onClick={() => handleStatusClick(currentOrder.id)}
                >
                  {currentOrder.status === 0 && "send"}
                  {currentOrder.status === 2 && "edit"}
                </button>
              )}
              {currentOrder.status === 2 && (
                <button
                  type="button"
                  className={`btn ${hasSomeUnsentItems ? "notclickable" : ""}`}
                  onClick={
                    !hasSomeUnsentItems ? handleCheckoutClick : undefined
                  }
                >
                  checkout
                </button>
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

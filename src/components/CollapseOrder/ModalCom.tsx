import { useState } from "react";
import { IItem } from "../../@types/order";

interface ModalComProps {
  itemId: number | null;
  closeModal: () => void;
}

export default function ModalCom({ itemId, closeModal }: ModalComProps) {
  const [comment, setComment] = useState("");

  const handleCloseModal = () => {
    closeModal();
  };

  if (itemId === null) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add Comment</h2>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your comment here..."
        />
        <button type="button" className="btn" onClick={handleSubmit}>
          Submit
        </button>
        <button type="button" className="btn" onClick={handleCloseModal}>
          Close
        </button>
      </div>
    </div>
  );
}

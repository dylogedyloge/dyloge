import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const DeleteConfirmationModal = ({ onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleDelete = () => {
    onDelete();
    closeModal();
  };

  return (
    <div>
      <div className="tooltip tooltip-left capitalize" data-tip="delete">
        <button className="btn " onClick={openModal}>
          <FontAwesomeIcon icon={faTrash} color="#F87272" />
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="modal modal-open">
            <div className="modal-box">
              <p>Are you sure you want to delete this item?</p>
              <div className="modal-action">
                <button
                  className="btn btn-error capitalize"
                  onClick={handleDelete}
                >
                  Delete
                </button>
                <button className="btn capitalize" onClick={closeModal}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
          <div className="modal-backdrop"></div>
        </div>
      )}
    </div>
  );
};

export default DeleteConfirmationModal;

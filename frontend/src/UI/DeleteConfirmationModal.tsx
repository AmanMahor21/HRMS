import "../assets/css/modal.css"; // Create and add styling for the modal.
import { useAppContext } from "../context/AppContext";
import { deleteUser } from "../core/_request";
import { responseHandler } from "../utils/_function";
import Button from "./Button";

const DeleteConfirmationModal = () => {
  const { modalState, activeItem, setModalState, setListings, setLoader } =
    useAppContext();
  const isOpen = modalState?.status === "delete" ? true : false;
  if (!isOpen) return null;

  // HANDLE DELETE
  const handleDelete = async () => {
    setLoader(true);
    const { id } = modalState?.data || {};
    const response = await deleteUser(id);
    responseHandler(response, setModalState, setListings, activeItem, setLoader);
  };

  return (
    <div className="modal-overlay">
      <div className="form-modal">
        <div className="modal-header">
          <h3>Confirm Deletion</h3>
          <button
            className="close-btn"
            onClick={() => setModalState({ status: false, data: undefined })}
          >
            ×
          </button>
        </div>
        <div className="modal-body-delete">
          <p>Are you sure you want to delete this item?</p>
        </div>
        <div className="modal-footer">
          <Button
            className="add-btn"
            onClick={() => setModalState({ status: false, data: undefined })}
          >
            Cancel
          </Button>
          <Button className="add-btn" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;

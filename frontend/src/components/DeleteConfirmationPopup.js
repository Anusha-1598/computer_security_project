import React from "react";
import { useDispatch } from "react-redux";
import { deleteDocument } from "../redux/documentsSlice";
import "./Popup.css";

const DeleteConfirmationPopup = ({ fileId, fileName, onClose }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteDocument(fileId));
    onClose();
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Delete Document</h2>
        <p>Are you sure you want to delete {fileName}?</p>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default DeleteConfirmationPopup;

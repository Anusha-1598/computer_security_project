import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateDocumentName } from "../redux/documentsSlice";
import "./Popup.css";

const RenamePopup = ({ fileId, fileName, onClose }) => {
  const [newName, setNewName] = useState(fileName);
  const dispatch = useDispatch();

  const handleRename = () => {
    dispatch(updateDocumentName({ fileId, newName }));
    onClose();
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Rename Document</h2>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <button onClick={handleRename}>Rename</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default RenamePopup;

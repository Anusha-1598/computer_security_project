import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDocumentName } from "../redux/documentsSlice";
import "./Popup.css";

const RenamePopup = ({ fileId, fileName, onClose }) => {
  const currentUser = useSelector((state) => state.login.loginUser);
  const [newName, setNewName] = useState(fileName);
  const dispatch = useDispatch();

  const handleRename = () => {
    fetch("http://127.0.0.1:3658/m1/593636-0-default/renameDocument", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ userId: currentUser, fileId: fileId }),
    })
      .then((res) => {
        if (res.status === 200) {
          res.json().then((res) => {
            dispatch(updateDocumentName({ fileId, newName }));
          });
        } else {
          alert(res.message);
        }
        onClose();
      })
      .catch((err) => {
        alert("Failed to rename document due to : \n" + err.message);
      });
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
        {newName.length === 0 ? (
          <p className="error">File name not be Empty</p>
        ) : (
          <></>
        )}
        <button onClick={handleRename}>Rename</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default RenamePopup;

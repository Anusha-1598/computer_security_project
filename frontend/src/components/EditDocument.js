import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateDocumentContent } from "../redux/documentsSlice";
import "./EditDocument.css";
import { setLoginUser } from "../redux/loginSlice";

const EditDocument = () => {
  const currentUser = useSelector((state) => state.login.loginUser);
  const currentDocument = useSelector(
    (state) => state.documents.currentDocument
  );
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [acknowledgment, setAcknowledgment] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:3658/m1/593636-0-default/verifySession", {
      method: "POST",
    })
      .then((res) => {
        if (res.status === 200) {
          res.json().then((res) => {
            dispatch(setLoginUser(res.userId));
            if (currentDocument) {
              fetch(
                "http://127.0.0.1:3658/m1/593636-0-default/getDocumentContent",
                {
                  method: "POST",
                  credentials: "include",
                  headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                  },
                  body: JSON.stringify({
                    userId: currentUser,
                    fileId: currentDocument.fileId,
                  }),
                }
              )
                .then((res) => {
                  if (res.status === 200) {
                    res.json().then((res) => {
                      setContent(res.fileContent);
                    });
                  }
                })
                .catch((err) => {
                  alert(
                    "Failed to ftech the document content due to : \n",
                    err.message
                  );
                });
            }
          });
        } else {
          let goToLogin = () => dispatch("/login");
          goToLogin();
          dispatch(setLoginUser(""));
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  if (!currentDocument) {
    return <div>No document selected</div>;
  }

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSave = () => {
    dispatch(
      updateDocumentContent({
        fileId: currentDocument.fileId,
        newContent: content,
      })
    );
    setAcknowledgment("Document content saved successfully!");
    setTimeout(() => setAcknowledgment(""), 3000);
  };

  return (
    <div className="edit-document">
      <div className="document-info">
        <h2>Document Editor</h2>
        <p>
          <strong>File Name:</strong> {currentDocument.fileName}
        </p>
        <p>
          <strong>File ID:</strong> {currentDocument.fileId}
        </p>
        {currentDocument.ownerName && (
          <p>
            <strong>Owner:</strong> {currentDocument.ownerName}
          </p>
        )}
        {currentDocument.sharedUsers && (
          <div>
            <strong>Shared With:</strong>
            <ul>
              {currentDocument.sharedUsers.map((user, index) => (
                <li key={index}>
                  {user.userId} - {user.permissions.join(", ")}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="editor">
        <textarea
          className="editor-textarea"
          placeholder="Start writing your document here..."
          value={content}
          onChange={handleContentChange}
        ></textarea>
      </div>
      <div className="editor-actions">
        <button className="save-button" onClick={handleSave}>
          Save
        </button>
      </div>
      {acknowledgment && <div className="acknowledgment">{acknowledgment}</div>}
    </div>
  );
};

export default EditDocument;

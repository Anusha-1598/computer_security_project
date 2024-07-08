import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateDocumentContent } from "../redux/documentsSlice";
import "./EditDocument.css";

const EditDocument = () => {
  const currentDocument = useSelector(
    (state) => state.documents.currentDocument
  );
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [acknowledgment, setAcknowledgment] = useState("");

  useEffect(() => {
    if (currentDocument) {
      setContent(currentDocument.content);
    }
  }, [currentDocument]);

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

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./EditDocument.css";

const EditDocument = () => {
  const currentDocument = useSelector(
    (state) => state.documents.currentDocument
  );
  const [content, setContent] = useState("");

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
    // Implement save logic here
    console.log("Document saved:", content);
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
    </div>
  );
};

export default EditDocument;

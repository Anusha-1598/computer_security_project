import React from "react";
import { useSelector } from "react-redux";
import "./ViewDocument.css";

const ViewDocument = () => {
  const currentDocument = useSelector(
    (state) => state.documents.currentDocument
  );

  if (!currentDocument) {
    return <div>No document selected</div>;
  }

  return (
    <div className="view-document">
      <div className="document-info">
        <h2>Document Viewer</h2>
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
      <div className="viewer">
        <textarea
          className="viewer-textarea"
          value={currentDocument.content}
          readOnly
        ></textarea>
      </div>
    </div>
  );
};

export default ViewDocument;

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./ViewDocument.css";

const ViewDocument = () => {
  const currentUser = useSelector((state) => state.login.loginUser);
  const [content, setContent] = useState("");
  const currentDocument = useSelector(
    (state) => state.documents.currentDocument
  );

  useEffect(() => {
    if (currentDocument) {
      fetch("http://127.0.0.1:3658/m1/593636-0-default/getDocumentContent", {
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
      })
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
  }, []);

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
          value={content}
          readOnly
        ></textarea>
      </div>
    </div>
  );
};

export default ViewDocument;

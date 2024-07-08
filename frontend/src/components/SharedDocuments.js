import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSharedDocuments,
  setCurrentDocument,
} from "../redux/documentsSlice";
import "./SharedDocuments.css";
const SharedDocuments = () => {
  const dispatch = useDispatch();
  const sharedDocuments = useSelector(
    (state) => state.documents.sharedDocuments
  );

  useEffect(() => {
    // Fetch shared documents (hardcoded for now)
    const fetchedSharedDocuments = [
      {
        fileId: 201,
        fileName: "Shared Doc 1",
        ownerName: "User A",
        sharedDate: "2023-07-01",
        permissions: ["view"],
      },
      {
        fileId: 202,
        fileName: "Shared Doc 2",
        ownerName: "User B",
        sharedDate: "2023-07-02",
        permissions: ["view", "edit"],
      },
      {
        fileId: 203,
        fileName: "Shared Doc 3",
        ownerName: "User C",
        sharedDate: "2023-07-03",
        permissions: ["edit"],
      },
    ];
    dispatch(setSharedDocuments(fetchedSharedDocuments));
  }, [dispatch]);

  const handleViewClick = (doc) => {
    dispatch(setCurrentDocument(doc));
    window.open(`/dashboard/view-document/${doc.fileId}`, "_blank");
  };

  const handleEditClick = (doc) => {
    dispatch(setCurrentDocument(doc));
    window.open(`/dashboard/edit-document/${doc.fileId}`, "_blank");
  };

  return (
    <div className="shared-documents">
      <h2>Shared Documents</h2>
      <div className="document-headers">
        <span className="file-name">File Name</span>
        <span className="owner-name">Owner</span>
        <span className="shared-date">Shared Date</span>
        <span className="permissions">Permissions</span>
        <span className="actions">Actions</span>
      </div>
      <ul>
        {sharedDocuments.map((doc) => (
          <li key={doc.fileId}>
            <div className="document-info">
              <span className="file-name">{doc.fileName}</span>
              <span className="owner-name">{doc.ownerName}</span>
              <span className="shared-date">{doc.sharedDate}</span>
              <span className="permissions">{doc.permissions.join(", ")}</span>
            </div>
            <div className="document-actions">
              {doc.permissions.includes("view") && (
                <button
                  className="icon-button"
                  title="View"
                  onClick={() => handleViewClick(doc)}
                >
                  <i className="fas fa-eye"></i>
                </button>
              )}
              {doc.permissions.includes("edit") && (
                <button
                  className="icon-button"
                  title="Edit"
                  onClick={() => handleEditClick(doc)}
                >
                  <i className="fas fa-edit"></i>
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SharedDocuments;

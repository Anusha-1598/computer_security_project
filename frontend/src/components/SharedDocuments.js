import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSharedDocuments } from "../redux/documentsSlice";
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
        permissions: "edit",
      },
      {
        fileId: 202,
        fileName: "Shared Doc 2",
        ownerName: "User B",
        sharedDate: "2023-07-02",
        permissions: "view",
      },
      {
        fileId: 203,
        fileName: "Shared Doc 3",
        ownerName: "User C",
        sharedDate: "2023-07-03",
        permissions: "edit",
      },
    ];
    dispatch(setSharedDocuments(fetchedSharedDocuments));
  }, [dispatch]);

  return (
    <div className="shared-documents">
      <h2>Shared Documents</h2>
      <ul>
        {sharedDocuments.map((doc) => (
          <li key={doc.fileId}>
            <div className="document-info">
              <span className="file-name">{doc.fileName}</span>
              <span className="owner-name">{doc.ownerName}</span>
              <span className="shared-date">{doc.sharedDate}</span>
              <span className="permissions">{doc.permissions}</span>
            </div>
            <div className="document-actions">
              {doc.permissions === "edit" && (
                <button className="icon-button" title="Edit">
                  <i className="fas fa-edit"></i>
                </button>
              )}
              <button className="icon-button" title="View">
                <i className="fas fa-eye"></i>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SharedDocuments;

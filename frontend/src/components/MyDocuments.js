import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setDocuments, setCurrentDocument } from "../redux/documentsSlice";
import RenamePopup from "./RenamePopup";
import DeleteConfirmationPopup from "./DeleteConfirmationPopup";
import SharePopup from "./SharePopup";
import "./MyDocuments.css";

const MyDocuments = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const documents = useSelector((state) => state.documents.documents);
  const [isRenamePopupOpen, setIsRenamePopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isSharePopupOpen, setIsSharePopupOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

  useEffect(() => {
    // Fetch documents (hardcoded for now)
    const fetchedDocuments = [
      {
        userId: 1,
        fileId: 101,
        fileName: "Document 1",
        dateCreated: "2023-07-01",
        sharedUsers: [],
      },
      {
        userId: 1,
        fileId: 102,
        fileName: "Document 2",
        dateCreated: "2023-07-02",
        sharedUsers: [],
      },
      {
        userId: 1,
        fileId: 103,
        fileName: "Document 3",
        dateCreated: "2023-07-03",
        sharedUsers: [],
      },
    ];
    dispatch(setDocuments(fetchedDocuments));
  }, [dispatch]);

  const handleRenameClick = (doc) => {
    setSelectedDocument(doc);
    setIsRenamePopupOpen(true);
  };

  const handleDeleteClick = (doc) => {
    setSelectedDocument(doc);
    setIsDeletePopupOpen(true);
  };

  const handleShareClick = (doc) => {
    setSelectedDocument(doc);
    setIsSharePopupOpen(true);
  };

  const handleEditClick = (doc) => {
    dispatch(setCurrentDocument(doc));
    navigate(`/dashboard/edit-document/${doc.fileId}`);
  };

  return (
    <div className="my-documents">
      <h2>My Documents</h2>
      <div className="document-headers">
        <span className="file-name">File Name</span>
        <span className="date-created">Date Created</span>
        <span className="actions">Actions</span>
      </div>
      <ul>
        {documents.map((doc) => (
          <li key={doc.fileId}>
            <div className="document-info">
              <span className="file-name">{doc.fileName}</span>
              <span className="date-created">{doc.dateCreated}</span>
            </div>
            <div className="document-actions">
              <button
                className="icon-button"
                title="Edit"
                onClick={() => handleEditClick(doc)}
              >
                <i className="fas fa-edit"></i>
              </button>
              <button
                className="icon-button"
                title="Delete"
                onClick={() => handleDeleteClick(doc)}
              >
                <i className="fas fa-trash-alt"></i>
              </button>
              <button
                className="icon-button"
                title="Rename"
                onClick={() => handleRenameClick(doc)}
              >
                <i className="fas fa-pen"></i>
              </button>
              <button
                className="icon-button"
                title="Share"
                onClick={() => handleShareClick(doc)}
              >
                <i className="fas fa-share-alt"></i>
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button className="floating-button">+</button>
      {isRenamePopupOpen && selectedDocument && (
        <RenamePopup
          fileId={selectedDocument.fileId}
          fileName={selectedDocument.fileName}
          onClose={() => setIsRenamePopupOpen(false)}
        />
      )}
      {isDeletePopupOpen && selectedDocument && (
        <DeleteConfirmationPopup
          fileId={selectedDocument.fileId}
          fileName={selectedDocument.fileName}
          onClose={() => setIsDeletePopupOpen(false)}
        />
      )}
      {isSharePopupOpen && selectedDocument && (
        <SharePopup
          fileId={selectedDocument.fileId}
          sharedUsers={selectedDocument.sharedUsers}
          onClose={() => setIsSharePopupOpen(false)}
        />
      )}
    </div>
  );
};

export default MyDocuments;

// src/components/MyDocuments.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setDocuments,
  setCurrentDocument,
  addDocument,
} from "../redux/documentsSlice";
import RenamePopup from "./RenamePopup";
import DeleteConfirmationPopup from "./DeleteConfirmationPopup";
import SharePopup from "./SharePopup";
import NewDocumentPopup from "./NewDocumentPopup";
import "./MyDocuments.css"; // Add your CSS here

const MyDocuments = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const documents = useSelector((state) => state.documents.documents);
  const [isRenamePopupOpen, setIsRenamePopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isSharePopupOpen, setIsSharePopupOpen] = useState(false);
  const [isNewDocumentPopupOpen, setIsNewDocumentPopupOpen] = useState(false);
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
        content: "Sample content for Document 1",
      },
      {
        userId: 1,
        fileId: 102,
        fileName: "Document 2",
        dateCreated: "2023-07-02",
        sharedUsers: [],
        content: "Sample content for Document 2",
      },
      {
        userId: 1,
        fileId: 103,
        fileName: "Document 3",
        dateCreated: "2023-07-03",
        sharedUsers: [],
        content: "Sample content for Document 3",
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

  const handleViewClick = (doc) => {
    dispatch(setCurrentDocument(doc));
    navigate(`/dashboard/view-document/${doc.fileId}`);
  };

  const handleNewDocumentClick = () => {
    setIsNewDocumentPopupOpen(true);
  };

  const handleCreateNewDocument = (fileName) => {
    const newDocument = {
      userId: 1,
      fileId: documents.length + 104,
      fileName,
      dateCreated: new Date().toISOString().split("T")[0],
      sharedUsers: [],
      content: "",
    };
    dispatch(addDocument(newDocument));
    setIsNewDocumentPopupOpen(false);
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
                title="View"
                onClick={() => handleViewClick(doc)}
              >
                <i className="fas fa-eye"></i>
              </button>
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
      <button className="floating-button" onClick={handleNewDocumentClick}>
        +
      </button>
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
      {isNewDocumentPopupOpen && (
        <NewDocumentPopup
          onClose={() => setIsNewDocumentPopupOpen(false)}
          onCreate={handleCreateNewDocument}
        />
      )}
    </div>
  );
};

export default MyDocuments;

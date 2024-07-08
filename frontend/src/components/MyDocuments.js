import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDocuments } from "../redux/documentsSlice";
import "./MyDocuments.css";

const MyDocuments = () => {
  const dispatch = useDispatch();
  const documents = useSelector((state) => state.documents.documents);

  useEffect(() => {
    // Fetch documents (hardcoded for now)
    const fetchedDocuments = [
      {
        userId: 1,
        fileId: 101,
        fileName: "Document 1",
        dateCreated: "2023-07-01",
      },
      {
        userId: 1,
        fileId: 102,
        fileName: "Document 2",
        dateCreated: "2023-07-02",
      },
      {
        userId: 1,
        fileId: 103,
        fileName: "Document 3",
        dateCreated: "2023-07-03",
      },
    ];
    dispatch(setDocuments(fetchedDocuments));
  }, [dispatch]);

  return (
    <div className="my-documents">
      <h2>My Documents</h2>
      <ul>
        {documents.map((doc) => (
          <li key={doc.fileId}>
            <div className="document-info">
              <span className="file-name">{doc.fileName}</span>
              <span className="date-created">{doc.dateCreated}</span>
            </div>
            <div className="document-actions">
              <button className="icon-button">
                <i className="fas fa-edit"></i>
              </button>
              <button className="icon-button">
                <i className="fas fa-trash-alt"></i>
              </button>
              <button className="icon-button">
                <i className="fas fa-pencil-alt"></i>
              </button>
              <button className="icon-button">
                <i className="fas fa-share-alt"></i>
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button className="floating-button">+</button>
    </div>
  );
};

export default MyDocuments;

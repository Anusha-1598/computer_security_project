// src/components/Dashboard.js
import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import MyDocuments from "./MyDocuments";
import SharedDocuments from "./SharedDocuments";
import "./Dashboard.css"; // Add your CSS here

const Dashboard = () => {
  return (
    <div className="dashboard">
      <nav className="sidebar">
        <ul>
          <li>
            <Link to="/dashboard/my-documents">
              <i className="fas fa-folder"></i> My Documents
            </Link>
          </li>
          <li>
            <Link to="/dashboard/shared-documents">
              <i className="fas fa-share-alt"></i> Shared Documents
            </Link>
          </li>
        </ul>
      </nav>
      <div className="content">
        <Routes>
          <Route path="my-documents" element={<MyDocuments />} />
          <Route path="shared-documents" element={<SharedDocuments />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
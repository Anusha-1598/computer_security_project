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
import "./MyDocuments.css";
import { setLoginUser } from "../redux/loginSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setSharedDocuments,
  setCurrentDocument,
} from "../redux/documentsSlice";
import "./SharedDocuments.css";
import { setLoginUser } from "../redux/loginSlice";

const SharedDocuments = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.login.loginUser);
  const sharedDocuments = useSelector(
    (state) => state.documents.sharedDocuments
  );

  useEffect(() => {
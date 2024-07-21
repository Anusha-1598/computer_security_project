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

const MyDocuments = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const documents = useSelector((state) => state.documents.documents);
  const currentUser = useSelector((state) => state.login.loginUser);
  const [isRenamePopupOpen, setIsRenamePopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isSharePopupOpen, setIsSharePopupOpen] = useState(false);
  const [isNewDocumentPopupOpen, setIsNewDocumentPopupOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:3658/m1/593636-0-default/getUserDocuments", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: currentUser }),
    })
      .then((res) => {
        if (res.status === 200) {
          res.json().then((res) => {
            let fetchedDocuments = [...res.filesList];
            let l = [];
            for (var i = 0; i < fetchedDocuments.length; i++) {
              let su = [];
              for (var j = 0; j < fetchedDocuments[i].sharedUsers.length; j++) {
                let obj = { ...fetchedDocuments[i].sharedUsers[j] };
                su.push({
                  userId: obj.userId,
                  permissions: obj.permission.split(","),
                });
              }
              fetchedDocuments[i].sharedUsers = [...su];
              l.push(fetchedDocuments[i]);
            }
            dispatch(setDocuments(l));
          });
        } else {
          res.json().then((res) => {
            alert(res.message);
          });
        }
      })
      .catch((err) => {
        alert("Failed to fetch documents due to : \n" + err.message);
      });
      // fetch("http://127.0.0.1:5000/verifyCookie", {
    //   method: "POST",
    //   credentials: "include",
    // })
    //   .then((res) => {
    //     if (res.status === 200) {
    //       res.json().then((res) => {
    //         dispatch(setLoginUser(res.userId));
    //         fetch("http://127.0.0.1:5000/getUserDocuments", {
    //           method: "POST",
    //           credentials: "include",
    //           headers: {
    //             "Content-Type": "application/json",
    //           },
    //           body: JSON.stringify({ userId: currentUser }),
    //         })
    //           .then((res) => {
    //             if (res.status === 200) {
    //               res.json().then((res) => {
    //                 let fetchedDocuments = [...res.filesList];
    //                 let l = [];
    //                 for (var i = 0; i < fetchedDocuments.length; i++) {
    //                   let su = [];
    //                   for (
    //                     var j = 0;
    //                     j < fetchedDocuments[i].sharedUsers.length;
    //                     j++
    //                   ) {
    //                     let obj = { ...fetchedDocuments[i].sharedUsers[j] };
    //                     su.push({
    //                       userId: obj.userId,
    //                       permissions: obj.permission.split(","),
    //                     });
    //                   }
    //                   fetchedDocuments[i].sharedUsers = [...su];
    //                   l.push(fetchedDocuments[i]);
    //                 }
    //                 dispatch(setDocuments(l));
    //               });
    //             } else {
    //               res.json().then((res) => {
    //                 alert(res.message);
    //               });
    //             }
    //           })
    //           .catch((err) => {
    //             alert("Failed to fetch documents due to : \n" + err.message);
    //           });
    //       });
    //     } else {
    //       let goToLogin = () => navigate("/login");
    //       goToLogin();
    //       dispatch(setLoginUser(""));
    //     }
    //   })
    //   .catch((err) => {
    //     alert(err.message);
    //   });
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
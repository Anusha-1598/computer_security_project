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

    // fetch("http://127.0.0.1:3658/m1/593636-0-default/getSharedDocuments", {
    //   method: "POST",
    //   credentials: "include",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ userId: currentUser }),
    // })
    //   .then((res) => {
    //     if (res.status === 200) {
    //       res.json().then((res) => {
    //         let fetchedSharedDocuments = [...res.filesList];
    //         let l = [];
    //         for (var i = 0; i < fetchedSharedDocuments.length; i++) {
    //           let su = [];
    //           for (
    //             var j = 0;
    //             j < fetchedSharedDocuments[i].sharedUsers.length;
    //             j++
    //           ) {
    //             let obj = {
    //               ...fetchedSharedDocuments[i].sharedUsers[j],
    //             };
    //             su.push({
    //               userId: obj.userId,
    //               permissions: obj.permission.split(","),
    //             });
    //           }
    //           fetchedSharedDocuments[i].sharedUsers = [...su];
    //           fetchedSharedDocuments[i].permissions =
    //             fetchedSharedDocuments[i].permissions.split(",");
    //           l.push(fetchedSharedDocuments[i]);
    //         }
    //         dispatch(setSharedDocuments(l));
    //       });
    //     } else {
    //       res.json().then((res) => {
    //         alert(res.message);
    //       });
    //     }
    //   })
    //   .catch((err) => {
    //     alert("Failed to fetch documents due to : \n" + err.message);
    //   });
    // fetch("http://127.0.0.1:5000/verifyCookie", {
    //   method: "POST",
    // })
    //   .then((res) => {
    //     if (res.status === 200) {
    //       res.json().then((res) => {
    //         dispatch(setLoginUser(res.userId));
    //         fetch("http://127.0.0.1:5000/getSharedDocuments", {
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
    //                 let fetchedSharedDocuments = [...res.filesList];
    //                 let l = [];
    //                 for (var i = 0; i < fetchedSharedDocuments.length; i++) {
    //                   let su = [];
    //                   for (
    //                     var j = 0;
    //                     j < fetchedSharedDocuments[i].sharedUsers.length;
    //                     j++
    //                   ) {
    //                     let obj = {
    //                       ...fetchedSharedDocuments[i].sharedUsers[j],
    //                     };
    //                     su.push({
    //                       userId: obj.userId,
    //                       permissions: obj.permission.split(","),
    //                     });
    //                   }
    //                   fetchedSharedDocuments[i].sharedUsers = [...su];
    //                   fetchedSharedDocuments[i].permissions =
    //                     fetchedSharedDocuments[i].permissions.split(",");
    //                   l.push(fetchedSharedDocuments[i]);
    //                 }
    //                 dispatch(setSharedDocuments(l));
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
    //       let goToLogin = () => dispatch("/login");
    //       goToLogin();
    //       dispatch(setLoginUser(""));
    //     }
    //   })
    //   .catch((err) => {
    //     alert(err.message);
    //   });
  }, [dispatch]);
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";
import {
  setLoginData,
  resetLoginForm,
  setLoginUser,
} from "../redux/loginSlice";
import FormInput from "./FormInput";
import Button from "./Button";
import "./Login.css";

const Login = () => {
  const dispatch = useDispatch();
  const loginData = useSelector((state) => state.login);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const sanitizedValue = DOMPurify.sanitize(e.target.value);
    dispatch(setLoginData({ name: e.target.name, value: sanitizedValue }));
  };

  useEffect(() => {
    fetch("http://127.0.0.1:5000/verifyCookie", {
      method: "POST",
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 200) {
          res.json().then((res) => {
            dispatch(setLoginUser(res.userId));
            let goToDashBoard = () => navigate("/dashboard");
            goToDashBoard();
          });
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);
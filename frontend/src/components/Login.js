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

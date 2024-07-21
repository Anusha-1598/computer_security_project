import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { useSelector } from "react-redux";

const Header = () => {
  const loginData = useSelector((state) => state.login);
  return (
    <header className="header">
    <h1>Docs</h1>
    {loginData.loginUser ? (
      <></>
    ) : ( 
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { useSelector } from "react-redux";
const Header = () => {
  const loginUser = useSelector((state) => state.login.loginUser);
  return (
    <header className="header">
      <h1>Docs</h1>

      <nav className="header-nav">
        <ul>
          {loginUser ? (
            <>
              <li>{loginUser}</li>
              <li>
                {" "}
                <Link to="/logout">Logout</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Register from "./components/Register";
import Header from "./components/Header";
import "./App.css"; // Add your CSS here

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <div>
            <Header />
            <Routes>
              <Route path="/register" element={<Register />} />
              {/* Add Login route later */}
              {/* <Route path="/login" element={<Login />} /> */}
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;

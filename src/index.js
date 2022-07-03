import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Moonbeam from "./Moonbeam";
import LandingPage from "./LandingPage";

import Navbar from "./Navbars";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

ReactDOM.render(
  <Router>
    <React.Fragment>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/zeitgeist/Dashboard" element={<Moonbeam/>} />
      </Routes>
    </React.Fragment>
  </Router>,
  document.getElementById("root")
);

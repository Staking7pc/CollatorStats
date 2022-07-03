import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import "./Navbar.css";
import logo from "./Brightlystake-logo.svg";
function Navbars() {
  return (
    <>
      <header>
        <div class="container">

          <h1 class="logo">
          <a href="https://brightlystake.com/"></a>Brightlystake</h1>
          <nav>
            <ul>
              <li>
                <a href="/zeitgeist">Zeitgeist</a>
              </li>
              <li>
                <a href="https://collatorstats.brightlystake.com/">Stake with us</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Navbars;

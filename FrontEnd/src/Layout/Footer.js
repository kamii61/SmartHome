import React, { Component } from "react";
import "./Footer.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
} from "react-router-dom";

export default class Footer extends Component {
  render() {
    return (
      <div className="bgFooter mt-5">
        <div className="container">
          <div className="row footer py-4">
            <div className="col-4 logo">
              <img
                src="http://picsum.photos/200/200"
                alt="smart-home"
                width="200"
                height="80"
              />
            </div>
            <div className="col-4 footer-nav">
              <ul>
                <li className="nav-item active">
                  <NavLink
                    activeStyle={{ color: "#FC77DC" }}
                    exact
                    className="nav-link"
                    to="/"
                  >
                    DASH BOARD <span className="sr-only">(current)</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/item"
                    activeStyle={{ color: "#FC77DC" }}
                    exact
                  >
                    ITEM
                  </NavLink>
                </li>
                <li className="nav-item ">
                  <NavLink
                    className="nav-link "
                    to="/about"
                    activeStyle={{ color: "#FC77DC" }}
                    exacts
                  >
                    ABOUT US
                  </NavLink>
                </li>
              </ul>
            </div>

            <div className="col-4 footer-contact">
              <h2 className="text-white">CONTACT US</h2>
              <ul>
                <li>
                  <a href="#">
                    <i
                      class="fab fa-facebook "
                      style={{ color: "#2D4486" }}
                    ></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i
                      class="fab fa-google-plus"
                      style={{ color: "#D2352C" }}
                    ></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i class="fab fa-instagram"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i class="fab fa-twitter-square"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

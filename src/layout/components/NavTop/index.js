import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

import "../../../assets/css/bootstrap.css";
import "../../../assets/css/all.css";
import "../../../assets/css/lightbox.min.css";
import "../../../assets/css/style.css";
import { getCookie } from "../../../constant/request";
import useAuthen from "../../../hooks/useAuthen";

const NavTop = () => {
  const { isAuthenticated } = useAuthen();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-hb sticky-top">
      {/* <a class="navbar-brand" href="/home">
        <img src="assets/img/logo.png" class="logo" alt="">
      </a> */}
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <ul className="navbar-nav">
          <li className="nav-item mr-3">
            <NavLink to="/" className="nav-link ">
              Home
            </NavLink>
          </li>
          <li className="nav-item mr-3">
            <NavLink to="/homestays/create" className="nav-link ">
              Create Homestay
            </NavLink>
          </li>
          <li className="nav-item mr-3">
            <NavLink to="/homestays" className="nav-link ">
              Homestay Listings
            </NavLink>
          </li>
        </ul>
        {isAuthenticated ? (
          <ul className="navbar-nav ml-auto">
            <li class="nav-item mr-3">
              <NavLink to="/login" className="nav-link ">
                <i class="fas fa-sign-in-alt"></i>
                Login
              </NavLink>
            </li>
          </ul>
        ) : (
          <ul className="navbar-nav ml-auto">
            <li class="nav-item mr-3">
              <NavLink to="/login" className="nav-link ">
                <i class="fas fa-sign-in-alt"></i>
                Logout
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};
export default NavTop;

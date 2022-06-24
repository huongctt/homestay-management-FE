import "../../assets/css/all.css";
import "../../assets/css/style.css";
import "../../assets/css/bootstrap.css";
import "../../assets/css/chart.css";
import "../../assets/css/lightbox.min.css";

import React, { useState } from "react";
import { Facebook, Globe, Linkedin, Lock, Twitter, User } from "react-feather";
import { useNavigate } from "react-router-dom";
import { LoginContextProvider, useLoginContext } from "./context";

const LoginImpl = () => {
  const navigate = useNavigate();
  const { handleSignup, handleLogin } = useLoginContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("visitor");

  return (
    <div className="container1">
      <div className="forms-container">
        <div className="signin-signup">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin(username, password);
            }}
            className="sign-in-form"
          >
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <User style={{ placeSelf: "center" }} />
              <input
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </div>
            <div className="input-field">
              <Lock style={{ placeSelf: "center" }} />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <input type="submit" value="Login" className="btn solid" />
            <p className="social-text">Or Sign in with social platforms</p>
            <div className="social-media">
              <a href="#" className="social-icon">
                <Facebook />
              </a>
              <a href="#" className="social-icon">
                <Twitter />
              </a>
              <a href="#" className="social-icon">
                <Globe />
              </a>
              <a href="#" className="social-icon">
                <Linkedin />
              </a>
            </div>
          </form>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSignup(username, password, phone, email, role);
            }}
            className="sign-up-form"
          >
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-phone"></i>
              <input
                type="text"
                placeholder="Phone"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
              />
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                checked={role === "homestay owner"}
                onChange={(e) => setRole("homestay owner")}
              />
              <label className="form-check-label" for="flexRadioDefault1">
                Homestay Owner
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                checked={role === "visitor"}
                onChange={(e) => setRole("visitor")}
              />
              <label className="form-check-label" for="flexRadioDefault2">
                Visitor
              </label>
            </div>
            <input type="submit" className="btn" value="Sign up" />
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here ?</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>
            <button
              className="btn transparent"
              id="sign-up-btn"
              onClick={() =>
                document
                  .querySelector(".container1")
                  .classList.add("sign-up-mode")
              }
            >
              Sign up
            </button>
          </div>
          <img src="img/log.svg" className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us ?</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              laboriosam ad deleniti.
            </p>
            <button
              className="btn transparent"
              id="sign-in-btn"
              onClick={() =>
                document
                  .querySelector(".container")
                  .classList.remove("sign-up-mode")
              }
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
      <script src="event.js"></script>
    </div>
  );
};
const Login = () => (
  <LoginContextProvider>
    <LoginImpl />
  </LoginContextProvider>
);
export default Login;

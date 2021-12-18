import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../redux/action/auth";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = JSON.stringify({ username, password });
    dispatch(login(body));
    setUsername("");
    setPassword("");
  };
  return (
    <div className="login text-center">
      {isAuthenticated ?  <Redirect to="/dashboard"/> : '' }
      <div className="form-signin">
        <form onSubmit={handleSubmit}>
          <h1 className="h2 mb-3 fw-normal ">Please Sign-In</h1>
          <div className="form-floating mb-2">
            <input
              type="text"
              name="username"
              className="form-control"
              id="username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
            />
            <label>Username</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              name="password"
              className="form-control"
              id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <label>Password</label>
          </div>

          <button className="w-100 btn btn-lg btn-yellow">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

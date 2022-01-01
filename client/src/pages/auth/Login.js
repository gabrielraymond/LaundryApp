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
    // <div className="login text-center">
    //   {isAuthenticated ?  <Redirect to="/dashboard"/> : '' }
    //   <div className="form-signin">
    //     <form onSubmit={handleSubmit}>
    //       <h1 className="h2 mb-3 fw-normal ">Please Sign-In</h1>
    //       <div className="form-floating mb-2">
    //         <input
    //           type="text"
    //           name="username"
    //           className="form-control"
    //           id="username"
    //             onChange={(e) => setUsername(e.target.value)}
    //             value={username}
    //         />
    //         <label>Username</label>
    //       </div>
    //       <div className="form-floating">
    //         <input
    //           type="password"
    //           name="password"
    //           className="form-control"
    //           id="password"
    //             onChange={(e) => setPassword(e.target.value)}
    //             value={password}
    //         />
    //         <label>Password</label>
    //       </div>

    //       <button className="w-100 btn btn-lg btn-yellow">Login</button>
    //     </form>
    //   </div>
    // </div>
    <section class="vh-100 gradient-custom">
      {isAuthenticated ? <Redirect to="/dashboard" /> : ""}
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card bg-dark text-white"
              style={{ borderRadius: "1rem" }}
            >
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-5">
                    Please enter your username and password!
                  </p>
                  <form onSubmit={handleSubmit}>
                    <div className="form-outline form-white mb-4">
                      <input
                        type="text"
                        name="username"
                        id="username"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        placeholder="Username"
                        className="form-control form-control-lg bg-dark text-light"
                      />
                    </div>

                    <div className="form-outline form-white mb-4">
                      <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        placeholder="Password"
                        className="form-control form-control-lg bg-dark text-light"
                      />
                    </div>

                    <button
                      className="btn btn-outline-light btn-lg px-5"
                      type="submit"
                    >
                      Login
                    </button>
                  </form>
                </div>

                {/* <div>
                  <p className="mb-0">
                    Don't have an account?{" "}
                    <a href="#!" className="text-white-50 fw-bold">
                      Sign Up
                    </a>
                  </p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;

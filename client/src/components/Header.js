import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import './Header.css'

import { logout } from "../redux/action/auth";

const Header = ({ auth: { loading }, laundry: { laundry } }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (laundry) {
      document.title = laundry.name;
    }
  }, [laundry]);
  return !loading && laundry ? (
    <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <Link className="navbar-brand col-md-3 col-lg-2 me-0 px-3" to="/">
        {laundry.name}
      </Link>
      <button
        className="navbar-toggler position-absolute d-md-none collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#sidebarMenu"
        aria-controls="sidebarMenu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="navbar-nav">
        <div className="nav-item text-nowrap">
          <button
            className="btn nav-link px-3"
            onClick={() => {
              dispatch(logout());
              document.title = "Laundry App";
            }}
          >
            Sign out
          </button>
        </div>
      </div>
    </header>
  ) : (
    <h1>Loading...</h1>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  laundry: state.laundry,
});

export default connect(mapStateToProps)(Header);

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [dropdown, setDropdown] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  return !loading && user ? (
    <nav
      id="sidebarMenu"
      className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
    >
      <div className="position-sticky pt-3">
        <div
          className="nav-link d-flex "
          aria-current="page"
          to="/"
          id="navbarScrollingDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="fas fa-user iconUser"></i>
          <div className="ms-2">
            <p className="mb-0">{user.name}</p>
            <p className="mb-0">adiministrator</p>
          </div>
        </div>
        <ul className="dropdown-menu ms-3" aria-labelledby="navbarScrollingDropdown">
          <li>
            <Link className="dropdown-item" to="/edit">
              Edit Profile
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/">
              Logout
            </Link>
          </li>
        </ul>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="nav-link " aria-current="page" to="/dashboard">
              <i className="fas fa-home iconNav"></i>
              Dashboard
            </Link>
          </li>
          
          <li className="nav-item">
            <div
              className="dropdown-toggle nav-link"
              role="button"
              onClick={() => setDropdown(!dropdown)}
            >
              <i className="fas fa-money-bill-wave iconNav"></i> <span>Manajemen User</span>
            </div>
            <ul
              className={"dropdown dropdown-container nav flex-column "+(
                !dropdown && "active"
              )}
            >
              <li className="nav-item">
                
                <Link className="dropdown-item nav-link" to="/">
                <i className="fas fa-user iconNav"></i>
                  Karyawan
                </Link>
              </li>
              <li className="nav-item">
                <Link className="dropdown-item nav-link" to="/">
                <i className="fas fa-user iconNav"></i>
                  Administrator
                </Link>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/transaction">
              <i className="fas fa-user iconNav"></i>
              Transaksi
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/paket">
              <i className="fas fa-home iconNav"></i>
              Paket Laundry
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/customer">
              <i className="fas fa-user iconNav"></i>
              Customer
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/pembayaran">
              <i className="fas fa-money-bill-wave iconNav"></i>
              Tipe Pembayaran
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/identitas">
              <i className="fas fa-edit iconNav"></i>
              Identitas Aplikasi
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">
              <i className="fas fa-book iconNav"></i>
              Laporan
            </Link>
          </li>
        </ul>

        {/* <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          <span>Saved reports</span>
          <Link className="link-secondary" to="/" aria-label="Add Link new report">
            <span data-feather="plus-circle"></span>
          </Link>
        </h6> */}
      </div>
    </nav>
  ) : (<h1>Loading...</h1>);
};

export default Navbar;

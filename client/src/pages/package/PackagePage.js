import React from "react";
import axios from "axios";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { loadPackage } from "../../redux/action/laundry";

const PackagePage = ({
  auth: { user, loading, isAuthenticated },
  laundry: { packages },
}) => {
    const dispatch = useDispatch();

  const handleDelete = async (e, paket_id, paket_laundry) => {
    e.preventDefault();
    try {
      await axios.delete(
        `http://localhost:5000/api/package/delete/${paket_id}`
      );
      dispatch(loadPackage(paket_laundry));
      // dispatch(deletePayment(payment.laundry, payment._id));
    } catch (error) {
      console.error(error);
    }
  };

  return !loading && user && packages ? (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2 text-dark">Paket Laundry</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2"></div>
        </div>
      </div>

      <h2>DATA PAKET LAUNDRY</h2>
      <Link className="btn btn-secondary" to="/new_paket">
        <i className="fas fa-edit iconNav"></i>
        Tambah Paket Laundry
      </Link>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Jenis</th>
              <th scope="col">Harga/kg</th>
              <th scope="col">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((paket, i = 0) => {
              return (
                packages && (
                  <tr key={paket._id}>
                    <td>{i + 1}</td>
                    <td>{paket.name}</td>
                    <td>{paket.price}</td>
                    <td>
                      <Link
                        className="btn btn-info"
                        to={`/edit_paket/${paket._id}`}
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-danger ms-2"
                        onClick={async (e) => {
                          handleDelete(e, paket._id, paket.laundry);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  ) : (
    <h1>Loading...</h1>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  laundry: state.laundry,
});

export default connect(mapStateToProps)(PackagePage);

import axios from "axios";
import React from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { loadPayment } from "../../redux/action/laundry";

const PaymentPage = ({
  auth: { user, loading, isAuthenticated },
  laundry: { payments },
}) => {
  const dispatch = useDispatch();

  const handleDelete = async (e, payment_id, payment_laundry) => {
    e.preventDefault();
    try {
      await axios.delete(
        `http://localhost:5000/api/payment/delete/${payment_id}`
      );
      dispatch(loadPayment(payment_laundry));
      // dispatch(deletePayment(payment.laundry, payment._id));
    } catch (error) {
      console.error(error);
    }
  };

  return !loading && user && payments ? (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2 text-dark">Tipe Pembayaran</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2"></div>
        </div>
      </div>

      {/* <canvas className="my-4 w-100" id="myChart" width="900" height="380"></canvas> */}

      <h2>Section title</h2>
      <Link className="btn btn-secondary" to="/new_payment">
        <i className="fas fa-edit iconNav"></i>
        Tambah Tipe Pembayaran
      </Link>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Tipe Pembayaran</th>
              <th scope="col">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, i = 0) => {
              return (
                payments && (
                  <tr key={payment._id}>
                    <td>{i + 1}</td>
                    <td>{payment.name}</td>
                    <td>
                      <Link
                        className="btn btn-info"
                        to={`/edit_payment/${payment._id}`}
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-danger ms-2"
                        onClick={async (e) => {
                          handleDelete(e, payment._id, payment.laundry);
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

export default connect(mapStateToProps)(PaymentPage);

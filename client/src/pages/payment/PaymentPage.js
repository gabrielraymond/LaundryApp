import axios from "axios";
import React from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
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
    } catch (error) {
      console.error(error);
    }
  };

  return !loading && user && payments ? (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <PageTitle title="TIPE PEMBAYARAN" />

      <div className="table-responsive my-3 p-3 rounded shadow-sm">
        <Link className="btn btn-secondary" to="/new_payment">
          <i className="fas fa-edit iconNav"></i>
          Tambah Tipe Pembayaran
        </Link>
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

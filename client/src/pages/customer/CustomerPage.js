import React from "react";
import axios from "axios";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { loadCustomer } from "../../redux/action/laundry";
import PageTitle from "../../components/PageTitle";

const CustomerPage = ({
  auth: { user, loading },
  laundry: { customers },
}) => {
  const dispatch = useDispatch();
  const handleDelete = async (e, customer_id, customer_laundry) => {
    e.preventDefault();
    try {
      await axios.delete(
        `http://localhost:5000/api/customer/delete/${customer_id}`
      );
      dispatch(loadCustomer(customer_laundry));
      // dispatch(deletePayment(payment.laundry, payment._id));
    } catch (error) {
      console.error(error);
    }
  };
  return !loading && user && customers ? (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <PageTitle title="DATA CUSTOMER" />
      <div className="table-responsive my-3 p-3 text-light rounded shadow-sm border">
        <Link className="btn btn-secondary" to="/new_customer">
          <i className="fas fa-edit iconNav"></i>
          Tambah Customer
        </Link>
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Nama</th>
              <th scope="col">Alamat</th>
              <th scope="col">Email</th>
              <th scope="col">No Telp</th>
              <th scope="col">Gender</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, i = 0) => {
              return (
                customers && (
                  <tr key={customer._id}>
                    <td>{i + 1}</td>
                    <td>{customer.name}</td>
                    <td>{customer.address}</td>
                    <td>{customer.email}</td>
                    <td>{customer.phone_number}</td>
                    <td>{customer.gender}</td>
                    <td>
                      <Link
                        className="btn btn-info"
                        to={`/edit_customer/${customer._id}`}
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-danger ms-2"
                        onClick={async (e) => {
                          handleDelete(e, customer._id, customer.laundry);
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

export default connect(mapStateToProps)(CustomerPage);

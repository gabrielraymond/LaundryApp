import axios from "axios";
import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { loadEmployee } from "../../../redux/action/laundry";

const EmployeePage = ({
  auth: { user, loading, isAuthenticated },
  laundry: { employees },
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      dispatch(loadEmployee(user.laundry));
    }
  }, [user, dispatch]);
  const handleDelete = async (e, id, employee_laundry) => {
    e.preventDefault();
    try {
      await axios.delete(
        `http://localhost:5000/api/user/delete_employee/${id}`
      );
      dispatch(loadEmployee(employee_laundry));
      // dispatch(deletePayment(payment.laundry, payment._id));
    } catch (error) {
      console.error(error);
    }
  };
  return !loading && employees ? (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="my-3 p-3 bg-dark text-light rounded shadow-sm">
        <h3 className="panel-title">DATA KARYAWAN</h3>
      </div>

      <div className="table-responsive my-3 p-3 text-light rounded shadow-sm border">
        <Link className="btn btn-secondary" to="/user/new_employee">
          <i className="fas fa-edit iconNav"></i>
          Tambah Karyawan
        </Link>
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Nama</th>
              <th scope="col">Username</th>
              <th scope="col">Alamat</th>
              <th scope="col">No Telp</th>
              <th scope="col">Gender</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {employees !== {} &&
              employees.map((e, i = 0) => {
                return (
                  <tr key={e._id}>
                    <td>{i + 1}</td>
                    <td>{e.name}</td>
                    <td>{e.username}</td>
                    <td>{e.address}</td>
                    <td>{e.phone_number}</td>
                    <td>{e.gender}</td>
                    <td>
                      <Link
                        className="btn btn-info"
                        to={`/user/edit_employee/${e._id}`}
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-danger ms-2"
                        onClick={async (event) => {
                          handleDelete(event, e._id, e.laundry);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
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

export default connect(mapStateToProps)(EmployeePage);

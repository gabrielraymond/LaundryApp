import React from "react";
import { connect } from "react-redux";
import PageTitle from "../../../components/PageTitle";

const AdminPage = ({ auth: { user, loading } }) => {
  return user && !loading ? (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <PageTitle title="DATA ADMINISTRATOR" />

      <div className="table-responsive my-3 p-3 text-light rounded shadow-sm border">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Nama</th>
              <th scope="col">Username</th>
              <th scope="col">Alamat</th>
              <th scope="col">No Telp</th>
              <th scope="col">Gender</th>
              {/* <th scope="col"></th> */}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.address}</td>
              <td>{user.phone_number}</td>
              <td>{user.gender}</td>
              {/* <td>
                <div
                  className="btn btn-info"
                >
                  Edit
                </div>
              </td> */}
            </tr>
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

export default connect(mapStateToProps)(AdminPage);

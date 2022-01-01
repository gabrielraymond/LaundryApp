import axios from "axios";
import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const CreateEmployee = ({
  auth: { user, loading, isAuthenticated },
  laundry: { employees },
}) => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("Laki-laki");

  const handleSubmit = async (e, laundry) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const status = "employee";

    const body = JSON.stringify({
      name,
      username,
      password,
      address,
      phone_number,
      gender,
      status,
    });
    await axios.post(
      `http://localhost:5000/api/user/register/${laundry}`,
      body,
      config
    );
    history.go(-1);
  };

  return !loading && employees ? (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 ">
      <div className="my-3 p-3 bg-dark text-light rounded shadow-sm">
        <h3 className="panel-title">TAMBAH KARYAWAN</h3>
      </div>
      <div>
        <div className="bg-light my-3 p-3 rounded shadow-sm border">
          <form onSubmit={(e) => handleSubmit(e, user.laundry)}>
            <div className="mb-3">
              <label className="">Name</label>
              <input
                type="text"
                className="form-control"
                id="employee-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label className="">Username</label>
              <input
                type="text"
                className="form-control"
                id="employee-username"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
              <label className="">Password</label>
              <input
                type="password"
                className="form-control"
                id="employee-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="">Address</label>
              <input
                type="text"
                className="form-control"
                id="employee-address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <label className="">Phone Number</label>
              <input
                type="text"
                className="form-control"
                id="employee-phone-number"
                value={phone_number}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <label className="">Gender</label>
              <select
                className="form-select"
                type="text"
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>
            <button className="btn btn-primary me-2" type="submit">
              Update
            </button>
            <button
              className="btn btn-danger"
              type="button"
              onClick={() => history.go(-1)}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
      {/* <canvas className="my-4 w-100" id="myChart" width="900" height="380"></canvas> */}
    </main>
  ) : (
    <h1>Loading...</h1>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  laundry: state.laundry,
});

export default connect(mapStateToProps)(CreateEmployee);

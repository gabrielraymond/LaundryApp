import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

const EditEmployee = ({
  auth: { user, loading, isAuthenticated },
  laundry: { employees },
}) => {
  const { id } = useParams();
  const history = useHistory();
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("Laki-laki");

  useEffect(() => {
    let employee = null;
    const getEmployee = () => {
      if (employees && id) {
        employee = employees.filter((p) => p._id === id);
        setName(employee[0].name);
        setUserName(employee[0].username);
        setAddress(employee[0].address);
        setPhoneNumber(employee[0].phone_number);
        setGender(employee[0].gender);
      }

      return employee;
    };

    getEmployee();
  }, [id, employees]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      name,
      address,
      password,
      phone_number,
      gender,
    });
    await axios.post(
      `http://localhost:5000/api/user/edit_user/${id}`,
      body,
      config
    );
    history.go(-1);
  };

  return !loading && employees ? (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 ">
      <div className="my-3 p-3 bg-dark text-light rounded shadow-sm">
        <h3 className="panel-title">EDIT CUSTOMER</h3>
      </div>
      <div>
        <div className="bg-light my-3 p-3 rounded shadow-sm border">
          <form onSubmit={(e) => handleSubmit(e)}>
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
                disabled
              />
              <label className="">Password</label>
              <input
                type="text"
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

export default connect(mapStateToProps)(EditEmployee);

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { updateUser } from "../redux/action/auth";

const EditProfile = ({ auth: { user, loading } }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setAddress(user.address);
      setPhoneNumber(user.phone_number);
      setGender(user.gender);
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = JSON.stringify({
      name,
      password,
      address,
      phone_number,
      gender,
    });
    dispatch(updateUser(user._id, data))
    setPassword("");
  };

  return !loading && user ? (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 ">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom ">
        <h1 className="h2 text-dark">EDIT DATA ADMINISTRATOR</h1>
      </div>
      <div>
        <div className="bg-light p-4">
          <h5>EDIT DATA ADMINISTRATOR</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="">Nama Lengkap</label>
              <input
                type="text"
                className="form-control"
                id="full-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={user.username}
                aria-label="Disabled input example"
                disabled
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Masukkan Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Alamat Lengkap</label>
              <input
                type="text"
                className="form-control"
                id="alamat"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Telepon</label>
              <input
                type="text"
                className="form-control"
                id="telepon"
                value={phone_number}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Gender</label>

              <select
                className="form-select"
                onChange={(e) => setGender(e.target.value)}
                value={gender}
              >
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>
            <button className="btn btn-primary me-2">Update</button>
            <button className="btn btn-danger">Cancel</button>
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
});

export default connect(mapStateToProps)(EditProfile);

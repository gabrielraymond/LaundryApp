import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import { editLaundry } from "../../redux/action/laundry";

const EditLaundry = ({ auth: { loading, user }, laundry: { laundry } }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (laundry) {
      setName(laundry.name);
      setAddress(laundry.address);
      setPhoneNumber(laundry.phone_number);
      setEmail(laundry.email);
    }
  }, [laundry]);

  const handleSubmit = (e) => {
      e.preventDefault();
      const data = JSON.stringify({
          name,
          address,
          email,
          phone_number
      });
      dispatch(editLaundry(user.laundry, data))
  }

  return !loading && laundry ? (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 ">
      <PageTitle title="EDIT IDENTITAS APLIKASI" />
      <div>
        <div className="bg-light p-3 my-3 rounded shadow-sm border">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="">Nama Aplikasi</label>
              <input
                type="text"
                className="form-control"
                id="application-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="">Alamat Lengkap</label>
              <input
                type="text"
                className="form-control"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Masukkan Password"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Telepon</label>
              <input
                type="text"
                className="form-control"
                id="phone-number"
                value={phone_number}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <button className="btn btn-primary me-2">Update</button><Link to="/dashboard">
            <button className="btn btn-danger">Cancel</button></Link>
          </form>
        </div>
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

export default connect(mapStateToProps)(EditLaundry);

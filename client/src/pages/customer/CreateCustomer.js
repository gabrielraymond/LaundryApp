import React, { useState } from "react";
import axios from "axios";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { loadCustomer } from "../../redux/action/laundry";

const CreateCustomer = ({
  auth: { loading, user },
  laundry: { customers },
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [gender, setGender] = useState("Laki-laki");

  const handleSubmit = async (e, id) => {
    e.preventDefault();
    const config = {
        headers: {
            "Content-Type": "application/json",
        }
    }
    const data = JSON.stringify({name, address, email, phone_number, gender});
    try {
        await axios.post(`http://localhost:5000/api/customer/${id}/add_customer`, data, config);
        dispatch(loadCustomer);
    } catch (error) {
        console.error(error);
    }

    history.go(-1);
  };

  return !loading && customers ? (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 ">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom ">
        <h1 className="h2 text-dark">Tambah Customer</h1>
      </div>
      <div>
        <div className="bg-light p-4">
          <h5>TAMBAH CUSTOMER</h5>
          <form onSubmit={(e) => handleSubmit(e, user.laundry)}>
            <div className="mb-3">
              <label className="">Name</label>
              <input
                type="text"
                className="form-control"
                id="customer-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label className="">Address</label>
              <input
                type="text"
                className="form-control"
                id="customer-address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <label className="">Email</label>
              <input
                type="email"
                className="form-control"
                id="customer-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="">Phone Number</label>
              <input
                type="text"
                className="form-control"
                id="customer-phone-number"
                value={phone_number}
                onChange={(e) => setPhone_number(e.target.value)}
              />
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
            </div>
            <button className="btn btn-primary me-2" type="submit">
              Create
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

export default connect(mapStateToProps)(CreateCustomer);

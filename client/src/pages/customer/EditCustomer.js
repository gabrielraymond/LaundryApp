import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import PageTitle from "../../components/PageTitle";

const EditCustomer = ({ auth: { loading, user }, laundry: { customers } }) => {
  const history = useHistory();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    const getCustomer = () => {
      if (customers && id) {
        let customer = customers.filter((p) => p._id === id);
        setName(customer[0].name);
        setAddress(customer[0].address);
        setEmail(customer[0].email);
        setPhone_number(customer[0].phone_number);
        setGender(customer[0].gender);
      }
    };
    getCustomer();
  }, [id, customers]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ name, address, email, phone_number, gender });
    await axios.post(
      `http://localhost:5000/api/customer/update/${id}`,
      body,
      config
    );
    history.go(-1);
  };

  return !loading && customers && user ? (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 ">
      <PageTitle title="EDIT CUSTOMER" />
      <div>
        <div className="bg-light my-3 p-3 rounded shadow-sm border">
          <form onSubmit={(e) => handleSubmit(e, user.laundry)}>
            <div className="mb-3">
              <div className="mb-3">
                <label className="">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="customer-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="customer-address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="customer-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="">Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="customer-phone-number"
                  value={phone_number}
                  onChange={(e) => setPhone_number(e.target.value)}
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

export default connect(mapStateToProps)(EditCustomer);

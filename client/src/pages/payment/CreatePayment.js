import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import {  loadPayment } from "../../redux/action/laundry";

const CreatePayment = ({ auth: { loading, user }, laundry: { payments } }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState("");

  const handleSubmit = async (e, id) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const data = JSON.stringify({ name });
    try {
      await axios.post(
        `http://localhost:5000/api/payment/${id}/add_payment`,
        data,
        config
      );
      dispatch(loadPayment(id));
    } catch (error) {
      console.error(error);
    }

    // dispatch(addPayment(user.laundry, data));
    history.go(-1);
  };

  return !loading && payments ? (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 ">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom ">
        <h1 className="h2 text-dark">Tambah Tipe Pembayaran</h1>
      </div>
      <div>
        <div className="bg-light p-4">
          <h5>TAMBAH TIPE PEMBAYARAN</h5>
          <form onSubmit={(e) => handleSubmit(e, user.laundry)}>
            <div className="mb-3">
              <label className="">Tipe Pembayaran</label>
              <input
                type="text"
                className="form-control"
                id="application-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
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

export default connect(mapStateToProps)(CreatePayment);

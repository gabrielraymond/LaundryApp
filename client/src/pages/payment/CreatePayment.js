import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import { loadPayment } from "../../redux/action/laundry";

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
        `https://mern-laundry.herokuapp.com/api/payment/${id}/add_payment`,
        data,
        config
      );
      dispatch(loadPayment(id));
    } catch (error) {
      console.error(error);
    }
    history.go(-1);
  };

  return !loading && payments ? (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 ">
      <PageTitle title="TAMBAH TIPE PEMBAYARAN" />
      <div>
        <div className="bg-light p-3 py-3 rounded shadow-sm border">
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

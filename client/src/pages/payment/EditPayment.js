import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import { loadPayment } from "../../redux/action/laundry";

const EditPayment = ({ auth: { loading, user }, laundry: { payments } }) => {
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  useEffect(() => {
    const getPayment = () => {
      if (payments && id){
        let payment = payments.filter((p) => p._id === id);
        setName(payment[0].name);
      }
    }
    getPayment()
  }, [id, payments]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({name});
    await axios.post(
      `https://mern-laundry.herokuapp.com/api/payment/update/${id}`,
      body,
      config
    );
    dispatch(loadPayment(user.laundry));
    history.go(-1)
  };

  return !loading && payments ? (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 ">
      <PageTitle title="EDIT TIPE PEMBAYARAN"/>
      <div>
        <div className="bg-light p-4 rounded shadow-sm my-3 p-3 border">
          <form onSubmit={handleSubmit}>
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
    </main>
  ) : (
    <h1>Loading...</h1>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  laundry: state.laundry,
});

export default connect(mapStateToProps)(EditPayment);

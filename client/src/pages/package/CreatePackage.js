import axios from "axios";
import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { loadPackage } from "../../redux/action/laundry";

const CreatePackage = ({ auth: { loading, user }, laundry: { packages } }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [price, setPrice] = useState('');

  const handleSubmit = async (e, id) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const data = JSON.stringify({name, price});
    try {
        await axios.post(
            `http://localhost:5000/api/package/${id}/add_package`,
            data,
            config
        );
        dispatch(loadPackage(id));
    } catch (error) {
        console.error(error);
    }

    history.go(-1);
  };

  return !loading && packages ? (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 ">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom ">
        <h1 className="h2 text-dark">Tambah Tipe Pembayaran</h1>
      </div>
      <div>
        <div className="bg-light p-4">
          <h5>TAMBAH TIPE PEMBAYARAN</h5>
          <form
            onSubmit={(e) => handleSubmit(e, user.laundry)}
          >
            <div className="mb-3">
              <label className="">Name Paket</label>
              <input
                type="text"
                className="form-control"
                id="paket-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label className="">Harga</label>
              <input
                type="number"
                className="form-control"
                id="paket-harga"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
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

export default connect(mapStateToProps)(CreatePackage);

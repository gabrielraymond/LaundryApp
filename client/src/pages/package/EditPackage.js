import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import PageTitle from "../../components/PageTitle";

const EditPackage = ({ auth: { loading, user }, laundry: { packages } }) => {
  const history = useHistory();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const getPaket = () => {
      if (packages && id) {
        let paket = packages.filter((p) => p._id === id);
        setName(paket[0].name);
        setPrice(paket[0].price);
      }
    };
    getPaket();
  }, [id, packages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ name });
    await axios.post(
      `http://localhost:5000/api/package/update/${id}`,
      body,
      config
    );
    history.go(-1);
  };

  return !loading && packages ? (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 ">
      <PageTitle title="EDIT TIPE PEMBAYARAN" />
      <div className="">
        <div className=" bg-light my-3 p-3 bg-info border rounded shadow-sm">
          <h5>TAMBAH TIPE PEMBAYARAN</h5>
          <form onSubmit={(e) => handleSubmit(e, user.laundry)}>
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

export default connect(mapStateToProps)(EditPackage);

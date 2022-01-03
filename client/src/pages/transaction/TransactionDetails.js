import axios from "axios";
import React from "react";
import { connect, useDispatch } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { loadTransaction } from "../../redux/action/laundry";

const TransactionDetails = ({
  auth: { user, loading, isAuthenticated },
  laundry: { transactions },
}) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  let transaction = null;
  const getTransaction = () => {
    if (transactions && id) {
      transaction = transactions.filter((p) => p._id === id);
    }
    return transaction;
  };

  getTransaction();

  const handleChange = async (e) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (e.target.name === "payment_status") {
      await axios.post(
        `https://mern-laundry.herokuapp.com/api/transaction/update/${id}`,
        { payment_status: e.target.value },
        config
      );
    } else if (e.target.name === "status_order") {
      await axios.post(
        `https://mern-laundry.herokuapp.com/api/transaction/update/${id}`,
        { status_order: e.target.value },
        config
      );
    }

    console.log(e.target.value);
  };

  const handleBack = () => {
    dispatch(loadTransaction(user.laundry))
    history.go(-1);
  }

  return !loading && user && transactions ? (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="my-3 p-3 bg-dark text-light rounded shadow-sm">
        <h3 className="panel-title">Detail Transaksi</h3>
      </div>

      <div className="table-responsive my-3 p-3 bg-body rounded shadow ">
        <table className="table table-sm border border-secondary">
          <tbody>
            <tr>
              <td className="table-dark p-2" width="30%">
                No. Order
              </td>
              <td className="table p-2">{transaction[0].no_order}</td>
            </tr>
            <tr>
              <td className="table-dark p-2" width="30%">
                Nama Lengkap
              </td>
              <td className="table p-2">{transaction[0].name}</td>
            </tr>
            <tr>
              <td className="table-dark p-2" width="30%">
                Alamat
              </td>
              <td className="table p-2">{transaction[0].address}</td>
            </tr>
            <tr>
              <td className="table-dark p-2" width="30%">
                Telepon
              </td>
              <td className="table p-2">{transaction[0].phone_number}</td>
            </tr>
            <tr>
              <td className="table-dark p-2" width="30%">
                Tipe Pembayaran
              </td>
              <td className="table p-2">{transaction[0].payment}</td>
            </tr>
            <tr>
              <td className="table-dark p-2" width="30%">
                Status Pembayaran
              </td>
              <td className="table p-2">
                <label className="">Status Pembayaran</label>
                <select
                  className="form-select"
                  type="text"
                  name="payment_status"
                  onChange={handleChange}
                  defaultValue={transaction[0].payment_status}
                >
                  {transaction[0].payment_status === "Belum Lunas" && (
                    <option value="Belum Lunas">Belum Lunas</option>
                  )}
                  <option value="Lunas">Lunas</option>
                </select>
              </td>
            </tr>
            <tr>
              <td className="table-dark p-2" width="30%">
                Status Order
              </td>
              <td className="table p-2">
                <label className="">Status Order</label>
                <select
                  className="form-select"
                  type="text"
                  name="status_order"
                  onChange={handleChange}
                  defaultValue={transaction[0].status_order}
                >
                  <option value="Baru">Baru</option>
                  <option value="Proses">Proses</option>
                  <option value="Selesai">Selesai</option>
                  <option value="Diambil">Diambil</option>
                  <option value="Batal">Batal</option>
                </select>
              </td>
            </tr>
            <tr>
              <td className="table-dark p-2" width="30%">
                Tgl. Ambil
              </td>
              <td className="table p-2">
                {transaction[0].pick_up_date
                  .split("T")[0]
                  .split("-")
                  .reverse()
                  .join("/")}
              </td>
            </tr>
          </tbody>
        </table>
        <table className="table table-striped table-sm border border-secondary">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Tgl. Order</th>
              <th scope="col">Paket Laundry</th>
              <th scope="col">Berat Cucian</th>
              <th scope="col">Harga/Kg</th>
              <th scope="col">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {transaction[0].order.map((o, i = 0) => {
              return (
                <tr key={o._id}>
                  <td>{i + 1}</td>
                  <td>
                    {transaction[0].order_date
                      .split("T")[0]
                      .split("-")
                      .reverse()
                      .join("/")}
                  </td>
                  <td>{o.paket}</td>
                  <td>{o.quantity}</td>
                  <td>{o.price}</td>
                  <td>{o.quantity * o.price}</td>
                </tr>
              );
            })}
          </tbody>
          <tbody>
            <tr>
              <td colSpan="4">
                <center>Total Pesanan</center>
              </td>
              <td></td>
              <td className="table-warning">{transaction[0].subtotal}</td>
            </tr>
          </tbody>
        </table>
        <button className="btn btn-primary" onClick={() => handleBack()}>Process Order</button>
        <Link
          to={`/invoice/${user.laundry}/${transaction[0]._id}`}
          target="_blank"
        >
          <button className="btn btn-outline-warning ms-2">Cetak Invoice</button>
        </Link>

        
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

export default connect(mapStateToProps)(TransactionDetails);

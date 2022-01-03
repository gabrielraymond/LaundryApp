import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const TransactionPage = ({
  auth: { user, loading, isAuthenticated },
  laundry: { transactions },
}) => {
  const handleColorPayment = (p) => {
    if (p === "Lunas") {
      return "btn btn-success";
    } else if (p === "Belum Lunas") {
      return "btn btn-warning";
    }
  };
  const handleColorStatus = (p) => {
    if (p === "Baru") {
      return "btn btn-info";
    } else if (p === "Proses") {
      return "btn btn-secondary";
    } else if (p === "Selesai") {
      return "btn btn-warning";
    } else if (p === "Batal") {
      return "btn btn-danger";
    } else if (p === "Diambil") {
      return "btn btn-success";
    }
  };

  return !loading && user && transactions ? (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="my-3 p-3 bg-dark text-light rounded shadow-sm">
        <h3 className="panel-title">TRANSAKSI</h3>
      </div>
      <div className="table-responsive my-3 p-3 bg-body rounded shadow-sm border">
        <Link className="btn btn-secondary" to="/new_transaksi">
          <i className="fas fa-edit iconNav"></i>
          Tambah Transaksi
        </Link>

        <table className="table table-striped table-sm ">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Tgl. Transaksi</th>
              <th scope="col">Pembayaran</th>
              <th scope="col">Customer</th>
              <th scope="col">Paket</th>
              <th scope="col">Status Order</th>
              <th scope="col">Total</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, i = 0) => {
              return (
                transactions && (
                  <tr key={transaction._id}>
                    <td>{i + 1}</td>
                    <td>
                      {transaction.order_date
                        .split("T")[0]
                        .split("-")
                        .reverse()
                        .join("/")}
                    </td>
                    <td>
                      <div
                        className={handleColorPayment(
                          transaction.payment_status
                        )}
                      >
                        {transaction.payment_status}
                      </div>
                    </td>
                    <td>{transaction.name}</td>
                    <td>
                      <ul>
                        {transaction.order.map((o) => {
                          return (
                            <li key={o._id}>
                              {o.paket} ({o.quantity})
                            </li>
                          );
                        })}
                      </ul>
                    </td>
                    <td>
                      <div className={handleColorStatus(transaction.status_order)}>
                        {transaction.status_order}
                      </div>
                    </td>
                    <td>{transaction.subtotal}</td>
                    <td>
                      <Link
                        className="btn btn-primary"
                        to={`/edit_transaksi/${transaction._id}`}
                      >
                        Detail
                      </Link>
                    </td>
                  </tr>
                )
              );
            })}
          </tbody>
        </table>
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

export default connect(mapStateToProps)(TransactionPage);

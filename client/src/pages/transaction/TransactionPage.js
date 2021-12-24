import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const TransactionPage = ({
  auth: { user, loading, isAuthenticated },
  laundry: { transactions },
}) => {
  return !loading && user && transactions ? (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2 text-dark">Transactions</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2"></div>
        </div>
      </div>

      <h2>DATA TRANSACTIONS</h2>
      <Link className="btn btn-secondary" to="/new_transaksi">
        <i className="fas fa-edit iconNav"></i>
        Tambah Customer
      </Link>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
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
                    <td>{transaction.order_date.toLocaleString()}</td>
                    <td>
                      <div className="btn btn-success">
                        {transaction.payment_status}
                      </div>
                    </td>
                    <td>{transaction.name}</td>
                    <td>
                      <ul>
                        {transaction.order.map((o) => {
                          return <li>{o.paket} ({o.quantity})</li>;
                        })}
                      </ul>
                    </td>
                    <td><div className="btn btn-info">{transaction.status_order}</div></td>
                    <td>{transaction.subtotal}</td>
                    <td>
                      <Link
                        className="btn btn-primary"
                        // to={`/edit_customer/${customer._id}`}
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

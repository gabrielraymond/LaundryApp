import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Load from "../../components/Load";
import MiniStat from "../../components/MiniStat";
import PageTitle from "../../components/PageTitle";

const Dashboard = ({
  auth: { user, loading },
  laundry: { laundry, customers, transactions },
}) => {
  const [find, setFind] = useState("");
  
  return !loading && user && laundry && transactions && customers ? (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 ">
      <PageTitle title={`Selamat Datang di ${laundry.name}`} />
      <div className="row">
        <MiniStat
          data={customers.length}
          label="Total Customer"
          icon="fas fa-user-friends fs-3"
          bg="bg-info"
        />
        <MiniStat
          data={customers.length}
          label="Total Karyawan"
          icon="fas fa-user-friends fs-3"
          bg="bg-warning"
        />
        <MiniStat
          data={transactions.filter((t) => t.status_order === "Baru").length}
          label="Order Baru"
          icon="fas fa-shopping-cart fs-3"
          bg="bg-primary"
        />
        <MiniStat
          data={transactions.length}
          label="Total Order"
          icon="fas fa-shopping-cart fs-3"
          bg="bg-danger"
        />
      </div>

      <div className="table-responsive my-3 p-3 bg-body rounded shadow-sm border">
        <h5>Order Terbaru</h5>
        <label>Search : </label>
        <input onChange={(e) => setFind(e.target.value)} placeholder="Find by Customer" />
        <table className="table table-striped table-sm ">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Tgl. Transaksi</th>
              <th scope="col">Customer</th>
              <th scope="col">Paket</th>
              <th scope="col">Pembayaran</th>
              <th scope="col">Status Order</th>
              <th scope="col">Total</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {transactions
              .filter((t) =>
                find
                  ? t.name.toLowerCase().includes(find.toLowerCase())
                  : t.status_order === "Baru"
              )
              .map((transaction, i = 0) => {
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
                        <div>{transaction.payment_status}</div>
                      </td>
                      <td>
                        <div>{transaction.status_order}</div>
                      </td>
                      <td>Rp.{transaction.subtotal || 0},-</td>
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
    <Load />
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  laundry: state.laundry,
});

export default connect(mapStateToProps)(Dashboard);

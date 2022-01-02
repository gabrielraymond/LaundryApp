import React, { useState } from "react";
import { connect } from "react-redux";
import "./Laporan.css";

const Laporan = ({
  auth: { user, loading, isAuthenticated },
  laundry: { transactions, laundry },
}) => {
  const today = new Date();
  const [find, setFind] = useState(today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate());
  const [d, setD] = useState(0)
  let total = 0;

  return transactions && laundry && !loading ? (
    <div>
      <div id="contentwrapper" className="contentwrapper">
        <div id="judul">
          <br />
          <br />
          <font size="+2">LAPORAN PEMASUKAN HARIAN LAUNDRY </font>
          <br />
          {laundry.address}
          <br />
          Hp. {laundry.phone_number} Email :{laundry.email}{" "}
          Website : 
          <hr color="#eee" />{" "}
        </div>
        <label>Search : </label>
        <input
          onChange={(e) => setFind(e.target.value)}
          type="date"
          value={find}
          placeholder="Find by Customer"
        />
        <label className="ms-2">laporan : </label>
        <select
          onChange={(e) => setD(e.target.value)}
          type="number"
          value={d}
          placeholder="Find by Customer"
        >
        <option value="2">Hari</option>
        <option value="1">Bulan</option>
        <option value="0">Tahun</option>
        </select>
        <input
          type="submit"
          name="button"
          id="button"
          className="stdbtn ms-2"
          value="Print Laporan"
          onClick={() => window.print()}
        />
        
        <table className="table" border="2">
          <thead>
            <tr>
              <th>
                <i className="icon-terminal"></i> No
              </th>
              <th>
                <i className="icon-signal"></i> Tgl. Transaksi
              </th>
              <th>
                <i className="icon-signal"></i> Customer
              </th>
              <th>
                <i className="icon-terminal"></i> Paket
              </th>
              <th>
                <i className="icon-signal"></i> Harga
              </th>
              <th>
                <i className="icon-signal"></i> Status Order
              </th>
              <th>
                <i className="icon-signal"></i> Total
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions
              .filter((t) =>
                find.split("T")[0].split("-")[d]
                  === t.order_date.split("T")[0].split("-")[d]
              )
              .map((t, i) => {
                total = t.subtotal + total;
                return (
                  <tr key={t._id}>
                    <td>{i + 1}</td>
                    <td>
                      {
                        t.order_date.split("T")[0].split("-")
                        .reverse()
                        .join("/")
                      }
                    </td>
                    <td>{t.name}</td>
                    <td>
                      <ul>
                        {t.order.map((o) => {
                          return (
                            <li key={o._id}>
                              {o.paket} ({o.quantity})
                            </li>
                          );
                        })}
                      </ul>
                    </td>
                    <td>
                      <ul>
                        {t.order.map((o) => {
                          return <li key={o._id}>{o.price}</li>;
                        })}
                      </ul>
                    </td>

                    <td>{t.status_order}</td>
                    <td>Rp.{t.subtotal},-</td>
                  </tr>
                );
              })}
            <tr>
              <td colSpan="6" className="table-primary text-center">
                Total Pendapatan
              </td>
              <td>Rp.{total},-</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <h1>Loading...</h1>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  laundry: state.laundry,
});

export default connect(mapStateToProps)(Laporan);

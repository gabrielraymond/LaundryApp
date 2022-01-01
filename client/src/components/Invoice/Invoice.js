import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { loadLaundry } from "../../redux/action/laundry";
import "./Invoice.css";

const Invoice = ({
  auth: { user, loading, isAuthenticated },
  laundry: { transactions, laundry },
}) => {
  const { id, id_transaction } = useParams();
  const dispatch = useDispatch();
  let transaction = null;
  useEffect(() => {
    dispatch(loadLaundry(id));
  }, [dispatch, id]);
  const getTransaction = () => {
    if (transactions && id_transaction) {
      transaction = transactions.filter((p) => p._id === id_transaction);
    }
    return transaction;
  };

  getTransaction();
  return !loading && user && transactions && laundry ? (
    <div className="invoice">
      <div className="invoice-wrap">
        <button className="btn btn-warning" onClick={() => window.print()}>
          Cetak
        </button>
        <div className="invoice-inner">
          <table cellSpacing="0" cellPadding="0" border="0" width="100%">
            <tbody>
              <tr>
                <td valign="top" align="right">
                  <div className="business_info">
                    <table
                      cellSpacing="0"
                      cellPadding="0"
                      border="0"
                      width="100%"
                    >
                      <tbody>
                        <tr>
                          <td>
                            <span className="editable-area" id="business_info">
                              <p style={{ fontSize: "18pt" }}>
                                {laundry.name}{" "}
                              </p>
                              <p>
                                <br /> {laundry.address}
                                <br /> Telphon : {laundry.phone_number}
                                <br /> Email: {laundry.email}
                              </p>
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
                <td valign="top" align="right">
                  <p className="editable-text" id="extra">
                    <span style={{ fontSize: "18pt" }}>Invoice</span>
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="invoice-address">
            <table cellSpacing="0" cellPadding="0" border="0" width="100%">
              <tbody>
                <tr>
                  <td valign="top" align="left" width="50%">
                    <table cellSpacing="0" cellPadding="0" border="0">
                      <tbody>
                        <tr>
                          <td valign="top" width="">
                            <strong>
                              <span
                                className="editable-text"
                                id="label_bill_to"
                              >
                                Customer
                              </span>
                            </strong>
                          </td>
                          <td valign="top">
                            <div className="client_info">
                              <table cellSpacing="0" cellPadding="0" border="0">
                                <tbody>
                                  <tr>
                                    <td style={{ paddingLeft: "25px" }}>
                                      <span
                                        className="editable-area"
                                        id="client_info"
                                      >
                                        {transaction[0].name}
                                        <br />
                                        {transaction[0].address}
                                        <br />
                                        Telp: {transaction[0].phone_number}
                                      </span>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                  <td valign="top" align="right" width="50%">
                    <table cellSpacing="0" cellPadding="0" border="0">
                      <tbody>
                        <tr>
                          <td align="right">
                            <strong>
                              <span
                                className="editable-text"
                                id="label_invoice_no"
                              >
                                No. Order
                              </span>
                            </strong>
                          </td>
                          <td style={{ paddingLeft: "20px" }} align="left">
                            <span className="editable-text" id="no">
                              {transaction[0].no_order}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td align="right">
                            <strong>
                              <span className="editable-text" id="label_date">
                                Tgl. Transaksi
                              </span>
                            </strong>
                          </td>
                          <td style={{ paddingLeft: "20px" }} align="left">
                            <span className="editable-text" id="date">
                              {transaction[0].order_date
                                .split("T")[0]
                                .split("-")
                                .reverse()
                                .join("/")}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td align="right">
                            <strong>
                              <span className="editable-text" id="label_date">
                                Tgl. Ambil
                              </span>
                            </strong>
                          </td>
                          <td style={{ paddingLeft: "20px" }} align="left">
                            <span className="editable-text" id="date">
                              {transaction[0].pick_up_date
                                .split("T")[0]
                                .split("-")
                                .reverse()
                                .join("/")}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div id="items-list">
            <table className="table table-bordered table-condensed table-striped items-table">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Paket Laundry</th>
                  <th>Berat/KG</th>
                  <th>Harga</th>
                  <th width="100">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                
                {transaction[0].order.map((o, i = 0) => {
              return (
                <tr>
                  <td>{i + 1}</td>
                  <td>{o.paket}</td>
                  <td>{o.quantity}</td>
                  <td>Rp.{o.price},-</td>
                  <td>Rp.{o.quantity * o.price},-</td>
                </tr>
              );
            })}
              </tbody>

              <tfoot>
                <tr className="totals-row">
                  <td colSpan="3" className="wide-cell"></td>
                  <td>
                    <strong>Total</strong>
                  </td>
                  <td coslpan="2">Rp.{transaction[0].subtotal},-</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="notes-block">
            <div className="editable-area" id="notes">
              <b>Keterangan:</b>
            </div>
            <div className="notice">
              1. Pengambilan cucian harus membawa nota
            </div>
            <div className="notice">
              2. Cucian Luntur bukan tanggung jawab kami
            </div>
            <div className="notice">3. Hitung dan periksa sebelum pergi</div>
            <div className="notice">
              4. klaim kekurangan/kehilangan cucian setelah meninggalkan laundri
              tidak dilayani
            </div>
            <div className="notice">
              5. Cucian yang rusak/mengkerut karena sifat kain tidak dapat kami
              ganti
            </div>
            <div className="notice">
              6. Cucian yang tidak diambil lebih dari 1 bulan bukan tanggung
              jawab kami
            </div>
            <div className="notice">
              7. Maximal penggantian 10x dari total invoice dan barang menjadi
              milik kami
            </div>
          </div>
          &nbsp;
        </div>
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

export default connect(mapStateToProps)(Invoice);

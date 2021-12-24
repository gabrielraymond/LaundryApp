import axios from "axios";
import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { loadCustomer } from "../../redux/action/laundry";

const CreateTransaction = ({
  auth: { loading, user },
  laundry: { laundry, payments, packages, customers },
}) => {
  const dispatch = useDispatch();
  const [dataSum, setDataSum] = useState(0);
  const [customer, setCustomer] = useState("");
  const [payment, setPayment] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [pickUpDate, setPickUpDate] = useState("");
  const [data, setData] = useState({
    no_order: "",
    customer: "",
    name: "",
    phone_number: "",
    address: "",
    order: "",
    payment: "",
    payment_status: "",
    pick_up_date: "",
    status_order: "",
    subtotal: "",
    admin: "",
    user: "",
    laundry: "",
  });

  const [formValues, setFormValues] = useState([
    { paket: "", price: "", quantity: "" },
  ]);

  let handleChangeQty = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i]["quantity"] = e.target.value;
    setFormValues(newFormValues);
  };

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    if (e.target.value) {
      const dataPaket = packages.filter((p) => p._id === e.target.value);
      // newFormValues[i][e.target.name] = dataPaket[0].price;
      newFormValues[i]["paket"] = dataPaket[0].name;
      newFormValues[i]["price"] = dataPaket[0].price;

      setFormValues(newFormValues);
    }
  };

  let addFormFields = () => {
    setFormValues([...formValues, { paket: "", price: "", quantity: "" }]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  const handleSubmit = async (e, id) => {
    e.preventDefault();
    // console.log(JSON.stringify(formValues));
    if (user) {
      setData((data["admin"] = user.name));
    }

    if (customer) {
      let dataCustomer = customers.filter((c) => c._id === customer);
      setData((data["customer"] = customer));
      setData((data["name"] = dataCustomer[0].name));
      setData((data["phone_number"] = dataCustomer[0].phone_number));
      setData((data["address"] = dataCustomer[0].address));
    }

    if (formValues) {
      setData((data["order"] = formValues));
      let i = 0;
      formValues.map((o) => {
        i = o.price * o.quantity + i;
        return i;
      });
      setData((data["subtotal"] = i));
    }

    if (payment) {
      setData((data["payment"] = payment));
    }

    if (paymentStatus) {
      setData((data["payment_status"] = paymentStatus));
    }

    if (pickUpDate) {
      setData((data["pick_up_date"] = pickUpDate));
      var today = new Date();
      var date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      setData((data["order_date"] = date));
    }
    let noOrder = `ORD-${dataSum}`;
    setData((data["no_order"] = noOrder));
    setData((data["laundry"] = laundry._id));
    setData((data["user"] = user._id));

    // let data = {
    //   name: dataCustomer[0].name || "",
    //   order: JSON.stringify(formValues),
    // };
    console.log(data);
    console.log(data.order);

    // const dataPaket = packages.filter((p) => p._id === paket);
    // console.log(dataPaket[0].name, dataPaket[0].price);
    // const dataPembayaran = payments.filter((p) => p._id === payment);
    // console.log(dataPembayaran[0].name);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      await axios.post(
        `http://localhost:5000/api/transaction/${id}/add_transaction`,
        data,
        config
      );
    } catch (error) {
      dispatch(loadCustomer);
    }
  };

  return !loading && customers && packages ? (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 ">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom ">
        <h1 className="h2 text-dark">Order Laundry</h1>
      </div>
      <div>
        <div className="bg-light p-4">
          <h5>ORDER LAUNDRY</h5>
          <form onSubmit={(e) => handleSubmit(e, user.laundry)}>
            <div className="mb-3">
              <input
                className="form-control"
                type="text"
                placeholder={`ORD-00${dataSum}`}
                aria-label="Disabled input example"
                disabled
              />
              <label className="">Nama Customer</label>

              <select
                className="form-select"
                type="text"
                name="customer"
                onChange={(e) => setCustomer(e.target.value)}
                defaultValue={"default"}
              >
                <option disabled value={"default"}>
                  Pilih Customer
                </option>
                {customers.map((c) => {
                  return (
                    <option value={c._id} key={c._id}>
                      {c.name}
                    </option>
                  );
                })}
              </select>

              <label className="">Tipe Pembayaran</label>
              <select
                className="form-select"
                type="text"
                onChange={(e) => setPayment(e.target.value)}
                defaultValue={"default"}
              >
                <option disabled value={"default"}>
                  Pilih Tipe Pembayaran
                </option>
                {payments.map((p) => {
                  return (
                    <option value={p.name} key={p._id}>
                      {p.name}
                    </option>
                  );
                })}
              </select>
              <label className="">Status Pembayaran</label>
              <select
                className="form-select"
                type="text"
                onChange={(e) => setPaymentStatus(e.target.value)}
                defaultValue={"default"}
              >
                <option disabled value={"default"}>
                  Pilih Status Pembayaran
                </option>
                <option value="Belum Lunas">Belum Lunas</option>
                <option value="Lunas">Lunas</option>
              </select>
              <label className="">Tanggal Ambil</label>
              <input
                className="form-control"
                type="date"
                onChange={(e) => setPickUpDate(e.target.value)}
              />

              <div className="order-paket ms-3 mt-3 mb-3">
                <h5>Order</h5>
                {formValues.map((element, index) => (
                  <div className="form-inline row" key={index}>
                    <div className="col">
                      <label>Paket</label>
                      <select
                        className="form-select"
                        type="text"
                        name="price"
                        onChange={(e) => handleChange(index, e)}
                        defaultValue={"default"}
                      >
                        <option disabled value={"default"}>
                          Pilih Paket
                        </option>
                        {packages.map((p) => {
                          return (
                            <option value={p._id} key={p._id}>
                              {p.name}, Rp{p.price}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="col">
                      <label>Banyak/Berat(kg)</label>
                      <div className="input-group mb-3">
                        <input
                          className="form-control"
                          type="number"
                          name="quantity"
                          value={element.quantity || ""}
                          onChange={(e) => handleChangeQty(index, e)}
                          required
                        />

                        {index ? (
                          <button
                            type="button"
                            className="button remove btn btn-outline-secondary"
                            onClick={() => removeFormFields(index)}
                          >
                            Remove
                          </button>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))}
                <div className="button-section">
                  <button
                    className="button add btn btn-outline-primary"
                    type="button"
                    onClick={() => addFormFields()}
                  >
                    Add
                  </button>
                </div>
              </div>
              {/* <label className="">Nama Customer</label>
              <select
                className="form-control"
                type="text"
                onChange={(e) => setCustomer(e.target.value)}
                required
              >
                <option>Pilih Customer</option>

                {customers.map((c) => {
                  return (
                    <option value={c._id} key={c._id}>
                      {c.name}
                    </option>
                  );
                })}
              </select>

              <label className="">Paket Laundry</label>
              <select
                className="form-select"
                type="text"
                onChange={(e) => setPaket(e.target.value)}
              >
                {packages.map((p) => {
                  return (
                    <option value={p._id} key={p._id}>
                      {p.name}
                    </option>
                  );
                })}
              </select>
*/}
            </div>
            <button className="btn btn-primary me-2" type="submit">
              Create
            </button>
            <button className="btn btn-danger" type="button">
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

export default connect(mapStateToProps)(CreateTransaction);

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreatePayment from "../../pages/payment/CreatePayment";
import EditLaundry from "../../pages/laundry/EditLaundry";
import EditPayment from "../../pages/payment/EditPayment";
import EditProfile from "../../pages/EditProfile";
import Dashboard from "../../pages/main/Dashboard";
import PaymentPage from "../../pages/payment/PaymentPage";
import { loadLaundry } from "../../redux/action/laundry";
import Header from "../Header";
import Navbar from "../Navbar";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import PackagePage from "../../pages/package/PackagePage";
import CreatePackage from "../../pages/package/CreatePackage";
import EditPackage from "../../pages/package/EditPackage";
import CustomerPage from "../../pages/customer/CustomerPage";
import CreateCustomer from "../../pages/customer/CreateCustomer";
import EditCustomer from "../../pages/customer/EditCustomer";
import TransactionPage from "../../pages/transaction/TransactionPage";
import CreateTransaction from "../../pages/transaction/CreateTransaction";


const DefaultLayout = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    if(user){
      dispatch(loadLaundry(user.laundry))
    }
  })
  
  return (
    <div>
      <div>
        <Header />
        <div className="container-fluid">
          <div className="row">
            <Navbar />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/edit" component={EditProfile} />
            <PrivateRoute path="/identitas" component={EditLaundry} />
            <PrivateRoute path="/pembayaran" component={PaymentPage} />
            <PrivateRoute path="/new_payment" component={CreatePayment} />
            <PrivateRoute path="/edit_payment/:id" component={EditPayment} />
            <PrivateRoute path="/paket" component={PackagePage} />
            <PrivateRoute path="/new_paket" component={CreatePackage} />
            <PrivateRoute path="/edit_paket/:id" component={EditPackage} />
            <PrivateRoute path="/customer" component={CustomerPage} />
            <PrivateRoute path="/new_customer" component={CreateCustomer} />
            <PrivateRoute path="/edit_customer/:id" component={EditCustomer} />
            <PrivateRoute path="/transaction" component={TransactionPage} />
            <PrivateRoute path="/new_transaksi" component={CreateTransaction} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;

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
import TransactionDetails from "../../pages/transaction/TransactionDetails";
import { Redirect, Route } from "react-router-dom";
import AdminPage from "../../pages/user/admin/AdminPage";
import EmployeePage from "../../pages/user/employee/EmployeePage";
import EditEmployee from "../../pages/user/employee/EditEmployee";
import CreateEmployee from "../../pages/user/employee/CreateEmployee";

const DefaultLayout = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isLogged = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    if (user) {
      dispatch(loadLaundry(user.laundry));
    }
  }, [user, dispatch]);

  return user ? (
    <div>
      <div>
        <Header />
        <div className="container-fluid">
          <div className="row">
            <Navbar />
            {isLogged && (
              <>
              <Route exact path="/">
                <Redirect to="/dashboard" />
              </Route>
              <Route path="*">
                <Redirect to="/dashboard" />
              </Route>
              </>
            ) }
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/edit" component={EditProfile} />
            <PrivateRoute path="/customer" component={CustomerPage} />
            <PrivateRoute path="/new_customer" component={CreateCustomer} />
            <PrivateRoute path="/edit_customer/:id" component={EditCustomer} />
            <PrivateRoute path="/transaction" component={TransactionPage} />
            <PrivateRoute path="/new_transaksi" component={CreateTransaction} />
            <PrivateRoute
              path="/edit_transaksi/:id"
              component={TransactionDetails}
            />
            

            {user.status === "admin" && (
              <>
                <PrivateRoute path="/identitas" component={EditLaundry} />
                <PrivateRoute path="/pembayaran" component={PaymentPage} />
                <PrivateRoute path="/new_payment" component={CreatePayment} />
                <PrivateRoute
                  path="/edit_payment/:id"
                  component={EditPayment}
                />
                <PrivateRoute path="/paket" component={PackagePage} />
                <PrivateRoute path="/new_paket" component={CreatePackage} />
                <PrivateRoute path="/edit_paket/:id" component={EditPackage} />
                <PrivateRoute
                  path="/user/administrator"
                  component={AdminPage}
                />
                <PrivateRoute path="/user/employees" component={EmployeePage} />
                <PrivateRoute
                  path="/user/new_employee"
                  component={CreateEmployee}
                />
                <PrivateRoute
                  path="/user/edit_employee/:id"
                  component={EditEmployee}
                />
              </>
            )}
            
          </div>
        </div>
      </div>
    </div>
  ) : (
    <h1>Loading...</h1>
  );
};

export default DefaultLayout;

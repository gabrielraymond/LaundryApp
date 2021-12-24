import axios from "axios";
import {
  CUSTOMER_ERROR,
  CUSTOMER_LOADED,
  LAUNDRY_ERROR,
  LAUNDRY_LOADED,
  LAUNDRY_UPDATE,
  PACKAGE_ERROR,
  PACKAGE_LOADED,
  PAYMENT_ERROR,
  PAYMENT_LOADED,
  TRANSACTION_ERROR,
  TRANSACTION_LOADED,
} from "./types";

//load Laundry
export const loadLaundry = (id) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://localhost:5000/api/laundry/get_laundry/${id}`
    );
    dispatch({
      type: LAUNDRY_LOADED,
      payload: res.data,
    });
    dispatch(loadPayment(id));
    dispatch(loadPackage(id));
    dispatch(loadCustomer(id));
    dispatch(loadTransaction(id));
  } catch (error) {
    dispatch({
      type: LAUNDRY_ERROR,
    });
  }
};

export const loadPayment = (id) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://localhost:5000/api/payment/${id}/get_payments`
    );
    dispatch({
      type: PAYMENT_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PAYMENT_ERROR,
    });
  }
};

export const loadPackage = (id) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://localhost:5000/api/package/${id}/get_packages`
    );
    dispatch({
      type: PACKAGE_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PACKAGE_ERROR,
    });
  }
};

export const loadCustomer = (id) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://localhost:5000/api/customer/${id}/get_customers`
    );
    dispatch({
      type: CUSTOMER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: CUSTOMER_ERROR,
    });
  }
};

export const loadTransaction = (id) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://localhost:5000/api/transaction/${id}/get_transactions`
    );
    dispatch({
      type: TRANSACTION_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: TRANSACTION_ERROR,
    });
  }
};

// export const deletePayment = (id, payment_id) => async (dispatch) => {
//   try {
//     const res = await axios.delete(
//       `http://localhost:5000/api/payment/delete/${payment_id}`
//     );
//     dispatch({
//       type: PAYMENT_DELETE,
//       payload: res.data,
//     });
//     dispatch(loadPayment(id));
//   } catch (error) {
//     dispatch({
//       type: PAYMENT_ERROR,
//     });
//   }
// };

// export const addPayment = (id, body) => async (dispatch) => {
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };
//   try {
//     const res = await axios.post(
//       `http://localhost:5000/api/payment/${id}/add_payment`,
//       body,
//       config
//     );
//     dispatch({
//       type: PAYMENT_ADD,
//       payload: res.data,
//     });
//     dispatch(loadPayment(id));
//   } catch (error) {
//     dispatch({
//       type: PAYMENT_ERROR,
//     });
//   }
// };

//edit Laundry
export const editLaundry = (id, body) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(
      `http://localhost:5000/api/laundry/edit_laundry/${id}`,
      body,
      config
    );
    dispatch({
      type: LAUNDRY_UPDATE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: LAUNDRY_ERROR,
    });
  }
};

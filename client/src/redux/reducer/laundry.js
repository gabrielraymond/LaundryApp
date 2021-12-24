import {
  LAUNDRY_ERROR,
  LAUNDRY_LOADED,
  LAUNDRY_UPDATE,
  PAYMENT_LOADED,
  PAYMENT_ERROR,
  PACKAGE_LOADED,
  PACKAGE_ERROR,
  CUSTOMER_LOADED,
  CUSTOMER_ERROR,
  TRANSACTION_LOADED,
  TRANSACTION_ERROR,
} from "../action/types";

const initialState = {
  laundry: null,
  loading: true,
  payments: null,
  packages: null,
  customers: null,
  transactions: null,
};

export default function foo(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LAUNDRY_LOADED:
    case LAUNDRY_UPDATE:
      return {
        ...state,
        loading: false,
        laundry: payload,
      };
    case PAYMENT_LOADED:
      return {
        ...state,
        loading: false,
        payments: payload,
      };
    case PACKAGE_LOADED:
      return {
        ...state,
        loading: false,
        packages: payload,
      };
    case CUSTOMER_LOADED:
      return {
        ...state,
        loading: false,
        customers: payload,
      };
    case TRANSACTION_LOADED:
      return {
        ...state,
        loading: false,
        transactions: payload,
      };
    case LAUNDRY_ERROR:
    case PAYMENT_ERROR:
    case PACKAGE_ERROR:
    case CUSTOMER_ERROR:
    case TRANSACTION_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}

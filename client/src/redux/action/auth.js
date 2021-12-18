import axios from "axios";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  USER_LOADED,
  AUTH_ERROR,
  USER_UPDATE,
  UPDATE_ERROR
} from "./types";
import setAuthToken from "../../utils/setAuthToken";

//Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("http://localhost:5000/api/user/get_user/");

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//Update User
export const updateUser = (id, body) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post(`http://localhost:5000/api/user/edit_user/${id}`, body, config)
    dispatch({
      type: USER_UPDATE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_ERROR,
    });
  }

}

export const login = (body) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post(
      "http://localhost:5000/api/user/login",
      body,
      config
    );
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

//Logout
export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};

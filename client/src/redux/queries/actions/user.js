import axios from "axios";
import {
  EDIT_USER,
  GET_USER_SUCCESS,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
} from "../constants/user";

const apexAPI = "http://46.202.173.77:8000";

// Register user
export const register = (formData) => async (dispatch) => {
  const headers = {
    "Content-Type": "application/json",
  };

  const config = {
    headers: headers,
  };

  try {
    const { data } = await axios.post(
      `${apexAPI}/api/user/register`,
      {
        password: formData.password,
        phone: formData.phone,
      },
      config
    );

    dispatch({ type: REGISTER_SUCCESS, payload: data });

    localStorage.setItem("userAccount", JSON.stringify(data));
  } catch (error) {
    console.log(error);
    if (error) {
      window.location.href = "./register";
      alert("Invalid phone number or short password.");
    }
  }
};

// Login user
export const login = (formData) => async (dispatch) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Methods": "POST",
    "Access-Control-Allow-Origin": ["https://apex-adverts.netlify.app"],
  };

  const config = {
    headers: headers,
  };

  try {
    const { data } = await axios.post(
      `${apexAPI}/api/user/login`,
      {
        phone: formData.phone,
        password: formData.password,
      },
      config
    );

    dispatch({ type: LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userAccount", JSON.stringify(data));
    // if (data) {
    //   alert("Logged in successfully.");
    // }
  } catch (error) {
    console.log(error);
    if (error) {
      window.location.href = "./login";
      alert("Password or phone number is wrong.");
    }
  }
};

export const editUser = (id, editForm) => async (dispatch) => {
  const data = localStorage.getItem("userAccount");
  const token = JSON.parse(data);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token.data}`,
    "Access-Control-Allow-Origin": ["https://apex-adverts.netlify.app"],
  };
  const config = {
    headers: headers,
  };
  try {
    const { data } = await axios.put(
      `${apexAPI}/api/auth/editUser/${id}`,
      config,
      {
        editForm,
      }
    );

    dispatch({ type: EDIT_USER, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

// Get user
export const getUser = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${apexAPI}/api/auth/getUser/${id}`);

    dispatch({ type: GET_USER_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

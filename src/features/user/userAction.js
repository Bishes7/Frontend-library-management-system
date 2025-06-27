import { getaccessJWT } from "../../services/authApiConnector";
import { fetchAllUsersApi, fetchUserApi } from "./userApi";
import { setAllUsers, setUser } from "./userSLice";

export const fetchUserAction = () => async (dispatch) => {
  // call api
  const { status, payload } = await fetchUserApi();
  // dispatch users to redux
  status === "success" && payload?._id && dispatch(setUser(payload));
};

export const autoLogin = () => async (dispatch) => {
  // get the access JWT from session storage
  const accessJWT = sessionStorage.getItem("accessJWT");

  if (accessJWT) {
    dispatch(fetchUserAction());
    return;
  }

  //   get refreshJWT from localstorage
  const refreshJWT = localStorage.getItem("refreshJWT");

  if (refreshJWT) {
    // fetch accessJWT and store in session storage

    const { payload } = await getaccessJWT();
    if (payload) {
      sessionStorage.setItem("accessJWT", payload);
      dispatch(fetchUserAction());
    }
  }
};

// call api to fetch all users
export const fetchAllUsers = () => async (dispatch) => {
  const { status, payload } = await fetchAllUsersApi();
  status === "success" && dispatch(setAllUsers(payload));
};

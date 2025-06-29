import { getaccessJWT } from "../../services/authApiConnector";
import {
  deleteUserApi,
  fetchAllUsersApi,
  fetchUserApi,
  updateUserStatusAPi,
} from "./userApi";
import { setAllUsers, setDeleteUser, setUser } from "./userSLice";

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

// call api to delete the user
export const deleteSelectedUser = (_id) => async (dispatch) => {
  const { status } = await deleteUserApi(_id);

  status === "success" && dispatch(setDeleteUser(_id));
};

// call the api to update the status
export const updateUserStatusAction = (_id) => async (dispatch) => {
  const { status } = await updateUserStatusAPi(_id);
  status === "success" && dispatch(fetchAllUsers());
};

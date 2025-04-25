import { fetchUserApi } from "./userApi";
import { setUser } from "./userSLice";

export const fetchUserAction = () => async (dispatch) => {
  // call api
  const { status, payload } = await fetchUserApi();

  // dispatch users to redux
  status === "success" && payload?._id && dispatch(setUser(payload));
};

export const autoLogin = () => (dispatch) => {
  // get the access JWT from session storage
  const accessJWT = sessionStorage.getItem("accessJWT");

  if (accessJWT) {
    dispatch(fetchUserAction());
    return;
  }
};

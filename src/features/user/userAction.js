import { fetchUserApi } from "./userApi";
import { setUser } from "./userSLice";

export const fetchUserAction = () => async (dispatch) => {
  // call api
  const { status, payload } = await fetchUserApi();

  // receiver user

  // dispatch users to redux
  status === "success" && payload?._id && dispatch(setUser(payload));
};

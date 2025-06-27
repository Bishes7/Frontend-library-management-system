import axios from "axios";
import { toast } from "react-toastify";
import { getaccessJWT } from "./authApiConnector";

// getting excessJWT
const getAccessJWT = () => {
  return sessionStorage.getItem("accessJWT");
};

// getting
const getRefreshJWT = () => {
  return localStorage.getItem("refreshJWT");
};

export const apiConnector = async ({
  url,
  method,
  payload,
  showToast,
  isPrivateRoute,
  isRefreshJWT,
}) => {
  try {
    const headers = {};

    if (isPrivateRoute) {
      const token = isRefreshJWT ? getRefreshJWT() : getAccessJWT();
      headers.authorization = "bearer " + token;
    }

    const responsePending = axios({
      method,
      url,
      data: payload,
      headers,
    });

    // if (showToast) {
    //   toast.promise(responsePending, {
    //     pending: "Please wait..",
    //   });
    // }
    const { data } = await responsePending;
    showToast && toast[data.status](data.message);

    return data;
  } catch (error) {
    const message = error?.response?.data?.message;
    showToast && toast.error(message);

    // if jwt is expired
    if (error?.response?.status === 401) {
      if (message === "jwt expired") {
        // calling api to get new access jwt
        const { payload } = await getaccessJWT();

        if (payload) {
          sessionStorage.setItem("accessJWT", payload);
          return apiConnector({
            url,
            method,
            payload,
            showToast,
            isPrivateRoute,
            isRefreshJWT,
          });
        }
      } else {
        sessionStorage.removeItem("accessJWT");
        localStorage.removeItem("refreshJWT");
        return {
          status: "error",
          message: message,
        };
      }
    }
  }
};

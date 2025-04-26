import axios from "axios";
import { toast } from "react-toastify";

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

    if (showToast) {
      toast.promise(responsePending, {
        pending: "Please wait..",
      });
    }
    const { data } = await responsePending;
    showToast && toast[data.status](data.message);

    return data;
  } catch (error) {
    console.log(error);
    const message = error?.response?.data?.message || error.message;
    showToast && toast.error(message);

    return {
      status: "error",
      message: message,
    };
  }
};

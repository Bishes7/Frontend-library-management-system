import axios from "axios";
import { toast } from "react-toastify";
export const apiConnector = async ({ url, method, payload, showToast }) => {
  try {
    const responsePending = axios({
      method,
      url,
      data: payload,
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

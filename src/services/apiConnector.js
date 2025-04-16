import axios from "axios";
export const apiConnector = async ({ url, method, payload }) => {
  try {
    const response = await axios({
      method,
      url,
      data: payload,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

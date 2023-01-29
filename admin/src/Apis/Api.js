import axios from "axios";
import Url from "./Url";

const Api = async function (option, isHeader = true) {
  let authHeader = null;
  let BASE_URL = Url.BASE_URL;

  const APIClient = axios.create({
    baseURL: BASE_URL,
    // headers: {Authentication: authHeader},
  });

  const OnSuccess = function (response) {
    // console.debug(" Request Successfully ", response);
    if (response.request._method == "GET") {
      return response.request._response;
    } else {
      return response.data;
    }
  };

  const OnError = function (error) {
    if (error.response) {
      console.debug("Status :", error.response);
      console.debug("Data : ", error.response.data);
      console.debug("Headers:", error.response.header);
      return error.response;
    } else {
      // Something wrong with the request
      console.debug("Error Message : ", error.message);
      return error;
    }
  };

  return APIClient(option).then(OnSuccess).catch(OnError);
};

export default Api;
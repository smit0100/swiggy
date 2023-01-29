import Api from "./Api";
import Url from "./Url";

function GetRequests() {
  return Api({
    url: "/fetchAll",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export default {
    GetRequests
}
import Api from "./Api";

function GetOrders() {
  return Api({
    url: "order/allOrder",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
export default {
    GetOrders
}
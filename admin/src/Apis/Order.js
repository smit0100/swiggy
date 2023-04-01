import Api from "./Api";

function GetOrders(num) {
  return Api({
    url: `order/allOrder?pageNumber=${num}&pageSize=10`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
function GetOneOrder(id) {
  return Api({
    url: `order/fetchOneOrder?id=${id}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
function GetUserOrders(id) {
  return Api({
    url: "order/user",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body:{id}
  });
}
export default {
    GetOrders,GetUserOrders,GetOneOrder
}
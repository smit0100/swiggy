import Api from "./Api";

function GetRequests() {
  return Api({
    url: "/resturant/fetchAll",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
function getOneProduct(id) {
  return Api({
    url: `/resturant/products?id=${id}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
function handleApprove(id) {
  return Api({
    url: `/resturant/approve/${id}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export default {
    GetRequests,getOneProduct,handleApprove
}
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
function handleRequest(id,req) {
  return Api({
    url: `/resturant/${req}/${id}`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export default {
    GetRequests,getOneProduct,handleRequest
}
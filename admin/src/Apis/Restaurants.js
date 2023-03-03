import Api from "./Api";

function GetRequests(num) {
  return Api({
    url: `/resturant/getAllPending`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function GetApprovedRestaurant() {
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
  console.log("==id,req",id,req);
  return Api({
    url: `/resturant/${req}/${id}`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export default {
    GetRequests,getOneProduct,handleRequest,GetApprovedRestaurant
}
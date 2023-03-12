import Api from "./Api";

function GetRequests() {
  return Api({
    url: `/courier/fetchpending`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function GetApprovedRestaurant() {
  return Api({
    url: "/courier/fetchAll",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
function getOneProduct(id) {
  return Api({
    url: `/courier/products?id=${id}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
function handleRequest(id,req) {
  console.log("==id,req",id,req);
  return Api({
    url: `/courier/${req}/${id}`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export default {
    GetRequests,getOneProduct,handleRequest,GetApprovedRestaurant
}
import Api from "./Api";

function GetRequests(startNum,endNum) {
  return Api({
    url: `/courier/fetchpending?pageNumber=${startNum}&pageSize=${endNum}`,
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
    url: `/courier/${req}?id=${id}`,
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export default {
    GetRequests,getOneProduct,handleRequest,GetApprovedRestaurant
}
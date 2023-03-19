import Api from "./Api";

function GetCounts() {
  return Api({
    url: `/resturant/dashBoard`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
function GetRequests(startNum,endNum) {
  return Api({
    url: `/resturant/getAllPending?pageNumber=${startNum}&pageSize=${endNum}`,
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
function handleRequest(id, req) {
  console.log("==id,req", id, req);
  return Api({
    url: `/resturant/${req}/${id}`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export default {
  GetRequests,
  getOneProduct,
  handleRequest,
  GetApprovedRestaurant,
  GetCounts,
};

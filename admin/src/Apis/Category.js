import Api from "./Api";

function AddMainCategory(data) {
  return Api({
    url: `/category/add`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  });
}
function AddSubCategory(data) {
  console.log("==data",data);
  return Api({
    url: `/subcategory/add`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  });
}
function getAllCategory() {
  return Api({
    url: `/category/all`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
export default {
  AddMainCategory,
  getAllCategory,
  AddSubCategory,
};

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
function deleteCategory(id) {
  return Api({
    url: `/category/delete?userId=${id}`,
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
export default {
  AddMainCategory,
  getAllCategory,
  AddSubCategory,
  deleteCategory
};

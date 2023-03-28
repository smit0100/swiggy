import Api from "./Api";

function GetContactUs() {
  return Api({
    url: "/contact/getallform",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
function SendResponse(data) {
  return Api({
    url: `/contact/response`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  });
}
function deleteInquiry(id) {
  return Api({
    url: `/contact/delete?id=${id}`,
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
export default {
  GetContactUs,
  SendResponse,
  deleteInquiry
};

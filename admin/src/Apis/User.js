import Api from "./Api";
function GetAllUsers(startNum,endNum) {
  return Api({
    url: `/user/fetchAll?pageNumber=${startNum}&pageSize=${endNum}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
function GetOneUser(id) {
  return Api({
    url: `/user/userforadmin?userId=${id}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
function AdminLogIn(data) {
  return Api({
    url: `/user/loginAsAdmin`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  });
}
function ForgotPasswords(data) {
  return Api({
    url: `/user/forgotAdmin`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  });
}
function editUser(data) {
  return Api({
    url: `/user/edit`,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data
  });
}
function deleteUser(id) {
  return Api({
    url: `/user/delete?userId=${id}`,
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
function sendNotificationToAll(data) {
  return Api({
    url: `/user/notification`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data
  });
}
export default {
  GetAllUsers,
  GetOneUser,
  AdminLogIn,
  ForgotPasswords,
  editUser,
  deleteUser,
  sendNotificationToAll
};

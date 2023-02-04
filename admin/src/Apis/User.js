import Api from "./Api";
function GetAllUsers() {
    return Api({
      url: "/user/fetchAll",
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
      }
    });
  }

export default {
    GetAllUsers,GetOneUser
}
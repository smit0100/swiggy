const admin = require("firebase-admin");
const serviceAccount = require("../swiggy.json");
const axios = require('axios');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://swigggy-a5d1b-default-rtdb.firebaseio.com/",
});

function sendNotification(token, payload) {
  const message = {
    notification: {
      title: payload.title,
      body: payload.body,
      image: payload?.image,
    },
    token: token,
  };

  admin
    .messaging()
    .send(message)
    .then((response) => {
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      console.log("Error sending message:", error);
    });
}

const sendNotificationToAll = (tokens, payload) => {
  const data = {
    registration_ids: tokens,
    notification: {
      title: payload.title,
      body: payload.body,
    },
  };
  const headers = {
    Authorization:
      "key=AAAA1hK46SY:APA91bFhN1R-PILlAjh4cDEfUdoN1m0w9SxKnhUONYGm9bH_8veyqB6OtixCeu-piqinRBW_bwJmpYIZv2XEtAN0ziuGuO6goRj5Pw-J1wfg5kyUIyzoR791GCjJXBfmdNb6QZ4nLo4I",
    "Content-Type": "application/json",
  };
  axios
    .post("https://fcm.googleapis.com/fcm/send", data, { headers: headers })
    .then((response) => {
      console.log("===>send notification", response.data);
    })
    .catch((error) => {
      console.error("=====error notification", error);
    });
};
module.exports = { sendNotification, sendNotificationToAll };

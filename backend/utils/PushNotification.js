const admin = require("firebase-admin");
const serviceAccount = require("../swiggy.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://swigggy-a5d1b-default-rtdb.firebaseio.com/",
});

function sendNotification(token, payload) {
  const message = {
    notification: {
      title: payload.title,
      body: payload.body,
      image: payload?.image
    },
    token:token,
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
module.exports = { sendNotification };
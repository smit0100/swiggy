// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGsZQB9BdrdzS1U4GSZl-aPJ9d1lvbIH8",
  authDomain: "swigggy-a5d1b.firebaseapp.com",
  projectId: "swigggy-a5d1b",
  storageBucket: "swigggy-a5d1b.appspot.com",
  messagingSenderId: "919437109542",
  appId: "1:919437109542:web:f81e5ad49c1724f163b9e7",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const messaging = getMessaging(firebaseApp);

export const requestForToken = (setTokenFound) => {
  return getToken(messaging, {
    vapidKey:
      "BFBFIdBb0SgT3xtuEVed4SLVT0k-t09X-IBna87O4KOS52bzeFtI59-kRgY-y-W1LeYxQwI1duFtgZwjawkUzks",
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        setTokenFound(true);
        if (currentToken) {
          localStorage.setItem("fcmTokenDelivery", currentToken);
        }
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
        setTokenFound(false);
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // catch error while creating client token
    });
};
// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker `messaging.onBackgroundMessage` handler.
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

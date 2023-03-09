// const admin = require('firebase-admin');
// const io = require('socket.io')(3000); // replace with your desired port


// admin.initializeApp({
//     apiKey: "AIzaSyAj7olQ8vLI6hCOCXLxyHRwLJfBISOpoU4",
//     authDomain: "swiggy-38368.firebaseapp.com",
//     projectId: "swiggy-38368",
//     storageBucket: "swiggy-38368.appspot.com",
//     messagingSenderId: "180466138164",
//     appId: "1:180466138164:web:5f1e5d15f4a371c6571e61",
//     measurementId: "G-836C0S5734"
// });
  

// io.on('connection', (socket) => {
//     console.log('Client connected');
  
//     // handle incoming registration requests
//     socket.on('register', (token) => {
//       console.log('FCM registration token:', token);
  
//       // store the registration token in your database, along with the socket ID
//       // you can use the socket ID to send notifications to this particular user
//     });
  
//     // handle incoming notification requests
//     socket.on('notify', (userId, notification) => {
//       console.log('Sending notification to user:', userId);
  
//       // look up the user's registration token and socket ID in your database
//       // you can use the socket ID to send the notification to the correct WebSocket connection
  
//       // send the notification using the Firebase Admin SDK
//       const message = {
//         token: registrationToken,
//         notification: {
//           title: notification.title,
//           body: notification.message,
//         },
//       };
  
//       admin.messaging().send(message)
//         .then((response) => {
//           console.log('Successfully sent message:', response);
//         })
//         .catch((error) => {
//           console.error('Error sending message:', error);
//         });
//     });
// });
  




  

 
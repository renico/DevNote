var admin = require("firebase-admin");

var serviceAccount = require("./devnotes-a69c3-firebase-adminsdk-oqcbq-5fbd2abcf9.json");

//var refreshToken; // Get refresh token from OAuth2 flow

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://devnotes-a69c3.firebaseio.com"
});
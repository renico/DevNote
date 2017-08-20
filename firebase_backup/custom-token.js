var admin = require("firebase-admin");
var serviceAccount = require("./devnotes-a69c3-firebase-adminsdk-oqcbq-5fbd2abcf9.json");
var uid = "y1HYlzXKTQgBH3V9P2n7bUPbywB3";
var additionalClaims = {
  premiumAccount: true
};

//var refreshToken; // Get refresh token from OAuth2 flow

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://devnotes-a69c3.firebaseio.com"
});

admin.auth().createCustomToken(uid, additionalClaims)
  .then(function(customToken) {
    // Send token back to client
    console.log("creating custom token:");
  })
  .catch(function(error) {
    console.log("Error creating custom token:", error);
  });
const dotenv = require("dotenv");
const firebase = require("firebase-admin");
dotenv.config();
if (process.env.prod) {
} else {
}
const config = {
  type: "service_account",
  project_id: "gator-sublease",
  private_key_id: process.env.FB_PRIVATE_KEY_ID,
  private_key: process.env.FB_PRIVATE_KEY.replace(/\\n/g, "\n"),
  client_email: process.env.FB_CLIENT_EMAIL,
  client_id: "117662486992189493181",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-e9feo%40gator-sublease.iam.gserviceaccount.com",
};
firebase.initializeApp({
  credential: firebase.credential.cert(config),
});
// const FirebaseAuth = require("firebaseauth"); // or import FirebaseAuth from 'firebaseauth';
// const firebase = new FirebaseAuth(process.env.FB_API_KEY);
module.exports = firebase;

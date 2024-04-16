import * as admin from "firebase-admin";

// Initialize Firestore
console.log("Loading service account key file...");
const serviceAccount = require("../firebase/yumrun-6c523-firebase-adminsdk-faxsi-5a8c7974ba.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
console.log("Firebase is up and runing.");
const db = admin.firestore();

export default db;

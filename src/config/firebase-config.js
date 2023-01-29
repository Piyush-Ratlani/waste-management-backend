// https://blog.logrocket.com/storing-retrieving-data-react-native-apps-firebase/

const admin = require('firebase-admin');
// const serviceAccount = require('./smartbin-c93c9-f0288fc59d7d.json');
const serviceAccount = {
  type: 'service_account',
  project_id: process.env.FIREBASE_project_id,
  private_key_id: process.env.FIREBASE_private_key_id,
  private_key: process.env.FIREBASE_private_key,
  client_email: process.env.FIREBASE_client_email,
  client_id: process.env.FIREBASE_client_id,
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url: process.env.FIREBASE_client_x509_cert_url,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://smartbin-c93c9-default-rtdb.firebaseio.com',
});

const firbaseDB = admin.database();

module.exports = { firbaseDB };

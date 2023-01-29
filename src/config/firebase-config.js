// https://blog.logrocket.com/storing-retrieving-data-react-native-apps-firebase/

const admin = require('firebase-admin');
const serviceAccount = require('./smartbin-c93c9-f0288fc59d7d.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://smartbin-c93c9-default-rtdb.firebaseio.com',
});

const firbaseDB = admin.database();

module.exports = { firbaseDB };

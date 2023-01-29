require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const socketIO = require('socket.io');
const { firbaseDB } = require('./config/firebase-config');

require('./models/admin');
require('./models/employee');
require('./models/dustbin');
const Dustbin = mongoose.model('Dustbin');
const authRoutes = require('./routes/authRoutes');
const appRoutes = require('./routes/appRoutes');

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;

// Connect to MongoDB
mongoose.connect(MONGO_URI);
const database = mongoose.connection;

database.on('error', err => console.log(err));
database.once('connected', () => console.log('Database Connected'));

const app = express();
app.use(express.json());

const server = app.listen(PORT, () => {
  console.log('Listening on PORT:', PORT);
});

app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);

app.use(authRoutes);
app.use(appRoutes);

// Initialize Socket.io
const io = socketIO(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});
io.on('connection', socket => {
  console.log('Socket connected: ', socket.id);

  // Listen for updates from Firebase
  const firebaseRef = firbaseDB.ref('bins');
  firebaseRef.on('child_changed', snapshot => {
    const binId = snapshot.key;
    const binData = snapshot.val();
    const garbageLevel = binData.Garbage_Level;

    // Update the corresponding MongoDB document
    Dustbin.findOneAndUpdate(
      { dustbinId: binId },
      { $set: { level: garbageLevel } },
      (err, doc) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`Updated MongoDB document: ${doc}`);
        }
      }
    );

    // Send the updated data to the frontend via Socket.io
    socket.emit('bin_updated', { binId, garbageLevel });

    // Handle socket disconnection
    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });
});

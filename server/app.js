const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');

const app = express();

// Initialize Firestore
console.log('Loading service account key file...');
const serviceAccount = require('./firebase/yumrun-6c523-firebase-adminsdk-faxsi-5a8c7974ba.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();
console.log('Service account key file loaded successfully.');

// Middleware
app.use(bodyParser.json());

// Routes

// Read data from Firestore
app.get('/api/users', async (req, res) => {
  try {
    const usersRef = db.collection('users');
    const snapshot = await usersRef.get();
    const users = snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() }));
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const user = req.body;
    const docRef = await db.collection('users').add(user);
    const newUser = await docRef.get();
    res.json({ id: docRef.id, data: newUser.data() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// get specific user
app.get('/api/users/:id', async (req, res) => {
  console.log('runing user specific query')
  try {
    const userId = req.params.id;
    console.log(userId)
    const user = await db.collection('users').doc(userId).get();
    if (!user.exists) {
      res.status(404).json({ error: 'User not found!' });
    } else {
      res.json({ id: user.id, data: user.data() });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// post new user
app.post('/api/users', async (req, res) => {
  try {
    const user = req.body;
    const docRef = await db.collection('users').add(user);
    const newUser = await docRef.get();
    res.json({ id: docRef.id, data: newUser.data() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
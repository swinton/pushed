require('dotenv').config()

const firebase = require('firebase')

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJET_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
}
firebase.initializeApp(config)

// Get a reference to the database service
const database = firebase.database();

module.exports = (robot) => {
  robot.on('push', async context => {
    // Save this payload in Firebase
    context.log('Code was pushed %j', context.payload)
    database.ref(`pushed/${context.payload.repository.full_name}`).set(context.payload);
  })
}

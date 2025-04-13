import admin from 'firebase-admin';
import dotenv from 'dotenv';
// import path from 'path';

dotenv.config();

// Path to your service account JSON file
// const serviceAccountPath = path.resolve(__dirname, '../../src/config/firebaseServiceAccount.json');
const firebaseConfig = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '{}');
// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig),
    databaseURL: process.env.FIREBASE_DATABASE_URL, // Firestore Database URL from Firebase Console
});

// Firestore database instance
const db = admin.firestore();

export { db };

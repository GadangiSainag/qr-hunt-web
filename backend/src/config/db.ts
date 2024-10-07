import admin from 'firebase-admin';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

// Path to your service account JSON file
const serviceAccountPath = path.resolve(__dirname, '../../src/config/firebaseServiceAccount.json');

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccountPath),
    databaseURL: process.env.FIREBASE_DATABASE_URL, // Firestore Database URL from Firebase Console
});

// Firestore database instance
const db = admin.firestore();

export { db };

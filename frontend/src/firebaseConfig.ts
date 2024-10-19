// Import necessary Firebase modules
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import 'dotenv'
// Firebase configuration (replace this with your actual Firebase project config)
const firebaseConfig = {
    apiKey: import.meta.env.VITE_REACT_APP_ADMIN_API_KEY,
    authDomain: import.meta.env.VITE_REACT_APP_ADMIN_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_REACT_APP_ADMIN_PROJECT_ID,
    storageBucket: import.meta.env.VITE_REACT_APP_ADMIN_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_REACT_APP_ADMIN_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_REACT_APP_ADMIN_APP_ID,
  };

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firestore and export it
export const db = getFirestore(app);

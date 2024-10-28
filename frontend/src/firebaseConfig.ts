// Import necessary Firebase modules
import { initializeApp } from "firebase/app";
import {
  collection,
  doc,
  DocumentData,
  getFirestore,
  onSnapshot,
  QuerySnapshot,
} from "firebase/firestore";

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

// Function to listen for real-time data changes from a collection
export const listenToCollection = (
  collectionName: string,
  fieldsToInclude: string[],
  callback: (data: DocumentData[]) => void
) => {
  const colRef = collection(db, collectionName);

  return onSnapshot(colRef, (snapshot: QuerySnapshot<DocumentData>) => {
    
    const data = snapshot.docs.map((doc) => {
      const docData = doc.data();
      // Include only the specified fields in the returned object
      const filteredData: { [key: string]: any } = { id: doc.id };

      fieldsToInclude.forEach((field) => {
        if (docData[field] !== undefined) {
          filteredData[field] = docData[field];
        }
      });
      return filteredData;
    });
    callback(data);
  });
};

export const listenToDocument = (
  collectionName: string,
  docId: string,
  fieldsToInclude: string[],
  callback: (data: DocumentData) => void
) => {
  const docRef = doc(db, collectionName, docId);

  return onSnapshot(docRef, (snapshot) => {
    const docData = snapshot.data();

    if (docData) {
      // Include only the specified fields in the returned object
      const filteredData: { [key: string]: any } = { id: snapshot.id };

      fieldsToInclude.forEach((field) => {
        if (docData[field] !== undefined) {
          filteredData[field] = docData[field];
        }
      });

      callback(filteredData);
    } else {
      console.warn(
        `Document ${docId} in collection ${collectionName} not found.`
      );
      callback(null);
    }
  });
};

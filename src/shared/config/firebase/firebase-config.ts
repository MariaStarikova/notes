// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCzWWtLP-5EPWA3jLa7tMBOBNUNXhSoRuU',
  authDomain: 'notes-3a3aa.firebaseapp.com',
  projectId: 'notes-3a3aa',
  storageBucket: 'notes-3a3aa.firebasestorage.app',
  messagingSenderId: '74885457579',
  appId: '1:74885457579:web:ca3424db8ee63e3ea2b9ee'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

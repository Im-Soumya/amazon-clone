import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyChOp7HcCjg5bV9LqvvbLD_IKYRBsGRN88",
  authDomain: "clone-5c53d.firebaseapp.com",
  projectId: "clone-5c53d",
  storageBucket: "clone-5c53d.appspot.com",
  messagingSenderId: "787314374922",
  appId: "1:787314374922:web:5eaf4b05bfce82943822f3",
  measurementId: "G-NGMY6KYWC9"
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { db, auth };
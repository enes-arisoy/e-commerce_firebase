// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from 'firebase/auth';
import { getFirestore} from 'firebase/firestore';
import { getStorage} from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbqffbGiaDuytCu1a01YCjSS7KQzPIu4Q",
  authDomain: "e-commerce-firebase-824f0.firebaseapp.com",
  projectId: "e-commerce-firebase-824f0",
  storageBucket: "e-commerce-firebase-824f0.appspot.com",
  messagingSenderId: "937355028591",
  appId: "1:937355028591:web:92ac6668279957dd2b859a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage, app };


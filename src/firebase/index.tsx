// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
import "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  
  // apiKey: "AIzaSyBP6Pw8oDFP4INgX2DqdvbtC-htFE6Sxjo",
  // authDomain: "bme-conference-management.firebaseapp.com",
  // projectId: "bme-conference-management",
  // storageBucket: "bme-conference-management.appspot.com",
  // messagingSenderId: "483963472850",
  // appId: "1:483963472850:web:c53c3c34fa05ca5708160b",
  // measurementId: "G-L8YPVQLMDF"

  apiKey: "AIzaSyDBmgPSlR-ZdTYZGs_XoUcb90vTuN7K1f0",
  authDomain: "bme-conference-management-2.firebaseapp.com",
  projectId: "bme-conference-management-2",
  storageBucket: "bme-conference-management-2.appspot.com",
  messagingSenderId: "713571769892",
  appId: "1:713571769892:web:5cd35b31f803d9286b02b1",
  measurementId: "G-G8GRQKE0YN"
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export const db = getFirestore(app);

export const projectsCollection = collection(db, "projects");

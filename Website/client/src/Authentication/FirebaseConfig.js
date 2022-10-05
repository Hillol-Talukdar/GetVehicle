import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCwDHT7vTlIs2cXMdC9Ymk8FQtb2KxN04M",
  authDomain: "getvehicle.firebaseapp.com",
  projectId: "getvehicle",
  storageBucket: "getvehicle.appspot.com",
  messagingSenderId: "548775009365",
  appId: "1:548775009365:web:19b35f8e7e5360e1bbc8dc"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();
import { initializeApp } from "firebase/app";
import { getAuth } from "@firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBXaa6ncgKb8Ph6vWS0mnd3fjSKCfB6y5Q",
  authDomain: "gmowith.firebaseapp.com",
  projectId: "gmowith",
  storageBucket: "gmowith.appspot.com",
  messagingSenderId: "719019628528",
  appId: "1:719019628528:web:b1a06534e298e228cfaf35",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

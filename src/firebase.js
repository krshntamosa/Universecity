import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyApkkWoDCf4PdsG0ogUa0gcxlSim_eTjZ0",
  authDomain: "universecity-ca72c.firebaseapp.com",
  databaseURL: "https://universecity-ca72c-default-rtdb.firebaseio.com",
  projectId: "universecity-ca72c",
  storageBucket: "universecity-ca72c.appspot.com",
  messagingSenderId: "939503998247",
  appId: "1:939503998247:web:a344ee6a1d96bab55bc502",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const useAuth = () => {
  return auth;
};

export { app, auth, database, useAuth };

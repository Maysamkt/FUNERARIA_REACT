import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBKjVqgxi9RkazvI6nw48yPLl5MLvS4cPE",
  authDomain: "funeraria-dbe6f.firebaseapp.com",
  projectId: "funeraria-dbe6f",
  storageBucket: "funeraria-dbe6f.firebasestorage.app",
  messagingSenderId: "795859051674",
  appId: "1:795859051674:web:ec732afea0cb14df4d6b23",
};

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);

// Exportando Auth e Firestore
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

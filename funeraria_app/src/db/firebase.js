import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "sua_chave",
  authDomain: "seu_domínio",
  projectId: "id_projeto",
  storageBucket: "ref_balde",
  messagingSenderId: "id_envio_mensagem",
  appId: "id_aplicação",
};

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);

// Exportando Auth e Firestore
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

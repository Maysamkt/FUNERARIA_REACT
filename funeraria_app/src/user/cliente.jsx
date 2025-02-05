import { db } from "../db/firebase";
import { collection, addDoc } from "firebase/firestore";

// Função que recebe um objeto com os dados do cliente
export async function addCliente(clienteData) {
  try {
    const docRef = await addDoc(collection(db, "clientes"), clienteData);
    console.log("Cliente adicionado com ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Erro ao adicionar cliente: ", e);
    throw e;
  }
}

export default addCliente;

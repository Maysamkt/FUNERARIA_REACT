import { db } from "../db/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const clientesCollection = collection(db, "clientes");

// Adicionar Cliente
export async function addCliente(clienteData) {
  try {
    const docRef = await addDoc(clientesCollection, clienteData);
    return docRef.id;
  } catch (e) {
    console.error("Erro ao adicionar cliente: ", e);
    throw e;
  }
}

// Buscar Clientes
export async function fetchClientes() {
  try {
    const querySnapshot = await getDocs(clientesCollection);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Erro ao buscar clientes: ", error);
    return [];
  }
}

// Atualizar Cliente
export async function updateCliente(id, updatedData) {
  try {
    const clienteRef = doc(db, "clientes", id);
    await updateDoc(clienteRef, updatedData);
  } catch (error) {
    console.error("Erro ao atualizar cliente: ", error);
  }
}

// Deletar Cliente
export async function deleteCliente(id) {
  try {
    await deleteDoc(doc(db, "clientes", id));
  } catch (error) {
    console.error("Erro ao deletar cliente: ", error);
  }
}

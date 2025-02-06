import { db } from "../db/firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

// Adicionar produto/serviço
export async function addProduto(produtoData) {
  try {
    const docRef = await addDoc(collection(db, "produtos"), produtoData);
    console.log("Produto adicionado com ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Erro ao adicionar produto: ", e);
    throw e;
  }
}

// Buscar todos os produtos/serviços
export async function fetchProdutos() {
  try {
    const querySnapshot = await getDocs(collection(db, "produtos"));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (e) {
    console.error("Erro ao buscar produtos: ", e);
    throw e;
  }
}

// Atualizar produto/serviço
export async function updateProduto(id, updatedData) {
  try {
    const produtoRef = doc(db, "produtos", id);
    await updateDoc(produtoRef, updatedData);
  } catch (e) {
    console.error("Erro ao atualizar produto: ", e);
    throw e;
  }
}

// Deletar produto/serviço
export async function deleteProduto(id) {
  try {
    await deleteDoc(doc(db, "produtos", id));
  } catch (e) {
    console.error("Erro ao deletar produto: ", e);
    throw e;
  }
}

import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../db/firebase";

const ClientesList = () => {
  const [clientes, setClientes] = useState([]);

  // Função para buscar todos os clientes
  const fetchClientes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "clientes"));
      const clientesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setClientes(clientesData);
    } catch (error) {
      console.error("Erro ao buscar clientes: ", error);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  // Função para deletar um cliente
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "clientes", id));
      setClientes(clientes.filter((cliente) => cliente.id !== id));
    } catch (error) {
      console.error("Erro ao deletar cliente: ", error);
    }
  };

  // Função para atualizar um cliente (exemplo atualizando o nome)
  const handleUpdate = async (id, updatedData) => {
    try {
      const clienteRef = doc(db, "clientes", id);
      await updateDoc(clienteRef, updatedData);
      // Atualiza o estado local para refletir as mudanças
      setClientes(
        clientes.map((cliente) =>
          cliente.id === id ? { ...cliente, ...updatedData } : cliente
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar cliente: ", error);
    }
  };

  return (
    <div>
      <h2>Lista de Clientes</h2>
      {clientes.length === 0 ? (
        <p>Nenhum cliente cadastrado.</p>
      ) : (
        <ul>
          {clientes.map((cliente) => (
            <li key={cliente.id} style={{ marginBottom: "1rem" }}>
              <p>
                <strong>Nome:</strong> {cliente.nome}
              </p>
              <p>
                <strong>Email:</strong> {cliente.email}
              </p>
              <p>
                <strong>Telefone:</strong> {cliente.telefone}
              </p>
              <p>
                <strong>Endereço:</strong> {cliente.endereco}
              </p>
              <p>
                <strong>Data do Contrato:</strong>{" "}
                {cliente.dataContrato && cliente.dataContrato.toDate
                  ? cliente.dataContrato.toDate().toLocaleDateString()
                  : cliente.dataContrato}
              </p>
              <button onClick={() => handleDelete(cliente.id)}>Deletar</button>
              {/* Exemplo simples: atualiza o nome através de um prompt */}
              <button
                onClick={() => {
                  const novoNome = prompt("Novo nome:", cliente.nome);
                  if (novoNome !== null && novoNome.trim() !== "") {
                    handleUpdate(cliente.id, { nome: novoNome });
                  }
                }}
              >
                Atualizar Nome
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClientesList;

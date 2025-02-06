import { useEffect, useState } from "react";
import { fetchClientes, deleteCliente, updateCliente } from "../model/cliente";
import "../styles/clientesList.css"

const ClientesList = () => {
  const [clientes, setClientes] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    endereco: "",
    dataContrato: "",
  });

  useEffect(() => {
    fetchClientes().then(setClientes);
  }, []);

  // Função para deletar cliente
  const handleDelete = async (id) => {
    await deleteCliente(id);
    setClientes(clientes.filter((cliente) => cliente.id !== id));
  };

  // Função para abrir o formulário de edição
  const handleEdit = (cliente) => {
    setEditandoId(cliente.id);
    setFormData({
      nome: cliente.nome || "",
      email: cliente.email || "",
      telefone: cliente.telefone || "",
      endereco: cliente.endereco || "",
      dataContrato: cliente.dataContrato?.toDate
        ? cliente.dataContrato.toDate().toISOString().split("T")[0]
        : "",
    });
  };

  // Função para atualizar o estado do formulário
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Função para salvar as alterações
  const handleSave = async () => {
    await updateCliente(editandoId, {
      ...formData,
      dataContrato: formData.dataContrato
        ? new Date(formData.dataContrato)
        : null,
    });

    setClientes(
      clientes.map((cliente) =>
        cliente.id === editandoId ? { ...cliente, ...formData } : cliente
      )
    );

    setEditandoId(null);
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
              {editandoId === cliente.id ? (
                // Formulário de Edição com melhor organização
                <div className="form-container">
                  <label>Nome:</label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                  />

                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />

                  <label>Telefone:</label>
                  <input
                    type="text"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                  />

                  <label>Endereço:</label>
                  <input
                    type="text"
                    name="endereco"
                    value={formData.endereco}
                    onChange={handleChange}
                  />

                  <label>Data do Contrato:</label>
                  <input
                    type="date"
                    name="dataContrato"
                    value={formData.dataContrato}
                    onChange={handleChange}
                  />

                  <div className="form-buttons">
                    <button onClick={handleSave}>Salvar</button>
                    <button onClick={() => setEditandoId(null)}>
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                // Exibição dos dados do cliente
                <div>
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
                  <button id="delete" onClick={() => handleDelete(cliente.id)}>
                    Deletar
                  </button>
                  <button onClick={() => handleEdit(cliente)}>Alterar</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClientesList;

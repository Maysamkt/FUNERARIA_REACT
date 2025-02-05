import { useState } from "react";
import { addCliente } from "../user/cliente";
import { useNavigate } from "react-router-dom";

const Contrato = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [dataContrato, setDataContrato] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Cria um objeto com os dados preenchidos
    const clienteData = {
      nome,
      email,
      telefone,
      endereco,
      dataContrato: dataContrato ? new Date(dataContrato) : new Date(),
    };

    try {
      await addCliente(clienteData);
      alert("Cliente adicionado com sucesso!");
      navigate("/clientes"); // Redireciona de volta para a página principal ou de perfil
    } catch (error) {
      console.error("Erro ao adicionar cliente:", error);
      alert("Erro ao adicionar cliente!");
    }
  };

  return (
    <div>
      <h2>Adicionar Cliente e Contrato</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Telefone:</label>
          <input
            type="text"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Endereço:</label>
          <input
            type="text"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Data do Contrato:</label>
          <input
            type="date"
            value={dataContrato}
            onChange={(e) => setDataContrato(e.target.value)}
          />
        </div>
        <button type="submit">Adicionar Cliente</button>
      </form>
    </div>
  );
};

export default Contrato;

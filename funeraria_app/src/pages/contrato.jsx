import { useState, useEffect } from "react";
import { addCliente, fetchClientes, updateCliente } from "../model/cliente";
import { useNavigate } from "react-router-dom";

const Contrato = () => {
  const [clientes, setClientes] = useState([]);
  const [clienteSelecionado, setClienteSelecionado] = useState("");
  const [dadosCliente, setDadosCliente] = useState(null);
  const [contratoData, setContratoData] = useState("");
  const [novoCliente, setNovoCliente] = useState({
    nome: "",
    email: "",
    telefone: "",
    endereco: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchClientes().then(setClientes);
  }, []);

  const handleSelectChange = (e) => {
    const clienteId = e.target.value;
    setClienteSelecionado(clienteId);

    if (clienteId === "novo") {
      setDadosCliente(null); // Esconde os dados do cliente selecionado
    } else {
      const cliente = clientes.find((c) => c.id === clienteId);
      setDadosCliente(cliente);
    }
  };

  const handleNovoClienteChange = (e) => {
    setNovoCliente({ ...novoCliente, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!contratoData) {
      alert("Por favor, insira a data do contrato.");
      return;
    }

    if (clienteSelecionado === "novo") {
      if (
        !novoCliente.nome ||
        !novoCliente.email ||
        !novoCliente.telefone ||
        !novoCliente.endereco
      ) {
        alert("Todos os campos do novo cliente são obrigatórios!");
        return;
      }

      const clienteData = {
        ...novoCliente,
        dataContrato: new Date(contratoData),
      };
      await addCliente(clienteData);
    } else {
      await updateCliente(clienteSelecionado, {
        dataContrato: new Date(contratoData),
      });
    }

    alert("Contrato atualizado com sucesso!");
    navigate("/clientes");
  };

  return (
    <div>
      <h2>Adicionar Contrato</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Selecionar Cliente:</label>
          <select value={clienteSelecionado} onChange={handleSelectChange}>
            <option value="">Escolha um cliente</option>
            <option value="novo">Cadastrar Novo Cliente</option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nome}
              </option>
            ))}
          </select>
        </div>

        {clienteSelecionado !== "novo" && dadosCliente && (
          <div className="cliente-info">
            <h3>Dados do Cliente</h3>
            <p>
              <strong>Nome:</strong> {dadosCliente.nome}
            </p>
            <p>
              <strong>Email:</strong> {dadosCliente.email}
            </p>
            <p>
              <strong>Telefone:</strong> {dadosCliente.telefone}
            </p>
            <p>
              <strong>Endereço:</strong> {dadosCliente.endereco}
            </p>
          </div>
        )}

        {clienteSelecionado === "novo" && (
          <div className="novo-cliente">
            <h3>Novo Cliente</h3>
            <input
              type="text"
              name="nome"
              placeholder="Nome"
              value={novoCliente.nome}
              onChange={handleNovoClienteChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={novoCliente.email}
              onChange={handleNovoClienteChange}
              required
            />
            <input
              type="text"
              name="telefone"
              placeholder="Telefone"
              value={novoCliente.telefone}
              onChange={handleNovoClienteChange}
              required
            />
            <input
              type="text"
              name="endereco"
              placeholder="Endereço"
              value={novoCliente.endereco}
              onChange={handleNovoClienteChange}
              required
            />
          </div>
        )}

        <div>
          <label>Data do Contrato:</label>
          <input
            type="date"
            value={contratoData}
            onChange={(e) => setContratoData(e.target.value)}
            required
          />
        </div>

        <button type="submit">Salvar Contrato</button>
      </form>
    </div>
  );
};

export default Contrato;

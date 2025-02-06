import { useState, useEffect } from "react";
import { addCliente, fetchClientes, updateCliente } from "../model/cliente";
import { fetchProdutos } from "../model/produto";
import { useNavigate } from "react-router-dom";
import "../styles/contrato.css"

const Contrato = () => {
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [clienteSelecionado, setClienteSelecionado] = useState("");
  const [dadosCliente, setDadosCliente] = useState(null);
  const [contratoData, setContratoData] = useState("");
  const [produtosSelecionados, setProdutosSelecionados] = useState([]);
  const [novoCliente, setNovoCliente] = useState({
    nome: "",
    email: "",
    telefone: "",
    endereco: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchClientes().then(setClientes);
    fetchProdutos().then(setProdutos);
  }, []);

  const handleSelectChange = (e) => {
    const clienteId = e.target.value;
    setClienteSelecionado(clienteId);

    if (clienteId === "novo") {
      setDadosCliente(null);
    } else {
      const cliente = clientes.find((c) => c.id === clienteId);
      setDadosCliente(cliente);
    }
  };

  const handleNovoClienteChange = (e) => {
    setNovoCliente({ ...novoCliente, [e.target.name]: e.target.value });
  };

  const handleProdutoChange = (produtoId) => {
    const produto = produtos.find((p) => p.id === produtoId);
    if (produto) {
      setProdutosSelecionados((prev) => [
        ...prev,
        { ...produto, quantidade: 1, precoUnitario: produto.preco },
      ]);
    }
  };

  const handleQuantidadeChange = (index, quantidade) => {
    const atualizados = [...produtosSelecionados];
    atualizados[index].quantidade = parseInt(quantidade, 10) || 1;
    setProdutosSelecionados(atualizados);
  };

  const handlePrecoUnitarioChange = (index, preco) => {
    const atualizados = [...produtosSelecionados];
    atualizados[index].precoUnitario = parseFloat(preco) || 0;
    setProdutosSelecionados(atualizados);
  };

  const handleRemoverProduto = (index) => {
    const atualizados = [...produtosSelecionados];
    atualizados.splice(index, 1);
    setProdutosSelecionados(atualizados);
  };

  const calcularTotal = () => {
    return produtosSelecionados.reduce(
      (total, produto) => total + produto.precoUnitario * produto.quantidade,
      0
    );
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
        produtos: produtosSelecionados,
      };
      await addCliente(clienteData);
    } else {
      await updateCliente(clienteSelecionado, {
        dataContrato: new Date(contratoData),
        produtos: produtosSelecionados,
      });
    }

    alert("Contrato atualizado com sucesso!");

    // Direcionar para uma página de contrato, com as informações do contrato
    navigate("/contrato-feito", {
      state: {
        cliente: dadosCliente,
        produtos: produtosSelecionados,
        total: calcularTotal(),
      },
    });
  };

  return (
    <div className="container">
      <h2>Adicionar Contrato</h2>
      <form onSubmit={handleSubmit} className="form">
        {/* Seleção do Cliente */}
        <div className="form-group">
          <label>Selecionar Cliente:</label>
          <select id="cli" value={clienteSelecionado} onChange={handleSelectChange}>
            <option value="">Escolha um cliente</option>
            <option value="novo">Cadastrar Novo Cliente</option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nome}
              </option>
            ))}
          </select>
        </div>

        {/* Exibição de Dados do Cliente */}
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

        {/* Cadastro de Novo Cliente */}
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

        {/* Seleção de Produtos */}
        <div className="form-group">
          <label>Selecionar Produtos:</label>
          <select id="prod" onChange={(e) => handleProdutoChange(e.target.value)}>
            <option value="">Escolha um produto</option>
            {produtos.map((produto) => (
              <option key={produto.id} value={produto.id}>
                {produto.nome} - R$ {produto.preco.toFixed(2)}
              </option>
            ))}
          </select>
        </div>

        {/* Lista de Produtos Selecionados */}
        {produtosSelecionados.length > 0 && (
          <div className="produtos-selecionados">
            <h3>Produtos Selecionados</h3>
            {produtosSelecionados.map((produto, index) => (
              <div key={produto.id} className="produto-item">
                <p>
                  <strong>{produto.nome}</strong>
                </p>
                <label>Quantidade:</label>
                <input
                  type="number"
                  min="1"
                  value={produto.quantidade}
                  onChange={(e) =>
                    handleQuantidadeChange(index, e.target.value)
                  }
                />
                <label>Preço Unitário:</label>
                <input
                  type="number"
                  step="0.01"
                  value={produto.precoUnitario}
                  onChange={(e) =>
                    handlePrecoUnitarioChange(index, e.target.value)
                  }
                />
                <button
                  type="button"
                  onClick={() => handleRemoverProduto(index)}
                >
                  Remover
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Total do Contrato */}
        <div className="form-group">
          <h4>Total: R$ {calcularTotal().toFixed(2)}</h4>
        </div>

        {/* Data do Contrato */}
        <div className="form-group">
          <label>Data do Contrato:</label>
          <input
            type="date"
            value={contratoData}
            onChange={(e) => setContratoData(e.target.value)}
            required
          />
        </div>

        <button id="salvar" type="submit">Salvar Contrato</button>
      </form>
    </div>
  );
};

export default Contrato;

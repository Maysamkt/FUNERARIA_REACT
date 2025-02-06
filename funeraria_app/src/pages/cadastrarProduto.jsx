import { useState } from "react";
import { addProduto } from "../model/produto";
import { useNavigate } from "react-router-dom";

const CadastroProduto = () => {
  const [produto, setProduto] = useState({
    nome: "",
    descricao: "",
    preco: "",
    categoria: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setProduto({ ...produto, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !produto.nome ||
      !produto.descricao ||
      !produto.preco ||
      !produto.categoria
    ) {
      alert("Todos os campos são obrigatórios!");
      return;
    }

    try {
      await addProduto({
        nome: produto.nome,
        descricao: produto.descricao,
        preco: parseFloat(produto.preco),
        categoria: produto.categoria,
      });

      alert("Produto/Serviço cadastrado com sucesso!");
      navigate("/produtos");
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
      alert("Erro ao adicionar produto!");
    }
  };

  return (
    <div className="container">
      <h2>Cadastro de Produto/Serviço</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            value={produto.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Descrição:</label>
          <textarea
            name="descricao"
            value={produto.descricao}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Preço (R$):</label>
          <input
            type="number"
            name="preco"
            step="0.01"
            value={produto.preco}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Categoria:</label>
          <select
            name="categoria"
            value={produto.categoria}
            onChange={handleChange}
            required
          >
            <option value="">Selecione</option>
            <option value="caixão">Caixão</option>
            <option value="urna">Urna</option>
            <option value="flores">Flores</option>
            <option value="serviço">Serviço</option>
          </select>
        </div>
        <button type="submit">Cadastrar Produto</button>
      </form>
    </div>
  );
};

export default CadastroProduto;

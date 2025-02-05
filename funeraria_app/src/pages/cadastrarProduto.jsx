import { useState } from "react";
import { addProduto } from "../model/produto";
import { useNavigate } from "react-router-dom";

const CadastroProduto = () => {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nome || !preco) {
      alert("Todos os campos são obrigatórios!");
      return;
    }

    try {
      await addProduto({ nome, preco: parseFloat(preco) });
      alert("Produto adicionado com sucesso!");
      navigate("/produtos");
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
      alert("Erro ao adicionar produto!");
    }
  };

  return (
    <div>
      <h2>Cadastro de Produto/Serviço</h2>
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
          <label>Preço:</label>
          <input
            type="number"
            step="0.01"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            required
          />
        </div>
        <button type="submit">Adicionar Produto</button>
      </form>
    </div>
  );
};

export default CadastroProduto;

import { useEffect, useState } from "react";
import { fetchProdutos, deleteProduto, updateProduto } from "../model/produto";
import "../styles/produtosList.css"

const ProdutosList = () => {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    fetchProdutos().then(setProdutos);
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteProduto(id);
      setProdutos(produtos.filter((produto) => produto.id !== id));
    } catch (error) {
      console.error("Erro ao deletar produto: ", error);
    }
  };

  const handleUpdate = async (id) => {
    const novoNome = prompt("Novo nome:", "");
    const novoPreco = prompt("Novo preço:", "");

    if (novoNome && novoPreco) {
      await updateProduto(id, { nome: novoNome, preco: parseFloat(novoPreco) });
      setProdutos(
        produtos.map((produto) =>
          produto.id === id
            ? { ...produto, nome: novoNome, preco: novoPreco }
            : produto
        )
      );
    }
  };

  return (
    <div>
      <h2>Lista de Produtos/Serviços</h2>
      {produtos.length === 0 ? (
        <p>Nenhum produto cadastrado.</p>
      ) : (
        <ul>
          {produtos.map((produto) => (
            <li key={produto.id} style={{ marginBottom: "1rem" }}>
              <p>
                <strong>Nome:</strong> {produto.nome}
              </p>
              <p>
                <strong>Preço:</strong> R$ {produto.preco}
              </p>
              <button id="delete" onClick={() => handleDelete(produto.id)}>Deletar</button>
              <button onClick={() => handleUpdate(produto.id)}>Alterar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProdutosList;

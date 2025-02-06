import { useLocation } from "react-router-dom";

const ContratoFeito = () => {
  const location = useLocation();
  const { cliente, produtos, total } = location.state || {};

  // Verificação adicional para garantir que todos os dados estão disponíveis
  if (!cliente || !produtos || total === undefined) {
    return <div>Erro: Nenhuma informação de contrato encontrada.</div>;
  }

  // Função para formatar o valor para o formato de moeda
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <div className="container">
      <h2>Contrato Feito</h2>

      <div className="cliente-info">
        <h3>Dados do Cliente</h3>
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
      </div>

      <div className="produtos-info">
        <h3>Produtos Selecionados</h3>
        <table>
          <thead>
            <tr>
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Preço Unitário</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto) => (
              <tr key={produto.id}>
                <td>{produto.nome}</td>
                <td>{produto.quantidade}</td>
                <td>{formatCurrency(produto.precoUnitario)}</td>
                <td>
                  {formatCurrency(produto.quantidade * produto.precoUnitario)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="total">
        <h3>Total do Contrato</h3>
        <p>
          <strong>Valor Total:</strong> {formatCurrency(total)}
        </p>
      </div>
    </div>
  );
};

export default ContratoFeito;

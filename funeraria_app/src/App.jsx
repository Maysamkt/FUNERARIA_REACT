import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import { auth } from "./db/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import Profile from "./model/profile";
import Contrato from "./pages/contrato";
import ClientesList from "./pages/clientesList";
import ProdutosList from "./pages/produtosList";
import CadastroProduto from "./pages/cadastrarProduto";
import ContratoFeito from "./pages/contratoFeito";
import logo from "./assets/logo.png";

const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <Router>
      {/* Cabeçalho fixo */}
      <header>
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" width={"800px"} />
        </div>
        <nav>
          {user ? (
            <>
              <Link to="/contrato">
                <button>Contrato</button>
              </Link>
              <Link to="/clientes">
                <button>Listar Clientes</button>
              </Link>
              <Link to="/profile">
                <button>Minha Conta</button>
              </Link>
              <Link to="/produtos">
                <button>Listar Produtos</button>
              </Link>
              <Link to="/produtos/cadastro">
                <button>Cadastrar Produtos</button>
              </Link>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <h2>Faça Login ou Registre-se para ter acesso</h2>
            </>
          )}
        </nav>
      </header>

      {/* Conteúdo Principal */}
      <div className="main-content">
        {!user ? (
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              id="pass"
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button id="Login" onClick={handleLogin}>Login</button>
            <button id="Regis" onClick={handleRegister}>Registrar</button>
          </div>
        ) : (
          <h2>Bem-vindo, {user.email}</h2>
        )}

        <Routes>
          {user && <Route path="/contrato" element={<Contrato />} />}
          {user && <Route path="/clientes" element={<ClientesList />} />}
          {user && (
            <Route path="/produtos/cadastro" element={<CadastroProduto />} />
          )}

          {user && <Route path="/contrato-feito" element={<ContratoFeito />} />}
          {user && <Route path="/produtos" element={<ProdutosList />} />}
          {user && <Route path="/profile" element={<Profile />} />}
        </Routes>
      </div>

      {/* Rodapé */}
      <footer>
        <p>&copy; 2025 - FoiDeBase Funerária</p>
      </footer>
    </Router>
  );
};

export default App;

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import { auth } from "./db/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import Profile from "./user/profile";
import Contrato from "./pages/contrato";
import ClientesList from "./pages/clientesList";
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
                <button>Adicionar Cliente</button>
              </Link>
              <Link to="/clientes">
                <button>Ver Clientes</button>
              </Link>
              <Link to="/profile">
                <button>Perfil</button>
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
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleRegister}>Registrar</button>
          </div>
        ) : (
          <h2>Bem-vindo, {user.email}</h2>
        )}

        <Routes>
          {user && <Route path="/contrato" element={<Contrato />} />}
          {user && <Route path="/clientes" element={<ClientesList />} />}
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

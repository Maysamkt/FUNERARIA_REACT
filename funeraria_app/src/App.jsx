import { useState } from "react";
import { auth } from "./db/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import Profile from "./user/profile";

const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false); // Controlar exibição do Profile

  // Função para registrar o usuário
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

  // Função para fazer login
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

  // Função para fazer logout
  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    setShowProfile(false); // Esconde o perfil quando o usuário faz logout
  };

  // Alternar a visualização do perfil
  const handleShowProfile = () => {
    setShowProfile(true);
  };

  return (
    <div>
      <h1>Firebase Authentication</h1>
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
        <div>
          <h2>Bem-vindo, {user.email}</h2>
          <button onClick={handleShowProfile}>Perfil de Usuário</button>
          <button onClick={handleLogout}>Logout</button>

          {/* Exibe o componente Profile se o estado showProfile for verdadeiro */}
          {showProfile && <Profile />}
        </div>
      )}
    </div>
  );
};

export default App;

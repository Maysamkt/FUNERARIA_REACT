import { useState, useEffect } from "react";
import { auth } from "../db/firebase";
import {
  onAuthStateChanged,
  updateProfile,
  updatePassword,
  deleteUser,
} from "firebase/auth";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [newDisplayName, setNewDisplayName] = useState("");
  const [isEditingName, setIsEditingName] = useState(false); // Para controlar a edição do nome

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        setNewDisplayName(user.displayName || ""); // Exibe o nome se houver
      }
    });

    return () => unsubscribe();
  }, []);

  const handleUpdateProfile = async () => {
    if (auth.currentUser && newDisplayName !== user.displayName) {
      try {
        await updateProfile(auth.currentUser, { displayName: newDisplayName });
        alert("Perfil atualizado!");
      } catch (error) {
        console.error("Erro ao atualizar perfil: ", error);
      }
    }
    setIsEditingName(false); // Fecha o campo de edição
  };

  const handleChangePassword = async () => {
    if (auth.currentUser) {
      try {
        await updatePassword(auth.currentUser, newPassword);
        alert("Senha alterada com sucesso!");
      } catch (error) {
        console.error("Erro ao alterar a senha: ", error);
      }
    }
  };

  const handleDeleteAccount = async () => {
    if (auth.currentUser) {
      try {
        await deleteUser(auth.currentUser);
        alert("Conta deletada com sucesso!");
      } catch (error) {
        console.error("Erro ao deletar conta: ", error);
      }
    }
  };

  if (!user) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h2>Perfil do Usuário</h2>
      <p>Email: {user.email}</p>
      {/* Nome: Mostrar o nome ou "Não definido", com opção de edição */}
      <p>
        Nome:{" "}
        {isEditingName ? (
          <input
            type="text"
            value={newDisplayName}
            onChange={(e) => setNewDisplayName(e.target.value)}
            onBlur={handleUpdateProfile} // Ao sair do campo, atualizar
            autoFocus
          />
        ) : (
          <span onClick={() => setIsEditingName(true)}>
            {user.displayName || "Não definido"}
          </span>
        )}
      </p>
      {/* Senha: Alteração da senha */}
      <input
        type="password"
        placeholder="Nova senha"
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button onClick={handleChangePassword}>Alterar Senha</button>
      <button onClick={handleDeleteAccount}>Deletar Conta</button>
    </div>
  );
};

export default Profile;

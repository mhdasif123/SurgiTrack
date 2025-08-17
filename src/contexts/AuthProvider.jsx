import { useState } from "react";
import users from "../data/user.json";
import { AuthContext } from "./AuthContext";
import LocalStorageHook from "../components/Hooks/LocalStorageHook";

const AuthProvider = ({ children }) => {
  const [user, setUser] = LocalStorageHook("user", null);
  const [error, setError] = useState(null);

  const login = (identityNumber, password) => {
    setError(null);
    const foundUser = users.find(
      (u) =>
        u.identityNumber === identityNumber && u.password === password
    );

    if (foundUser) {
      setUser({
        identityNumber: foundUser.identityNumber,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
      });
      setError(null);
      return true
    } else {
      setUser(null);
      return false
    }
  };

  const logout = () => {
    setUser(null);
    setError(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, logout, login, error, setError }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

import { useState } from "react";
import users from "../data/user.json";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const login = (email, password) => {
    const foundUser = users.find(
      user => user.email === email && user.password === password
    );

    if (foundUser) {
      setUser({
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role
      });
      setError(null);
      console.log("Login successful");
    } else {
      setUser(null);
      setError("Invalid Credentials");
    }
  };

  const logout = () => {
    setUser(null);
    setError(null);
  };

  return (
    <AuthContext.Provider value={{ user, logout, login, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
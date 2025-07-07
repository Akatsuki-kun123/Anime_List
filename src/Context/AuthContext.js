import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const getUserFromStorage = () => {
    let data = localStorage.getItem("user");
    if (!data) {
      data = sessionStorage.getItem("user");
    }
    return data ? JSON.parse(data) : null;
  };

  useEffect(() => {
    const storedUser = getUserFromStorage();
    setUser(storedUser);
  }, []);

  const login = (userData, stayLoggedIn) => {
    if (stayLoggedIn) {
      localStorage.setItem("user", JSON.stringify(userData));
    } else {
      sessionStorage.setItem("user", JSON.stringify(userData));
    }
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    setUser(null);

    if (window.location.pathname == "/") {
      window.location.reload();
    } else {
      navigate("/");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

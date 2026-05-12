import { useState } from "react";

const STORAGE_KEY = "myroi_user";

export function useMockAuth(navigate) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem(STORAGE_KEY) || "null"));

  const login = (payload) => {
    const nextUser = { name: payload.username || "kevin01", role: "admin" };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
    setUser(nextUser);
    navigate("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
    navigate("/login");
  };

  return { user, login, logout };
}

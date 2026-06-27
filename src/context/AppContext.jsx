import { createContext, useContext, useState, useEffect } from "react";
import { familyProfiles } from "../data/health";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("cs_user");
    return saved ? JSON.parse(saved) : null;
  });

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("cs_dark") === "true";
  });

  const [activeMember, setActiveMember] = useState(() => {
    const saved = localStorage.getItem("cs_member");
    return saved ? JSON.parse(saved) : familyProfiles[0];
  });

  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem("cs_appointments");
    return saved ? JSON.parse(saved) : [];
  });

  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("cs_dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("cs_member", JSON.stringify(activeMember));
  }, [activeMember]);

  useEffect(() => {
    localStorage.setItem("cs_appointments", JSON.stringify(appointments));
  }, [appointments]);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("cs_user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("cs_user");
  };

  const bookAppointment = (appt) => {
    const newAppt = { ...appt, id: Date.now(), bookedAt: new Date().toISOString(), status: "confirmed" };
    setAppointments(prev => [newAppt, ...prev]);
    return newAppt;
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  return (
    <AppContext.Provider value={{
      user, login, logout,
      darkMode, setDarkMode,
      activeMember, setActiveMember,
      appointments, bookAppointment,
      toast, showToast,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};

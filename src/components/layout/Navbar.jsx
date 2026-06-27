import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiHeartPulseLine, RiBellLine, RiUserLine, RiMenuLine,
  RiCloseLine, RiMoonLine, RiSunLine, RiShieldCrossLine,
  RiSearchLine, RiLogoutBoxLine
} from "react-icons/ri";
import { useApp } from "../../context/AppContext";
import { notifications } from "../../data/health";

const navLinks = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/doctors", label: "Find Doctors" },
  { to: "/symptom-checker", label: "Symptom Checker" },
  { to: "/ai-match", label: "AI Match" },
  { to: "/timeline", label: "Care Timeline" },
  { to: "/insights", label: "Insights" },
];

export default function Navbar() {
  const { user, logout, darkMode, setDarkMode, activeMember } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const unread = notifications.filter(n => !n.read).length;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 glass border-b border-white/30 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to={user ? "/dashboard" : "/"} className="flex items-center gap-2 group">
          <div className="w-9 h-9 gradient-blue-teal rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <RiHeartPulseLine className="text-white text-lg" />
          </div>
          <div>
            <span className="font-bold text-lg text-medical-blue dark:text-white leading-none">CareSync</span>
            <span className="text-xs text-teal font-semibold ml-1 bg-mint dark:bg-teal/20 px-1.5 py-0.5 rounded-md">AI</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        {user && (
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? "bg-medical-blue/10 text-medical-blue dark:bg-teal/20 dark:text-teal"
                    : "text-muted hover:text-app-dark dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Emergency */}
          {user && (
            <Link
              to="/emergency"
              className="hidden sm:flex items-center gap-1.5 bg-alert/10 hover:bg-alert/20 text-alert px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors"
            >
              <RiShieldCrossLine />
              <span>Emergency</span>
            </Link>
          )}

          {/* Dark Mode */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-9 h-9 rounded-lg bg-white/60 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 flex items-center justify-center text-muted transition-colors"
          >
            {darkMode ? <RiSunLine className="text-yellow-400" /> : <RiMoonLine />}
          </button>

          {/* Notifications */}
          {user && (
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="w-9 h-9 rounded-lg bg-white/60 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 flex items-center justify-center text-muted transition-colors relative"
              >
                <RiBellLine />
                {unread > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-alert text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                    {unread}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {notifOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-12 w-80 card shadow-2xl z-50 overflow-hidden"
                  >
                    <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                      <h3 className="font-semibold text-app-dark dark:text-white">Notifications</h3>
                      <Link to="/notifications" onClick={() => setNotifOpen(false)} className="text-xs text-teal hover:underline">View all</Link>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.slice(0, 5).map(n => (
                        <div key={n.id} className={`flex gap-3 p-3 hover:bg-gray-50 dark:hover:bg-white/5 border-b border-gray-50 dark:border-gray-700/50 cursor-pointer transition-colors ${!n.read ? "bg-blue-50/50 dark:bg-blue-900/10" : ""}`}>
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-sm" style={{ backgroundColor: n.color + "20" }}>
                            {n.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm ${!n.read ? "font-semibold text-app-dark dark:text-white" : "text-muted"}`}>{n.title}</p>
                            <p className="text-xs text-muted truncate">{n.message}</p>
                          </div>
                          {!n.read && <div className="w-2 h-2 bg-medical-blue rounded-full mt-1 flex-shrink-0" />}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* User */}
          {user ? (
            <div className="flex items-center gap-2">
              <img
                src={activeMember.avatar}
                alt={activeMember.name}
                className="w-9 h-9 rounded-xl object-cover border-2 border-teal/30 cursor-pointer hover:border-teal transition-colors"
                onClick={() => navigate("/profile")}
                onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${user.name}&background=1E40AF&color=fff`; }}
              />
              <button
                onClick={handleLogout}
                className="hidden sm:flex items-center gap-1 text-muted hover:text-alert transition-colors text-sm"
              >
                <RiLogoutBoxLine />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="text-sm font-medium text-muted hover:text-app-dark dark:hover:text-white transition-colors px-3 py-1.5">
                Sign In
              </Link>
              <Link to="/signup" className="text-sm font-semibold bg-medical-blue hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-colors">
                Get Started
              </Link>
            </div>
          )}

          {/* Mobile Menu */}
          {user && (
            <button
              className="lg:hidden w-9 h-9 rounded-lg bg-white/60 dark:bg-white/10 flex items-center justify-center text-muted"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <RiCloseLine /> : <RiMenuLine />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && user && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800"
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={`block px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    location.pathname === link.to
                      ? "bg-medical-blue/10 text-medical-blue"
                      : "text-muted hover:text-app-dark hover:bg-gray-50 dark:hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/emergency"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold text-alert bg-red-50 dark:bg-red-900/20"
              >
                <RiShieldCrossLine /> Emergency Mode
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  RiUserLine, RiMoonLine, RiSunLine, RiBellLine, RiShieldLine,
  RiGlobalLine, RiHeartPulseLine, RiLogoutBoxLine, RiEditLine,
  RiArrowRightLine, RiRobot2Line, RiTeamLine, RiAwardLine
} from "react-icons/ri";
import { useApp } from "../context/AppContext";
import { PageTransition } from "../components/ui/index";

/* ─── PROFILE ───────────────────────────────────────────────────────── */
export function Profile() {
  const { user, activeMember, logout, darkMode } = useApp();
  const [editing, setEditing] = useState(false);

  return (
    <PageTransition>
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header Card */}
        <div className="gradient-blue-teal rounded-3xl p-6 mb-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="flex items-center gap-4 relative">
            <div className="relative">
              <img
                src={activeMember?.avatar || "https://randomuser.me/api/portraits/men/28.jpg"}
                alt={user?.name}
                className="w-20 h-20 rounded-2xl object-cover border-3 border-white/40"
                onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${user?.name}&background=ffffff&color=1E40AF&size=80`; }}
              />
              <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-white rounded-lg flex items-center justify-center">
                <RiEditLine className="text-medical-blue text-sm" />
              </button>
            </div>
            <div>
              <h1 className="text-xl font-extrabold">{user?.name}</h1>
              <p className="text-blue-100 text-sm">{user?.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs bg-white/20 px-2 py-1 rounded-lg font-semibold">
                  Blood Group: {activeMember?.bloodGroup || "B+"}
                </span>
                <span className="text-xs bg-white/20 px-2 py-1 rounded-lg font-semibold">
                  CareSync Pro
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Health Summary */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: "Appointments", value: "13", icon: "📅" },
            { label: "Records", value: "20", icon: "📋" },
            { label: "Health Score", value: "78", icon: "⭐" },
          ].map(stat => (
            <div key={stat.label} className="card p-4 text-center">
              <span className="text-2xl block mb-1">{stat.icon}</span>
              <p className="text-xl font-extrabold text-app-dark dark:text-white">{stat.value}</p>
              <p className="text-xs text-muted">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <div className="card divide-y divide-gray-100 dark:divide-gray-700 mb-5">
          {[
            { icon: RiHeartPulseLine, label: "My Care Timeline", to: "/timeline", color: "#14B8A6" },
            { icon: RiTeamLine, label: "Family Profiles", to: "/family", color: "#1E40AF" },
            { icon: RiShieldLine, label: "Digital Health Vault", to: "/vault", color: "#7C3AED" },
            { icon: RiBellLine, label: "Notifications", to: "/notifications", color: "#F59E0B" },
          ].map(item => (
            <Link key={item.label} to={item.to} className="flex items-center gap-3 px-5 py-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: item.color + "15" }}>
                <item.icon style={{ color: item.color }} />
              </div>
              <span className="flex-1 text-sm font-medium text-app-dark dark:text-white">{item.label}</span>
              <RiArrowRightLine className="text-muted" />
            </Link>
          ))}
        </div>

        {/* Account Info */}
        <div className="card p-5 mb-5">
          <h3 className="font-bold text-app-dark dark:text-white mb-4 text-sm">Account Details</h3>
          <div className="space-y-3">
            {[
              { label: "Full Name", value: user?.name },
              { label: "Email", value: user?.email },
              { label: "Phone", value: user?.phone || "+91 98765 43210" },
              { label: "Member Since", value: "June 2025" },
              { label: "Plan", value: "CareSync Pro (Free Trial)" },
            ].map(item => (
              <div key={item.label} className="flex justify-between text-sm py-1 border-b border-gray-50 dark:border-gray-700/50 last:border-0">
                <span className="text-muted">{item.label}</span>
                <span className="font-semibold text-app-dark dark:text-white">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 py-3 bg-red-50 dark:bg-red-900/20 text-alert font-semibold rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors text-sm"
        >
          <RiLogoutBoxLine /> Sign Out
        </button>
      </div>
    </PageTransition>
  );
}

/* ─── SETTINGS ──────────────────────────────────────────────────────── */
export function Settings() {
  const { darkMode, setDarkMode, showToast } = useApp();
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifSMS, setNotifSMS] = useState(true);
  const [notifPush, setNotifPush] = useState(true);
  const [biometric, setBiometric] = useState(false);
  const [language, setLanguage] = useState("English");

  const Toggle = ({ value, onChange }) => (
    <button
      onClick={() => onChange(!value)}
      className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 ${value ? "bg-teal" : "bg-gray-200 dark:bg-gray-600"}`}
    >
      <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform shadow ${value ? "translate-x-6" : "translate-x-1"}`} />
    </button>
  );

  const sections = [
    {
      title: "Appearance",
      items: [
        { icon: darkMode ? RiSunLine : RiMoonLine, label: "Dark Mode", value: darkMode, onChange: setDarkMode },
      ],
    },
    {
      title: "Notifications",
      items: [
        { icon: RiBellLine, label: "Email Notifications", value: notifEmail, onChange: setNotifEmail },
        { icon: RiBellLine, label: "SMS Reminders", value: notifSMS, onChange: setNotifSMS },
        { icon: RiBellLine, label: "Push Notifications", value: notifPush, onChange: setNotifPush },
      ],
    },
    {
      title: "Security",
      items: [
        { icon: RiShieldLine, label: "Biometric Login", value: biometric, onChange: setBiometric },
      ],
    },
  ];

  return (
    <PageTransition>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-extrabold text-app-dark dark:text-white mb-6">Settings</h1>

        <div className="space-y-5">
          {sections.map(section => (
            <div key={section.title} className="card divide-y divide-gray-100 dark:divide-gray-700">
              <div className="px-5 py-3">
                <h3 className="text-xs font-bold text-muted uppercase tracking-wider">{section.title}</h3>
              </div>
              {section.items.map(item => (
                <div key={item.label} className="flex items-center gap-3 px-5 py-4">
                  <div className="w-9 h-9 rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-center">
                    <item.icon className="text-muted" />
                  </div>
                  <span className="flex-1 text-sm font-medium text-app-dark dark:text-white">{item.label}</span>
                  <Toggle value={item.value} onChange={item.onChange} />
                </div>
              ))}
            </div>
          ))}

          {/* Language */}
          <div className="card p-5">
            <h3 className="text-xs font-bold text-muted uppercase tracking-wider mb-3">Language</h3>
            <select
              value={language}
              onChange={e => setLanguage(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-app-dark dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal/40"
            >
              {["English", "Hindi", "Tamil", "Telugu", "Kannada", "Malayalam"].map(l => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>

          <div className="card divide-y divide-gray-100 dark:divide-gray-700">
            {[
              { label: "Privacy Policy", to: "#" },
              { label: "Terms of Service", to: "#" },
              { label: "Help & Support", to: "#" },
              { label: "Rate CareSync AI", to: "#" },
            ].map(item => (
              <a key={item.label} href={item.to} className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                <span className="text-sm font-medium text-app-dark dark:text-white">{item.label}</span>
                <RiArrowRightLine className="text-muted" />
              </a>
            ))}
          </div>

          <button
            onClick={() => showToast("Settings saved!", "success")}
            className="w-full py-3 gradient-blue-teal text-white font-bold rounded-xl hover:opacity-90 transition-opacity"
          >
            Save Settings
          </button>
        </div>
      </div>
    </PageTransition>
  );
}

/* ─── ABOUT ─────────────────────────────────────────────────────────── */
export function About() {
  const teamMembers = [
    { name: "Dr. Vishal Rao", role: "Co-Founder & Chief Medical Officer", avatar: "https://randomuser.me/api/portraits/men/36.jpg" },
    { name: "Ananya Krishnan", role: "Co-Founder & CEO", avatar: "https://randomuser.me/api/portraits/women/36.jpg" },
    { name: "Rahul Mehta", role: "CTO & AI Lead", avatar: "https://randomuser.me/api/portraits/men/43.jpg" },
    { name: "Priya Suresh", role: "Head of Design & UX", avatar: "https://randomuser.me/api/portraits/women/43.jpg" },
  ];

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-14">
          <div className="w-20 h-20 gradient-blue-teal rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-xl shadow-blue-500/20">
            <RiHeartPulseLine className="text-white text-3xl" />
          </div>
          <h1 className="text-3xl font-extrabold text-app-dark dark:text-white mb-3">About CareSync AI</h1>
          <p className="text-muted max-w-xl mx-auto leading-relaxed">
            We believe every Indian family deserves intelligent, accessible, and personalized healthcare. CareSync AI was born from this conviction — to democratize quality healthcare through the power of AI.
          </p>
        </div>

        {/* Mission */}
        <div className="grid sm:grid-cols-3 gap-5 mb-12">
          {[
            { icon: RiRobot2Line, title: "AI-First", desc: "We put AI at the core of every decision — from symptom checking to doctor matching.", color: "#7C3AED" },
            { icon: RiHeartPulseLine, title: "Patient-First", desc: "Every feature is designed around the patient's journey, not hospital workflows.", color: "#EF4444" },
            { icon: RiAwardLine, title: "Trust-First", desc: "ABDM compliant, encrypted, and verified — your data is always safe with us.", color: "#14B8A6" },
          ].map(item => (
            <div key={item.title} className="card p-5 text-center">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: item.color + "15" }}>
                <item.icon className="text-xl" style={{ color: item.color }} />
              </div>
              <h3 className="font-bold text-app-dark dark:text-white mb-2">{item.title}</h3>
              <p className="text-sm text-muted">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Team */}
        <h2 className="text-xl font-extrabold text-app-dark dark:text-white text-center mb-6">Our Team</h2>
        <div className="grid sm:grid-cols-4 gap-5 mb-12">
          {teamMembers.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="card p-4 text-center"
            >
              <img src={m.avatar} className="w-16 h-16 rounded-2xl object-cover mx-auto mb-3" onError={e => { e.target.style.display = "none"; }} />
              <p className="font-bold text-app-dark dark:text-white text-sm">{m.name}</p>
              <p className="text-xs text-muted mt-0.5">{m.role}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div className="gradient-blue-teal rounded-3xl p-8 text-white text-center">
          <h2 className="text-xl font-extrabold mb-6">CareSync AI by the numbers</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { value: "2.4M+", label: "Active Patients" },
              { value: "50K+", label: "Verified Doctors" },
              { value: "20+", label: "Specialties" },
              { value: "98%", label: "Satisfaction Rate" },
            ].map(s => (
              <div key={s.label}>
                <p className="text-3xl font-extrabold mb-1">{s.value}</p>
                <p className="text-blue-100 text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

/* ─── 404 ───────────────────────────────────────────────────────────── */
export function NotFound() {
  return (
    <PageTransition>
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="text-8xl mb-6"
        >
          🏥
        </motion.div>
        <h1 className="text-6xl font-extrabold text-app-dark dark:text-white mb-2">404</h1>
        <h2 className="text-xl font-bold text-muted mb-3">Page not found</h2>
        <p className="text-muted text-sm max-w-sm mb-8">
          Looks like this page went on leave. Let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link to="/dashboard" className="px-8 py-3 gradient-blue-teal text-white font-bold rounded-xl hover:opacity-90 transition-opacity">
            Back to Dashboard
          </Link>
          <Link to="/" className="px-8 py-3 bg-gray-100 dark:bg-gray-800 text-app-dark dark:text-white font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            Go Home
          </Link>
        </div>
      </div>
    </PageTransition>
  );
}

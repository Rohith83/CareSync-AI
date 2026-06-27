import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  RiAlertLine, RiPhoneLine, RiShieldCrossLine, RiHeartPulseLine,
  RiMapPinLine, RiBellLine, RiCheckLine
} from "react-icons/ri";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, Legend, RadialBarChart, RadialBar
} from "recharts";
import { emergencyContacts, notifications, healthChartData } from "../data/health";
import { hospitals } from "../data/doctors";
import { EmergencyHospitalCard } from "../components/features/DoctorCard";
import { PageTransition } from "../components/ui/index";
import { useApp } from "../context/AppContext";

/* ─── EMERGENCY MODE ────────────────────────────────────────────────── */
export function Emergency() {
  const { activeMember } = useApp();
  const [calledAmbulance, setCalledAmbulance] = useState(false);

  return (
    <PageTransition>
      {/* Red Alert Banner */}
      <div className="bg-alert text-white py-4 px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-1">
          <RiAlertLine className="text-xl animate-pulse" />
          <span className="font-extrabold text-lg">EMERGENCY MODE</span>
          <RiAlertLine className="text-xl animate-pulse" />
        </div>
        <p className="text-red-100 text-xs">Fastest route to emergency care</p>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* One-Tap Ambulance */}
        <motion.a
          href="tel:108"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setCalledAmbulance(true)}
          className="flex items-center justify-center gap-3 w-full bg-alert hover:bg-red-600 text-white font-extrabold text-xl py-5 rounded-2xl mb-6 shadow-lg shadow-red-500/30 transition-colors"
        >
          <RiPhoneLine className="text-2xl" />
          Call Ambulance — 108
        </motion.a>

        {calledAmbulance && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-3 mb-5 text-center"
          >
            <p className="text-sm font-bold text-green-700 dark:text-green-400">📞 Connecting to ambulance services…</p>
          </motion.div>
        )}

        {/* Patient Info */}
        <div className="card p-5 mb-5 border-2 border-red-100 dark:border-red-900/30">
          <div className="flex items-center gap-3 mb-4">
            <RiShieldCrossLine className="text-2xl text-alert" />
            <h2 className="font-bold text-app-dark dark:text-white">Patient Information</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Name", value: activeMember?.name || "Rohith" },
              { label: "Blood Group", value: activeMember?.bloodGroup || "B+", highlight: true },
              { label: "Age", value: `${activeMember?.age || 23} years` },
              { label: "Allergies", value: activeMember?.allergies?.join(", ") || "Penicillin" },
              { label: "Conditions", value: activeMember?.conditions?.join(", ") || "Mild Hypertension" },
            ].map(item => (
              <div key={item.label} className={`rounded-xl p-3 ${item.highlight ? "bg-red-50 dark:bg-red-900/20 col-span-1" : "bg-gray-50 dark:bg-white/5"}`}>
                <p className="text-[10px] text-muted uppercase mb-1">{item.label}</p>
                <p className={`text-sm font-bold ${item.highlight ? "text-alert text-lg" : "text-app-dark dark:text-white"}`}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="card p-5 mb-5">
          <h2 className="font-bold text-app-dark dark:text-white mb-4 flex items-center gap-2">
            <RiPhoneLine className="text-alert" /> Emergency Contacts
          </h2>
          <div className="space-y-2">
            {emergencyContacts.slice(0, 6).map(contact => (
              <a
                key={contact.id}
                href={`tel:${contact.phone}`}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group"
              >
                <span className="text-xl">{contact.icon}</span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-app-dark dark:text-white">{contact.name}</p>
                  <p className="text-xs text-muted">{contact.relation}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-app-dark dark:text-white">{contact.phone}</span>
                  <div className="w-8 h-8 bg-green-50 dark:bg-green-900/20 rounded-xl flex items-center justify-center group-hover:bg-green-100 transition-colors">
                    <RiPhoneLine className="text-green-500 text-sm" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Nearby Hospitals */}
        <div className="mb-5">
          <h2 className="font-bold text-app-dark dark:text-white mb-4 flex items-center gap-2">
            <RiMapPinLine className="text-alert" /> Nearest Emergency Hospitals
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {hospitals.filter(h => h.emergency).slice(0, 4).map(hospital => (
              <EmergencyHospitalCard key={hospital.id} hospital={hospital} />
            ))}
          </div>
        </div>

        {/* Safety Tips */}
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-4">
          <h3 className="font-bold text-warning mb-2 text-sm">⚠️ While waiting for help</h3>
          <ul className="space-y-1.5 text-xs text-amber-700 dark:text-amber-400">
            {[
              "Stay calm and do not panic",
              "Keep the patient still and comfortable",
              "Do not give food or water unless instructed",
              "Share this screen with emergency responders",
            ].map(tip => (
              <li key={tip} className="flex items-start gap-2">
                <span className="text-warning mt-0.5">•</span>{tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </PageTransition>
  );
}

/* ─── HEALTH INSIGHTS ───────────────────────────────────────────────── */
export function HealthInsights() {
  const [period, setPeriod] = useState("month");

  const healthScoreData = [{ name: "Score", value: 78, fill: "#14B8A6" }];

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-app-dark dark:text-white mb-1">Health Insights</h1>
            <p className="text-muted text-sm">AI-powered analysis of your health data</p>
          </div>
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
            {["week", "month", "year"].map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${
                  period === p ? "bg-white dark:bg-gray-700 text-app-dark dark:text-white shadow-sm" : "text-muted"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Health Score */}
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <div className="sm:col-span-1 card p-5 flex flex-col items-center justify-center">
            <p className="text-xs font-bold text-muted uppercase tracking-wider mb-2">Health Score</p>
            <ResponsiveContainer width={120} height={120}>
              <RadialBarChart innerRadius={35} outerRadius={55} data={[{ value: 78, fill: "#14B8A6" }]} startAngle={90} endAngle={-270}>
                <RadialBar dataKey="value" cornerRadius={10} background={{ fill: "#F1F5F9" }} />
              </RadialBarChart>
            </ResponsiveContainer>
            <p className="text-3xl font-extrabold text-teal -mt-2">78</p>
            <p className="text-xs text-muted">Good</p>
            <p className="text-[10px] text-green-500 font-semibold mt-1">↑ +6 this month</p>
          </div>

          <div className="sm:col-span-2 grid grid-cols-2 gap-3">
            {[
              { label: "Appointments", value: "13", sub: "This year", icon: "📅", color: "#1E40AF", trend: "+2 vs last year" },
              { label: "Adherence", value: "86%", sub: "Medicine streak", icon: "💊", color: "#14B8A6", trend: "+12% this month" },
              { label: "Active Days", value: "18", sub: "Exercise logged", icon: "🚶", color: "#10B981", trend: "+3 this week" },
              { label: "Reports", value: "20", sub: "Records stored", icon: "📋", color: "#7C3AED", trend: "All normal" },
            ].map(stat => (
              <div key={stat.label} className="card p-4">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xl">{stat.icon}</span>
                  <span className="text-[10px] text-green-500 font-semibold">{stat.trend}</span>
                </div>
                <p className="text-xl font-extrabold text-app-dark dark:text-white" style={{ color: stat.color }}>{stat.value}</p>
                <p className="text-xs text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* BP Chart */}
        <div className="card p-5 mb-5">
          <h3 className="font-bold text-app-dark dark:text-white mb-4 text-sm">Blood Pressure Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={healthChartData.bloodPressure}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="date" tick={{ fontSize: 10 }} stroke="none" />
              <YAxis domain={[60, 160]} tick={{ fontSize: 10 }} stroke="none" />
              <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="systolic" stroke="#EF4444" strokeWidth={2.5} dot={{ fill: "#EF4444", r: 3 }} name="Systolic" />
              <Line type="monotone" dataKey="diastolic" stroke="#1E40AF" strokeWidth={2.5} dot={{ fill: "#1E40AF", r: 3 }} name="Diastolic" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 mb-5">
          {/* Sleep */}
          <div className="card p-5">
            <h3 className="font-bold text-app-dark dark:text-white mb-4 text-sm">Sleep Pattern</h3>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={healthChartData.sleepData}>
                <XAxis dataKey="day" tick={{ fontSize: 10 }} stroke="none" />
                <YAxis domain={[0, 9]} tick={{ fontSize: 10 }} stroke="none" />
                <Tooltip contentStyle={{ borderRadius: 12, border: "none", fontSize: 12 }} formatter={(v) => [`${v}h`, "Sleep"]} />
                <Bar dataKey="hours" fill="#7C3AED" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-muted">Goal: 8h/night</span>
              <span className="text-xs font-semibold text-warning">Avg: 6.9h</span>
            </div>
          </div>

          {/* Water */}
          <div className="card p-5">
            <h3 className="font-bold text-app-dark dark:text-white mb-4 text-sm">Water Intake</h3>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={healthChartData.waterIntake}>
                <XAxis dataKey="day" tick={{ fontSize: 10 }} stroke="none" />
                <YAxis domain={[0, 10]} tick={{ fontSize: 10 }} stroke="none" />
                <Tooltip contentStyle={{ borderRadius: 12, border: "none", fontSize: 12 }} formatter={(v) => [`${v} glasses`, "Water"]} />
                <Bar dataKey="glasses" fill="#0EA5E9" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-muted">Goal: 8 glasses/day</span>
              <span className="text-xs font-semibold text-warning">Avg: 6.3</span>
            </div>
          </div>
        </div>

        {/* Health Score Trend */}
        <div className="card p-5">
          <h3 className="font-bold text-app-dark dark:text-white mb-4 text-sm">Health Score Journey</h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={healthChartData.healthScore}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke="none" />
              <YAxis domain={[50, 100]} tick={{ fontSize: 10 }} stroke="none" />
              <Tooltip contentStyle={{ borderRadius: 12, border: "none", fontSize: 12 }} />
              <Line type="monotone" dataKey="score" stroke="#14B8A6" strokeWidth={3} dot={{ fill: "#14B8A6", r: 4 }} name="Health Score" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </PageTransition>
  );
}

/* ─── NOTIFICATIONS ─────────────────────────────────────────────────── */
export function Notifications() {
  const [notifs, setNotifs] = useState(notifications);

  const markAllRead = () => setNotifs(prev => prev.map(n => ({ ...n, read: true })));
  const unread = notifs.filter(n => !n.read).length;

  const typeLabels = {
    reminder: "Reminders", appointment: "Appointments",
    report: "Reports", health: "Health", ai: "AI Insights", emergency: "Emergency",
  };

  return (
    <PageTransition>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-app-dark dark:text-white mb-1">Notifications</h1>
            <p className="text-muted text-sm">{unread} unread notifications</p>
          </div>
          {unread > 0 && (
            <button onClick={markAllRead} className="text-xs font-semibold text-teal hover:underline flex items-center gap-1">
              <RiCheckLine /> Mark all read
            </button>
          )}
        </div>

        <div className="space-y-2">
          {notifs.map((n, i) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              onClick={() => setNotifs(prev => prev.map(x => x.id === n.id ? { ...x, read: true } : x))}
              className={`flex gap-3 p-4 rounded-2xl cursor-pointer transition-colors ${
                !n.read
                  ? "bg-white dark:bg-gray-800 shadow-sm border border-blue-50 dark:border-blue-900/20"
                  : "bg-gray-50 dark:bg-gray-800/50"
              }`}
            >
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 text-lg"
                style={{ backgroundColor: n.color + "18" }}
              >
                {n.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className={`text-sm ${!n.read ? "font-bold text-app-dark dark:text-white" : "font-medium text-muted"}`}>
                    {n.title}
                  </p>
                  <span className="text-[10px] text-muted whitespace-nowrap flex-shrink-0">{n.time}</span>
                </div>
                <p className="text-xs text-muted mt-0.5 leading-relaxed">{n.message}</p>
                <span
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-lg mt-1.5 inline-block"
                  style={{ backgroundColor: n.color + "15", color: n.color }}
                >
                  {typeLabels[n.type] || n.type}
                </span>
              </div>
              {!n.read && <div className="w-2 h-2 rounded-full flex-shrink-0 mt-2" style={{ backgroundColor: n.color }} />}
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}

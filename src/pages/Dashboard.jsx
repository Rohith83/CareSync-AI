import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  RiRobot2Line, RiHeartPulseLine, RiCalendarLine, RiFileTextLine,
  RiArrowRightLine, RiShieldCrossLine, RiTimeLine, RiUserHeartLine,
  RiFlashlightLine, RiDropLine, RiMoonLine, RiRunLine
} from "react-icons/ri";
import { useApp } from "../context/AppContext";
import { PageTransition, TrustScoreBadge } from "../components/ui/index";
import { FamilyProfileSwitcher } from "../components/features/DoctorCard";
import { familyProfiles, carePlanTasks, healthTimeline, notifications } from "../data/health";
import { doctors } from "../data/doctors";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { healthChartData } from "../data/health";

const quickActions = [
  { icon: RiRobot2Line, label: "AI Doctor Match", to: "/ai-match", color: "#7C3AED", bg: "#7C3AED10" },
  { icon: RiHeartPulseLine, label: "Symptom Check", to: "/symptom-checker", color: "#EF4444", bg: "#EF444410" },
  { icon: RiUserHeartLine, label: "Find Doctors", to: "/doctors", color: "#14B8A6", bg: "#14B8A610" },
  { icon: RiCalendarLine, label: "Book Appointment", to: "/doctors", color: "#1E40AF", bg: "#1E40AF10" },
  { icon: RiTimeLine, label: "Care Timeline", to: "/timeline", color: "#F59E0B", bg: "#F59E0B10" },
  { icon: RiFileTextLine, label: "Health Vault", to: "/vault", color: "#10B981", bg: "#10B98110" },
  { icon: RiShieldCrossLine, label: "Emergency", to: "/emergency", color: "#EF4444", bg: "#EF444410" },
  { icon: RiFlashlightLine, label: "Insights", to: "/insights", color: "#6366F1", bg: "#6366F110" },
];

export default function Dashboard() {
  const { user, activeMember, setActiveMember } = useApp();
  const today = new Date();
  const hour = today.getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const completedTasks = carePlanTasks.filter(t => t.completed).length;
  const taskPercent = Math.round((completedTasks / carePlanTasks.length) * 100);
  const unreadNotifs = notifications.filter(n => !n.read).length;
  const upcomingAppt = healthTimeline.find(t => t.type === "appointment" && t.status === "upcoming");
  const featuredDoctors = doctors.slice(0, 4);

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-sm text-muted font-medium">{greeting},</p>
            <h1 className="text-2xl font-extrabold text-app-dark dark:text-white">
              {user?.name} 👋
            </h1>
            <p className="text-xs text-muted mt-1">{today.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</p>
          </div>

          <div className="flex items-center gap-3">
            {unreadNotifs > 0 && (
              <Link to="/notifications" className="flex items-center gap-1.5 bg-blue-50 dark:bg-blue-900/20 text-medical-blue px-3 py-1.5 rounded-xl text-xs font-semibold">
                🔔 {unreadNotifs} new alerts
              </Link>
            )}
            <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-xl">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              <span className="text-xs font-bold text-green-600 dark:text-green-400">Health Score: 78</span>
            </div>
          </div>
        </div>

        {/* Family Switcher */}
        <div className="card p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-bold text-app-dark dark:text-white">Viewing health for</p>
            <Link to="/family" className="text-xs text-teal hover:underline">Manage family →</Link>
          </div>
          <FamilyProfileSwitcher profiles={familyProfiles} active={activeMember} onSwitch={setActiveMember} />
        </div>

        {/* AI Insight Banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="gradient-purple-blue rounded-2xl p-5 mb-6 flex items-center gap-4"
        >
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
            <RiRobot2Line className="text-white text-xl" />
          </div>
          <div className="flex-1">
            <p className="text-white font-bold text-sm">AI Health Insight for {activeMember?.name}</p>
            <p className="text-blue-100 text-xs mt-0.5">
              Blood pressure improved by 12% this month. Medication adherence at 86%. Consider scheduling a cardiology follow-up.
            </p>
          </div>
          <Link to="/insights" className="flex-shrink-0 bg-white/20 hover:bg-white/30 text-white text-xs font-semibold px-3 py-2 rounded-xl transition-colors">
            View →
          </Link>
        </motion.div>

        {/* Vitals Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { icon: "❤️", label: "Blood Pressure", value: "120/76", unit: "mmHg", trend: "↓ Improving", trendColor: "#10B981" },
            { icon: "💓", label: "Heart Rate", value: "71", unit: "bpm", trend: "↓ Normal", trendColor: "#10B981" },
            { icon: RiDropLine, label: "Water Today", value: "4/8", unit: "glasses", trend: "⚠ Drink more", trendColor: "#F59E0B" },
            { icon: RiMoonLine, label: "Last Sleep", value: "6.8", unit: "hours", trend: "↓ Below goal", trendColor: "#F59E0B" },
          ].map((v, i) => (
            <motion.div
              key={v.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="card p-4"
            >
              <div className="text-2xl mb-2">{typeof v.icon === "string" ? v.icon : <v.icon />}</div>
              <p className="text-xs text-muted mb-1">{v.label}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-extrabold text-app-dark dark:text-white">{v.value}</span>
                <span className="text-xs text-muted">{v.unit}</span>
              </div>
              <p className="text-[10px] font-semibold mt-1" style={{ color: v.trendColor }}>{v.trend}</p>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <h2 className="text-sm font-bold text-app-dark dark:text-white mb-3">Quick Actions</h2>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
            {quickActions.map((action, i) => (
              <Link
                key={action.label}
                to={action.to}
                className="flex flex-col items-center gap-2 p-3 rounded-2xl hover:scale-105 transition-transform"
                style={{ backgroundColor: action.bg }}
              >
                <action.icon className="text-xl" style={{ color: action.color }} />
                <span className="text-[10px] font-semibold text-center leading-tight" style={{ color: action.color }}>
                  {action.label}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* BP Chart */}
          <div className="lg:col-span-2 card p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-app-dark dark:text-white text-sm">Blood Pressure Trend</h3>
                <p className="text-xs text-muted">Last 4 weeks</p>
              </div>
              <Link to="/insights" className="text-xs text-teal hover:underline">Full insights →</Link>
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={healthChartData.bloodPressure}>
                <XAxis dataKey="date" tick={{ fontSize: 10 }} stroke="none" />
                <YAxis domain={[70, 150]} tick={{ fontSize: 10 }} stroke="none" />
                <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", fontSize: 12 }} />
                <Line type="monotone" dataKey="systolic" stroke="#EF4444" strokeWidth={2} dot={false} name="Systolic" />
                <Line type="monotone" dataKey="diastolic" stroke="#1E40AF" strokeWidth={2} dot={false} name="Diastolic" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Today's Care Plan */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-app-dark dark:text-white text-sm">Today's Care Plan</h3>
              <span className="text-xs font-bold text-teal">{taskPercent}%</span>
            </div>
            <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full mb-4 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-teal to-medical-blue rounded-full transition-all" style={{ width: `${taskPercent}%` }} />
            </div>
            <div className="space-y-2.5">
              {carePlanTasks.slice(0, 5).map(task => (
                <div key={task.id} className="flex items-center gap-2.5">
                  <div className={`w-5 h-5 rounded-lg flex items-center justify-center flex-shrink-0 text-[10px] font-bold border-2 ${
                    task.completed
                      ? "bg-teal border-teal text-white"
                      : "border-gray-200 dark:border-gray-600"
                  }`}>
                    {task.completed && "✓"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-medium truncate ${task.completed ? "line-through text-muted" : "text-app-dark dark:text-white"}`}>
                      {task.task}
                    </p>
                    {task.time && <p className="text-[10px] text-muted">{task.time}</p>}
                  </div>
                  <span className="text-xs">{task.icon}</span>
                </div>
              ))}
            </div>
            <Link to="/care-plan" className="mt-4 block text-center text-xs font-semibold text-medical-blue hover:text-teal transition-colors">
              View full plan →
            </Link>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mt-6">
          {/* Upcoming Appointment */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-app-dark dark:text-white text-sm">Upcoming Appointment</h3>
              <Link to="/timeline" className="text-xs text-teal hover:underline">All →</Link>
            </div>
            {upcomingAppt ? (
              <div className="flex items-center gap-3 bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-4">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  className="w-12 h-12 rounded-2xl object-cover"
                  onError={e => { e.target.style.display = "none"; }}
                />
                <div className="flex-1">
                  <p className="font-bold text-app-dark dark:text-white text-sm">{upcomingAppt.title}</p>
                  <p className="text-xs text-muted">{upcomingAppt.doctor}</p>
                  <p className="text-xs font-semibold text-medical-blue mt-1">
                    📅 {new Date(upcomingAppt.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                  </p>
                </div>
                <Link to="/timeline" className="text-xs bg-medical-blue text-white px-3 py-1.5 rounded-xl font-semibold">
                  Details
                </Link>
              </div>
            ) : (
              <p className="text-sm text-muted text-center py-4">No upcoming appointments.</p>
            )}
          </div>

          {/* Featured Doctors */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-app-dark dark:text-white text-sm">Recommended Doctors</h3>
              <Link to="/doctors" className="text-xs text-teal hover:underline">See all →</Link>
            </div>
            <div className="space-y-3">
              {featuredDoctors.map(doc => (
                <Link key={doc.id} to={`/doctors/${doc.id}`} className="flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl p-2 -mx-2 transition-colors">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="w-10 h-10 rounded-xl object-cover flex-shrink-0"
                    onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(doc.name)}&background=1E40AF&color=fff`; }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-app-dark dark:text-white truncate">{doc.name}</p>
                    <p className="text-xs text-muted">{doc.specialization} · ₹{doc.fee}</p>
                  </div>
                  <TrustScoreBadge score={doc.trustScore} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

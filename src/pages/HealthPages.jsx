import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { RiDownloadLine, RiEyeLine, RiSearchLine } from "react-icons/ri";
import { useApp } from "../context/AppContext";
import { PageTransition } from "../components/ui/index";
import { FamilyProfileSwitcher } from "../components/features/DoctorCard";
import { HealthVaultCard } from "../components/features/DoctorCard";
import {
  healthTimeline, carePlanTasks, familyProfiles, healthVaultRecords
} from "../data/health";

/* ─── HEALTH TIMELINE ──────────────────────────────────────────────── */
export function HealthTimeline() {
  const { activeMember } = useApp();
  const [filter, setFilter] = useState("all");

  const filters = ["all", "appointment", "prescription", "report", "vaccination", "followup"];
  const filtered = filter === "all" ? healthTimeline : healthTimeline.filter(e => e.type === filter);

  const typeColors = {
    appointment: "#1E40AF", prescription: "#14B8A6",
    report: "#7C3AED", vaccination: "#10B981", followup: "#F59E0B",
  };

  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold text-app-dark dark:text-white mb-1">Care Timeline</h1>
          <p className="text-muted text-sm">Complete medical journey for {activeMember?.name}</p>
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-semibold capitalize transition-colors ${
                filter === f ? "bg-medical-blue text-white" : "bg-gray-100 dark:bg-gray-800 text-muted hover:bg-gray-200"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-100 dark:bg-gray-800" />
          <div className="space-y-6">
            {filtered.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex gap-4"
              >
                {/* Dot */}
                <div className="relative flex-shrink-0">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-lg z-10 relative border-2 border-white dark:border-gray-900 shadow"
                    style={{ backgroundColor: (typeColors[event.type] || "#64748B") + "18" }}
                  >
                    {event.icon}
                  </div>
                </div>

                {/* Card */}
                <div className="flex-1 card p-4 mb-1">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-bold text-sm text-app-dark dark:text-white">{event.title}</h3>
                      {event.doctor && <p className="text-xs text-muted">{event.doctor}</p>}
                      {event.hospital && <p className="text-xs text-muted">{event.hospital}</p>}
                    </div>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <span className="text-[10px] text-muted">{new Date(event.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                      {event.status && (
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg capitalize ${
                          event.status === "completed" ? "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                          : event.status === "upcoming" ? "bg-blue-100 dark:bg-blue-900/20 text-medical-blue"
                          : "bg-gray-100 dark:bg-gray-700 text-muted"
                        }`}>{event.status}</span>
                      )}
                    </div>
                  </div>

                  {event.notes && <p className="text-xs text-muted italic mb-2">"{event.notes}"</p>}
                  {event.medicines && (
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {event.medicines.map(m => (
                        <span key={m} className="text-[10px] bg-teal/10 text-teal px-2 py-0.5 rounded-lg font-semibold">{m}</span>
                      ))}
                    </div>
                  )}
                  {event.tests && (
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {event.tests.map(t => (
                        <span key={t} className="text-[10px] bg-purple-50 dark:bg-purple-900/20 text-purple-ai px-2 py-0.5 rounded-lg font-semibold">{t}</span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

/* ─── CARE PLAN ─────────────────────────────────────────────────────── */
export function CarePlan() {
  const [tasks, setTasks] = useState(carePlanTasks);
  const { showToast } = useApp();

  const toggle = (id) => {
    setTasks(prev => prev.map(t => {
      if (t.id !== id) return t;
      const updated = { ...t, completed: !t.completed };
      if (updated.completed) showToast(`✓ "${t.task}" marked complete!`, "success");
      return updated;
    }));
  };

  const categories = [...new Set(tasks.map(t => t.category))];
  const completed = tasks.filter(t => t.completed).length;
  const percent = Math.round((completed / tasks.length) * 100);

  return (
    <PageTransition>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold text-app-dark dark:text-white mb-1">Care Plan</h1>
          <p className="text-muted text-sm">Your personalized health tasks for today</p>
        </div>

        {/* Progress */}
        <div className="card p-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="font-bold text-app-dark dark:text-white text-sm">Today's Progress</p>
              <p className="text-xs text-muted">{completed} of {tasks.length} tasks completed</p>
            </div>
            <div className="text-3xl font-extrabold text-teal">{percent}%</div>
          </div>
          <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full gradient-teal-mint rounded-full"
              animate={{ width: `${percent}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          {percent === 100 && (
            <p className="text-xs text-teal font-semibold mt-2">🎉 Amazing! All tasks complete!</p>
          )}
        </div>

        {/* Tasks by category */}
        {categories.map(cat => {
          const catTasks = tasks.filter(t => t.category === cat);
          return (
            <div key={cat} className="mb-5">
              <h2 className="text-xs font-bold text-muted uppercase tracking-wider mb-3 flex items-center gap-2">
                {catTasks[0]?.icon} {cat}
              </h2>
              <div className="space-y-2">
                {catTasks.map(task => (
                  <motion.div
                    key={task.id}
                    whileHover={{ scale: 1.005 }}
                    className="card p-4 flex items-center gap-3 cursor-pointer"
                    onClick={() => toggle(task.id)}
                  >
                    <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                      task.completed ? "bg-teal border-teal text-white" : "border-gray-200 dark:border-gray-600"
                    }`}>
                      {task.completed && <span className="text-[10px] font-bold">✓</span>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${task.completed ? "line-through text-muted" : "text-app-dark dark:text-white"}`}>
                        {task.task}
                      </p>
                      <div className="flex items-center gap-3 mt-0.5">
                        {task.time && <span className="text-[10px] text-muted">{task.time}</span>}
                        {task.dueDate && <span className="text-[10px] text-warning">Due: {new Date(task.dueDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>}
                        {task.streak > 0 && <span className="text-[10px] text-orange-500">🔥 {task.streak}-day streak</span>}
                      </div>
                    </div>
                    <span className="text-lg">{task.icon}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </PageTransition>
  );
}

/* ─── FAMILY PROFILES ───────────────────────────────────────────────── */
export function FamilyProfiles() {
  const { activeMember, setActiveMember } = useApp();
  const [selected, setSelected] = useState(activeMember || familyProfiles[0]);

  const select = (p) => { setSelected(p); setActiveMember(p); };

  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold text-app-dark dark:text-white mb-1">Family Health Profiles</h1>
          <p className="text-muted text-sm">Manage and switch between family members</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {familyProfiles.map((profile, i) => (
            <motion.div
              key={profile.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => select(profile)}
              className={`card p-5 cursor-pointer transition-all ${
                selected?.id === profile.id ? "ring-2 ring-medical-blue" : "hover:shadow-md"
              }`}
            >
              <div className="flex items-start gap-3 mb-4">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-14 h-14 rounded-2xl object-cover flex-shrink-0"
                  onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${profile.name}&background=1E40AF&color=fff`; }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-app-dark dark:text-white text-sm">{profile.name}</h3>
                    {selected?.id === profile.id && (
                      <span className="text-[10px] bg-medical-blue text-white px-2 py-0.5 rounded-lg font-bold">Active</span>
                    )}
                  </div>
                  <p className="text-xs text-teal font-semibold">{profile.relation} · {profile.age} yrs</p>
                  <p className="text-xs text-muted mt-0.5">Blood Group: <span className="font-semibold text-alert">{profile.bloodGroup}</span></p>
                </div>
              </div>

              {profile.conditions.length > 0 && (
                <div className="mb-2">
                  <p className="text-[10px] font-bold text-muted uppercase mb-1.5">Conditions</p>
                  <div className="flex flex-wrap gap-1">
                    {profile.conditions.map(c => (
                      <span key={c} className="text-[10px] bg-amber-50 dark:bg-amber-900/20 text-warning font-semibold px-2 py-0.5 rounded-lg">{c}</span>
                    ))}
                  </div>
                </div>
              )}

              {profile.allergies.length > 0 && (
                <div>
                  <p className="text-[10px] font-bold text-muted uppercase mb-1.5">Allergies</p>
                  <div className="flex flex-wrap gap-1">
                    {profile.allergies.map(a => (
                      <span key={a} className="text-[10px] bg-red-50 dark:bg-red-900/20 text-alert font-semibold px-2 py-0.5 rounded-lg">{a}</span>
                    ))}
                  </div>
                </div>
              )}

              <p className="text-[10px] text-muted mt-3">Last visit: {new Date(profile.lastVisit).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}

/* ─── DIGITAL HEALTH VAULT ──────────────────────────────────────────── */
export function HealthVault() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [previewRecord, setPreviewRecord] = useState(null);
  const { showToast } = useApp();

  const categories = ["all", "prescription", "report", "insurance", "vaccination", "discharge"];
  const filtered = healthVaultRecords.filter(r => {
    const matchCat = activeCategory === "all" || r.category === activeCategory;
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.type.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-app-dark dark:text-white mb-1">Digital Health Vault</h1>
            <p className="text-muted text-sm">{healthVaultRecords.length} records · Encrypted & secure</p>
          </div>
          <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 px-3 py-2 rounded-xl">
            <span className="text-green-500">🔒</span>
            <span className="text-xs font-semibold text-green-600 dark:text-green-400">ABDM Secured</span>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <RiSearchLine className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Search records..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-app-dark dark:text-white placeholder-muted focus:outline-none focus:ring-2 focus:ring-teal/40 text-sm"
          />
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-semibold capitalize transition-colors ${
                activeCategory === cat ? "bg-medical-blue text-white" : "bg-gray-100 dark:bg-gray-800 text-muted hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Records Grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {filtered.map((record, i) => (
            <motion.div
              key={record.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <HealthVaultCard
                record={record}
                onClick={() => setPreviewRecord(record)}
              />
            </motion.div>
          ))}
        </div>

        {/* Preview Modal */}
        {previewRecord && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setPreviewRecord(null)} />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative card p-6 max-w-md w-full z-10"
            >
              <div className="text-center mb-5">
                <span className="text-5xl">{previewRecord.icon}</span>
                <h2 className="font-bold text-app-dark dark:text-white mt-3 text-sm">{previewRecord.title}</h2>
                <p className="text-xs text-muted">{previewRecord.type} · {previewRecord.fileSize}</p>
              </div>

              <div className="space-y-2 mb-5">
                {[
                  { label: "Date", value: new Date(previewRecord.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) },
                  previewRecord.doctor && { label: "Doctor", value: previewRecord.doctor },
                  previewRecord.hospital && { label: "Hospital", value: previewRecord.hospital },
                  previewRecord.lab && { label: "Lab", value: previewRecord.lab },
                  previewRecord.policyNo && { label: "Policy No.", value: previewRecord.policyNo },
                ].filter(Boolean).map(item => (
                  <div key={item.label} className="flex justify-between text-xs py-1.5 border-b border-gray-100 dark:border-gray-700">
                    <span className="text-muted">{item.label}</span>
                    <span className="font-semibold text-app-dark dark:text-white">{item.value}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => { showToast("Download started!", "success"); setPreviewRecord(null); }}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 gradient-blue-teal text-white text-xs font-bold rounded-xl"
                >
                  <RiDownloadLine /> Download
                </button>
                <button onClick={() => setPreviewRecord(null)} className="flex-1 py-2.5 bg-gray-100 dark:bg-gray-700 text-app-dark dark:text-white text-xs font-semibold rounded-xl">
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </PageTransition>
  );
}

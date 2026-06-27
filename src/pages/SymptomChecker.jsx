import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  RiSearchLine, RiCloseLine, RiArrowRightLine, RiStethoscopeLine,
  RiRobot2Line, RiAlertLine
} from "react-icons/ri";
import { symptoms } from "../data/health";
import { departments, doctors } from "../data/doctors";
import { PageTransition } from "../components/ui/index";
import { DoctorCard } from "../components/features/DoctorCard";

export default function SymptomChecker() {
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");
  const [showResults, setShowResults] = useState(false);

  const filtered = symptoms.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.keywords.some(k => k.includes(search.toLowerCase()))
  );

  const toggle = (symptom) => {
    setSelected(prev =>
      prev.find(s => s.id === symptom.id)
        ? prev.filter(s => s.id !== symptom.id)
        : [...prev, symptom]
    );
    setShowResults(false);
  };

  const hasSevere = selected.some(s => s.severity === "high");

  // Aggregate suggested department IDs
  const suggestedDeptIds = [...new Set(selected.flatMap(s => s.departments))];
  const suggestedDepts = departments.filter(d => suggestedDeptIds.includes(d.id));
  const suggestedDoctors = doctors
    .filter(d => suggestedDeptIds.includes(d.departmentId))
    .sort((a, b) => b.trustScore - a.trustScore)
    .slice(0, 4);

  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-purple-50 dark:bg-purple-900/20 text-purple-ai px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            <RiRobot2Line /> AI-Powered Symptom Checker
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-app-dark dark:text-white mb-2">
            What are you feeling today?
          </h1>
          <p className="text-muted text-sm">Select your symptoms and we'll recommend the right specialist and department for you.</p>
        </div>

        {/* Search */}
        <div className="relative mb-5">
          <RiSearchLine className="absolute left-4 top-1/2 -translate-y-1/2 text-muted text-lg" />
          <input
            type="text"
            placeholder="Search symptoms..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-app-dark dark:text-white placeholder-muted focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal text-sm"
          />
        </div>

        {/* Selected Tags */}
        {selected.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {selected.map(s => (
              <motion.div
                key={s.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border ${
                  s.severity === "high"
                    ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-alert"
                    : s.severity === "medium"
                    ? "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-warning"
                    : "bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-muted"
                }`}
              >
                <span>{s.icon}</span>
                <span>{s.name}</span>
                <button onClick={() => toggle(s)} className="ml-1 hover:opacity-70">
                  <RiCloseLine />
                </button>
              </motion.div>
            ))}
            <button
              onClick={() => setSelected([])}
              className="text-xs text-muted hover:text-alert transition-colors px-2"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Severity Warning */}
        <AnimatePresence>
          {hasSevere && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-4 mb-5 flex items-start gap-3"
            >
              <RiAlertLine className="text-alert text-xl flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-alert mb-1">High-severity symptom detected</p>
                <p className="text-xs text-red-600 dark:text-red-400">
                  One or more of your symptoms may require urgent care. Please consult a doctor soon or visit{" "}
                  <Link to="/emergency" className="underline font-semibold">Emergency Mode</Link> if severe.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Symptom Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
          {filtered.map(symptom => {
            const isSelected = selected.find(s => s.id === symptom.id);
            return (
              <motion.button
                key={symptom.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggle(symptom)}
                className={`flex items-center gap-3 p-3.5 rounded-2xl border-2 text-left transition-all ${
                  isSelected
                    ? "border-medical-blue bg-medical-blue/10"
                    : "border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-teal/60"
                }`}
              >
                <span className="text-2xl flex-shrink-0">{symptom.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-semibold leading-tight ${isSelected ? "text-medical-blue" : "text-app-dark dark:text-white"}`}>
                    {symptom.name}
                  </p>
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md mt-1 inline-block ${
                    symptom.severity === "high"
                      ? "bg-red-100 dark:bg-red-900/30 text-alert"
                      : symptom.severity === "medium"
                      ? "bg-amber-100 dark:bg-amber-900/30 text-warning"
                      : "bg-gray-100 dark:bg-gray-700 text-muted"
                  }`}>
                    {symptom.severity}
                  </span>
                </div>
                {isSelected && (
                  <div className="w-5 h-5 bg-medical-blue rounded-full flex items-center justify-center flex-shrink-0">
                    <RiCloseLine className="text-white text-xs" />
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Analyze Button */}
        {selected.length > 0 && !showResults && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setShowResults(true)}
            className="w-full py-4 gradient-purple-blue text-white font-bold rounded-2xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20"
          >
            <RiRobot2Line className="text-lg" />
            Analyze {selected.length} Symptom{selected.length > 1 ? "s" : ""} with AI
            <RiArrowRightLine />
          </motion.button>
        )}

        {/* Results */}
        <AnimatePresence>
          {showResults && suggestedDepts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              {/* AI Analysis Card */}
              <div className="gradient-purple-blue rounded-2xl p-5 mb-6 text-white">
                <div className="flex items-center gap-2 mb-3">
                  <RiRobot2Line className="text-xl" />
                  <span className="font-bold text-sm">AI Analysis Complete</span>
                </div>
                <p className="text-sm text-blue-100 mb-3">
                  Based on your {selected.length} symptom{selected.length > 1 ? "s" : ""}, we suggest consulting the following specialist{suggestedDepts.length > 1 ? "s" : ""}:
                </p>
                <div className="flex flex-wrap gap-2">
                  {suggestedDepts.map(dept => (
                    <span key={dept.id} className="flex items-center gap-1 bg-white/20 px-3 py-1.5 rounded-xl text-xs font-semibold">
                      <span>{dept.icon}</span>
                      <span>{dept.name}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Recommended Departments */}
              <h2 className="font-bold text-app-dark dark:text-white mb-4 flex items-center gap-2">
                <RiStethoscopeLine className="text-teal" />
                Recommended Departments
              </h2>
              <div className="grid sm:grid-cols-2 gap-3 mb-7">
                {suggestedDepts.map(dept => (
                  <Link
                    key={dept.id}
                    to={`/doctors?dept=${dept.id}`}
                    className="flex items-center gap-3 p-4 card hover:shadow-md hover:-translate-y-0.5 transition-all"
                  >
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0" style={{ backgroundColor: dept.color + "18" }}>
                      {dept.icon}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-app-dark dark:text-white">{dept.name}</p>
                      <p className="text-xs text-muted">{dept.description}</p>
                    </div>
                    <RiArrowRightLine className="ml-auto text-muted" />
                  </Link>
                ))}
              </div>

              {/* Matching Doctors */}
              {suggestedDoctors.length > 0 && (
                <>
                  <h2 className="font-bold text-app-dark dark:text-white mb-4 flex items-center gap-2">
                    <RiStethoscopeLine className="text-medical-blue" />
                    Top Matching Doctors
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {suggestedDoctors.map((doc, i) => (
                      <DoctorCard key={doc.id} doctor={doc} index={i} />
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}

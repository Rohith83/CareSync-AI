import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  RiRobot2Line, RiArrowRightLine, RiArrowLeftLine, RiCheckLine,
  RiSparklingLine, RiUserHeartLine
} from "react-icons/ri";
import { doctors } from "../data/doctors";
import { PageTransition, TrustScoreBadge } from "../components/ui/index";

const questions = [
  {
    id: "concern",
    question: "What's your main health concern?",
    subtitle: "Choose the area that best describes your issue",
    type: "grid",
    options: [
      { value: "heart", label: "Heart & BP", icon: "❤️" },
      { value: "brain", label: "Brain & Nerves", icon: "🧠" },
      { value: "skin", label: "Skin & Hair", icon: "🩹" },
      { value: "bones", label: "Bones & Joints", icon: "🦴" },
      { value: "stomach", label: "Digestion", icon: "🫁" },
      { value: "mental", label: "Mental Health", icon: "🧘" },
      { value: "hormones", label: "Hormones & Diabetes", icon: "⚗️" },
      { value: "child", label: "Child Health", icon: "👶" },
      { value: "women", label: "Women's Health", icon: "🌸" },
      { value: "general", label: "General Checkup", icon: "🏥" },
      { value: "eyes", label: "Eyes & Vision", icon: "👁️" },
      { value: "holistic", label: "Holistic / Ayurveda", icon: "🌿" },
    ],
  },
  {
    id: "ageGroup",
    question: "What's the patient's age group?",
    subtitle: "Helps us match doctors experienced with your age group",
    type: "list",
    options: [
      { value: "0-12", label: "Child (0–12 years)", icon: "👶" },
      { value: "13-25", label: "Teen / Young Adult (13–25)", icon: "🧑" },
      { value: "26-45", label: "Adult (26–45 years)", icon: "👨" },
      { value: "46-60", label: "Middle-aged (46–60)", icon: "🧓" },
      { value: "60+", label: "Senior (60+ years)", icon: "👴" },
    ],
  },
  {
    id: "urgency",
    question: "How urgent is your concern?",
    subtitle: "We'll prioritize doctors with fastest availability",
    type: "list",
    options: [
      { value: "emergency", label: "Emergency — Need help now!", icon: "🚨", color: "#EF4444" },
      { value: "urgent", label: "Urgent — Within 24 hours", icon: "⚡", color: "#F59E0B" },
      { value: "soon", label: "Soon — Within a week", icon: "📅", color: "#1E40AF" },
      { value: "routine", label: "Routine — No rush", icon: "🗓️", color: "#14B8A6" },
    ],
  },
  {
    id: "language",
    question: "Preferred consultation language?",
    subtitle: "Doctor will communicate in your language",
    type: "grid",
    options: [
      { value: "English", label: "English", icon: "🇬🇧" },
      { value: "Hindi", label: "Hindi", icon: "🇮🇳" },
      { value: "Tamil", label: "Tamil", icon: "🎭" },
      { value: "Telugu", label: "Telugu", icon: "🌺" },
      { value: "Kannada", label: "Kannada", icon: "🏯" },
      { value: "Malayalam", label: "Malayalam", icon: "🌴" },
    ],
  },
  {
    id: "budget",
    question: "What's your consultation budget?",
    subtitle: "We respect your budget while finding the best care",
    type: "list",
    options: [
      { value: "low", label: "Under ₹500", icon: "💚" },
      { value: "mid", label: "₹500 – ₹900", icon: "💛" },
      { value: "high", label: "₹900 – ₹1500", icon: "🧡" },
      { value: "any", label: "No limit — Best doctor", icon: "💜" },
    ],
  },
  {
    id: "visitType",
    question: "How would you like to consult?",
    subtitle: "Choose what's most convenient for you",
    type: "list",
    options: [
      { value: "Video", label: "Video Consult — From home", icon: "🎥" },
      { value: "In-person", label: "In-Person — Visit clinic", icon: "🏥" },
      { value: "both", label: "Either works for me", icon: "✅" },
    ],
  },
];

const concernToDeptMap = {
  heart: [1], brain: [2], skin: [4], bones: [3], stomach: [9],
  mental: [7], hormones: [10], child: [5], women: [14],
  general: [13], eyes: [8], holistic: [20],
};

export default function AIMatch() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [matched, setMatched] = useState(null);
  const [loading, setLoading] = useState(false);

  const currentQ = questions[step];

  const selectOption = (value) => {
    const newAnswers = { ...answers, [currentQ.id]: value };
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setTimeout(() => setStep(s => s + 1), 250);
    } else {
      runMatch(newAnswers);
    }
  };

  const runMatch = (ans) => {
    setLoading(true);
    setTimeout(() => {
      const deptIds = concernToDeptMap[ans.concern] || [13];
      let pool = doctors.filter(d => deptIds.includes(d.departmentId));

      if (ans.language) pool = pool.filter(d => d.language.includes(ans.language)).length > 0
        ? pool.filter(d => d.language.includes(ans.language)) : pool;

      if (ans.budget === "low") pool = pool.filter(d => d.fee < 500);
      else if (ans.budget === "mid") pool = pool.filter(d => d.fee >= 500 && d.fee <= 900);
      else if (ans.budget === "high") pool = pool.filter(d => d.fee > 900 && d.fee <= 1500);

      if (ans.visitType !== "both") pool = pool.filter(d => d.consultationType.includes(ans.visitType));

      if (pool.length === 0) pool = doctors.filter(d => deptIds.includes(d.departmentId));

      pool.sort((a, b) => b.trustScore - a.trustScore);
      setMatched(pool.slice(0, 3));
      setLoading(false);
    }, 1800);
  };

  const reset = () => { setStep(0); setAnswers({}); setMatched(null); setLoading(false); };
  const progress = ((step) / questions.length) * 100;

  if (loading) {
    return (
      <PageTransition>
        <div className="max-w-xl mx-auto px-4 py-20 text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 gradient-purple-blue rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <RiRobot2Line className="text-white text-3xl" />
          </motion.div>
          <h2 className="text-xl font-extrabold text-app-dark dark:text-white mb-2">AI is finding your match…</h2>
          <p className="text-muted text-sm">Analyzing 50+ doctors based on your preferences</p>
          <div className="mt-6 space-y-2 text-xs text-muted">
            {["Checking specialization fit", "Verifying availability", "Calculating trust scores", "Personalizing results"].map((t, i) => (
              <motion.p key={t} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.4 }}>
                ✓ {t}
              </motion.p>
            ))}
          </div>
        </div>
      </PageTransition>
    );
  }

  if (matched) {
    return (
      <PageTransition>
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}
              className="w-16 h-16 gradient-teal-mint rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <RiSparklingLine className="text-white text-2xl" />
            </motion.div>
            <h1 className="text-2xl font-extrabold text-app-dark dark:text-white mb-2">Your AI Matches are Ready!</h1>
            <p className="text-muted text-sm">Based on your preferences, here are your top 3 doctor recommendations.</p>
          </div>

          {/* Answer Summary */}
          <div className="card p-4 mb-6">
            <h3 className="text-xs font-bold text-muted uppercase tracking-wider mb-3">Your Preferences</h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(answers).map(([key, val]) => (
                <span key={key} className="text-xs bg-blue-50 dark:bg-blue-900/20 text-medical-blue font-semibold px-3 py-1 rounded-xl">
                  {val}
                </span>
              ))}
            </div>
          </div>

          {/* Matched Doctors */}
          <div className="space-y-4 mb-6">
            {matched.map((doc, i) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="card p-5"
              >
                <div className="flex items-start gap-4">
                  {i === 0 && (
                    <div className="absolute top-0 left-0 bg-teal text-white text-[10px] font-bold px-2 py-0.5 rounded-tl-2xl rounded-br-xl">
                      BEST MATCH
                    </div>
                  )}
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="w-16 h-16 rounded-2xl object-cover flex-shrink-0"
                    onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(doc.name)}&background=1E40AF&color=fff`; }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-app-dark dark:text-white text-sm">{doc.name}</h3>
                        <p className="text-xs text-teal font-semibold">{doc.specialization}</p>
                        <p className="text-xs text-muted mt-0.5">{doc.hospital}</p>
                      </div>
                      <TrustScoreBadge score={doc.trustScore} />
                    </div>

                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="text-[10px] bg-gray-100 dark:bg-gray-700 text-muted px-2 py-0.5 rounded-lg">⭐ {doc.rating}</span>
                      <span className="text-[10px] bg-gray-100 dark:bg-gray-700 text-muted px-2 py-0.5 rounded-lg">₹{doc.fee}</span>
                      <span className="text-[10px] bg-gray-100 dark:bg-gray-700 text-muted px-2 py-0.5 rounded-lg">{doc.experience}y exp</span>
                      <span className="text-[10px] bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 px-2 py-0.5 rounded-lg font-semibold">{doc.nextSlot}</span>
                    </div>

                    <div className="flex gap-2 mt-3">
                      <Link
                        to={`/book/${doc.id}`}
                        className="flex-1 py-2 gradient-blue-teal text-white text-xs font-bold rounded-xl text-center hover:opacity-90 transition-opacity"
                      >
                        Book Now
                      </Link>
                      <Link
                        to={`/doctors/${doc.id}`}
                        className="flex-1 py-2 bg-gray-100 dark:bg-gray-700 text-app-dark dark:text-white text-xs font-semibold rounded-xl text-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      >
                        View Profile
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={reset}
              className="flex-1 py-3 bg-gray-100 dark:bg-gray-800 text-app-dark dark:text-white font-semibold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm"
            >
              Start Over
            </button>
            <Link to="/doctors" className="flex-1 py-3 text-center gradient-blue-teal text-white font-bold rounded-xl hover:opacity-90 transition-opacity text-sm">
              Browse All Doctors
            </Link>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="max-w-xl mx-auto px-4 py-8">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 gradient-purple-blue rounded-lg flex items-center justify-center">
                <RiRobot2Line className="text-white text-sm" />
              </div>
              <span className="font-bold text-app-dark dark:text-white text-sm">AI Doctor Match</span>
            </div>
            <span className="text-xs text-muted font-semibold">{step + 1} / {questions.length}</span>
          </div>
          <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full gradient-purple-blue rounded-full"
              animate={{ width: `${((step + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Back */}
        {step > 0 && (
          <button onClick={() => setStep(s => s - 1)} className="flex items-center gap-1 text-sm text-muted hover:text-app-dark dark:hover:text-white mb-5 transition-colors">
            <RiArrowLeftLine /> Back
          </button>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <h2 className="text-xl font-extrabold text-app-dark dark:text-white mb-1">{currentQ.question}</h2>
            <p className="text-muted text-sm mb-6">{currentQ.subtitle}</p>

            {currentQ.type === "grid" ? (
              <div className="grid grid-cols-3 gap-3">
                {currentQ.options.map(opt => (
                  <motion.button
                    key={opt.value}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => selectOption(opt.value)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                      answers[currentQ.id] === opt.value
                        ? "border-purple-ai bg-purple-50 dark:bg-purple-900/20"
                        : "border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-purple-ai/50"
                    }`}
                  >
                    <span className="text-2xl">{opt.icon}</span>
                    <span className={`text-xs font-semibold text-center leading-tight ${
                      answers[currentQ.id] === opt.value ? "text-purple-ai" : "text-app-dark dark:text-white"
                    }`}>{opt.label}</span>
                  </motion.button>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {currentQ.options.map(opt => (
                  <motion.button
                    key={opt.value}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => selectOption(opt.value)}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all ${
                      answers[currentQ.id] === opt.value
                        ? "border-medical-blue bg-medical-blue/10"
                        : "border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-medical-blue/50"
                    }`}
                  >
                    <span className="text-2xl flex-shrink-0">{opt.icon}</span>
                    <span className={`font-semibold text-sm ${
                      answers[currentQ.id] === opt.value ? "text-medical-blue" : "text-app-dark dark:text-white"
                    }`}>{opt.label}</span>
                    {answers[currentQ.id] === opt.value && (
                      <div className="ml-auto w-5 h-5 bg-medical-blue rounded-full flex items-center justify-center">
                        <RiCheckLine className="text-white text-xs" />
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}

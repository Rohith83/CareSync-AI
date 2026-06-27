import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  RiHeartPulseLine, RiRobot2Line, RiShieldCheckLine, RiTimeLine,
  RiUserHeartLine, RiArrowRightLine, RiStarFill, RiVerifiedBadgeFill,
  RiFlashlightLine, RiFileTextLine, RiTeamLine
} from "react-icons/ri";
import { PageTransition } from "../components/ui/index";

const features = [
  { icon: RiRobot2Line, title: "AI Doctor Match", desc: "Answer 6 smart questions. Get matched with the right specialist in seconds.", color: "#7C3AED", bg: "#7C3AED10" },
  { icon: RiHeartPulseLine, title: "Smart Symptom Checker", desc: "Select symptoms, get department suggestions, and find the best doctor for you.", color: "#EF4444", bg: "#EF444410" },
  { icon: RiTimeLine, title: "Health Timeline", desc: "Your complete medical journey — appointments, reports, prescriptions, all in one view.", color: "#14B8A6", bg: "#14B8A610" },
  { icon: RiShieldCheckLine, title: "Digital Health Vault", desc: "Secure storage for all your medical records, insurance cards, and lab reports.", color: "#1E40AF", bg: "#1E40AF10" },
  { icon: RiTeamLine, title: "Family Health Profiles", desc: "Manage health for your entire family — parents, grandparents, siblings, all together.", color: "#F59E0B", bg: "#F59E0B10" },
  { icon: RiFlashlightLine, title: "Emergency Mode", desc: "One tap to nearest hospitals, ambulance, and your emergency contacts.", color: "#EF4444", bg: "#EF444410" },
];

const stats = [
  { value: "2.4M+", label: "Patients Served" },
  { value: "50K+", label: "Verified Doctors" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "< 3 min", label: "Avg. Booking Time" },
];

const testimonials = [
  { name: "Priya S.", city: "Chennai", rating: 5, text: "CareSync AI matched me with the perfect cardiologist in under a minute. The AI Doctor Match is genuinely impressive!", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
  { name: "Arjun K.", city: "Bangalore", rating: 5, text: "Managing my parents' health records was a nightmare before CareSync. Now everything is in one place.", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
  { name: "Meena R.", city: "Coimbatore", rating: 5, text: "The symptom checker helped me figure out I needed an endocrinologist, not a GP. Saved so much time!", avatar: "https://randomuser.me/api/portraits/women/22.jpg" },
];

export default function Landing() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative overflow-hidden bg-app dark:bg-gray-950 min-h-screen flex items-center">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.04] bg-medical-blue" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-[0.06] bg-teal" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.02]" style={{ background: "radial-gradient(circle, #7C3AED, transparent)" }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-full px-4 py-1.5 text-sm font-semibold text-purple-ai mb-6"
              >
                <RiRobot2Line />
                India's First AI-Powered Patient Care Platform
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-app-dark dark:text-white leading-tight mb-6"
              >
                Your health,
                <br />
                <span className="bg-gradient-to-r from-medical-blue to-teal bg-clip-text">
                Intelligently connected.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-muted leading-relaxed mb-8 max-w-lg"
              >
                CareSync AI goes beyond appointment booking. Smart symptom checking, AI doctor matching, care plan tracking, and a complete health vault — for you and your entire family.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <Link
                  to="/signup"
                  className="flex items-center justify-center gap-2 px-8 py-4 gradient-blue-teal text-white font-bold rounded-2xl hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/25"
                >
                  Start Free Today
                  <RiArrowRightLine />
                </Link>
                <Link
                  to="/doctors"
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-app-dark dark:text-white font-bold rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <RiUserHeartLine className="text-teal" />
                  Find a Doctor
                </Link>
              </motion.div>

              {/* Trust Badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap items-center gap-4 mt-8"
              >
                <div className="flex items-center gap-1.5 text-sm text-muted">
                  <RiVerifiedBadgeFill className="text-teal" />
                  50,000+ Verified Doctors
                </div>
                <div className="flex items-center gap-1.5 text-sm text-muted">
                  <RiShieldCheckLine className="text-medical-blue" />
                  ABDM Compliant
                </div>
                <div className="flex items-center gap-1.5 text-sm text-muted">
                  <RiStarFill className="text-warning" />
                  4.9 App Rating
                </div>
              </motion.div>
            </div>

            {/* Right — Dashboard Preview Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="card p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-xs text-muted font-medium">Good morning,</p>
                    <h3 className="font-bold text-app-dark dark:text-white">Rohith 👋</h3>
                  </div>
                  <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 px-3 py-1.5 rounded-xl">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-xs font-semibold text-green-600 dark:text-green-400">Health Score: 78</span>
                  </div>
                </div>

                {/* Fake vitals */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[
                    { label: "Blood Pressure", value: "120/76", unit: "mmHg", icon: "❤️", color: "#EF4444" },
                    { label: "Heart Rate", value: "71", unit: "bpm", icon: "💓", color: "#7C3AED" },
                    { label: "Sleep", value: "7.2", unit: "hrs", icon: "🌙", color: "#1E40AF" },
                  ].map(v => (
                    <div key={v.label} className="bg-gray-50 dark:bg-white/5 rounded-2xl p-3 text-center">
                      <div className="text-xl mb-1">{v.icon}</div>
                      <p className="text-base font-bold text-app-dark dark:text-white">{v.value}</p>
                      <p className="text-[10px] text-muted">{v.unit}</p>
                    </div>
                  ))}
                </div>

                {/* Next appointment */}
                <div className="flex items-center gap-3 bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-3 mb-4">
                  <img src="https://randomuser.me/api/portraits/men/32.jpg" className="w-10 h-10 rounded-xl object-cover" />
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-app-dark dark:text-white">Dr. Arjun Mehta</p>
                    <p className="text-[10px] text-muted">Cardiology · Today 3:00 PM</p>
                  </div>
                  <span className="text-[10px] font-bold text-teal bg-teal/10 px-2 py-1 rounded-lg">Upcoming</span>
                </div>

                {/* AI suggestion */}
                <div className="flex items-center gap-3 bg-purple-50 dark:bg-purple-900/20 rounded-2xl p-3">
                  <div className="w-8 h-8 rounded-xl gradient-purple-blue flex items-center justify-center flex-shrink-0">
                    <RiRobot2Line className="text-white text-sm" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-purple-ai">AI Insight</p>
                    <p className="text-[10px] text-muted">BP improved 12% this month. Keep up the routine!</p>
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 shadow-xl rounded-2xl px-3 py-2 flex items-center gap-2">
                <div className="w-7 h-7 bg-teal/10 rounded-lg flex items-center justify-center">🤖</div>
                <div>
                  <p className="text-[10px] font-semibold text-app-dark dark:text-white">AI Match</p>
                  <p className="text-[10px] text-muted">Doctor found!</p>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 shadow-xl rounded-2xl px-3 py-2 flex items-center gap-2">
                <div className="w-7 h-7 bg-green-100 rounded-lg flex items-center justify-center">✅</div>
                <div>
                  <p className="text-[10px] font-semibold text-app-dark dark:text-white">Booked!</p>
                  <p className="text-[10px] text-muted">Confirmation sent</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-medical-blue dark:bg-blue-900">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <p className="text-3xl font-extrabold text-white mb-1">{s.value}</p>
                <p className="text-sm text-blue-200">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-app dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-teal mb-3 block">Why CareSync AI</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-app-dark dark:text-white mb-4">
              Healthcare that thinks with you
            </h2>
            <p className="text-muted max-w-xl mx-auto">
              Not just a booking app. A complete AI-powered health companion for India's modern families.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
                className="card p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: f.bg }}>
                  <f.icon className="text-xl" style={{ color: f.color }} />
                </div>
                <h3 className="font-bold text-app-dark dark:text-white mb-2">{f.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-app-dark dark:text-white mb-3">
              Trusted by patients across India
            </h2>
            <p className="text-muted">Real experiences from real families.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="card p-6"
              >
                <div className="flex gap-1 mb-3">
                  {[...Array(t.rating)].map((_, i) => <RiStarFill key={i} className="text-warning text-sm" />)}
                </div>
                <p className="text-sm text-muted leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-2">
                  <img src={t.avatar} className="w-9 h-9 rounded-full object-cover" onError={e => { e.target.style.display = "none"; }} />
                  <div>
                    <p className="text-sm font-bold text-app-dark dark:text-white">{t.name}</p>
                    <p className="text-xs text-muted">{t.city}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 gradient-blue-teal">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Your healthiest life starts here.
          </h2>
          <p className="text-blue-100 mb-8">
            Join 2.4 million Indians who trust CareSync AI with their family's health.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/signup"
              className="px-10 py-4 bg-white text-medical-blue font-bold rounded-2xl hover:bg-blue-50 transition-colors shadow-lg"
            >
              Create Free Account
            </Link>
            <Link
              to="/about"
              className="px-10 py-4 bg-white/10 text-white font-bold rounded-2xl hover:bg-white/20 transition-colors border border-white/30"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

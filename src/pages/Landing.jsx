import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  RiHeartPulseLine, RiRobot2Line, RiShieldCheckLine, RiTimeLine,
  RiUserHeartLine, RiArrowRightLine, RiStarFill, RiVerifiedBadgeFill,
  RiFlashlightLine, RiTeamLine, RiSearchLine, RiCalendarCheckLine,
  RiFileShield2Line, RiStethoscopeLine, RiMentalHealthLine,
  RiThermometerLine, RiCapsuleLine, RiPulseLine
} from "react-icons/ri";
import { PageTransition } from "../components/ui/index";

const stats = [
  { value: "2.4M+", label: "Patients Served" },
  { value: "50K+", label: "Verified Doctors" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "< 3 min", label: "Avg. Booking Time" },
];

const steps = [
  { icon: RiSearchLine, step: "01", title: "Tell us what's wrong", desc: "Describe your symptoms in plain language or pick from a simple checklist." },
  { icon: RiRobot2Line, step: "02", title: "AI finds your match", desc: "Our engine compares your case against specialties, ratings, and availability." },
  { icon: RiCalendarCheckLine, step: "03", title: "Book in seconds", desc: "Confirm a time slot with your matched doctor — no back-and-forth calls." },
  { icon: RiFileShield2Line, step: "04", title: "Care stays with you", desc: "Every visit, prescription, and report syncs into your personal health vault." },
];

const features = [
  { icon: RiRobot2Line, title: "AI Doctor Match", desc: "Answer a few smart questions and get matched with the right specialist in seconds." },
  { icon: RiHeartPulseLine, title: "Smart Symptom Checker", desc: "Select symptoms, get department suggestions, and find the best doctor for you." },
  { icon: RiTimeLine, title: "Health Timeline", desc: "Your complete medical journey — appointments, reports, prescriptions, all in one view." },
  { icon: RiShieldCheckLine, title: "Digital Health Vault", desc: "Secure storage for all your medical records, insurance cards, and lab reports." },
  { icon: RiTeamLine, title: "Family Health Profiles", desc: "Manage health for your entire family — parents, grandparents, siblings, all together." },
  { icon: RiFlashlightLine, title: "Emergency Mode", desc: "One tap to nearest hospitals, ambulance, and your emergency contacts." },
];

const familyMembers = [
  { name: "You", role: "Primary", icon: RiPulseLine, color: "#1E40AF" },
  { name: "Parents", role: "2 profiles", icon: RiHeartPulseLine, color: "#14B8A6" },
  { name: "Children", role: "1 profile", icon: RiMentalHealthLine, color: "#7C3AED" },
];

const testimonials = [
  { name: "Priya S.", city: "Chennai", rating: 5, text: "CareSync AI matched me with the perfect cardiologist in under a minute. The AI Doctor Match is genuinely impressive!", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
  { name: "Arjun K.", city: "Bangalore", rating: 5, text: "Managing my parents' health records was a nightmare before CareSync. Now everything is in one place.", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
  { name: "Meena R.", city: "Coimbatore", rating: 5, text: "The symptom checker helped me figure out I needed an endocrinologist, not a GP. Saved so much time!", avatar: "https://randomuser.me/api/portraits/women/22.jpg" },
];

const symptomChips = ["Headache", "Fever", "Chest pain", "Fatigue", "Skin rash"];

export default function Landing() {
  return (
    <PageTransition>
      <section className="relative overflow-hidden cs-hero-bg">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full cs-hero-glow" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 pt-24 pb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 cs-pill mb-7"
          >
            <RiStethoscopeLine />
            India's First AI-Powered Patient Care Platform
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-app-dark dark:text-white leading-[1.1] mb-6"
          >
            Calm, considered care
            <br />
            for your whole family.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="text-lg text-muted leading-relaxed mb-9 max-w-xl mx-auto"
          >
            CareSync AI listens to your symptoms, finds the right specialist, and keeps every
            record safe — so healthcare feels less like a system and more like support.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="flex flex-col sm:flex-row gap-3 justify-center mb-10"
          >
            <Link to="/signup" className="cs-btn-primary">
              Start Free Today
              <RiArrowRightLine />
            </Link>
            <Link to="/doctors" className="cs-btn-secondary">
              <RiUserHeartLine />
              Find a Doctor
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted"
          >
            <span className="inline-flex items-center gap-1.5"><RiVerifiedBadgeFill className="text-teal" /> 50,000+ Verified Doctors</span>
            <span className="inline-flex items-center gap-1.5"><RiShieldCheckLine className="text-medical-blue" /> ABDM Compliant</span>
            <span className="inline-flex items-center gap-1.5"><RiStarFill className="text-warning" /> 4.9 App Rating</span>
          </motion.div>
        </div>

        <div className="relative max-w-5xl mx-auto px-4 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="cs-panel"
          >
            <div className="grid md:grid-cols-3 gap-5">
              <div className="cs-panel-card">
                <div className="flex items-center gap-2 mb-4">
                  <div className="cs-icon-circle" style={{ background: "#7C3AED14" }}>
                    <RiRobot2Line style={{ color: "#7C3AED" }} />
                  </div>
                  <p className="text-sm font-bold text-app-dark dark:text-white">Tell CareSync what's wrong</p>
                </div>
                <div className="cs-search-bar mb-3">
                  <RiSearchLine className="text-muted text-sm" />
                  <span className="text-sm text-muted">I've had a fever since...</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {symptomChips.map(s => (
                    <span key={s} className="cs-chip">{s}</span>
                  ))}
                </div>
              </div>

              <div className="cs-panel-card">
                <div className="flex items-center gap-2 mb-4">
                  <div className="cs-icon-circle" style={{ background: "#14B8A614" }}>
                    <RiHeartPulseLine style={{ color: "#14B8A6" }} />
                  </div>
                  <p className="text-sm font-bold text-app-dark dark:text-white">Matched specialist</p>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src="https://randomuser.me/api/portraits/men/52.jpg"
                    className="w-11 h-11 rounded-full object-cover"
                    onError={e => { e.target.style.display = "none"; }}
                  />
                  <div>
                    <p className="text-sm font-semibold text-app-dark dark:text-white">Dr. Arjun Mehta</p>
                    <p className="text-xs text-muted">Cardiology · 98% match</p>
                  </div>
                </div>
                <div className="cs-mini-row">
                  <RiCalendarCheckLine className="text-teal text-sm" />
                  <span>Today, 3:00 PM</span>
                </div>
              </div>

              <div className="cs-panel-card">
                <div className="flex items-center gap-2 mb-4">
                  <div className="cs-icon-circle" style={{ background: "#1E40AF14" }}>
                    <RiFileShield2Line style={{ color: "#1E40AF" }} />
                  </div>
                  <p className="text-sm font-bold text-app-dark dark:text-white">Health vault</p>
                </div>
                <div className="space-y-2">
                  <div className="cs-mini-row">
                    <RiThermometerLine className="text-medical-blue text-sm" />
                    <span>Lab report · Updated today</span>
                  </div>
                  <div className="cs-mini-row">
                    <RiCapsuleLine className="text-medical-blue text-sm" />
                    <span>Prescription · Active</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

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

      <section className="py-20 bg-app dark:bg-gray-950">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-teal mb-3 block">How it works</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-app-dark dark:text-white mb-4">
              From symptom to specialist, simplified.
            </h2>
            <p className="text-muted max-w-xl mx-auto">
              Four calm steps stand between you and the right care.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
                className="cs-step-card"
              >
                <span className="cs-step-number">{s.step}</span>
                <div className="cs-icon-circle mb-4" style={{ background: "var(--color-mint)" }}>
                  <s.icon className="text-teal" />
                </div>
                <h3 className="font-bold text-app-dark dark:text-white mb-2">{s.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-medical-blue mb-3 block">Why CareSync AI</span>
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
                className="cs-feature-row"
              >
                <div className="cs-icon-circle flex-shrink-0" style={{ background: "var(--color-mint)" }}>
                  <f.icon className="text-teal" />
                </div>
                <div>
                  <h3 className="font-bold text-app-dark dark:text-white mb-1.5">{f.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-app dark:bg-gray-950">
        <div className="max-w-5xl mx-auto px-4">
          <div className="cs-family-panel">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-purple-ai mb-3 block">Built for families</span>
                <h2 className="text-3xl font-extrabold text-app-dark dark:text-white mb-4">
                  One account, every family member's health.
                </h2>
                <p className="text-muted leading-relaxed mb-6">
                  Keep track of parents, children, and yourself under one roof — separate
                  timelines, shared peace of mind.
                </p>
                <Link to="/signup" className="cs-btn-primary inline-flex">
                  Create a Family Profile
                  <RiArrowRightLine />
                </Link>
              </div>
              <div className="space-y-3">
                {familyMembers.map((m, i) => (
                  <motion.div
                    key={m.name}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="cs-family-row"
                  >
                    <div className="cs-icon-circle" style={{ background: m.color + "14" }}>
                      <m.icon style={{ color: m.color }} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-app-dark dark:text-white">{m.name}</p>
                      <p className="text-xs text-muted">{m.role}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

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

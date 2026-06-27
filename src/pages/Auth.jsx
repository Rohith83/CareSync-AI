import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { RiHeartPulseLine, RiEyeLine, RiEyeOffLine, RiLockLine, RiMailLine, RiUserLine, RiPhoneLine } from "react-icons/ri";
import { useApp } from "../context/AppContext";
import { PageTransition } from "../components/ui/index";

function AuthLayout({ title, subtitle, children }) {
  return (
    <PageTransition>
      <div className="min-h-screen bg-app dark:bg-gray-950 flex">
        {/* Left Panel */}
        <div className="hidden lg:flex flex-col justify-between w-1/2 gradient-blue-teal p-12">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <RiHeartPulseLine className="text-white text-lg" />
            </div>
            <span className="font-bold text-xl text-white">CareSync AI</span>
          </Link>

          <div>
            <h2 className="text-4xl font-extrabold text-white mb-4 leading-tight">
              Your complete<br />health companion.
            </h2>
            <p className="text-blue-100 text-lg mb-8">
              AI-powered care for you and your entire family. Doctors, records, timelines — all in one place.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "🤖", label: "AI Doctor Match" },
                { icon: "🏥", label: "50K+ Doctors" },
                { icon: "👨‍👩‍👧", label: "Family Profiles" },
                { icon: "🔒", label: "Secure Vault" },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-2 bg-white/15 rounded-2xl px-4 py-3">
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-white text-sm font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-blue-200 text-sm">© 2025 CareSync AI · ABDM Compliant</p>
        </div>

        {/* Right Panel */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-md">
            <div className="lg:hidden flex justify-center mb-8">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-10 h-10 gradient-blue-teal rounded-xl flex items-center justify-center">
                  <RiHeartPulseLine className="text-white" />
                </div>
                <span className="font-bold text-xl text-app-dark dark:text-white">CareSync AI</span>
              </Link>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-8">
              <h1 className="text-2xl font-extrabold text-app-dark dark:text-white mb-1">{title}</h1>
              <p className="text-muted text-sm mb-6">{subtitle}</p>
              {children}
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

function InputField({ icon: Icon, type, placeholder, value, onChange, showToggle, onToggle, showPass }) {
  return (
    <div className="relative">
      <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
      <input
        type={showToggle ? (showPass ? "text" : "password") : type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-app-dark dark:text-white placeholder-muted focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition text-sm"
      />
      {showToggle && (
        <button type="button" onClick={onToggle} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted">
          {showPass ? <RiEyeOffLine /> : <RiEyeLine />}
        </button>
      )}
    </div>
  );
}

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const { login, showToast } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) { setError("Please fill all fields."); return; }
    const user = { name: "Rohith", email, avatar: "https://randomuser.me/api/portraits/men/28.jpg", bloodGroup: "AB+" };
    login(user);
    showToast("Welcome back to CareSync AI! 👋", "success");
    navigate("/dashboard");
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to your CareSync AI account">
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField icon={RiMailLine} type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} />
        <InputField icon={RiLockLine} type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} showToggle showPass={showPass} onToggle={() => setShowPass(!showPass)} />

        {error && <p className="text-xs text-alert">{error}</p>}

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-muted cursor-pointer">
            <input type="checkbox" className="rounded" /> Remember me
          </label>
          <a href="#" className="text-teal hover:underline">Forgot password?</a>
        </div>

        <button type="submit" className="w-full py-3 gradient-blue-teal text-white font-bold rounded-xl hover:opacity-90 transition-opacity shadow-md shadow-blue-500/20">
          Sign In
        </button>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200 dark:border-gray-700" /></div>
          <div className="relative text-center"><span className="px-3 bg-white dark:bg-gray-800 text-xs text-muted">or continue as</span></div>
        </div>

        <button
          type="button"
          onClick={() => { login({ name: "Rohith", email: "demo@caresync.ai", avatar: "https://randomuser.me/api/portraits/men/28.jpg", bloodGroup: "B+" }); showToast("Demo mode active!", "info"); navigate("/dashboard"); }}
          className="w-full py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-app-dark dark:text-white font-semibold rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm"
        >
          🚀 Try Demo Account
        </button>

        <p className="text-center text-sm text-muted">
          New to CareSync?{" "}
          <Link to="/signup" className="text-medical-blue font-semibold hover:underline">Create account</Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export function Signup() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const { login, showToast } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) return;
    const user = { name: form.name, email: form.email, avatar: "https://randomuser.me/api/portraits/men/28.jpg", bloodGroup: "B+", phone: form.phone };
    login(user);
    showToast("Account created! Welcome to CareSync AI 🎉", "success");
    navigate("/dashboard");
  };

  const update = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  return (
    <AuthLayout title="Create your account" subtitle="Join 2.4M+ families managing health smarter">
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField icon={RiUserLine} type="text" placeholder="Full name" value={form.name} onChange={update("name")} />
        <InputField icon={RiMailLine} type="email" placeholder="Email address" value={form.email} onChange={update("email")} />
        <InputField icon={RiPhoneLine} type="tel" placeholder="Mobile number" value={form.phone} onChange={update("phone")} />
        <InputField icon={RiLockLine} type="password" placeholder="Create password" value={form.password} onChange={update("password")} showToggle showPass={showPass} onToggle={() => setShowPass(!showPass)} />

        <p className="text-xs text-muted">
          By signing up, you agree to our{" "}
          <a href="#" className="text-teal hover:underline">Terms of Service</a> and{" "}
          <a href="#" className="text-teal hover:underline">Privacy Policy</a>.
        </p>

        <button type="submit" className="w-full py-3 gradient-blue-teal text-white font-bold rounded-xl hover:opacity-90 transition-opacity shadow-md shadow-blue-500/20">
          Create Account — It's Free
        </button>

        <p className="text-center text-sm text-muted">
          Already have an account?{" "}
          <Link to="/login" className="text-medical-blue font-semibold hover:underline">Sign in</Link>
        </p>
      </form>
    </AuthLayout>
  );
}

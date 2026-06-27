import { AnimatePresence, motion } from "framer-motion";
import { useApp } from "../../context/AppContext";
import { RiCheckLine, RiErrorWarningLine, RiInformationLine, RiCloseLine } from "react-icons/ri";

// Toast Notification
export function Toast() {
  const { toast } = useApp();
  const icons = { success: RiCheckLine, error: RiErrorWarningLine, info: RiInformationLine };
  const colors = { success: "#14B8A6", error: "#EF4444", info: "#1E40AF" };

  return (
    <div className="fixed bottom-6 right-6 z-[100] pointer-events-none">
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="bg-gray-900 dark:bg-gray-800 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 max-w-sm pointer-events-auto"
          >
            <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: colors[toast.type] + "30" }}>
              {(() => { const Icon = icons[toast.type] || RiCheckLine; return <Icon style={{ color: colors[toast.type] }} />; })()}
            </div>
            <p className="text-sm font-medium">{toast.message}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Modal
export function Modal({ open, onClose, title, children, size = "md" }) {
  const sizes = { sm: "max-w-md", md: "max-w-lg", lg: "max-w-2xl", xl: "max-w-4xl" };
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`relative card w-full ${sizes[size]} max-h-[90vh] overflow-y-auto z-10`}
          >
            <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-100 dark:border-gray-700">
              <h2 className="text-lg font-bold text-app-dark dark:text-white">{title}</h2>
              <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center text-muted transition-colors">
                <RiCloseLine />
              </button>
            </div>
            <div className="p-6">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// Loading Skeleton
export function Skeleton({ className = "" }) {
  return (
    <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded-xl ${className}`} />
  );
}

export function CardSkeleton() {
  return (
    <div className="card p-5 space-y-3">
      <div className="flex items-center gap-3">
        <Skeleton className="w-14 h-14 rounded-2xl flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-4/5" />
      <div className="flex gap-2 pt-1">
        <Skeleton className="h-8 flex-1" />
        <Skeleton className="h-8 flex-1" />
      </div>
    </div>
  );
}

// Empty State
export function EmptyState({ icon = "🔍", title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-lg font-bold text-app-dark dark:text-white mb-2">{title}</h3>
      <p className="text-sm text-muted max-w-xs mb-6">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-2.5 bg-medical-blue text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors text-sm"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

// Trust Score Badge
export function TrustScoreBadge({ score, size = "sm" }) {
  const color = score >= 95 ? "#14B8A6" : score >= 88 ? "#1E40AF" : "#F59E0B";
  const label = score >= 95 ? "Excellent" : score >= 88 ? "Trusted" : "Good";
  return (
    <div className="flex items-center gap-1.5">
      <div
        className={`flex items-center gap-1 px-2 py-1 rounded-lg font-bold ${size === "sm" ? "text-xs" : "text-sm"}`}
        style={{ backgroundColor: color + "18", color }}
      >
        <span>✦</span>
        <span>{score}</span>
      </div>
      <span className={`${size === "sm" ? "text-xs" : "text-sm"} text-muted`}>{label}</span>
    </div>
  );
}

// Page transition wrapper
export function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

// Protected Route
import { Navigate } from "react-router-dom";
export function ProtectedRoute({ children }) {
  const { user } = useApp();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

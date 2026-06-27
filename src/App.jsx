import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AppProvider } from "./context/AppContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { Toast, ProtectedRoute } from "./components/ui/index";

import Landing from "./pages/Landing";
import { Login, Signup } from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import { FindDoctors, DoctorDetails } from "./pages/Doctors";
import Booking, { AppointmentSuccess } from "./pages/Booking";
import SymptomChecker from "./pages/SymptomChecker";
import AIMatch from "./pages/AIMatch";
import { HealthTimeline, CarePlan, FamilyProfiles, HealthVault } from "./pages/HealthPages";
import { Emergency, HealthInsights, Notifications } from "./pages/OtherPages";
import { Profile, Settings, About, NotFound } from "./pages/StaticPages";

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-app dark:bg-gray-950">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/doctors" element={<ProtectedRoute><FindDoctors /></ProtectedRoute>} />
            <Route path="/doctors/:id" element={<ProtectedRoute><DoctorDetails /></ProtectedRoute>} />
            <Route path="/book/:doctorId" element={<ProtectedRoute><Booking /></ProtectedRoute>} />
            <Route path="/appointment-success" element={<ProtectedRoute><AppointmentSuccess /></ProtectedRoute>} />
            <Route path="/symptom-checker" element={<ProtectedRoute><SymptomChecker /></ProtectedRoute>} />
            <Route path="/ai-match" element={<ProtectedRoute><AIMatch /></ProtectedRoute>} />
            <Route path="/timeline" element={<ProtectedRoute><HealthTimeline /></ProtectedRoute>} />
            <Route path="/care-plan" element={<ProtectedRoute><CarePlan /></ProtectedRoute>} />
            <Route path="/family" element={<ProtectedRoute><FamilyProfiles /></ProtectedRoute>} />
            <Route path="/vault" element={<ProtectedRoute><HealthVault /></ProtectedRoute>} />
            <Route path="/emergency" element={<ProtectedRoute><Emergency /></ProtectedRoute>} />
            <Route path="/insights" element={<ProtectedRoute><HealthInsights /></ProtectedRoute>} />
            <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
        <Toast />
      </BrowserRouter>
    </AppProvider>
  );
}

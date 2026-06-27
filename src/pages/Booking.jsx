import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiArrowLeftLine, RiArrowRightLine, RiCheckLine,
  RiVideoLine, RiHospitalLine, RiCalendarLine, RiTimeLine
} from "react-icons/ri";
import { doctors, generateSlots } from "../data/doctors";
import { useApp } from "../context/AppContext";
import { PageTransition } from "../components/ui/index";

const steps = ["Your Concern", "Doctor Match", "Pick a Slot", "Confirm"];

const concernOptions = [
  "Routine Checkup", "Follow-up Visit", "New Symptom", "Second Opinion",
  "Medication Review", "Test Results", "Chronic Condition Management", "Emergency Consultation"
];

export default function Booking() {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const { bookAppointment, showToast, activeMember } = useApp();
  const doctor = doctors.find(d => d.id === parseInt(doctorId));

  const [step, setStep] = useState(0);
  const [concern, setConcern] = useState("");
  const [consultType, setConsultType] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  if (!doctor) return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center">
      <p className="text-5xl mb-4">❌</p>
      <h2 className="text-xl font-bold text-app-dark dark:text-white mb-2">Doctor not found</h2>
      <Link to="/doctors" className="text-teal hover:underline">← Back to doctors</Link>
    </div>
  );

  const slots = generateSlots(doctor.id);
  const dates = [...new Set(slots.map(s => s.date))];
  const slotsForDate = selectedDate ? slots.filter(s => s.date === selectedDate && s.available) : [];

  const handleConfirm = () => {
    const appt = bookAppointment({
      doctorId: doctor.id,
      doctorName: doctor.name,
      specialization: doctor.specialization,
      hospital: doctor.hospital,
      doctorImage: doctor.image,
      fee: doctor.fee,
      date: selectedDate,
      time: selectedSlot.time,
      type: selectedSlot.type,
      concern,
      consultType,
      notes,
      member: activeMember?.name || "Self",
    });
    showToast("Appointment booked successfully! 🎉", "success");
    navigate("/appointment-success", { state: { appointment: appt, doctor } });
  };

  return (
    <PageTransition>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <button onClick={() => step > 0 ? setStep(s => s - 1) : navigate(-1)} className="flex items-center gap-2 text-sm text-muted hover:text-app-dark dark:hover:text-white mb-6 transition-colors">
          <RiArrowLeftLine /> {step > 0 ? "Back" : "Back to doctor"}
        </button>

        <h1 className="text-xl font-extrabold text-app-dark dark:text-white mb-6">
          Book Appointment
        </h1>

        {/* Stepper */}
        <div className="flex items-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors ${
                i < step ? "bg-teal text-white" :
                i === step ? "bg-medical-blue text-white" :
                "bg-gray-100 dark:bg-gray-700 text-muted"
              }`}>
                {i < step ? <RiCheckLine /> : i + 1}
              </div>
              <span className={`text-xs font-semibold hidden sm:block ${i === step ? "text-app-dark dark:text-white" : "text-muted"}`}>{s}</span>
              {i < steps.length - 1 && <div className={`h-0.5 flex-1 rounded-full transition-colors ${i < step ? "bg-teal" : "bg-gray-200 dark:bg-gray-700"}`} />}
            </div>
          ))}
        </div>

        {/* Doctor Card Mini */}
        <div className="flex items-center gap-3 bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-4 mb-6">
          <img src={doctor.image} className="w-12 h-12 rounded-xl object-cover" onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}&background=1E40AF&color=fff`; }} />
          <div className="flex-1">
            <p className="font-bold text-sm text-app-dark dark:text-white">{doctor.name}</p>
            <p className="text-xs text-muted">{doctor.specialization} · ₹{doctor.fee}</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-semibold text-teal">{activeMember?.name}</p>
            <p className="text-[10px] text-muted">Booking for</p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Step 0 — Concern */}
          {step === 0 && (
            <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="card p-6">
                <h2 className="font-bold text-app-dark dark:text-white mb-4">What's your concern?</h2>
                <div className="grid grid-cols-2 gap-2 mb-5">
                  {concernOptions.map(opt => (
                    <button
                      key={opt}
                      onClick={() => setConcern(opt)}
                      className={`text-left p-3 rounded-xl text-xs font-semibold border-2 transition-all ${
                        concern === opt
                          ? "border-medical-blue bg-medical-blue/10 text-medical-blue"
                          : "border-gray-100 dark:border-gray-700 text-muted hover:border-teal hover:text-teal"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                <div className="mb-5">
                  <label className="text-xs font-semibold text-app-dark dark:text-white mb-2 block">Additional notes (optional)</label>
                  <textarea
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    placeholder="Describe your symptoms or any other details..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-app-dark dark:text-white placeholder-muted focus:outline-none focus:ring-2 focus:ring-teal/40 resize-none"
                  />
                </div>

                <h2 className="font-bold text-app-dark dark:text-white mb-3">Consultation type</h2>
                <div className="flex gap-3">
                  {doctor.consultationType.map(type => (
                    <button
                      key={type}
                      onClick={() => setConsultType(type)}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 font-semibold text-sm transition-all ${
                        consultType === type
                          ? "border-teal bg-teal/10 text-teal"
                          : "border-gray-100 dark:border-gray-700 text-muted hover:border-teal"
                      }`}
                    >
                      {type === "Video" ? <RiVideoLine /> : <RiHospitalLine />} {type}
                    </button>
                  ))}
                </div>

                <button
                  disabled={!concern || !consultType}
                  onClick={() => setStep(1)}
                  className="w-full mt-5 py-3 gradient-blue-teal text-white font-bold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Continue <RiArrowRightLine className="inline ml-1" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 1 — Doctor Confirmed */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="card p-6">
                <h2 className="font-bold text-app-dark dark:text-white mb-5">Your matched doctor</h2>
                <div className="flex gap-4 mb-6">
                  <img src={doctor.image} className="w-20 h-20 rounded-2xl object-cover" onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}&background=1E40AF&color=fff`; }} />
                  <div>
                    <h3 className="font-bold text-app-dark dark:text-white">{doctor.name}</h3>
                    <p className="text-sm text-teal font-semibold">{doctor.specialization}</p>
                    <p className="text-xs text-muted mt-1">{doctor.hospital}</p>
                    <div className="flex gap-2 mt-2">
                      {doctor.language.slice(0, 2).map(l => (
                        <span key={l} className="text-[10px] bg-gray-100 dark:bg-gray-700 text-muted px-2 py-0.5 rounded-lg">{l}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  {[
                    { label: "Concern", value: concern, icon: "📋" },
                    { label: "Consult Type", value: consultType, icon: consultType === "Video" ? "🎥" : "🏥" },
                    { label: "Satisfaction Rate", value: `${doctor.satisfaction}%`, icon: "⭐" },
                    { label: "Response Time", value: doctor.responseTime, icon: "⚡" },
                  ].map(item => (
                    <div key={item.label} className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700 text-sm">
                      <span className="text-muted flex items-center gap-2"><span>{item.icon}</span>{item.label}</span>
                      <span className="font-semibold text-app-dark dark:text-white">{item.value}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 rounded-xl p-3 mb-5">
                  <span className="text-green-500 text-lg">✓</span>
                  <p className="text-sm text-green-700 dark:text-green-400 font-medium">Great match! This doctor is available soon.</p>
                </div>

                <button onClick={() => setStep(2)} className="w-full py-3 gradient-blue-teal text-white font-bold rounded-xl hover:opacity-90 transition-opacity">
                  Select Time Slot <RiArrowRightLine className="inline ml-1" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 2 — Slot Selection */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="card p-6">
                <h2 className="font-bold text-app-dark dark:text-white mb-5">Choose a time slot</h2>

                {/* Date Picker */}
                <div className="flex gap-2 overflow-x-auto pb-2 mb-5 scrollbar-hide">
                  {dates.map(date => {
                    const d = new Date(date);
                    const isToday = new Date().toDateString() === d.toDateString();
                    const isTomorrow = new Date(Date.now() + 86400000).toDateString() === d.toDateString();
                    return (
                      <button
                        key={date}
                        onClick={() => { setSelectedDate(date); setSelectedSlot(null); }}
                        className={`flex-shrink-0 flex flex-col items-center px-4 py-3 rounded-xl border-2 transition-colors ${
                          selectedDate === date
                            ? "border-medical-blue bg-medical-blue/10 text-medical-blue"
                            : "border-gray-100 dark:border-gray-700 text-muted hover:border-teal"
                        }`}
                      >
                        <span className="text-[10px] font-semibold">{isToday ? "Today" : isTomorrow ? "Tomorrow" : d.toLocaleDateString("en-IN", { weekday: "short" })}</span>
                        <span className="text-lg font-extrabold">{d.getDate()}</span>
                        <span className="text-[10px]">{d.toLocaleDateString("en-IN", { month: "short" })}</span>
                      </button>
                    );
                  })}
                </div>

                {selectedDate && (
                  <>
                    <h3 className="text-xs font-bold text-muted uppercase tracking-wider mb-3">Available Slots</h3>
                    {slotsForDate.length === 0 ? (
                      <p className="text-sm text-muted text-center py-4">No slots available on this date.</p>
                    ) : (
                      <div className="grid grid-cols-3 gap-2 mb-5">
                        {slotsForDate.map(slot => (
                          <button
                            key={slot.id}
                            onClick={() => setSelectedSlot(slot)}
                            className={`py-2.5 rounded-xl text-xs font-semibold border-2 transition-all ${
                              selectedSlot?.id === slot.id
                                ? "border-teal bg-teal/10 text-teal"
                                : "border-gray-100 dark:border-gray-700 text-app-dark dark:text-white hover:border-teal hover:text-teal"
                            }`}
                          >
                            <div>{slot.time}</div>
                            <div className={`text-[10px] mt-0.5 font-normal ${slot.type === "Video" ? "text-purple-ai" : "text-medical-blue"}`}>{slot.type}</div>
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                )}

                {!selectedDate && (
                  <p className="text-sm text-muted text-center py-8">← Select a date to see available slots</p>
                )}

                <button
                  disabled={!selectedSlot}
                  onClick={() => setStep(3)}
                  className="w-full py-3 gradient-blue-teal text-white font-bold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Continue <RiArrowRightLine className="inline ml-1" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3 — Confirmation */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="card p-6">
                <h2 className="font-bold text-app-dark dark:text-white mb-5">Confirm Appointment</h2>

                <div className="space-y-3 mb-6">
                  {[
                    { label: "Doctor", value: doctor.name, icon: "👨‍⚕️" },
                    { label: "Specialization", value: doctor.specialization, icon: "🩺" },
                    { label: "Date", value: selectedDate ? new Date(selectedDate).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" }) : "", icon: "📅" },
                    { label: "Time", value: selectedSlot?.time, icon: "🕐" },
                    { label: "Type", value: selectedSlot?.type, icon: consultType === "Video" ? "🎥" : "🏥" },
                    { label: "Concern", value: concern, icon: "📋" },
                    { label: "Patient", value: activeMember?.name, icon: "👤" },
                    { label: "Consultation Fee", value: `₹${doctor.fee}`, icon: "💳" },
                  ].map(item => (
                    <div key={item.label} className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700 text-sm">
                      <span className="text-muted flex items-center gap-2"><span>{item.icon}</span>{item.label}</span>
                      <span className="font-semibold text-app-dark dark:text-white text-right max-w-[60%]">{item.value}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3 mb-5">
                  <p className="text-xs text-amber-700 dark:text-amber-400">
                    ⚠️ Please arrive 15 minutes early for in-person visits. Video consult link will be sent via SMS.
                  </p>
                </div>

                <button onClick={handleConfirm} className="w-full py-3 gradient-blue-teal text-white font-bold rounded-xl hover:opacity-90 transition-opacity text-sm">
                  Confirm & Book Appointment 🎉
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}

export function AppointmentSuccess() {
  const navigate = useNavigate();
  const location = window.location;

  return (
    <PageTransition>
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
          className="w-24 h-24 gradient-teal-mint rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <RiCheckLine className="text-white text-4xl" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h1 className="text-2xl font-extrabold text-app-dark dark:text-white mb-2">Appointment Confirmed! 🎉</h1>
          <p className="text-muted mb-8 text-sm">Your appointment has been booked and confirmed. You'll receive a reminder notification before your appointment.</p>

          <div className="flex flex-col gap-3">
            <Link to="/timeline" className="py-3 gradient-blue-teal text-white font-bold rounded-xl hover:opacity-90 transition-opacity">
              View in Timeline
            </Link>
            <Link to="/dashboard" className="py-3 bg-gray-100 dark:bg-gray-800 text-app-dark dark:text-white font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              Back to Dashboard
            </Link>
            <Link to="/doctors" className="py-3 text-teal font-semibold hover:underline text-sm">
              Book Another Appointment
            </Link>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}

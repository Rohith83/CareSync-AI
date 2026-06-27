import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  RiStarFill, RiVerifiedBadgeFill, RiTimeLine,
  RiUserHeartLine, RiVideoLine, RiHospitalLine, RiTranslate2
} from "react-icons/ri";
import { TrustScoreBadge } from "../ui/index";

export function DoctorCard({ doctor, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Link to={`/doctors/${doctor.id}`} className="block">
        <div className="card p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer group">
          {/* Header */}
          <div className="flex gap-3 mb-4">
            <div className="relative flex-shrink-0">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-16 h-16 rounded-2xl object-cover"
                onError={e => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}&background=1E40AF&color=fff&size=64&bold=true`;
                }}
              />
              {doctor.verified && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
                  <RiVerifiedBadgeFill className="text-teal text-sm" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-1">
                <h3 className="font-bold text-app-dark dark:text-white text-sm leading-tight group-hover:text-medical-blue dark:group-hover:text-teal transition-colors">
                  {doctor.name}
                </h3>
                <TrustScoreBadge score={doctor.trustScore} />
              </div>
              <p className="text-xs text-teal font-semibold mt-0.5">{doctor.specialization}</p>
              <p className="text-xs text-muted mt-0.5 flex items-center gap-1">
                <RiHospitalLine className="flex-shrink-0" />
                <span className="truncate">{doctor.hospital}</span>
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-2 text-center">
              <div className="flex items-center justify-center gap-0.5 text-warning">
                <RiStarFill className="text-xs" />
                <span className="text-sm font-bold text-app-dark dark:text-white">{doctor.rating}</span>
              </div>
              <p className="text-[10px] text-muted">{doctor.reviews} reviews</p>
            </div>
            <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-2 text-center">
              <p className="text-sm font-bold text-app-dark dark:text-white">{doctor.experience}y</p>
              <p className="text-[10px] text-muted">Experience</p>
            </div>
            <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-2 text-center">
              <p className="text-sm font-bold text-medical-blue dark:text-teal">₹{doctor.fee}</p>
              <p className="text-[10px] text-muted">Per consult</p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-3">
            {doctor.consultationType.map(type => (
              <span key={type} className={`flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-lg ${
                type === "Video"
                  ? "bg-purple-50 dark:bg-purple-900/20 text-purple-ai"
                  : "bg-blue-50 dark:bg-blue-900/20 text-medical-blue"
              }`}>
                {type === "Video" ? <RiVideoLine /> : <RiHospitalLine />}
                {type}
              </span>
            ))}
            <span className="flex items-center gap-1 text-[10px] text-muted bg-gray-50 dark:bg-white/5 px-2 py-0.5 rounded-lg">
              <RiTranslate2 />
              {doctor.language[0]}{doctor.language.length > 1 ? ` +${doctor.language.length - 1}` : ""}
            </span>
          </div>

          {/* Next Slot + CTA */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs font-semibold text-green-600 dark:text-green-400">{doctor.nextSlot}</span>
            </div>
            <div className="text-xs font-semibold text-medical-blue group-hover:text-teal transition-colors">
              Book Now →
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function FamilyProfileSwitcher({ profiles, active, onSwitch }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {profiles.map(profile => (
        <button
          key={profile.id}
          onClick={() => onSwitch(profile)}
          className={`flex-shrink-0 flex flex-col items-center gap-1.5 p-2 rounded-2xl transition-all ${
            active?.id === profile.id
              ? "bg-medical-blue/10 dark:bg-teal/20 ring-2 ring-medical-blue dark:ring-teal"
              : "hover:bg-gray-50 dark:hover:bg-white/5"
          }`}
        >
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-10 h-10 rounded-full object-cover"
            onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${profile.name}&background=1E40AF&color=fff`; }}
          />
          <span className={`text-[10px] font-semibold whitespace-nowrap ${
            active?.id === profile.id ? "text-medical-blue dark:text-teal" : "text-muted"
          }`}>{profile.relation}</span>
        </button>
      ))}
    </div>
  );
}

export function EmergencyHospitalCard({ hospital }) {
  return (
    <div className="card overflow-hidden border border-red-100 dark:border-red-900/30">
      <div className="relative h-32">
        <img
          src={hospital.image}
          alt={hospital.name}
          className="w-full h-full object-cover"
          onError={e => { e.target.style.display = "none"; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        {hospital.emergency && (
          <span className="absolute top-2 right-2 bg-alert text-white text-[10px] font-bold px-2 py-0.5 rounded-lg">
            24/7 EMERGENCY
          </span>
        )}
        <div className="absolute bottom-2 left-3 text-white">
          <p className="font-bold text-sm">{hospital.name}</p>
          <p className="text-xs opacity-80">{hospital.city} · {hospital.distance}</p>
        </div>
      </div>
      <div className="p-3 flex gap-2">
        <a href="tel:108" className="flex-1 bg-alert text-white text-xs font-bold py-2 rounded-xl text-center hover:bg-red-600 transition-colors">
          Call Now
        </a>
        <button className="flex-1 bg-gray-100 dark:bg-gray-700 text-app-dark dark:text-white text-xs font-semibold py-2 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
          Directions
        </button>
      </div>
    </div>
  );
}

export function HealthVaultCard({ record, onClick }) {
  const categoryColors = {
    prescription: "#14B8A6",
    report: "#1E40AF",
    insurance: "#10B981",
    vaccination: "#7C3AED",
    discharge: "#F59E0B",
  };
  const color = categoryColors[record.category] || "#64748B";

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      onClick={onClick}
      className="card p-4 cursor-pointer hover:shadow-md transition-all"
    >
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl flex-shrink-0" style={{ backgroundColor: color + "15" }}>
          {record.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-app-dark dark:text-white leading-tight">{record.title}</h4>
          <p className="text-xs text-muted mt-0.5">{record.type} · {new Date(record.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
          {record.doctor && <p className="text-xs text-muted mt-0.5">{record.doctor}</p>}
          <div className="flex items-center justify-between mt-2">
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-lg" style={{ backgroundColor: color + "15", color }}>
              {record.type}
            </span>
            <span className="text-[10px] text-muted">{record.fileSize}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

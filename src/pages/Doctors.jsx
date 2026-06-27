import { useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  RiSearchLine, RiFilterLine, RiVerifiedBadgeFill, RiStarFill,
  RiTimeLine, RiVideoLine, RiHospitalLine, RiTranslate2, RiArrowLeftLine,
  RiHeartLine, RiShareLine, RiUserHeartLine, RiShieldCheckLine
} from "react-icons/ri";
import { doctors, departments } from "../data/doctors";
import { reviews } from "../data/health";
import { DoctorCard } from "../components/features/DoctorCard";
import { PageTransition, TrustScoreBadge, EmptyState } from "../components/ui/index";

export function FindDoctors() {
  const [search, setSearch] = useState("");
  const [selectedDept, setSelectedDept] = useState(null);
  const [filterGender, setFilterGender] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("rating");

  const filtered = useMemo(() => {
    let result = doctors;
    if (search) result = result.filter(d =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.specialization.toLowerCase().includes(search.toLowerCase()) ||
      d.hospital.toLowerCase().includes(search.toLowerCase())
    );
    if (selectedDept) result = result.filter(d => d.departmentId === selectedDept);
    if (filterGender !== "all") result = result.filter(d => d.gender === filterGender);
    if (filterType !== "all") result = result.filter(d => d.consultationType.includes(filterType));
    result = [...result].sort((a, b) =>
      sortBy === "rating" ? b.rating - a.rating :
      sortBy === "fee" ? a.fee - b.fee :
      sortBy === "experience" ? b.experience - a.experience :
      b.trustScore - a.trustScore
    );
    return result;
  }, [search, selectedDept, filterGender, filterType, sortBy]);

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-app-dark dark:text-white mb-1">Find Doctors</h1>
          <p className="text-muted text-sm">50+ verified specialists across 20 departments</p>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <RiSearchLine className="absolute left-4 top-1/2 -translate-y-1/2 text-muted text-lg" />
          <input
            type="text"
            placeholder="Search by name, specialty, or hospital..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-app-dark dark:text-white placeholder-muted focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition text-sm"
          />
        </div>

        {/* Departments */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
          <button
            onClick={() => setSelectedDept(null)}
            className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
              !selectedDept ? "bg-medical-blue text-white" : "bg-gray-100 dark:bg-gray-800 text-muted hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            All Departments
          </button>
          {departments.map(dept => (
            <button
              key={dept.id}
              onClick={() => setSelectedDept(selectedDept === dept.id ? null : dept.id)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                selectedDept === dept.id ? "text-white" : "bg-gray-100 dark:bg-gray-800 text-muted hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
              style={selectedDept === dept.id ? { backgroundColor: dept.color } : {}}
            >
              <span>{dept.icon}</span>
              {dept.name}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          <select
            value={filterGender}
            onChange={e => setFilterGender(e.target.value)}
            className="px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs text-app-dark dark:text-white focus:outline-none"
          >
            <option value="all">All Genders</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <select
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
            className="px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs text-app-dark dark:text-white focus:outline-none"
          >
            <option value="all">All Consult Types</option>
            <option value="Video">Video Consult</option>
            <option value="In-person">In-Person</option>
          </select>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs text-app-dark dark:text-white focus:outline-none"
          >
            <option value="rating">Sort: Rating</option>
            <option value="fee">Sort: Fee (Low to High)</option>
            <option value="experience">Sort: Experience</option>
            <option value="trustScore">Sort: Trust Score</option>
          </select>

          <span className="px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-xs text-muted font-semibold">
            {filtered.length} doctors found
          </span>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            icon="🔍"
            title="No doctors found"
            description="Try adjusting your filters or search terms"
            action={{ label: "Clear filters", onClick: () => { setSearch(""); setSelectedDept(null); setFilterGender("all"); setFilterType("all"); } }}
          />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((doctor, i) => (
              <DoctorCard key={doctor.id} doctor={doctor} index={i} />
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  );
}

export function DoctorDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const doctor = doctors.find(d => d.id === parseInt(id));
  const [activeTab, setActiveTab] = useState("overview");
  const doctorReviews = reviews.filter(r => r.doctorId === doctor?.id);

  if (!doctor) return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <p className="text-5xl mb-4">🔍</p>
      <h2 className="text-xl font-bold text-app-dark dark:text-white mb-2">Doctor not found</h2>
      <Link to="/doctors" className="text-teal hover:underline text-sm">← Back to doctors</Link>
    </div>
  );

  const dept = departments.find(d => d.id === doctor.departmentId);

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-muted hover:text-app-dark dark:hover:text-white mb-6 transition-colors">
          <RiArrowLeftLine /> Back to doctors
        </button>

        {/* Hero Card */}
        <div className="card p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="relative flex-shrink-0">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-24 h-24 rounded-3xl object-cover"
                onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}&background=1E40AF&color=fff&size=96`; }}
              />
              {doctor.verified && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
                  <RiVerifiedBadgeFill className="text-teal" />
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between gap-2 flex-wrap">
                <div>
                  <h1 className="text-xl font-extrabold text-app-dark dark:text-white">{doctor.name}</h1>
                  <p className="text-teal font-semibold text-sm mt-0.5">{doctor.specialization}</p>
                  <p className="text-muted text-sm flex items-center gap-1 mt-0.5">
                    <RiHospitalLine /> {doctor.hospital}
                  </p>
                </div>
                <TrustScoreBadge score={doctor.trustScore} size="md" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                {[
                  { label: "Experience", value: `${doctor.experience} yrs` },
                  { label: "Rating", value: `⭐ ${doctor.rating}` },
                  { label: "Reviews", value: doctor.reviews },
                  { label: "Fee", value: `₹${doctor.fee}` },
                ].map(s => (
                  <div key={s.label} className="bg-gray-50 dark:bg-white/5 rounded-xl p-2.5 text-center">
                    <p className="font-bold text-app-dark dark:text-white text-sm">{s.value}</p>
                    <p className="text-[10px] text-muted">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {doctor.consultationType.map(t => (
                  <span key={t} className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-medical-blue">
                    {t === "Video" ? <RiVideoLine /> : <RiHospitalLine />} {t}
                  </span>
                ))}
                {doctor.language.map(l => (
                  <span key={l} className="text-xs text-muted bg-gray-100 dark:bg-gray-700 px-2.5 py-1 rounded-lg">{l}</span>
                ))}
                <span className="flex items-center gap-1 text-xs font-semibold text-teal bg-teal/10 px-2.5 py-1 rounded-lg">
                  <RiTimeLine /> Responds in {doctor.responseTime}
                </span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex gap-3 mt-5 pt-5 border-t border-gray-100 dark:border-gray-700">
            <Link
              to={`/book/${doctor.id}`}
              className="flex-1 py-3 gradient-blue-teal text-white font-bold rounded-xl text-center text-sm hover:opacity-90 transition-opacity"
            >
              Book Appointment
            </Link>
            <button className="w-11 h-11 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center text-muted hover:text-alert hover:border-alert transition-colors">
              <RiHeartLine />
            </button>
            <button className="w-11 h-11 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center text-muted hover:text-teal hover:border-teal transition-colors">
              <RiShareLine />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl mb-6">
          {["overview", "reviews", "info"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold capitalize transition-colors ${
                activeTab === tab ? "bg-white dark:bg-gray-700 text-app-dark dark:text-white shadow-sm" : "text-muted"
              }`}
            >
              {tab === "overview" ? "About" : tab === "reviews" ? `Reviews (${doctorReviews.length || "30+"})` : "Qualifications"}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div className="card p-6 space-y-4">
            <div>
              <h3 className="font-bold text-app-dark dark:text-white mb-2">About {doctor.name}</h3>
              <p className="text-sm text-muted leading-relaxed">{doctor.bio}</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <RiShieldCheckLine className="text-teal" />
                  <h4 className="font-semibold text-sm text-app-dark dark:text-white">Trust Score Breakdown</h4>
                </div>
                {[
                  { label: "Patient Satisfaction", value: `${doctor.satisfaction}%` },
                  { label: "Response Time", value: doctor.responseTime },
                  { label: "Years of Experience", value: `${doctor.experience} years` },
                  { label: "Total Reviews", value: `${doctor.reviews}+` },
                ].map(s => (
                  <div key={s.label} className="flex justify-between text-xs py-1.5 border-b border-gray-100 dark:border-gray-700 last:border-0">
                    <span className="text-muted">{s.label}</span>
                    <span className="font-semibold text-app-dark dark:text-white">{s.value}</span>
                  </div>
                ))}
              </div>
              <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <RiUserHeartLine className="text-medical-blue" />
                  <h4 className="font-semibold text-sm text-app-dark dark:text-white">Quick Facts</h4>
                </div>
                {[
                  { label: "Department", value: dept?.name || doctor.specialization },
                  { label: "Languages", value: doctor.language.join(", ") },
                  { label: "Consult Types", value: doctor.consultationType.join(", ") },
                  { label: "Next Available", value: doctor.nextSlot },
                ].map(s => (
                  <div key={s.label} className="flex justify-between text-xs py-1.5 border-b border-gray-100 dark:border-gray-700 last:border-0">
                    <span className="text-muted">{s.label}</span>
                    <span className="font-semibold text-app-dark dark:text-white text-right max-w-[60%]">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-4">
            {(doctorReviews.length > 0 ? doctorReviews : reviews.slice(0, 3)).map(review => (
              <div key={review.id} className="card p-5">
                <div className="flex items-start gap-3">
                  <img src={review.avatar} className="w-10 h-10 rounded-xl object-cover" onError={e => { e.target.style.display = "none"; }} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-bold text-app-dark dark:text-white">{review.patient}</p>
                      <span className="text-xs text-muted">{new Date(review.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
                    </div>
                    <div className="flex gap-0.5 mb-2">
                      {[...Array(review.rating)].map((_, i) => <RiStarFill key={i} className="text-warning text-xs" />)}
                    </div>
                    <p className="text-sm text-muted">{review.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "info" && (
          <div className="card p-6">
            <h3 className="font-bold text-app-dark dark:text-white mb-4">Qualifications & Training</h3>
            <div className="space-y-3">
              {doctor.qualifications.map((q, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 gradient-blue-teal rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-[10px] font-bold">{i + 1}</span>
                  </div>
                  <p className="text-sm text-app-dark dark:text-white">{q}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
}

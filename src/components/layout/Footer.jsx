import { Link } from "react-router-dom";
import { RiHeartPulseLine, RiTwitterLine, RiLinkedinLine, RiInstagramLine } from "react-icons/ri";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 gradient-blue-teal rounded-xl flex items-center justify-center">
                <RiHeartPulseLine className="text-white" />
              </div>
              <span className="font-bold text-white text-lg">CareSync <span className="text-teal">AI</span></span>
            </div>
            <p className="text-sm leading-relaxed text-gray-500">
              India's most intelligent patient care platform. AI-powered health management for you and your family.
            </p>
            <div className="flex gap-3 mt-4">
              {[RiTwitterLine, RiLinkedinLine, RiInstagramLine].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-teal/20 hover:text-teal flex items-center justify-center transition-colors">
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {[
            { title: "Platform", links: [["Find Doctors", "/doctors"], ["Symptom Checker", "/symptom-checker"], ["AI Match", "/ai-match"], ["Health Insights", "/insights"]] },
            { title: "Health Tools", links: [["Care Timeline", "/timeline"], ["Care Plan", "/care-plan"], ["Health Vault", "/vault"], ["Family Profiles", "/family"]] },
            { title: "Company", links: [["About Us", "/about"], ["Privacy Policy", "#"], ["Terms of Use", "#"], ["Contact Us", "#"]] },
          ].map(col => (
            <div key={col.title}>
              <h4 className="font-semibold text-white mb-4 text-sm">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map(([label, to]) => (
                  <li key={label}>
                    <Link to={to} className="text-sm hover:text-teal transition-colors">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-600">© 2025 CareSync AI. All rights reserved. Not a substitute for professional medical advice.</p>
          <div className="flex items-center gap-1 text-xs text-gray-600">
            Made with <span className="text-alert mx-1">❤️</span> for India's health
          </div>
        </div>
      </div>
    </footer>
  );
}

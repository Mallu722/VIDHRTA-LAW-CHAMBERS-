import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, ShieldCheck } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-wide section-padding py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-sm bg-gold flex items-center justify-center">
                <span className="text-primary font-heading text-lg font-bold">V</span>
              </div>
              <div className="leading-tight">
                <span className="font-heading text-xl font-semibold block">Vidhrta</span>
                <span className="text-[10px] tracking-[0.25em] uppercase text-primary-foreground/50">Law Chambers</span>
              </div>
            </div>
            <p className="text-primary-foreground/60 text-sm leading-relaxed">
              A Bengaluru-based litigation and advisory firm committed to precision, integrity, and legal excellence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold tracking-widest uppercase text-gold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: "About Us", path: "/about" },
                { label: "Practice Areas", path: "/practice-areas" },
                { label: "Our Team", path: "/team" },
                { label: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-primary-foreground/60 hover:text-gold text-sm transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Practice Areas */}
          <div>
            <h4 className="text-sm font-semibold tracking-widest uppercase text-gold mb-6">Practice Areas</h4>
            <ul className="space-y-3">
              {["Civil Litigation", "Criminal Law", "Constitutional Law", "Corporate Law", "Taxation", "Family Law"].map((area) => (
                <li key={area}>
                  <Link to="/practice-areas" className="text-primary-foreground/60 hover:text-gold text-sm transition-colors duration-200">
                    {area}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold tracking-widest uppercase text-gold mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex gap-3 text-sm text-primary-foreground/60">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span>No. 111 & 114, Embassy Centre, Race Course Road, Bengaluru – 560001</span>
              </li>
              <li className="flex gap-3 text-sm text-primary-foreground/60">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <span>+91 80 XXXX XXXX</span>
              </li>
              <li className="flex gap-3 text-sm text-primary-foreground/60">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <span>contact@vidhrtalaw.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p className="text-primary-foreground/40 text-xs">
              © {new Date().getFullYear()} Vidhrta Law Chambers. All rights reserved.
            </p>
            <p className="text-primary-foreground/30 text-xs">
              Bengaluru, Karnataka, India
            </p>
          </div>
          
          <Link 
            to="/dashboard" 
            className="flex items-center gap-1.5 text-primary-foreground/20 hover:text-gold text-[10px] uppercase tracking-widest transition-colors duration-200 group"
          >
            <ShieldCheck className="w-3 h-3 opacity-50 group-hover:opacity-100" />
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

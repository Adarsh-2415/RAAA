import Link from "next/link";
import { Mail, Phone, MapPin, Instagram, Linkedin, MessageCircle, Facebook, Twitter } from "lucide-react";
import { useGlobalSettings } from "@/components/providers/settings-provider";

export default function Footer() {
  const settings = useGlobalSettings();

  return (
    <footer className="w-full bg-[#0F172A] text-white/80 border-t-2 border-accent-gold z-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

          {/* Column 1: Brand Profile */}
          <div className="lg:col-span-4 flex flex-col space-y-6">
            <div>
              <span className="font-heading font-extrabold text-xl text-white tracking-tight leading-tight block">
                R.A. Aggarwal & Associates
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-accent-gold mt-1 block">
                Chartered Accountants & Legal Consultants
              </span>
            </div>
            <p className="text-xs sm:text-sm text-white/60 leading-relaxed max-w-sm font-sans">
              A premium advisory ecosystem dedicated to professional Chartered Accountant practices, tax consultancy, business setups, and comprehensive commercial legal representation.
            </p>
            {/* Social Media Link Icons */}
            <div className="flex items-center gap-3">
              {settings.facebook && settings.facebook !== "#" && (
                <a
                  href={settings.facebook}
                  className="w-8 h-8 rounded-full border border-white/10 hover:border-accent-gold hover:text-accent-gold flex items-center justify-center transition-all duration-200"
                  aria-label="Facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook size={14} />
                </a>
              )}
              {settings.linkedin && settings.linkedin !== "#" && (
                <a
                  href={settings.linkedin}
                  className="w-8 h-8 rounded-full border border-white/10 hover:border-accent-gold hover:text-accent-gold flex items-center justify-center transition-all duration-200"
                  aria-label="LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin size={14} />
                </a>
              )}
              {settings.twitter && settings.twitter !== "#" && (
                <a
                  href={settings.twitter}
                  className="w-8 h-8 rounded-full border border-white/10 hover:border-accent-gold hover:text-accent-gold flex items-center justify-center transition-all duration-200"
                  aria-label="Twitter"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter size={14} />
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Services Offered (Quick Links) */}
          <div className="lg:col-span-3 flex flex-col space-y-4">
            <span className="font-heading text-xs font-bold tracking-widest text-accent-gold uppercase">
              Services Offered
            </span>
            <ul className="space-y-2 text-xs sm:text-sm font-sans text-white/60">
              <li>
                <Link href="/services/accounting-auditing" className="hover:text-accent-gold transition-colors duration-200">
                  Accounting & Auditing Services
                </Link>
              </li>
              <li>
                <Link href="/services/bpo" className="hover:text-accent-gold transition-colors duration-200">
                  Business Process Outsourcing
                </Link>
              </li>
              <li>
                <Link href="/services/startup-services" className="hover:text-accent-gold transition-colors duration-200">
                  Business Start-Up Service
                </Link>
              </li>
              <li>
                <Link href="/services/vat-consultancy" className="hover:text-accent-gold transition-colors duration-200">
                  Commercial Tax (VAT) Consultancy
                </Link>
              </li>
              <li>
                <Link href="/services/gst-consultancy" className="hover:text-accent-gold transition-colors duration-200">
                  Goods & Services Tax Consultant
                </Link>
              </li>
              <li>
                <Link href="/services/income-tax" className="hover:text-accent-gold transition-colors duration-200">
                  Income Tax Advisory
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div className="lg:col-span-2 flex flex-col space-y-4">
            <span className="font-heading text-xs font-bold tracking-widest text-accent-gold uppercase">
              Contact Details
            </span>
            <ul className="space-y-4 text-xs sm:text-sm font-sans text-white/60">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-accent-gold shrink-0 mt-0.5" />
                <span className="whitespace-pre-wrap">{settings.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-accent-gold shrink-0" />
                <a href={`tel:${settings.phone.replace(/[^0-9+]/g, "")}`} className="hover:text-accent-gold transition-colors duration-200">
                  {settings.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-accent-gold shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-accent-gold transition-colors duration-200">
                  {settings.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Location Map */}
          <div className="lg:col-span-3 flex flex-col space-y-4">
            <span className="font-heading text-xs font-bold tracking-widest text-accent-gold uppercase">
              Office Location
            </span>
            <div className="relative w-full h-[150px] rounded-lg overflow-hidden border border-white/10 shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d27679.009312585968!2d77.88834!3d29.867845000000003!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390eb37bd9b855f3%3A0xd33d2ce80b321dc9!2sR.%20A.%20Aggarwal%20%26%20Associates!5e0!3m2!1sen!2sin!4v1783076945437!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              ></iframe>
            </div>
            <a
              href="https://maps.google.com/?q=R.+A.+Aggarwal+%26+Associates"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] uppercase font-bold tracking-wider text-accent-gold hover:underline mt-1 block"
            >
              Open in Google Maps &rarr;
            </a>
          </div>

        </div>

        {/* Bottom Banner Section */}
        <div className="mt-10 pt-6 border-t border-white/10 text-center text-xs text-white font-sans">
          <span>
            All Rights Reserved @ 2026 by <span className="text-white font-bold">R.A. Aggarwal & Associates</span> || Website Managed by <span className="text-accent-gold font-bold">FSIR Roorkee</span>
          </span>
        </div>

      </div>
    </footer>
  );
}

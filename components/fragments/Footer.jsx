import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import ScrollingMarquee from "../sections/ScrollingMarquee";

const quickLinks = [
  { name: "About MOKM", href: "/about" },
  { name: "Our Programmes", href: "/programmes" },
  { name: "Latest Projects", href: "/projects" },
  { name: "Contact & Invitation", href: "/contact" },
  { name: "Privacy Policy", href: "/privacy" },
];

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "Youtube" },
];

const missionPoints = [
  "Raising Quality Believers",
  "Innovation from the Body",
  "Marketplace Apostles",
  "Enriching Lives",
  "Global Crusades",
  "Psalm 21",
];

export default function Footer() {
  return (
    <footer className="bg-background border-t border-text/10 pt-16 pb-8 px-6">
      {/* <ScrollingMarquee data={missionPoints} /> */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
        {/* Grid 1: Logo & About */}
        <div className="flex flex-col space-y-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 border-accent border-2 rounded-sm rotate-45 flex items-center justify-center transition-transform duration-500 group-hover:rotate-0">
              <Image
                src="/images/logo.png"
                alt="MOKM Logo"
                width={40}
                height={40}
                className="object-cover rounded-full rotate-[-45deg] transition-transform duration-500 group-hover:rotate-0"
              />
            </div>

            <span className="font-display text-3xl tracking-tighter text-text">
              MOKM
            </span>
          </Link>
          <p className="text-text/60 text-sm leading-relaxed max-w-sm font-sans">
            Teaching and raising quality believers of Christ in the marketplace
            and the church. Bringing innovation from the body of Christ to
            enrich lives with the love of God.
          </p>
          <div className="flex items-center gap-3 text-text/40 text-xs tracking-widest uppercase">
            <MapPin size={14} className="text-accent" />
            <span> Ministry • Psalm 21</span>
          </div>
        </div>

        {/* Grid 2: Quick Links (Centered on Desktop) */}
        <div className="md:text-center">
          <h3 className="text-accent uppercase tracking-[0.2em] text-sm font-bold mb-6">
            Quick Navigation
          </h3>
          <ul className="space-y-4">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-text/70 hover:text-accent transition-colors text-sm font-sans tracking-wide"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Grid 3: Social Media */}
        <div className="md:text-right flex flex-col md:items-end">
          <h3 className="text-accent uppercase tracking-[0.2em] text-sm font-bold mb-6">
            Connect With Us
          </h3>
          <p className="text-text/60 text-sm mb-6 font-sans">
            Follow our journey and stay updated{" "}
            <br className="hidden md:block" /> with our global crusades.
          </p>
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="w-10 h-10 rounded-full border border-text/20 flex items-center justify-center text-text/60 hover:border-accent hover:text-accent transition-all hover:-translate-y-1"
                aria-label={social.label}
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
          <Link
            href="mailto:contact@mokm.org"
            className="mt-8 flex items-center gap-2 text-text/80 hover:text-accent transition-colors group"
          >
            <span className="text-sm font-sans tracking-widest uppercase">
              contact@mokm.org
            </span>
            <Mail
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-text/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-text/30 text-[10px] uppercase tracking-[0.3em]">
          © {new Date().getFullYear()} Mountain of Kings Ministries. All Rights
          Reserved.
        </p>
        <p className="text-text/30 text-[10px] uppercase tracking-[0.3em]">
          Etched in Grace • Built for Impact
        </p>
      </div>
    </footer>
  );
}

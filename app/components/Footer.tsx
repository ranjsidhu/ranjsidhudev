import { FaInstagram, FaLinkedin, FaEnvelope } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-black/10 bg-white py-12 px-4 flex flex-col items-center mt-auto">
      <div className="w-full max-w-5xl flex flex-col md:flex-row md:justify-between gap-10 md:gap-0">
        {/* Brand & Copyright */}
        <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
          <span className="text-black font-light tracking-widest uppercase text-lg mb-2">
            Ranj Sidhu
          </span>
          <span className="text-black/60 text-xs mb-2">
            Bespoke Software Engineer
          </span>
          <span className="text-black/30 text-xs">Based in the UK</span>
          <span className="text-black/30 text-xs mt-2">
            &copy; {new Date().getFullYear()} Ranj Sidhu
          </span>
        </div>

        {/* Social & Contact */}
        <div className="flex flex-col items-center">
          <span className="text-black/70 font-semibold mb-3 tracking-wider uppercase text-xs">
            Connect
          </span>
          <div className="flex gap-4 mb-3">
            <a
              href="https://www.instagram.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:opacity-70 transition"
            >
              <FaInstagram size={24} color="#000" />
            </a>
            <a
              href="https://www.linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:opacity-70 transition"
            >
              <FaLinkedin size={24} color="#000" />
            </a>
            <a
              href="mailto:ranj@ranjsidhu.dev"
              aria-label="Email"
              className="hover:opacity-70 transition"
            >
              <FaEnvelope size={24} color="#000" />
            </a>
          </div>
        </div>

        {/* Call to Action */}
        <div className="flex flex-col items-center md:items-end">
          <span className="text-black/70 font-semibold mb-3 tracking-wider uppercase text-xs">
            Let&apos;s Work Together
          </span>
          <Link
            href="/contact"
            className="px-6 py-2 rounded-full bg-black text-white font-light tracking-widest uppercase shadow-sm hover:bg-black/80 transition text-sm"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { FaEnvelope, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import type { SocialProps } from "@/types";

export default function Socials({ size }: SocialProps) {
  return (
    <>
      <Link
        href="https://www.instagram.com/ranjsidhu.dev/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className="text-white/60 hover:text-white transition-colors duration-200"
      >
        <FaInstagram size={size} />
      </Link>
      <Link
        href="https://www.linkedin.com/in/ranjsidhu/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className="text-white/60 hover:text-white transition-colors duration-200"
      >
        <FaLinkedin size={size} />
      </Link>
      <Link
        href="mailto:ranj@ranjsidhu.dev"
        aria-label="Email"
        className="text-white/60 hover:text-white transition-colors duration-200"
      >
        <FaEnvelope size={size} />
      </Link>
      <Link
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/ranjsidhu"
        aria-label="GitHub"
        className="text-white/60 hover:text-white transition-colors duration-200"
      >
        <FaGithub size={size} />
      </Link>
    </>
  );
}

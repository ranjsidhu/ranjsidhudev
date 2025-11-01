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
        className="hover:opacity-70 transition"
      >
        <FaInstagram size={size} color="#000" />
      </Link>
      <Link
        href="https://www.linkedin.com/in/ranjsidhu/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className="hover:opacity-70 transition"
      >
        <FaLinkedin size={size} color="#000" />
      </Link>
      <Link
        href="mailto:ranj@ranjsidhu.dev"
        aria-label="Email"
        className="hover:opacity-70 transition"
      >
        <FaEnvelope size={size} color="#000" />
      </Link>
      <Link
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/ranjsidhu"
        aria-label="GitHub"
        className="hover:opacity-70 transition"
      >
        <FaGithub size={size} color="#000" />
      </Link>
    </>
  );
}

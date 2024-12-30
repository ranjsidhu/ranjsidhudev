"use client";

import React, { useState, useEffect } from "react";
import {
  GithubIcon,
  Linkedin,
  Server,
  Code,
  Database,
  Cloud,
  Terminal,
  LucideIcon,
} from "lucide-react";

interface TechStackProps {
  icon: LucideIcon;
  label: string;
  delay?: number;
}

const ComingSoonPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [scrollY, setScrollY] = useState<number>(0);

  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const TechStack: React.FC<TechStackProps> = ({
    icon: Icon,
    label,
    delay = 0,
  }) => (
    <div
      className="group relative overflow-hidden"
      style={{
        animation: `fadeInUp 0.6s ease-out ${delay}s both`,
      }}
    >
      <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-blue-950/40 to-blue-900/40 backdrop-blur-md border border-blue-500/10 hover:border-blue-500/30 transition-all duration-300 transform hover:-translate-y-1">
        <div className="p-2 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
          <Icon
            size={24}
            className="text-blue-400 group-hover:text-blue-300 transition-colors"
          />
        </div>
        <span className="text-sm font-medium text-blue-100">{label}</span>
      </div>
    </div>
  );

  return (
    <>
      <div className="min-h-screen bg-[#020617] text-white overflow-hidden">
        {/* Animated Background */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(0,100,255,0.1),_transparent_70%)]" />
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(29, 78, 216, 0.1) 0%, transparent 50%),
                               radial-gradient(circle at 80% 20%, rgba(29, 78, 216, 0.1) 0%, transparent 30%),
                               radial-gradient(circle at 20% 80%, rgba(29, 78, 216, 0.1) 0%, transparent 30%)`,
              transform: `translateY(${scrollY * 0.2}px)`,
            }}
          />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CiAgPHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPgogIDxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiIGZpbGw9Im5vbmUiLz4KICA8cGF0aCBkPSJNMzAgMzBtLTIgMGEyIDIgMCAxIDAgNCAwYTIgMiAwIDEgMCAtNCAwIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIgZmlsbD0ibm9uZSIvPgo8L3N2Zz4=')] opacity-20" />
        </div>

        {/* Main Content */}
        <div className="relative">
          {/* Header Section */}
          <div className="relative min-h-screen flex flex-col justify-center overflow-hidden py-20">
            <div
              className={`max-w-7xl mx-auto px-4 text-center transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="relative">
                <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl" />
                <h1 className="relative text-7xl md:text-8xl font-bold mb-12 pb-2 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-transparent bg-clip-text">
                  Coming Soon
                </h1>
              </div>
              <p className="text-xl md:text-2xl text-blue-200/80">
                A new journey in software engineering excellence
              </p>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
              <div className="flex flex-col items-center gap-2">
                <span className="text-sm text-blue-300/80">
                  Scroll to explore
                </span>
                <div className="w-6 h-10 border-2 border-blue-400/20 rounded-full flex items-start justify-center p-1">
                  <div className="w-1.5 h-3 bg-blue-400/60 rounded-full animate-scroll"></div>
                </div>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="relative py-24 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 items-start">
                {/* Left Column */}
                <div className="space-y-8">
                  <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">
                    About Me
                  </h2>
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg blur opacity-25"></div>
                    <div className="relative space-y-6 p-8 bg-blue-950/40 backdrop-blur-xl rounded-lg border border-blue-500/10">
                      <p className="text-blue-100 leading-relaxed">
                        I am a highly motivated and results-driven software
                        engineer with a strong foundation in Mathematics,
                        Physics, and Computer Science. My academic excellence,
                        including AAA in A-levels, laid the groundwork for my
                        successful career in technology.
                      </p>
                      <p className="text-blue-100 leading-relaxed">
                        Since September 2022, I&apos;ve been part of IBM&apos;s
                        engineering team, where I&apos;ve developed expertise in
                        full-stack development and the complete software
                        development lifecycle. My focus remains on delivering
                        innovative and efficient solutions.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href="https://github.com/ranjsidhu"
                      target="_blank"
                      className="group px-6 py-3 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 backdrop-blur-xl border border-blue-500/10 hover:border-blue-500/30 transition-all duration-300 flex items-center gap-3"
                    >
                      <GithubIcon
                        size={20}
                        onClick={() => {}}
                        className="text-blue-400 group-hover:text-blue-300"
                      />
                      <span className="text-blue-100 group-hover:text-blue-50">
                        GitHub
                      </span>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/ranjeetsinghsidhu/"
                      target="_blank"
                      className="group px-6 py-3 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 backdrop-blur-xl border border-blue-500/10 hover:border-blue-500/30 transition-all duration-300 flex items-center gap-3"
                    >
                      <Linkedin
                        size={20}
                        className="text-blue-400 group-hover:text-blue-300"
                      />
                      <span className="text-blue-100 group-hover:text-blue-50">
                        LinkedIn
                      </span>
                    </a>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                  <h3 className="text-2xl font-bold text-blue-300">
                    Technical Expertise
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <TechStack icon={Code} label="React & Vue" delay={0.1} />
                    <TechStack icon={Terminal} label="TypeScript" delay={0.2} />
                    <TechStack icon={Server} label="Next.js" delay={0.3} />
                    <TechStack icon={Cloud} label="AWS" delay={0.4} />
                    <TechStack icon={Database} label="RDS" delay={0.5} />
                    <TechStack icon={Server} label="Docker" delay={0.6} />
                  </div>

                  <div className="relative mt-12">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg blur opacity-25"></div>
                    <div className="relative p-8 bg-blue-950/40 backdrop-blur-xl rounded-lg border border-blue-500/10">
                      <h4 className="text-xl font-semibold text-blue-300 mb-4">
                        AWS Services Expertise
                      </h4>
                      <p className="text-blue-100">
                        Proficient in RDS, SES, EKS, ECR, Elastic Beanstalk, API
                        Gateway, and EC2. Experienced in seamless Next.js
                        integration and containerized development with Docker.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes scroll {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          60% {
            transform: translateY(125%);
            opacity: 0.6;
          }
          61% {
            transform: translateY(-25%);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-scroll {
          animation: scroll 1.5s cubic-bezier(0.65, 0, 0.35, 1) infinite;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </>
  );
};

export default ComingSoonPage;

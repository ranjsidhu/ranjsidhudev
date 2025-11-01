import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security Policy",
  description:
    "Security policy and responsible disclosure guidelines for Ranj Sidhu's website and services.",
  openGraph: {
    title: "Security Policy | Ranj Sidhu",
    description:
      "Learn about our security practices and how to responsibly report security vulnerabilities.",
  },
};

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-light text-black tracking-widest uppercase mb-8">
          Security Policy
        </h1>

        <section className="mb-12">
          <h2 className="text-2xl font-light text-black mb-4">
            Responsible Disclosure
          </h2>
          <p className="text-black/80 mb-4">
            I take the security of my website and services seriously. If you
            believe you&apos;ve found a security vulnerability, I appreciate
            your help in disclosing it to me in a responsible manner.
          </p>
          <p className="text-black/80 mb-4">
            Please email ranj@ranjsidhu.dev with the following information:
          </p>
          <ul className="list-disc list-inside text-black/80 space-y-2 mb-4">
            <li>Description of the vulnerability</li>
            <li>Steps to reproduce the issue</li>
            <li>Potential impact of the vulnerability</li>
            <li>Any suggested fixes (if available)</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-light text-black mb-4">
            What to Expect
          </h2>
          <p className="text-black/80 mb-4">
            When you report a security vulnerability, you can expect:
          </p>
          <ul className="list-disc list-inside text-black/80 space-y-2 mb-4">
            <li>Prompt acknowledgment of your report</li>
            <li>Regular updates on the progress of fixing the vulnerability</li>
            <li>Credit for your discovery (if you wish to be credited)</li>
            <li>No legal action against you for responsible disclosure</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-light text-black mb-4">
            Security Practices
          </h2>
          <p className="text-black/80 mb-4">
            I maintain several security practices to protect my website and
            services:
          </p>
          <ul className="list-disc list-inside text-black/80 space-y-2 mb-4">
            <li>Regular security updates and patches</li>
            <li>Secure coding practices and code reviews</li>
            <li>Dependency vulnerability scanning</li>
            <li>HTTPS encryption for all communications</li>
            <li>Regular security assessments</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-light text-black mb-4">Contact</h2>
          <p className="text-black/80">
            For security-related concerns, please contact me at{" "}
            <a
              href="mailto:ranj@ranjsidhu.dev"
              className="text-black hover:underline"
            >
              ranj@ranjsidhu.dev
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}

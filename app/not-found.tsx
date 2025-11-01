import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full bg-white flex flex-col items-center justify-center text-center relative">
      <div className="mb-8">
        <Image src="/rsolo.png" alt="Logo" width={72} height={72} />
      </div>
      <h1 className="text-6xl md:text-8xl font-light text-black tracking-widest mb-4">
        404
      </h1>
      <h2 className="text-2xl md:text-3xl font-light text-black/80 mb-8 uppercase tracking-wider">
        Page Not Found
      </h2>
      <Link
        href="/"
        className="inline-block px-6 py-3 border border-black/10 rounded-full text-black/80 hover:text-black hover:bg-black/5 transition-colors font-light tracking-wider"
      >
        Go Home
      </Link>
    </div>
  );
}

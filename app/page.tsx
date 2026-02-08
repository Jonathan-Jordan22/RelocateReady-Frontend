import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center px-6">
      <div className="max-w-2xl text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
          RelocateReady
        </h1>

        <p className="text-xl text-gray-700 mb-10 leading-relaxed">
          Discover the best cities to move to based on what matters most to you
          — cost of living, safety, lifestyle, and more.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/signup"
            className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:bg-indigo-700 hover:scale-105 transition-transform inline-block"
          >
            Get Started
          </Link>

          <Link
            href="/browse"
            className="px-8 py-4 bg-white text-gray-800 rounded-xl font-semibold text-lg shadow-md hover:bg-gray-100 hover:scale-105 transition-transform inline-block"
          >
            Learn More
          </Link>
        </div>
      </div>
    </main>
  );
}

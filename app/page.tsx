import Link from "next/link";
import NavBar from "./components/NavBar";

export default function Home() {
  return (
    <>
      <NavBar />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center px-6 py-20 md:py-32">
          <div className="max-w-4xl text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
              RelocateReady
            </h1>

            <p className="text-xl md:text-2xl text-gray-700 mb-10 leading-relaxed max-w-3xl mx-auto">
              Discover the best cities to move to based on what matters most to
              you — cost of living, safety, lifestyle, and more.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all inline-block"
              >
                Get Started Free
              </Link>

              <Link
                href="/browse"
                className="px-8 py-4 bg-white text-gray-800 rounded-xl font-semibold text-lg shadow-md hover:bg-gray-50 hover:scale-105 transition-all inline-block"
              >
                Browse Locations
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-6 py-16 bg-white/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-12">
              Why RelocateReady?
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Cost Analysis
                </h3>
                <p className="text-gray-600">
                  Compare cost of living across different cities to find the
                  perfect balance between lifestyle and affordability.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all">
                <div className="text-4xl mb-4">🛡️</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Safety Metrics
                </h3>
                <p className="text-gray-600">
                  Access comprehensive safety ratings to ensure peace of mind in
                  your new home.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all">
                <div className="text-4xl mb-4">⚙️</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Personalized Rankings
                </h3>
                <p className="text-gray-600">
                  Customize your preferences to get location recommendations
                  tailored specifically to your priorities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-12">
              How It Works
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Sign Up
                </h3>
                <p className="text-gray-600">
                  Create your free account in seconds
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Set Preferences
                </h3>
                <p className="text-gray-600">
                  Tell us what matters most to you
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Discover
                </h3>
                <p className="text-gray-600">
                  Get personalized city recommendations
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 py-16 bg-gradient-to-r from-indigo-600 to-purple-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Find Your Perfect City?
            </h2>
            <p className="text-xl text-indigo-100 mb-8">
              Join thousands of users making informed relocation decisions
            </p>
            <Link
              href="/signup"
              className="inline-block px-8 py-4 bg-white text-indigo-600 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              Start Your Journey
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

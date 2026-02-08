"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setIsLoggedIn(true);
      // Fetch user name
      fetch(`http://localhost:8000/users/${userId}`)
        .then((res) => res.json())
        .then((data) => setUserName(data.name))
        .catch(() => setUserName("User"));
    }
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    setUserName("");
    setMenuOpen(false);
    router.push("/");
  };

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center group">
              <span className="font-bold text-2xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent group-hover:from-indigo-700 group-hover:to-purple-700 transition-all">
                RelocateReady
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            <Link
              href="/dashboard"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive("/dashboard")
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
              }`}
            >
              Dashboard
            </Link>
            <Link
              href="/browse"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive("/browse")
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
              }`}
            >
              Browse
            </Link>
            <Link
              href="/preferences"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive("/preferences")
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
              }`}
            >
              Preferences
            </Link>
            <div className="ml-2 pl-2 border-l border-gray-200 flex items-center gap-2">
              {isLoggedIn ? (
                <>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-indigo-50">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                      {userName.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {userName}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive("/login")
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-indigo-600"
                  }`}
                >
                  Login
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-all"
            >
              <span className="sr-only">Open main menu</span>
              {menuOpen ? (
                <svg
                  className="block h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white shadow-lg">
          <div className="px-4 py-3 space-y-1">
            <Link
              href="/dashboard"
              onClick={() => setMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-base font-medium transition-all ${
                isActive("/dashboard")
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
              }`}
            >
              Dashboard
            </Link>
            <Link
              href="/browse"
              onClick={() => setMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-base font-medium transition-all ${
                isActive("/browse")
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
              }`}
            >
              Browse
            </Link>
            <Link
              href="/preferences"
              onClick={() => setMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-base font-medium transition-all ${
                isActive("/preferences")
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
              }`}
            >
              Preferences
            </Link>
            <div className="pt-2 mt-2 border-t border-gray-200 space-y-1">
              {isLoggedIn ? (
                <>
                  <div className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-indigo-50">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white font-semibold">
                      {userName.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-base font-medium text-gray-900">
                      {userName}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left block px-4 py-2.5 rounded-lg text-base font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className={`block px-4 py-2.5 rounded-lg text-base font-medium transition-all ${
                    isActive("/login")
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-indigo-600"
                  }`}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import NavBar from "../components/NavBar";

export default function Signup() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(
        "https://relocateready-production.up.railway.app/users/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            email,
            password,
          }),
        },
      );

      if (!res.ok) throw new Error("Failed to create user");

      const data = await res.json();

      // Store user ID locally
      localStorage.setItem("userId", data.id);

      router.push("/dashboard");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <NavBar />
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2 text-center">
            Get Started
          </h1>
          <p className="text-gray-600 text-center mb-6">
            Create your account to start exploring
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block text-gray-700 font-medium mb-2"
            >
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              required
              placeholder="John"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-gray-900"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block text-gray-700 font-medium mb-2"
            >
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              required
              placeholder="Doe"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-gray-900"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="you@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-gray-900"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-gray-900"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer"
          >
            Continue
          </button>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-indigo-600 hover:text-purple-600 font-semibold hover:underline transition"
              >
                Log in
              </Link>
            </p>
          </div>
        </form>
      </main>
    </>
  );
}

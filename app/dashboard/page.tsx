"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (!id) {
      router.push("/signup");
    } else {
      setUserId(id);
    }
  }, [router]);

  if (!userId) return null;

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Welcome to your dashboard 👋
        </h1>

        <p className="text-gray-600 mb-8">
          You’re logged in as user <span className="font-medium">{userId}</span>.
        </p>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-700">
            Next up: we’ll show your saved locations and rankings here.
          </p>
        </div>
      </div>
    </main>
  );
}

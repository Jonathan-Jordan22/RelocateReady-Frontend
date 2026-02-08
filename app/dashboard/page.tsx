"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type RankedLocation = {
  location: {
    id: number;
    name: string;
    country: string;
  };
  score: number;
};

export default function Dashboard() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [locations, setLocations] = useState<RankedLocation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (!id) {
      router.push("/signup");
      return;
    }

    setUserId(id);

    fetch(`http://localhost:8000/score/user/${id}/ranked`)
      .then((res) => res.json())
      .then((data) => {
        console.log("API Response:", data);
        setLocations(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setLoading(false);
      });
  }, [router]);

  if (!userId) return null;

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Your relocation dashboard
        </h1>

        {loading && <p className="text-gray-500">Loading your locations...</p>}

        {!loading && locations.length === 0 && (
          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-gray-700">
              You haven’t saved any locations yet.
            </p>
          </div>
        )}

        {!loading && locations.length > 0 && (
          <div className="space-y-4">
            {locations.map((item, index) => (
              <div
                key={`${item.location.id}-${index}`}
                className="bg-white rounded-xl shadow p-6 flex justify-between items-center"
              >
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {item.location.name}
                  </h2>
                  <p className="text-gray-500">{item.location.country}</p>
                </div>

                <div className="text-2xl font-bold text-indigo-600">
                  {item.score}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NavBar from "../components/NavBar";

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
  const [hasPreferences, setHasPreferences] = useState(false);

  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (!id) {
      router.push("/signup");
      return;
    }
    setUserId(id);
  }, [router]);

  useEffect(() => {
    if (!userId) return;

    setLoading(true);

    // Fetch user preferences first
    fetch(
      `https://relocateready-production.up.railway.app/preferences/${userId}`,
    )
      .then((res) => {
        if (!res.ok) {
          // If preferences don't exist (404), user needs to set them
          setHasPreferences(false);
          setLoading(false);
          // Fetch locations anyway
          return fetch(
            `https://relocateready-production.up.railway.app/user/${userId}/ranked`,
          )
            .then((r) => r.json())
            .then((data) => {
              if (Array.isArray(data)) {
                setLocations(data);
              }
            })
            .catch(() => setLocations([]));
        }
        return res.json();
      })
      .then((prefs) => {
        if (!prefs) return; // Already handled 404 above

        // Check if preferences are set (not all default values)
        const isDefaultPrefs =
          prefs.cost_importance === 0.0 &&
          prefs.safety_importance === 0.0 &&
          prefs.climate_importance === 0.0 &&
          prefs.healthcare_importance === 0.0;

        setHasPreferences(!isDefaultPrefs);

        // Then fetch user's ranked locations
        return fetch(
          `https://relocateready-production.up.railway.app/user/${userId}/ranked`,
        );
      })
      .then((res) => {
        if (!res) return; // Already handled above
        if (!res.ok) throw new Error("Failed to fetch locations");
        return res.json();
      })
      .then((data) => {
        if (!data) return; // Already handled above
        if (Array.isArray(data)) {
          setLocations(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setLocations([]);
        setLoading(false);
      });
  }, [userId]);

  if (!userId) return null;

  return (
    <>
      <NavBar />
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50/30 px-6 py-10">
        <div className="max-w-5xl mx-auto">
          {!loading && !hasPreferences && (
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-2xl p-6 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    ⚙️ Set Your Preferences
                  </h3>
                  <p className="text-gray-600">
                    Customize what matters most to you to get personalized
                    location recommendations
                  </p>
                </div>
                <button
                  onClick={() => router.push("/preferences")}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all cursor-pointer whitespace-nowrap ml-4"
                >
                  Update Preferences
                </button>
              </div>
            </div>
          )}

          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Your Relocation Dashboard
            </h1>
            <p className="text-gray-600">
              Track and compare your favorite locations
            </p>
          </div>

          <div className="mt-8">
            {loading && (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent mb-3"></div>
                  <p className="text-gray-600">Loading your locations...</p>
                </div>
              </div>
            )}

            {!loading && locations.length === 0 && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
                <div className="mb-4 text-4xl">📍</div>
                <p className="text-gray-700 text-lg">
                  You haven't saved any locations yet.
                </p>
                <p className="text-gray-500 mt-2">
                  Browse locations to get started!
                </p>
              </div>
            )}

            {!loading && locations.length > 0 && (
              <div className="space-y-4">
                {locations.map((item, index) => (
                  <div
                    key={`${item.location.id}-${index}`}
                    className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex justify-between items-center hover:shadow-xl transition-all duration-200 hover:scale-[1.01]"
                  >
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {item.location.name}
                      </h2>
                      <p className="text-gray-500 flex items-center gap-1 mt-1">
                        <span>📍</span>
                        {item.location.country}
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="text-sm text-gray-500 mb-1">
                        Match Score
                      </div>
                      <div className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        {item.score}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

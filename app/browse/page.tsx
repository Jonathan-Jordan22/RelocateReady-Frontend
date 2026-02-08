"use client";

import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";

type Location = {
  id: number;
  name: string;
  country: string;
  cost_index?: number;
  safety_index?: number;
};

export default function Browse() {
  const [userId, setUserId] = useState<string | null>(null);
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [savedIds, setSavedIds] = useState<number[]>([]);

  useEffect(() => {
    const id = localStorage.getItem("userId");
    setUserId(id);

    // Fetch locations regardless of login status
    fetch("http://localhost:8000/locations")
      .then((res) => res.json())
      .then((data) => {
        setLocations(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching locations:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!userId) return;

    fetch(`http://localhost:8000/user-locations/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setSavedIds(data.map((loc: { id: number }) => loc.id));
        } else {
          console.warn("Expected array, got:", typeof data);
          setSavedIds([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching saved locations:", err);
        setSavedIds([]);
      });
  }, [userId]);

  const handleSave = async (locationId: number) => {
    if (!userId) return;
    await fetch(
      `http://localhost:8000/user-locations/${userId}/${locationId}`,
      {
        method: "POST",
      },
    );

    // Add the saved location ID to state to update UI immediately
    setSavedIds((prev) => [...prev, locationId]);
    alert("Location saved!");
  };

  if (loading) return <p className="p-6">Loading locations...</p>;

  return (
    <>
      <NavBar />
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50/30 px-6 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Browse Locations
            </h1>
            <p className="text-gray-600">
              Discover cities around the world that match your preferences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {locations.map((loc) => (
              <div
                key={loc.id}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-200 hover:scale-[1.02]"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {loc.name}
                    </h2>
                    <p className="text-gray-500 flex items-center gap-1 mt-1">
                      <span>📍</span>
                      {loc.country}
                    </p>
                  </div>
                  {userId ? (
                    <button
                      onClick={() => handleSave(loc.id)}
                      disabled={savedIds.includes(loc.id)}
                      className={`px-5 py-2.5 rounded-xl font-semibold transition-all ${
                        savedIds.includes(loc.id)
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:scale-105"
                      }`}
                    >
                      {savedIds.includes(loc.id) ? "✓ Saved" : "Save"}
                    </button>
                  ) : (
                    <a
                      href="/login"
                      className="px-5 py-2.5 rounded-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:scale-105 transition-all"
                    >
                      Login to Save
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

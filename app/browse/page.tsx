"use client";

import { useEffect, useState } from "react";

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
    if (!id) return;
    setUserId(id);

    fetch("http://localhost:8000/locations") // endpoint returning all locations
      .then((res) => res.json())
      .then((data) => {
        setLocations(data);
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
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Browse Locations
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {locations.map((loc) => (
            <div
              key={loc.id}
              className="bg-white rounded-xl shadow p-6 flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-semibold">{loc.name}</h2>
                <p className="text-gray-500">{loc.country}</p>
              </div>
              <button
                onClick={() => handleSave(loc.id)}
                disabled={savedIds.includes(loc.id)}
                className={`px-4 py-2 rounded transition ${
                  savedIds.includes(loc.id)
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-green-500 text-white hover:bg-green-600"
                }`}
              >
                {savedIds.includes(loc.id) ? "Saved" : "Save"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

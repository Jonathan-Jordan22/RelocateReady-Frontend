"use client";

import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";

type Location = {
  id: number;
  name: string;
  country: string;
  description?: string;
  cost_index?: number;
  safety_index?: number;
};

export default function Browse() {
  const [userId, setUserId] = useState<string | null>(null);
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );

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
  };

  const handleRemove = async (locationId: number) => {
    if (!userId) return;
    await fetch(
      `http://localhost:8000/user-locations/${userId}/${locationId}`,
      {
        method: "DELETE",
      },
    );

    // Remove the location ID from state to update UI immediately
    setSavedIds((prev) => prev.filter((id) => id !== locationId));
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
                onClick={() => setSelectedLocation(loc)}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-200 hover:scale-[1.02] cursor-pointer"
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
                    savedIds.includes(loc.id) ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemove(loc.id);
                        }}
                        className="px-5 py-2.5 rounded-xl font-semibold transition-all bg-gray-100 text-gray-600 border border-gray-300 hover:bg-gray-200 hover:shadow-lg hover:scale-105 cursor-pointer"
                      >
                        Remove
                      </button>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSave(loc.id);
                        }}
                        className="px-5 py-2.5 rounded-xl font-semibold transition-all bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:scale-105 cursor-pointer"
                      >
                        Save
                      </button>
                    )
                  ) : (
                    <a
                      href="/login"
                      onClick={(e) => e.stopPropagation()}
                      className="px-5 py-2.5 rounded-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:scale-105 transition-all"
                    >
                      Login to Save
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Location Details Modal */}
          {selectedLocation && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
              onClick={() => setSelectedLocation(null)}
            >
              <div
                className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      {selectedLocation.name}
                    </h2>
                    <p className="text-gray-500 flex items-center gap-2 text-lg">
                      <span>📍</span>
                      {selectedLocation.country}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedLocation(null)}
                    className="text-gray-400 hover:text-gray-600 transition-colors text-2xl leading-none"
                  >
                    ×
                  </button>
                </div>

                {selectedLocation.description && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      About {selectedLocation.name}
                    </h3>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                      {selectedLocation.description}
                    </p>
                  </div>
                )}

                {(selectedLocation.cost_index !== undefined ||
                  selectedLocation.safety_index !== undefined) && (
                  <div className="border-t pt-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Quick Stats
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {selectedLocation.cost_index !== undefined && (
                        <div className="bg-indigo-50 rounded-xl p-4">
                          <p className="text-sm text-gray-600 mb-1">
                            Cost Index
                          </p>
                          <p className="text-2xl font-bold text-indigo-600">
                            {selectedLocation.cost_index.toFixed(1)}
                          </p>
                        </div>
                      )}
                      {selectedLocation.safety_index !== undefined && (
                        <div className="bg-purple-50 rounded-xl p-4">
                          <p className="text-sm text-gray-600 mb-1">
                            Safety Index
                          </p>
                          <p className="text-2xl font-bold text-purple-600">
                            {selectedLocation.safety_index.toFixed(1)}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="mt-6 flex gap-3">
                  {userId ? (
                    savedIds.includes(selectedLocation.id) ? (
                      <button
                        onClick={() => {
                          handleRemove(selectedLocation.id);
                          setSelectedLocation(null);
                        }}
                        className="flex-1 px-6 py-3 rounded-xl font-semibold transition-all bg-gray-100 text-gray-600 border border-gray-300 hover:bg-gray-200 hover:shadow-lg cursor-pointer"
                      >
                        Remove from Saved
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          handleSave(selectedLocation.id);
                          setSelectedLocation(null);
                        }}
                        className="flex-1 px-6 py-3 rounded-xl font-semibold transition-all bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg cursor-pointer"
                      >
                        Save Location
                      </button>
                    )
                  ) : (
                    <a
                      href="/login"
                      className="flex-1 px-6 py-3 rounded-xl font-semibold text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg transition-all"
                    >
                      Login to Save
                    </a>
                  )}
                  <button
                    onClick={() => setSelectedLocation(null)}
                    className="px-6 py-3 rounded-xl font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

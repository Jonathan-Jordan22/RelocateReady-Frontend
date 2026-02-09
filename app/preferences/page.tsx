"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NavBar from "../components/NavBar";

export default function Preferences() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [prefs, setPrefs] = useState({
    cost_importance: 0.5,
    safety_importance: 0.5,
    climate_importance: 0.5,
    healthcare_importance: 0.5,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (!id) {
      router.push("/signup");
      return;
    }
    setUserId(id);

    // Fetch preferences
    fetch(`http://localhost:8000/preferences/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPrefs({
          cost_importance: data.cost_importance ?? 0.5,
          safety_importance: data.safety_importance ?? 0.5,
          climate_importance: data.climate_importance ?? 0.5,
          healthcare_importance: data.healthcare_importance ?? 0.5,
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPrefs((prev) => ({ ...prev, [name]: parseFloat(value) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await fetch(`http://localhost:8000/preferences/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(prefs),
      });
    } catch (err) {
      console.error("Error saving preferences:", err);
    } finally {
      setSaving(false);
    }
  };

  if (!userId) return null;

  return (
    <>
      <NavBar />
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50/30 px-6 py-10">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Your Preferences
            </h1>
            <p className="text-gray-600">
              Customize what matters most to you when choosing a location
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent mb-3"></div>
                <p className="text-gray-600">Loading preferences...</p>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8"
            >
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-lg font-semibold text-gray-900">
                      Cost of Living
                    </label>
                    <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent transition-all duration-300">
                      {(prefs.cost_importance * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="relative">
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300 ease-out rounded-full"
                        style={{ width: `${prefs.cost_importance * 100}%` }}
                      ></div>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      name="cost_importance"
                      value={prefs.cost_importance}
                      onChange={handleChange}
                      className="absolute top-0 w-full h-3 bg-transparent appearance-none cursor-pointer slider-thumb"
                      style={{
                        WebkitAppearance: "none",
                      }}
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    How much does cost matter when choosing a location?
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-lg font-semibold text-gray-900">
                      Safety
                    </label>
                    <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent transition-all duration-300">
                      {(prefs.safety_importance * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="relative">
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300 ease-out rounded-full"
                        style={{ width: `${prefs.safety_importance * 100}%` }}
                      ></div>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      name="safety_importance"
                      value={prefs.safety_importance}
                      onChange={handleChange}
                      className="absolute top-0 w-full h-3 bg-transparent appearance-none cursor-pointer slider-thumb"
                      style={{
                        WebkitAppearance: "none",
                      }}
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    How important is safety in your decision?
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-lg font-semibold text-gray-900">
                      Climate
                    </label>
                    <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent transition-all duration-300">
                      {(prefs.climate_importance * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="relative">
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300 ease-out rounded-full"
                        style={{ width: `${prefs.climate_importance * 100}%` }}
                      ></div>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      name="climate_importance"
                      value={prefs.climate_importance}
                      onChange={handleChange}
                      className="absolute top-0 w-full h-3 bg-transparent appearance-none cursor-pointer slider-thumb"
                      style={{
                        WebkitAppearance: "none",
                      }}
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    How much does climate quality matter to you?
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-lg font-semibold text-gray-900">
                      Healthcare
                    </label>
                    <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent transition-all duration-300">
                      {(prefs.healthcare_importance * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="relative">
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300 ease-out rounded-full"
                        style={{
                          width: `${prefs.healthcare_importance * 100}%`,
                        }}
                      ></div>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      name="healthcare_importance"
                      value={prefs.healthcare_importance}
                      onChange={handleChange}
                      className="absolute top-0 w-full h-3 bg-transparent appearance-none cursor-pointer slider-thumb"
                      style={{
                        WebkitAppearance: "none",
                      }}
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    How important is healthcare quality in your decision?
                  </p>
                </div>
              </div>

              <style jsx>{`
                .slider-thumb::-webkit-slider-thumb {
                  -webkit-appearance: none;
                  appearance: none;
                  width: 20px;
                  height: 20px;
                  border-radius: 50%;
                  background: linear-gradient(135deg, #6366f1, #8b5cf6);
                  cursor: pointer;
                  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.4);
                  transition: all 0.2s ease;
                }

                .slider-thumb::-webkit-slider-thumb:hover {
                  transform: scale(1.2);
                  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.6);
                }

                .slider-thumb::-moz-range-thumb {
                  width: 20px;
                  height: 20px;
                  border-radius: 50%;
                  background: linear-gradient(135deg, #6366f1, #8b5cf6);
                  cursor: pointer;
                  border: none;
                  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.4);
                  transition: all 0.2s ease;
                }

                .slider-thumb::-moz-range-thumb:hover {
                  transform: scale(1.2);
                  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.6);
                }
              `}</style>

              <button
                type="submit"
                disabled={saving}
                className="mt-8 w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer"
              >
                {saving ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Saving...
                  </span>
                ) : (
                  "Save Preferences"
                )}
              </button>
            </form>
          )}
        </div>
      </main>
    </>
  );
}

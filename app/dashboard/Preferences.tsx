"use client";

import { useEffect, useState } from "react";

export default function Preferences({
  userId,
  prefs,
  setPrefs,
}: {
  userId: string;
  prefs: { cost_index_weight: number; safety_index_weight: number };
  setPrefs: React.Dispatch<
    React.SetStateAction<{
      cost_index_weight: number;
      safety_index_weight: number;
    }>
  >;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPrefs((prev) => ({ ...prev, [name]: parseFloat(value) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(
      `https://relocateready-production.up.railway.app/preferences/${userId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(prefs),
      },
    );
    alert("Preferences updated!");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow mb-6"
    >
      <h2 className="text-xl font-bold mb-4">Update Preferences</h2>

      <label className="block mb-2">
        Cost Importance: {prefs.cost_index_weight}
      </label>
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        name="cost_index_weight"
        value={prefs.cost_index_weight}
        onChange={handleChange}
        className="w-full mb-4"
      />

      <label className="block mb-2">
        Safety Importance: {prefs.safety_index_weight}
      </label>
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        name="safety_index_weight"
        value={prefs.safety_index_weight}
        onChange={handleChange}
        className="w-full mb-4"
      />

      <button className="px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition">
        Save Preferences
      </button>
    </form>
  );
}

"use client";

import React, { useState } from "react";
import axios from "axios";
//import { format } from "date-fns";

export default function RoutineGenerator() {
  const [mood] = useState("Nervous");
  const [hasSchool, setHasSchool] = useState("Yes");
  const [hasTuition, setHasTuition] = useState("Yes");
  const [schoolStart, setSchoolStart] = useState("08:00");
  const [schoolEnd, setSchoolEnd] = useState("14:00");
  const [tuitionTime, setTuitionTime] = useState("17:00 - 18:00");
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState<string[][] | null>(null);
  const [error, setError] = useState("");

  const parseMarkdownTable = (markdown: string) => {
    const lines = markdown.split("\n").filter(l => l.startsWith("|"));
    if (lines.length < 3) return null;

    const headers = lines[0].split("|").map((h) => h.trim()).filter(Boolean);
    const rows = lines.slice(2).map(line =>
      line.split("|").map(cell => cell.trim()).filter(Boolean)
    );

    return [headers, ...rows];
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setTableData(null);

    try {
      const response = await axios.post("/api/generateRoutine", {
        mood,
        hasSchool: hasSchool === "Yes",
        hasTuition: hasTuition === "Yes",
        schoolStart,
        schoolEnd,
        tuitionTime,
      });

      const parsed = parseMarkdownTable(response.data.content);
      if (parsed) {
        setTableData(parsed);
      } else {
        setError("Could not parse table.");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to generate routine.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">🗓️ AI-Powered Daily Routine Generator</h1>
      <p className="mb-4">Today you,re feeling <strong>{mood}</strong>. Let,s create your day!</p>

      <div className="mb-4">
        <label className="block font-semibold">Do you have school today?</label>
        <select value={hasSchool} onChange={(e) => setHasSchool(e.target.value)} className="w-full border p-2 rounded">
          <option className="text-black">Yes</option>
          <option className="text-black">No</option>
        </select>
        {hasSchool === "Yes" && (
          <div className="flex gap-2 mt-2">
            <input type="time" value={schoolStart} onChange={(e) => setSchoolStart(e.target.value)} className="border p-2 rounded w-1/2" />
            <input type="time" value={schoolEnd} onChange={(e) => setSchoolEnd(e.target.value)} className="border p-2 rounded w-1/2" />
          </div>
        )}
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Do you have tuition today?</label>
        <select value={hasTuition} onChange={(e) => setHasTuition(e.target.value)} className="w-full border p-2 rounded">
          <option className="text-black">Yes</option>
          <option className="text-black">No</option>
        </select>
        {hasTuition === "Yes" && (
          <input type="text" value={tuitionTime} onChange={(e) => setTuitionTime(e.target.value)} className="w-full mt-2 border p-2 rounded" />
        )}
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Routine"}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {tableData && (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-black">
                {tableData[0].map((header, i) => (
                  <th key={i} className="border p-2">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.slice(1).map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="border p-2">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

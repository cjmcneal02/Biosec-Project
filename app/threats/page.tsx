"use client";

import { useState, useMemo } from "react";
import { useThreats } from "@/state/ThreatContext";
import DashboardLayout from "@/components/DashboardLayout";
import ThreatCard from "@/components/ThreatCard";
import Link from "next/link";
import type { ThreatCategory } from "@/types/Threat";

export default function ThreatsPage() {
  const { threats, isLoading } = useThreats();
  const [sortBy, setSortBy] = useState<"date" | "risk">("date");
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const categories: ThreatCategory[] = [
    "Biotech Malware",
    "Data Exfiltration",
    "Unauthorized Lab Access",
    "Insider Threat",
    "Supply Chain Compromise",
  ];

  const filteredAndSortedThreats = useMemo(() => {
    let result = [...threats];

    // Filter by category
    if (filterCategory !== "all") {
      result = result.filter((t) => t.ai.layer1.category === filterCategory);
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === "risk") {
        return b.ai.layer1.risk - a.ai.layer1.risk;
      } else {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    return result;
  }, [threats, sortBy, filterCategory]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <p className="text-gray-400">Loading...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">All Threats</h1>
            <p className="text-gray-400">
              {threats.length} total threat{threats.length !== 1 ? "s" : ""} reported
            </p>
          </div>
          <Link
            href="/threats/new"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            + Report Threat
          </Link>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 bg-gray-900 border border-gray-800 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-400">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "date" | "risk")}
              className="bg-gray-800 border border-gray-700 text-white rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="date">Date</option>
              <option value="risk">Risk Score</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-400">Category:</label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-gray-800 border border-gray-700 text-white rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Threat List */}
        {filteredAndSortedThreats.length === 0 ? (
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-12 text-center">
            <p className="text-gray-400 mb-4">
              {filterCategory !== "all"
                ? "No threats found in this category"
                : "No threats reported yet"}
            </p>
            <Link
              href="/threats/new"
              className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Report First Threat
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedThreats.map((threat) => (
              <ThreatCard key={threat.id} threat={threat} />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

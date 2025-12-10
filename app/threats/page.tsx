"use client";

import { useState, useMemo } from "react";
import { useThreats } from "@/state/ThreatContext";
import DashboardLayout from "@/components/DashboardLayout";
import ThreatCard from "@/components/ThreatCard";
import Link from "next/link";
import type { ThreatCategory } from "@/types/Threat";

export default function ThreatsPage() {
  const { threats, isLoading, generateNewThreats, isGeneratingThreats } = useThreats();
  const [sortBy, setSortBy] = useState<"date" | "risk">("date");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleGenerateNewThreats = async () => {
    const wantsToAdd = confirm(
      "Generate 25 new AI threats?\n\n" +
      "OK = ADD 25 threats (keeps your existing " + threats.length + " threats = " + (threats.length + 25) + " total)\n" +
      "Cancel = REPLACE all threats with 25 new ones (deletes existing " + threats.length + " threats)"
    );
    
    if (wantsToAdd) {
      // They clicked OK - add new threats
      try {
        await generateNewThreats(25, false); // false = don't replace, add
      } catch (error) {
        console.error("Failed to generate threats:", error);
        alert("Failed to generate new threats. Please try again.");
      }
    } else {
      // They clicked Cancel - they want to replace, ask for confirmation
      if (confirm("⚠️ WARNING: This will DELETE all " + threats.length + " existing threats and replace with 25 new ones. Continue?")) {
        try {
          await generateNewThreats(25, true); // true = replace
        } catch (error) {
          console.error("Failed to generate threats:", error);
          alert("Failed to generate new threats. Please try again.");
        }
      }
    }
  };

  const categories: ThreatCategory[] = [
    "Biotech Malware",
    "Data Exfiltration",
    "Unauthorized Lab Access",
    "Insider Threat",
    "Supply Chain Compromise",
  ];

  const filteredAndSortedThreats = useMemo(() => {
    let result = [...threats];

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(query) ||
          t.description.toLowerCase().includes(query) ||
          t.source.toLowerCase().includes(query)
      );
    }

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
  }, [threats, sortBy, filterCategory, searchQuery]);

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
              {searchQuery || filterCategory !== "all" ? (
                <>
                  Showing {filteredAndSortedThreats.length} of {threats.length} threat
                  {threats.length !== 1 ? "s" : ""}
                </>
              ) : (
                <>
                  {threats.length} total threat{threats.length !== 1 ? "s" : ""} reported
                </>
              )}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {threats.length > 0 && (
              <button
                onClick={handleGenerateNewThreats}
                disabled={isGeneratingThreats}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors flex items-center gap-2"
              >
                {isGeneratingThreats ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    Generating...
                  </>
                ) : (
                  <>
                    <span>✨</span>
                    Generate 25 New Threats
                  </>
                )}
              </button>
            )}
            <Link
              href="/threats/new"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              + Report Threat
            </Link>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search threats by title, description, or source..."
              className="w-full bg-gray-900 border border-gray-800 text-white rounded-lg px-4 py-3 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <svg
              className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-3 text-gray-400 hover:text-white"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
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

            {(searchQuery || filterCategory !== "all") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setFilterCategory("all");
                }}
                className="ml-auto text-sm text-blue-400 hover:text-blue-300"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Threat List */}
        {filteredAndSortedThreats.length === 0 ? (
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-12 text-center">
            <p className="text-gray-400 mb-4">
              {searchQuery
                ? `No threats found matching "${searchQuery}"`
                : filterCategory !== "all"
                ? "No threats found in this category"
                : "No threats reported yet"}
            </p>
            {!searchQuery && filterCategory === "all" && (
              <Link
                href="/threats/new"
                className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                Report First Threat
              </Link>
            )}
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

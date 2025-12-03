"use client";

import { useThreats } from "@/state/ThreatContext";
import { generateGlobalInsights } from "@/services/insights";
import DashboardLayout from "@/components/DashboardLayout";
import InsightsPanel from "@/components/InsightsPanel";
import ThreatCard from "@/components/ThreatCard";
import Link from "next/link";

export default function Home() {
  const { threats, isLoading, loadSampleData } = useThreats();
  const insights = generateGlobalInsights(threats);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <p className="text-gray-400">Loading...</p>
        </div>
      </DashboardLayout>
    );
  }

  const recentThreats = threats.slice(0, 3);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Dashboard Overview
          </h1>
          <p className="text-gray-400">
            Real-time threat intelligence monitoring
          </p>
        </div>

        <InsightsPanel insights={insights} />

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Recent Threats</h2>
            <Link
              href="/threats"
              className="text-blue-400 hover:text-blue-300 text-sm font-medium"
            >
              View All →
            </Link>
          </div>

          {recentThreats.length === 0 ? (
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-12 text-center">
              <p className="text-gray-400 mb-6">No threats reported yet</p>
              <div className="flex gap-4 justify-center">
                <Link
                  href="/threats/new"
                  className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  Report First Threat
                </Link>
                <button
                  onClick={loadSampleData}
                  className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
                >
                  Load Sample Data
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentThreats.map((threat) => (
                <ThreatCard key={threat.id} threat={threat} />
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

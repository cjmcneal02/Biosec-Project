"use client";

import { useState, useEffect } from "react";
import { useThreats } from "@/state/ThreatContext";
import { generateGlobalInsights, getAIRecommendation } from "@/services/insights";
import DashboardLayout from "@/components/DashboardLayout";
import InsightsPanel from "@/components/InsightsPanel";
import ThreatCard from "@/components/ThreatCard";
import Link from "next/link";

export default function Home() {
  const { threats, isLoading, loadSampleData, generateNewThreats, isGeneratingThreats } = useThreats();
  const insights = generateGlobalInsights(threats);
  const [aiRecommendation, setAiRecommendation] = useState<string | undefined>(undefined);
  const [isRecommendationLoading, setIsRecommendationLoading] = useState(false);

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

  // Fetch AI recommendation when threats change
  useEffect(() => {
    if (threats.length > 0 && !isLoading) {
      setIsRecommendationLoading(true);
      getAIRecommendation(threats, insights)
        .then((recommendation) => {
          setAiRecommendation(recommendation);
          setIsRecommendationLoading(false);
        })
        .catch((error) => {
          console.error("Failed to load AI recommendation:", error);
          setIsRecommendationLoading(false);
        });
    }
  }, [threats.length, isLoading]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </DashboardLayout>
    );
  }

  const recentThreats = threats.slice(0, 3);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Dashboard Overview
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Real-time threat intelligence monitoring
            </p>
          </div>
          {threats.length > 0 && (
            <button
              onClick={handleGenerateNewThreats}
              disabled={isGeneratingThreats}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors flex items-center gap-2"
            >
              {isGeneratingThreats ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Generating 25 Threats...
                </>
              ) : (
                <>
                  <span>✨</span>
                  Generate 25 New Threats
                </>
              )}
            </button>
          )}
        </div>

        <InsightsPanel 
          insights={insights} 
          aiRecommendation={aiRecommendation}
          isRecommendationLoading={isRecommendationLoading}
        />

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Threats</h2>
            <Link
              href="/threats"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium"
            >
              View All →
            </Link>
          </div>

          {recentThreats.length === 0 ? (
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-12 text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-6">No threats reported yet</p>
              <div className="flex gap-4 justify-center">
                <Link
                  href="/threats/new"
                  className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  Report First Threat
                </Link>
                <button
                  onClick={loadSampleData}
                  className="px-6 py-3 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium rounded-lg transition-colors"
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

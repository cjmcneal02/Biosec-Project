"use client";

import { useThreats } from "@/state/ThreatContext";
import { generateGlobalInsights, getRiskColor } from "@/services/insights";
import DashboardLayout from "@/components/DashboardLayout";
import InsightsPanel from "@/components/InsightsPanel";

export default function InsightsPage() {
  const { threats, isLoading } = useThreats();
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

  // Calculate category breakdown
  const categoryBreakdown = threats.reduce((acc, threat) => {
    const cat = threat.ai.layer1.category;
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Threat Intelligence Insights
          </h1>
          <p className="text-gray-400">
            AI-powered analytics and situational awareness
          </p>
        </div>

        {threats.length === 0 ? (
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-12 text-center">
            <p className="text-gray-400 mb-4">
              No data available. Report threats to see insights.
            </p>
          </div>
        ) : (
          <>
            {/* Main Insights Panel */}
            <InsightsPanel insights={insights} />

            {/* Category Breakdown */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">
                Threat Category Breakdown
              </h2>
              <div className="space-y-3">
                {Object.entries(categoryBreakdown)
                  .sort(([, a], [, b]) => b - a)
                  .map(([category, count]) => {
                    const percentage = ((count / threats.length) * 100).toFixed(1);
                    return (
                      <div key={category}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-300">{category}</span>
                          <span className="text-sm text-gray-400">
                            {count} ({percentage}%)
                          </span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full transition-all"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* AI Insights Summary */}
            <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-800/50 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">🤖</span>
                <h2 className="text-xl font-semibold text-white">
                  AI Insights Summary
                </h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-300 mb-2">
                    Current Threat Landscape
                  </h3>
                  <p className="text-white">{insights.trendingPattern}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-300 mb-2">
                    Risk Assessment
                  </h3>
                  <p className="text-white">
                    The average risk score across all threats is{" "}
                    <span className={`font-bold ${getRiskColor(insights.avgRisk)}`}>
                      {insights.avgRisk}
                    </span>
                    . The most prevalent threat category is{" "}
                    <span className="font-bold text-blue-400">{insights.topCategory}</span>,
                    accounting for the majority of recent incidents.
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-300 mb-2">
                    Activity Trends
                  </h3>
                  <div className="grid grid-cols-3 gap-4 mt-3">
                    <div className="bg-gray-900/50 rounded p-3">
                      <p className="text-xs text-gray-400 mb-1">Last 24 Hours</p>
                      <p className="text-2xl font-bold text-white">
                        {insights.recentActivity.last24h}
                      </p>
                    </div>
                    <div className="bg-gray-900/50 rounded p-3">
                      <p className="text-xs text-gray-400 mb-1">Last 7 Days</p>
                      <p className="text-2xl font-bold text-white">
                        {insights.recentActivity.last7d}
                      </p>
                    </div>
                    <div className="bg-gray-900/50 rounded p-3">
                      <p className="text-xs text-gray-400 mb-1">Last 30 Days</p>
                      <p className="text-2xl font-bold text-white">
                        {insights.recentActivity.last30d}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/50 rounded p-4 mt-4">
                  <p className="text-sm text-yellow-200">
                    ⚠️ <strong>Note:</strong> All AI insights are currently generated
                    from mock data for demonstration purposes. Real AI integration
                    will be implemented in future phases.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}

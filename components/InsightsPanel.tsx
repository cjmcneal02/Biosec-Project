import type { GlobalInsights } from "@/types/Threat";
import { getRiskColor } from "@/services/insights";

interface InsightsPanelProps {
  insights: GlobalInsights;
  aiRecommendation?: string;
  isRecommendationLoading?: boolean;
}

export default function InsightsPanel({ 
  insights, 
  aiRecommendation,
  isRecommendationLoading = false 
}: InsightsPanelProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Threats */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Total Threats</p>
        <p className="text-3xl font-bold text-gray-900 dark:text-white">{insights.totalThreats}</p>
      </div>

      {/* Average Risk */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Average Risk Score</p>
        <p className={`text-3xl font-bold ${getRiskColor(insights.avgRisk)}`}>
          {insights.avgRisk}
        </p>
      </div>

      {/* Top Category */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Top Category</p>
        <p className="text-lg font-semibold text-gray-900 dark:text-white">{insights.topCategory}</p>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Last 24h Activity</p>
        <p className="text-3xl font-bold text-gray-900 dark:text-white">{insights.recentActivity.last24h}</p>
      </div>

      {/* Risk Distribution */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 md:col-span-2">
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Risk Distribution</p>
        <div className="grid grid-cols-4 gap-3">
          <div>
            <p className="text-xs text-gray-600 dark:text-gray-500 mb-1">Low</p>
            <p className="text-xl font-bold text-green-400 dark:text-green-400 text-green-600">
              {insights.riskDistribution.low}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-600 dark:text-gray-500 mb-1">Medium</p>
            <p className="text-xl font-bold text-yellow-600 dark:text-yellow-400">
              {insights.riskDistribution.medium}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-600 dark:text-gray-500 mb-1">High</p>
            <p className="text-xl font-bold text-orange-600 dark:text-orange-400">
              {insights.riskDistribution.high}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-600 dark:text-gray-500 mb-1">Critical</p>
            <p className="text-xl font-bold text-red-600 dark:text-red-400">
              {insights.riskDistribution.critical}
            </p>
          </div>
        </div>
      </div>

      {/* AI Recommendation */}
      <div className="bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-900 border border-blue-200 dark:border-blue-800/50 rounded-lg p-6 md:col-span-2">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">🤖</span>
          <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold">AI Recommendation</p>
        </div>
        {isRecommendationLoading ? (
          <p className="text-gray-600 dark:text-gray-400 text-sm">Generating recommendation...</p>
        ) : (
          <p className="text-gray-900 dark:text-white">{aiRecommendation || insights.trendingPattern}</p>
        )}
      </div>
    </div>
  );
}

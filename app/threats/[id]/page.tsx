"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useThreats } from "@/state/ThreatContext";
import DashboardLayout from "@/components/DashboardLayout";
import RiskBadge from "@/components/RiskBadge";
import Link from "next/link";
import { isThreatAnalyzed } from "@/services/threatPlaceholder";

export default function ThreatDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { getThreatById, refreshAI, deleteThreat, generateActionableSteps, analyzeThreat } = useThreats();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isGeneratingSteps, setIsGeneratingSteps] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const threatId = params.id as string;
  const threat = getThreatById(threatId);

  const handleRefreshAI = async () => {
    setIsRefreshing(true);
    await refreshAI(threatId);
    setIsRefreshing(false);
  };

  const handleGenerateSteps = async () => {
    setIsGeneratingSteps(true);
    try {
      await generateActionableSteps(threatId);
    } catch (error) {
      console.error("Failed to generate steps:", error);
      alert("Failed to generate actionable steps. Please try again.");
    } finally {
      setIsGeneratingSteps(false);
    }
  };

  const handleAnalyzeThreat = async () => {
    setIsAnalyzing(true);
    try {
      await analyzeThreat(threatId);
    } catch (error) {
      console.error("Failed to analyze threat:", error);
      alert("Failed to analyze threat. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this threat?")) {
      deleteThreat(threatId);
      router.push("/threats");
    }
  };

  if (!threat) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-white mb-4">Threat Not Found</h1>
          <Link
            href="/threats"
            className="text-blue-400 hover:text-blue-300"
          >
            ← Back to All Threats
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const { ai } = threat;
  const analyzed = isThreatAnalyzed(threat);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <Link
            href="/threats"
            className="text-blue-400 hover:text-blue-300 text-sm mb-4 inline-block"
          >
            ← Back to All Threats
          </Link>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-2">
                {threat.title}
              </h1>
              <p className="text-gray-400">ID: {threat.id}</p>
            </div>
            {analyzed ? (
              <RiskBadge score={ai.layer1.risk} size="lg" />
            ) : (
              <div className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm text-gray-300">
                Not Analyzed
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 flex-wrap">
          {!analyzed ? (
            <button
              onClick={handleAnalyzeThreat}
              disabled={isAnalyzing}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              {isAnalyzing ? "Analyzing..." : "🤖 Analyze Threat"}
            </button>
          ) : (
            <>
              <button
                onClick={handleRefreshAI}
                disabled={isRefreshing}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                {isRefreshing ? "Refreshing..." : "🔄 Refresh AI Analysis"}
              </button>
              <button
                onClick={handleGenerateSteps}
                disabled={isGeneratingSteps}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                {isGeneratingSteps ? "Generating..." : "✨ Generate Actionable Steps"}
              </button>
            </>
          )}
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg text-sm font-medium transition-colors"
          >
            Delete Threat
          </button>
        </div>

        {/* User-Provided Data */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            Threat Details
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-400 mb-1">Date Detected</p>
              <p className="text-white">{threat.date}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Source</p>
              <p className="text-white">{threat.source}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-gray-400 mb-1">Description</p>
              <p className="text-white">{threat.description}</p>
            </div>
          </div>
        </div>

        {/* AI Analysis Sections - Only show if analyzed */}
        {analyzed ? (
          <>
            {/* AI Layer 1: Initial Assessment */}
            <div className="bg-gradient-to-br from-blue-900/20 to-gray-900 border border-blue-800/50 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">🤖</span>
                <h2 className="text-xl font-semibold text-white">
                  AI Layer 1: Initial Assessment
                </h2>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Category</p>
                    <span className="inline-block px-3 py-1 text-sm rounded bg-blue-500/20 text-blue-400 border border-blue-500">
                      {ai.layer1.category}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Confidence</p>
                    <p className="text-white font-semibold">
                      {(ai.layer1.confidence * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">AI Summary</p>
                  <p className="text-white">{ai.layer1.summary}</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-12 text-center">
            <p className="text-gray-400 mb-4">This threat has not been analyzed yet.</p>
            <p className="text-gray-500 text-sm">Click "🤖 Analyze Threat" above to generate AI-powered risk assessment and recommendations.</p>
          </div>
        )}

        {analyzed && (
          <>
            {/* AI Layer 2: Mitigations */}
            <div className="bg-gradient-to-br from-purple-900/20 to-gray-900 border border-purple-800/50 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">🛡️</span>
            <h2 className="text-xl font-semibold text-white">
              AI Layer 2: Mitigation Recommendations
            </h2>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-400 mb-1">Priority</p>
              <span
                className={`inline-block px-3 py-1 text-sm rounded font-semibold ${
                  ai.layer2.priority === "Critical"
                    ? "bg-red-500/20 text-red-400 border border-red-500"
                    : ai.layer2.priority === "High"
                    ? "bg-orange-500/20 text-orange-400 border border-orange-500"
                    : ai.layer2.priority === "Medium"
                    ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500"
                    : "bg-green-500/20 text-green-400 border border-green-500"
                }`}
              >
                {ai.layer2.priority}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-2">Estimated Impact</p>
              <p className="text-white">{ai.layer2.estimatedImpact}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-2">
                Mitigation Steps ({ai.layer2.mitigations.length})
              </p>
              <ul className="space-y-2">
                {ai.layer2.mitigations.map((mitigation, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span className="text-white">{mitigation}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-2">Recommended Actions</p>
              <ul className="space-y-2">
                {ai.layer2.recommendedActions.map((action, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">→</span>
                    <span className="text-white">{action}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

            {/* AI Layer 3: Overall Insights */}
            {ai.layer3 && (
              <div className="bg-gradient-to-br from-green-900/20 to-gray-900 border border-green-800/50 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">📊</span>
                  <h2 className="text-xl font-semibold text-white">
                    AI Layer 3: Contextual Insights
                  </h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Analysis</p>
                    <p className="text-white">{ai.layer3.contextualInsights}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Related Threats</p>
                    <div className="flex gap-2">
                      {ai.layer3.relatedThreats.map((relatedId) => (
                        <span
                          key={relatedId}
                          className="px-2 py-1 text-xs bg-green-500/20 text-green-400 border border-green-500 rounded"
                        >
                          {relatedId}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Timestamps */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Created:</span>{" "}
              <span className="text-white">
                {new Date(threat.createdAt).toLocaleString()}
              </span>
            </div>
            <div>
              <span className="text-gray-400">Last Updated:</span>{" "}
              <span className="text-white">
                {new Date(threat.updatedAt).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

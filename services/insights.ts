import type { Threat, GlobalInsights, ThreatCategory } from "@/types/Threat";

/**
 * Calculate global insights from all threats
 */
export function generateGlobalInsights(threats: Threat[]): GlobalInsights {
  if (threats.length === 0) {
    return {
      totalThreats: 0,
      avgRisk: 0,
      topCategory: "Data Exfiltration",
      trendingPattern: "No threats detected",
      riskDistribution: {
        low: 0,
        medium: 0,
        high: 0,
        critical: 0,
      },
      recentActivity: {
        last24h: 0,
        last7d: 0,
        last30d: 0,
      },
    };
  }

  // Calculate average risk
  const avgRisk =
    threats.reduce((sum, threat) => sum + threat.ai.layer1.risk, 0) /
    threats.length;

  // Find top category
  const categoryCounts: Record<string, number> = {};
  threats.forEach((threat) => {
    const cat = threat.ai.layer1.category;
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
  });

  const topCategory = Object.entries(categoryCounts).sort(
    ([, a], [, b]) => b - a
  )[0]?.[0] as ThreatCategory || "Data Exfiltration";

  // Calculate risk distribution
  const riskDistribution = {
    low: 0,
    medium: 0,
    high: 0,
    critical: 0,
  };

  threats.forEach((threat) => {
    const risk = threat.ai.layer1.risk;
    if (risk <= 25) riskDistribution.low++;
    else if (risk <= 50) riskDistribution.medium++;
    else if (risk <= 75) riskDistribution.high++;
    else riskDistribution.critical++;
  });

  // Calculate recent activity
  const now = new Date();
  const day = 24 * 60 * 60 * 1000;

  const recentActivity = {
    last24h: threats.filter(
      (t) => now.getTime() - new Date(t.createdAt).getTime() < day
    ).length,
    last7d: threats.filter(
      (t) => now.getTime() - new Date(t.createdAt).getTime() < 7 * day
    ).length,
    last30d: threats.filter(
      (t) => now.getTime() - new Date(t.createdAt).getTime() < 30 * day
    ).length,
  };

  // Generate trending pattern based on data
  let trendingPattern = "Stable threat levels";
  if (recentActivity.last24h > threats.length * 0.3) {
    trendingPattern = "Significant spike in recent threats";
  } else if (avgRisk > 60) {
    trendingPattern = "Elevated risk levels across all threats";
  } else if (topCategory === "Insider Threat") {
    trendingPattern = "Increased insider threat activity detected";
  }

  return {
    totalThreats: threats.length,
    avgRisk: Math.round(avgRisk),
    topCategory,
    trendingPattern,
    riskDistribution,
    recentActivity,
  };
}

/**
 * Get risk level label from score
 */
export function getRiskLevel(score: number): "Low" | "Medium" | "High" | "Critical" {
  if (score <= 25) return "Low";
  if (score <= 50) return "Medium";
  if (score <= 75) return "High";
  return "Critical";
}

/**
 * Get color class for risk score
 */
export function getRiskColor(score: number): string {
  if (score <= 25) return "text-green-400";
  if (score <= 50) return "text-yellow-400";
  if (score <= 75) return "text-orange-400";
  return "text-red-400";
}

/**
 * Get background color class for risk badge
 */
export function getRiskBgColor(score: number): string {
  if (score <= 25) return "bg-green-500/20 border-green-500";
  if (score <= 50) return "bg-yellow-500/20 border-yellow-500";
  if (score <= 75) return "bg-orange-500/20 border-orange-500";
  return "bg-red-500/20 border-red-500";
}

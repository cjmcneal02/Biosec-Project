// Core threat categories
export type ThreatCategory =
  | "Biotech Malware"
  | "Data Exfiltration"
  | "Unauthorized Lab Access"
  | "Insider Threat"
  | "Supply Chain Compromise";

// Risk score range: 0-100
export type RiskScore = number;

// AI Layer 1: Initial threat assessment
export interface AILayer1 {
  risk: RiskScore; // 0-100
  category: ThreatCategory;
  summary: string;
  confidence: number; // 0-1
  timestamp: string;
}

// AI Layer 2: Mitigation recommendations
export interface AILayer2 {
  mitigations: string[];
  priority: "Low" | "Medium" | "High" | "Critical";
  estimatedImpact: string;
  recommendedActions: string[];
  timestamp: string;
}

// AI Layer 3: Overall insights (placeholder for now)
export interface AILayer3 {
  contextualInsights: string;
  relatedThreats: string[];
  timestamp: string;
}

// User-provided threat data
export interface ThreatInput {
  title: string;
  description: string;
  date: string;
  source: string;
}

// Complete threat object with all layers
export interface Threat extends ThreatInput {
  id: string;
  createdAt: string;
  updatedAt: string;
  ai: {
    layer1: AILayer1;
    layer2: AILayer2;
    layer3?: AILayer3; // Optional for now
  };
}

// Global insights for the dashboard
export interface GlobalInsights {
  totalThreats: number;
  avgRisk: number;
  topCategory: ThreatCategory;
  trendingPattern: string;
  riskDistribution: {
    low: number; // 0-25
    medium: number; // 26-50
    high: number; // 51-75
    critical: number; // 76-100
  };
  recentActivity: {
    last24h: number;
    last7d: number;
    last30d: number;
  };
}

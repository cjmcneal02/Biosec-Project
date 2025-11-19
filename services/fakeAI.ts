import type {
  ThreatCategory,
  AILayer1,
  AILayer2,
  AILayer3,
  ThreatInput,
} from "@/types/Threat";

// Helper to pick random item from array
function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Helper to generate random number in range
function randomInRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Simulate AI processing delay
async function simulateProcessing(ms: number = 800): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Mock AI Layer 1: Initial Threat Assessment
 * Analyzes threat and provides risk score, category, and summary
 */
export async function generateAILayer1(
  threat: ThreatInput
): Promise<AILayer1> {
  await simulateProcessing();

  const categories: ThreatCategory[] = [
    "Biotech Malware",
    "Data Exfiltration",
    "Unauthorized Lab Access",
    "Insider Threat",
    "Supply Chain Compromise",
  ];

  const category = pickRandom(categories);
  const risk = randomInRange(15, 95);

  const summaries = [
    `Detected potential ${category.toLowerCase()} targeting biotech infrastructure.`,
    `Threat analysis indicates ${category.toLowerCase()} with moderate to high risk.`,
    `Initial assessment shows signs of ${category.toLowerCase()} activity.`,
    `Pattern matching suggests ${category.toLowerCase()} behavior.`,
  ];

  return {
    risk,
    category,
    summary: pickRandom(summaries),
    confidence: Math.random() * 0.3 + 0.7, // 0.7 to 1.0
    timestamp: new Date().toISOString(),
  };
}

/**
 * Mock AI Layer 2: Mitigation Recommendations
 * Provides actionable steps and priority level
 */
export async function generateAILayer2(
  threat: ThreatInput,
  layer1: AILayer1
): Promise<AILayer2> {
  await simulateProcessing();

  const mitigationSets = {
    "Biotech Malware": [
      "Isolate affected laboratory systems immediately",
      "Run comprehensive malware scan on all connected devices",
      "Review recent software installations and updates",
      "Enable enhanced monitoring on lab equipment networks",
    ],
    "Data Exfiltration": [
      "Audit data access logs for unusual patterns",
      "Implement temporary network segmentation",
      "Review outbound network traffic for anomalies",
      "Verify data encryption on all storage systems",
    ],
    "Unauthorized Lab Access": [
      "Review physical access logs and badge records",
      "Check security camera footage for the timeframe",
      "Verify all personnel credentials are current",
      "Implement additional authentication requirements",
    ],
    "Insider Threat": [
      "Conduct confidential employee interviews",
      "Review user activity logs across all systems",
      "Implement enhanced monitoring on flagged accounts",
      "Restrict access to sensitive data temporarily",
    ],
    "Supply Chain Compromise": [
      "Verify integrity of recent equipment deliveries",
      "Audit vendor access to systems and facilities",
      "Review all third-party software installations",
      "Implement enhanced supplier verification protocols",
    ],
  };

  const mitigations = mitigationSets[layer1.category];

  let priority: "Low" | "Medium" | "High" | "Critical";
  if (layer1.risk >= 75) priority = "Critical";
  else if (layer1.risk >= 50) priority = "High";
  else if (layer1.risk >= 25) priority = "Medium";
  else priority = "Low";

  const impacts = [
    "Potential for significant operational disruption",
    "Risk of data loss or compromise",
    "Possible regulatory compliance implications",
    "May affect research integrity and timelines",
  ];

  const actions = [
    "Notify security team immediately",
    "Document all findings and actions taken",
    "Prepare incident report for management",
    "Coordinate with IT security for further investigation",
  ];

  return {
    mitigations,
    priority,
    estimatedImpact: pickRandom(impacts),
    recommendedActions: actions,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Mock AI Layer 3: Overall Insights (Placeholder)
 * Provides contextual analysis and related threat information
 */
export async function generateAILayer3(
  threat: ThreatInput,
  layer1: AILayer1,
  layer2: AILayer2
): Promise<AILayer3> {
  await simulateProcessing(500);

  const insights = [
    "This threat pattern aligns with recent industry-wide trends in biotech security.",
    "Similar incidents have been reported in 3 other facilities this quarter.",
    "Advanced persistent threat (APT) characteristics detected in the attack vector.",
    "Threat actor methodology suggests state-sponsored activity.",
  ];

  return {
    contextualInsights: pickRandom(insights),
    relatedThreats: [
      "THREAT-2024-001",
      "THREAT-2024-015",
      "THREAT-2024-028",
    ],
    timestamp: new Date().toISOString(),
  };
}

/**
 * Generate complete AI analysis for a threat
 * Calls all three AI layers in sequence
 */
export async function generateCompleteAIAnalysis(threat: ThreatInput) {
  const layer1 = await generateAILayer1(threat);
  const layer2 = await generateAILayer2(threat, layer1);
  const layer3 = await generateAILayer3(threat, layer1, layer2);

  return {
    layer1,
    layer2,
    layer3,
  };
}

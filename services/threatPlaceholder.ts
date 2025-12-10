import type { Threat, ThreatInput, AILayer1, AILayer2 } from "@/types/Threat";

/**
 * Check if a threat has been analyzed (has real AI data vs placeholder)
 */
export function isThreatAnalyzed(threat: Threat): boolean {
  // Placeholder threats have summary containing "pending analysis" or confidence of 0
  return !threat.ai.layer1.summary.toLowerCase().includes("pending ai analysis") &&
         threat.ai.layer1.confidence > 0;
}

/**
 * Create a placeholder threat with minimal data (not analyzed)
 */
export function createPlaceholderThreat(template: ThreatInput, id: string): Threat {
  const now = new Date().toISOString();
  
  return {
    ...template,
    id,
    createdAt: now,
    updatedAt: now,
    ai: {
      layer1: {
        risk: 0, // 0 indicates not analyzed yet
        category: "Data Exfiltration", // Default placeholder
        summary: "Pending AI analysis - Click 'Analyze Threat' to generate risk assessment",
        confidence: 0,
        timestamp: now,
      },
      layer2: {
        mitigations: ["Analysis pending"],
        priority: "Low",
        estimatedImpact: "Pending analysis",
        recommendedActions: ["Click 'Analyze Threat' to generate recommendations"],
        timestamp: now,
      },
    },
  };
}


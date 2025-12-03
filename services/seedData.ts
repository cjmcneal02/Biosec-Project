import type { Threat } from "@/types/Threat";

/**
 * Sample threat data for demonstration purposes
 * This data will be auto-loaded on first app initialization
 */
export const SAMPLE_THREATS: Threat[] = [
  {
    id: "threat-001",
    title: "Suspicious Network Activity Detected",
    description:
      "Multiple failed login attempts from unknown IP addresses originating from Eastern Europe. Pattern suggests automated scanning of lab equipment network endpoints.",
    date: "2024-01-15",
    source: "Network Security Monitor",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    ai: {
      layer1: {
        risk: 78,
        category: "Data Exfiltration",
        summary:
          "Detected potential data exfiltration targeting biotech infrastructure. Multiple connection attempts indicate reconnaissance phase of attack.",
        confidence: 0.87,
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      },
      layer2: {
        mitigations: [
          "Audit data access logs for unusual patterns",
          "Implement temporary network segmentation",
          "Review outbound network traffic for anomalies",
          "Verify data encryption on all storage systems",
        ],
        priority: "High",
        estimatedImpact: "Risk of data loss or compromise",
        recommendedActions: [
          "Notify security team immediately",
          "Document all findings and actions taken",
          "Prepare incident report for management",
          "Coordinate with IT security for further investigation",
        ],
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      },
      layer3: {
        contextualInsights:
          "This threat pattern aligns with recent industry-wide trends in biotech security. Similar incidents have been reported in 3 other facilities this quarter.",
        relatedThreats: ["threat-005", "threat-012"],
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      },
    },
  },
  {
    id: "threat-002",
    title: "Unauthorized Access Attempt at Lab B",
    description:
      "Badge reader detected unauthorized access attempt at Lab B entrance during off-hours. Security camera footage shows individual attempting to bypass card reader.",
    date: "2024-01-14",
    source: "Physical Security System",
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    ai: {
      layer1: {
        risk: 85,
        category: "Unauthorized Lab Access",
        summary:
          "Threat analysis indicates unauthorized lab access with moderate to high risk. Physical security breach attempt detected.",
        confidence: 0.92,
        timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
      },
      layer2: {
        mitigations: [
          "Review physical access logs and badge records",
          "Check security camera footage for the timeframe",
          "Verify all personnel credentials are current",
          "Implement additional authentication requirements",
        ],
        priority: "Critical",
        estimatedImpact: "Potential for significant operational disruption",
        recommendedActions: [
          "Notify security team immediately",
          "Document all findings and actions taken",
          "Prepare incident report for management",
          "Coordinate with IT security for further investigation",
        ],
        timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
      },
      layer3: {
        contextualInsights:
          "Advanced persistent threat (APT) characteristics detected in the attack vector. Threat actor methodology suggests state-sponsored activity.",
        relatedThreats: ["threat-008"],
        timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
      },
    },
  },
  {
    id: "threat-003",
    title: "Malware Signature Detected on Lab Equipment",
    description:
      "Antivirus scan detected known biotech malware signature on sequencing equipment in Lab C. File appears to be embedded in firmware update package.",
    date: "2024-01-13",
    source: "Endpoint Protection System",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    ai: {
      layer1: {
        risk: 72,
        category: "Biotech Malware",
        summary:
          "Initial assessment shows signs of biotech malware activity. Malware specifically designed to target laboratory equipment detected.",
        confidence: 0.89,
        timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      },
      layer2: {
        mitigations: [
          "Isolate affected laboratory systems immediately",
          "Run comprehensive malware scan on all connected devices",
          "Review recent software installations and updates",
          "Enable enhanced monitoring on lab equipment networks",
        ],
        priority: "High",
        estimatedImpact: "May affect research integrity and timelines",
        recommendedActions: [
          "Notify security team immediately",
          "Document all findings and actions taken",
          "Prepare incident report for management",
          "Coordinate with IT security for further investigation",
        ],
        timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      },
      layer3: {
        contextualInsights:
          "Similar incidents have been reported in 3 other facilities this quarter. This threat pattern aligns with recent industry-wide trends in biotech security.",
        relatedThreats: ["threat-007", "threat-011"],
        timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      },
    },
  },
  {
    id: "threat-004",
    title: "Unusual Data Access Pattern by Research Staff",
    description:
      "User activity logs show researcher accessing multiple restricted databases outside normal working hours. Pattern differs significantly from typical access behavior.",
    date: "2024-01-12",
    source: "User Activity Monitor",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    ai: {
      layer1: {
        risk: 65,
        category: "Insider Threat",
        summary:
          "Pattern matching suggests insider threat behavior. Unusual access patterns indicate potential unauthorized data access.",
        confidence: 0.76,
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      },
      layer2: {
        mitigations: [
          "Conduct confidential employee interviews",
          "Review user activity logs across all systems",
          "Implement enhanced monitoring on flagged accounts",
          "Restrict access to sensitive data temporarily",
        ],
        priority: "High",
        estimatedImpact: "Possible regulatory compliance implications",
        recommendedActions: [
          "Notify security team immediately",
          "Document all findings and actions taken",
          "Prepare incident report for management",
          "Coordinate with IT security for further investigation",
        ],
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      },
      layer3: {
        contextualInsights:
          "This threat pattern aligns with recent industry-wide trends in biotech security. Similar incidents have been reported in 3 other facilities this quarter.",
        relatedThreats: ["threat-009"],
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      },
    },
  },
  {
    id: "threat-005",
    title: "Compromised Vendor Software Package",
    description:
      "Security audit revealed that recent software update from equipment vendor contains suspicious code. Package was downloaded from vendor portal but signature verification failed.",
    date: "2024-01-11",
    source: "Supply Chain Audit",
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    ai: {
      layer1: {
        risk: 68,
        category: "Supply Chain Compromise",
        summary:
          "Detected potential supply chain compromise targeting biotech infrastructure. Vendor software integrity compromised.",
        confidence: 0.81,
        timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      },
      layer2: {
        mitigations: [
          "Verify integrity of recent equipment deliveries",
          "Audit vendor access to systems and facilities",
          "Review all third-party software installations",
          "Implement enhanced supplier verification protocols",
        ],
        priority: "High",
        estimatedImpact: "Risk of data loss or compromise",
        recommendedActions: [
          "Notify security team immediately",
          "Document all findings and actions taken",
          "Prepare incident report for management",
          "Coordinate with IT security for further investigation",
        ],
        timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      },
      layer3: {
        contextualInsights:
          "Threat actor methodology suggests state-sponsored activity. Advanced persistent threat (APT) characteristics detected in the attack vector.",
        relatedThreats: ["threat-001", "threat-010"],
        timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      },
    },
  },
  {
    id: "threat-006",
    title: "Large Data Transfer Detected",
    description:
      "Network monitoring detected unusually large data transfer from research database to external IP address. Transfer occurred during maintenance window.",
    date: "2024-01-10",
    source: "Network Traffic Analyzer",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    ai: {
      layer1: {
        risk: 82,
        category: "Data Exfiltration",
        summary:
          "Threat analysis indicates data exfiltration with moderate to high risk. Large volume data transfer to unknown destination detected.",
        confidence: 0.91,
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      },
      layer2: {
        mitigations: [
          "Audit data access logs for unusual patterns",
          "Implement temporary network segmentation",
          "Review outbound network traffic for anomalies",
          "Verify data encryption on all storage systems",
        ],
        priority: "Critical",
        estimatedImpact: "Risk of data loss or compromise",
        recommendedActions: [
          "Notify security team immediately",
          "Document all findings and actions taken",
          "Prepare incident report for management",
          "Coordinate with IT security for further investigation",
        ],
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      },
      layer3: {
        contextualInsights:
          "Similar incidents have been reported in 3 other facilities this quarter. This threat pattern aligns with recent industry-wide trends in biotech security.",
        relatedThreats: ["threat-001", "threat-012"],
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      },
    },
  },
  {
    id: "threat-007",
    title: "Ransomware Detection on Backup Server",
    description:
      "Backup server detected ransomware encryption attempt. System automatically isolated affected volumes. No production systems appear compromised.",
    date: "2024-01-09",
    source: "Backup System Monitor",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    ai: {
      layer1: {
        risk: 88,
        category: "Biotech Malware",
        summary:
          "Initial assessment shows signs of biotech malware activity. Ransomware specifically targeting backup infrastructure detected.",
        confidence: 0.94,
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
      layer2: {
        mitigations: [
          "Isolate affected laboratory systems immediately",
          "Run comprehensive malware scan on all connected devices",
          "Review recent software installations and updates",
          "Enable enhanced monitoring on lab equipment networks",
        ],
        priority: "Critical",
        estimatedImpact: "Potential for significant operational disruption",
        recommendedActions: [
          "Notify security team immediately",
          "Document all findings and actions taken",
          "Prepare incident report for management",
          "Coordinate with IT security for further investigation",
        ],
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
      layer3: {
        contextualInsights:
          "Advanced persistent threat (APT) characteristics detected in the attack vector. Threat actor methodology suggests state-sponsored activity.",
        relatedThreats: ["threat-003", "threat-011"],
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
    },
  },
];

/**
 * Check if the app has been seeded with sample data
 */
export function isSeeded(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const seeded = localStorage.getItem("biosec_seeded");
    return seeded === "true";
  } catch {
    return false;
  }
}

/**
 * Mark the app as seeded
 */
export function markAsSeeded(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("biosec_seeded", "true");
  } catch (error) {
    console.error("Failed to mark app as seeded:", error);
  }
}

/**
 * Clear the seeded flag (for testing)
 */
export function clearSeededFlag(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem("biosec_seeded");
  } catch (error) {
    console.error("Failed to clear seeded flag:", error);
  }
}

import type { ThreatInput } from "@/types/Threat";

/**
 * Generate threats using OpenAI API with fallback to programmatic generation
 */
export async function generateThreatsWithAI(
  count: number = 25
): Promise<ThreatInput[]> {
  try {
    const response = await fetch("/api/ai/generate-threats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ count }),
    });

    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }

    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error);
    }

    return data.threats || [];
  } catch (error) {
    console.warn(`AI threat generation failed, using fallback:`, error);
    return generateThreatsFallback(count);
  }
}

/**
 * Fallback: Generate threats programmatically (no API needed)
 */
function generateThreatsFallback(count: number): ThreatInput[] {
  const threatTemplates = [
    {
      titles: [
        "Suspicious Network Traffic from External IP",
        "Unauthorized Access Attempt to Lab Database",
        "Malware Detected on Research Workstation",
        "Anomalous Data Transfer Activity",
        "Failed Authentication Attempts on Lab Equipment",
        "Unusual Outbound Network Connections",
        "Potential Data Exfiltration Detected",
        "Security Camera Tampering Alert",
        "Unauthorized Software Installation Detected",
        "Suspicious Email Attachment Opened",
        "Privilege Escalation Attempt Identified",
        "Network Intrusion Detection Alert",
        "Potential Insider Threat Activity",
        "Supply Chain Compromise Suspected",
        "Ransomware Indicators Detected",
      ],
      descriptions: [
        "Multiple connection attempts from unrecognized IP addresses originating from Eastern Europe. Pattern suggests automated scanning of network endpoints and lab equipment interfaces.",
        "Repeated failed login attempts detected on critical laboratory database systems. Attack pattern indicates credential stuffing or brute force attempts targeting research data.",
        "Antivirus software identified malicious code signatures on research workstation in Laboratory 3. Initial analysis suggests trojan horse designed to exfiltrate sensitive research data.",
        "Network monitoring detected large volume data transfers occurring during off-hours. Traffic patterns indicate potential unauthorized data export to external servers.",
        "Security logs show multiple failed authentication attempts on temperature-controlled storage units. Attempts appear coordinated and systematic in nature.",
        "Firewall alerts indicate unusual outbound connections to known command-and-control servers. Connections established from multiple internal systems simultaneously.",
        "Data loss prevention system flagged suspicious file access patterns. Multiple research files accessed and copied to external storage devices outside normal working hours.",
        "Physical security system reported tampering attempts on security cameras in restricted laboratory area. Video footage shows unauthorized access during maintenance window.",
        "Endpoint detection system identified unauthorized software installation on laboratory computer. Software appears to be remote access tool not approved for use.",
        "Email security gateway flagged suspicious attachment containing executable code. Attachment opened by staff member, triggering immediate security response.",
        "System logs reveal privilege escalation attempts on laboratory management servers. Attack vector suggests exploitation of known vulnerability in authentication system.",
        "Network intrusion detection system triggered alert for signature matching known APT (Advanced Persistent Threat) group tactics. Attack appears targeted at biotech infrastructure.",
        "User behavior analytics detected anomalous access patterns from employee account. Account accessed systems and data outside normal work hours and job function.",
        "Supply chain security audit revealed potential compromise in vendor equipment. Recent shipment of laboratory equipment contains unauthorized hardware modifications.",
        "Security monitoring detected ransomware-like behavior including file encryption patterns. Initial indicators suggest potential ransomware attack in early stages.",
      ],
      sources: [
        "Network Security Monitor",
        "SIEM Alert System",
        "Endpoint Detection Response",
        "Lab Security System",
        "Employee Report",
        "Vendor Notification",
        "Incident Response Team",
        "Security Operations Center",
        "Data Loss Prevention",
        "Physical Security System",
      ],
    },
  ];

  const threats: ThreatInput[] = [];
  const now = new Date();
  
  for (let i = 0; i < count; i++) {
    const daysAgo = Math.floor(Math.random() * 90);
    const date = new Date(now);
    date.setDate(date.getDate() - daysAgo);
    
    const template = threatTemplates[0];
    const title = template.titles[i % template.titles.length];
    const description = template.descriptions[i % template.descriptions.length];
    const source = template.sources[Math.floor(Math.random() * template.sources.length)];
    
    threats.push({
      title: `${title} ${i > template.titles.length ? `(${i + 1})` : ""}`.trim(),
      description,
      date: date.toISOString().split("T")[0],
      source,
    });
  }

  return threats;
}


const mockData = {
  facilityStatus: 'SECURE',
  notifications: 3,
  statusCards: [
    {
      id: 1,
      icon: '✓',
      title: 'Containment Status',
      value: '100%',
      trend: { direction: 'up', value: 2.3 },
      status: 'green'
    },
    {
      id: 2,
      icon: '⚠',
      title: 'Active Protocols',
      value: '7',
      trend: { direction: 'stable', value: 0 },
      status: 'yellow'
    },
    {
      id: 3,
      icon: '🌡️',
      title: 'Environmental',
      value: '21.5°C',
      trend: { direction: 'up', value: 0.5 },
      status: 'green'
    },
    {
      id: 4,
      icon: '🚪',
      title: 'Access Points',
      value: '12/15',
      trend: { direction: 'stable', value: 0 },
      status: 'green'
    }
  ],
  recentAlerts: [
    {
      id: 1,
      type: 'warning',
      title: 'Temperature Anomaly',
      description: 'Lab C showing 2°C deviation',
      time: '5 min ago'
    },
    {
      id: 2,
      type: 'critical',
      title: 'Access Attempt Failed',
      description: 'Unauthorized scan at Area 7',
      time: '12 min ago'
    },
    {
      id: 3,
      type: 'info',
      title: 'Maintenance Started',
      description: 'Chamber 2 offline for service',
      time: '28 min ago'
    },
    {
      id: 4,
      type: 'warning',
      title: 'Pressure Fluctuation',
      description: 'Zone B pressure reading abnormal',
      time: '35 min ago'
    },
    {
      id: 5,
      type: 'info',
      title: 'System Update',
      description: 'Security protocols updated',
      time: '42 min ago'
    }
  ],
  chartData: [
    { time: '00:00', activity: 30 },
    { time: '04:00', activity: 45 },
    { time: '08:00', activity: 75 },
    { time: '12:00', activity: 90 },
    { time: '16:00', activity: 85 },
    { time: '20:00', activity: 60 },
    { time: '23:59', activity: 35 }
  ],
  // Dummy threat data
  threats: [
    {
      id: 'threat-001',
      title: 'Suspicious Network Activity Detected',
      description: 'Multiple failed login attempts from unknown IP addresses originating from Eastern Europe. Pattern suggests automated scanning of lab equipment network endpoints.',
      date: '2024-01-15',
      source: 'Network Security Monitor',
      createdAt: '2024-01-15T08:30:00Z',
      updatedAt: '2024-01-15T08:30:00Z',
      ai: {
        layer1: {
          risk: 78,
          category: 'Data Exfiltration',
          summary: 'Detected potential data exfiltration targeting biotech infrastructure. Multiple connection attempts indicate reconnaissance phase of attack.',
          confidence: 0.87,
          timestamp: '2024-01-15T08:35:00Z'
        },
        layer2: {
          mitigations: [
            'Audit data access logs for unusual patterns',
            'Implement temporary network segmentation',
            'Review outbound network traffic for anomalies',
            'Verify data encryption on all storage systems'
          ],
          priority: 'High',
          estimatedImpact: 'Risk of data loss or compromise',
          recommendedActions: [
            'Notify security team immediately',
            'Document all findings and actions taken',
            'Prepare incident report for management',
            'Coordinate with IT security for further investigation'
          ],
          timestamp: '2024-01-15T08:40:00Z'
        },
        layer3: {
          contextualInsights: 'This threat pattern aligns with recent industry-wide trends in biotech security. Similar incidents have been reported in 3 other facilities this quarter.',
          relatedThreats: ['threat-005', 'threat-012'],
          timestamp: '2024-01-15T08:45:00Z'
        }
      }
    },
    {
      id: 'threat-002',
      title: 'Unauthorized Access Attempt at Lab B',
      description: 'Badge reader detected unauthorized access attempt at Lab B entrance during off-hours. Security camera footage shows individual attempting to bypass card reader.',
      date: '2024-01-14',
      source: 'Physical Security System',
      createdAt: '2024-01-14T23:15:00Z',
      updatedAt: '2024-01-14T23:15:00Z',
      ai: {
        layer1: {
          risk: 85,
          category: 'Unauthorized Lab Access',
          summary: 'Threat analysis indicates unauthorized lab access with moderate to high risk. Physical security breach attempt detected.',
          confidence: 0.92,
          timestamp: '2024-01-14T23:20:00Z'
        },
        layer2: {
          mitigations: [
            'Review physical access logs and badge records',
            'Check security camera footage for the timeframe',
            'Verify all personnel credentials are current',
            'Implement additional authentication requirements'
          ],
          priority: 'Critical',
          estimatedImpact: 'Potential for significant operational disruption',
          recommendedActions: [
            'Notify security team immediately',
            'Document all findings and actions taken',
            'Prepare incident report for management',
            'Coordinate with IT security for further investigation'
          ],
          timestamp: '2024-01-14T23:25:00Z'
        },
        layer3: {
          contextualInsights: 'Advanced persistent threat (APT) characteristics detected in the attack vector. Threat actor methodology suggests state-sponsored activity.',
          relatedThreats: ['threat-008'],
          timestamp: '2024-01-14T23:30:00Z'
        }
      }
    },
    {
      id: 'threat-003',
      title: 'Malware Signature Detected on Lab Equipment',
      description: 'Antivirus scan detected known biotech malware signature on sequencing equipment in Lab C. File appears to be embedded in firmware update package.',
      date: '2024-01-13',
      source: 'Endpoint Protection System',
      createdAt: '2024-01-13T14:20:00Z',
      updatedAt: '2024-01-13T14:20:00Z',
      ai: {
        layer1: {
          risk: 72,
          category: 'Biotech Malware',
          summary: 'Initial assessment shows signs of biotech malware activity. Malware specifically designed to target laboratory equipment detected.',
          confidence: 0.89,
          timestamp: '2024-01-13T14:25:00Z'
        },
        layer2: {
          mitigations: [
            'Isolate affected laboratory systems immediately',
            'Run comprehensive malware scan on all connected devices',
            'Review recent software installations and updates',
            'Enable enhanced monitoring on lab equipment networks'
          ],
          priority: 'High',
          estimatedImpact: 'May affect research integrity and timelines',
          recommendedActions: [
            'Notify security team immediately',
            'Document all findings and actions taken',
            'Prepare incident report for management',
            'Coordinate with IT security for further investigation'
          ],
          timestamp: '2024-01-13T14:30:00Z'
        },
        layer3: {
          contextualInsights: 'Similar incidents have been reported in 3 other facilities this quarter. This threat pattern aligns with recent industry-wide trends in biotech security.',
          relatedThreats: ['threat-007', 'threat-011'],
          timestamp: '2024-01-13T14:35:00Z'
        }
      }
    },
    {
      id: 'threat-004',
      title: 'Unusual Data Access Pattern by Research Staff',
      description: 'User activity logs show researcher accessing multiple restricted databases outside normal working hours. Pattern differs significantly from typical access behavior.',
      date: '2024-01-12',
      source: 'User Activity Monitor',
      createdAt: '2024-01-12T19:45:00Z',
      updatedAt: '2024-01-12T19:45:00Z',
      ai: {
        layer1: {
          risk: 65,
          category: 'Insider Threat',
          summary: 'Pattern matching suggests insider threat behavior. Unusual access patterns indicate potential unauthorized data access.',
          confidence: 0.76,
          timestamp: '2024-01-12T19:50:00Z'
        },
        layer2: {
          mitigations: [
            'Conduct confidential employee interviews',
            'Review user activity logs across all systems',
            'Implement enhanced monitoring on flagged accounts',
            'Restrict access to sensitive data temporarily'
          ],
          priority: 'High',
          estimatedImpact: 'Possible regulatory compliance implications',
          recommendedActions: [
            'Notify security team immediately',
            'Document all findings and actions taken',
            'Prepare incident report for management',
            'Coordinate with IT security for further investigation'
          ],
          timestamp: '2024-01-12T19:55:00Z'
        },
        layer3: {
          contextualInsights: 'This threat pattern aligns with recent industry-wide trends in biotech security. Similar incidents have been reported in 3 other facilities this quarter.',
          relatedThreats: ['threat-009'],
          timestamp: '2024-01-12T20:00:00Z'
        }
      }
    },
    {
      id: 'threat-005',
      title: 'Compromised Vendor Software Package',
      description: 'Security audit revealed that recent software update from equipment vendor contains suspicious code. Package was downloaded from vendor portal but signature verification failed.',
      date: '2024-01-11',
      source: 'Supply Chain Audit',
      createdAt: '2024-01-11T10:15:00Z',
      updatedAt: '2024-01-11T10:15:00Z',
      ai: {
        layer1: {
          risk: 68,
          category: 'Supply Chain Compromise',
          summary: 'Detected potential supply chain compromise targeting biotech infrastructure. Vendor software integrity compromised.',
          confidence: 0.81,
          timestamp: '2024-01-11T10:20:00Z'
        },
        layer2: {
          mitigations: [
            'Verify integrity of recent equipment deliveries',
            'Audit vendor access to systems and facilities',
            'Review all third-party software installations',
            'Implement enhanced supplier verification protocols'
          ],
          priority: 'High',
          estimatedImpact: 'Risk of data loss or compromise',
          recommendedActions: [
            'Notify security team immediately',
            'Document all findings and actions taken',
            'Prepare incident report for management',
            'Coordinate with IT security for further investigation'
          ],
          timestamp: '2024-01-11T10:25:00Z'
        },
        layer3: {
          contextualInsights: 'Threat actor methodology suggests state-sponsored activity. Advanced persistent threat (APT) characteristics detected in the attack vector.',
          relatedThreats: ['threat-001', 'threat-010'],
          timestamp: '2024-01-11T10:30:00Z'
        }
      }
    },
    {
      id: 'threat-006',
      title: 'Large Data Transfer Detected',
      description: 'Network monitoring detected unusually large data transfer from research database to external IP address. Transfer occurred during maintenance window.',
      date: '2024-01-10',
      source: 'Network Traffic Analyzer',
      createdAt: '2024-01-10T02:30:00Z',
      updatedAt: '2024-01-10T02:30:00Z',
      ai: {
        layer1: {
          risk: 82,
          category: 'Data Exfiltration',
          summary: 'Threat analysis indicates data exfiltration with moderate to high risk. Large volume data transfer to unknown destination detected.',
          confidence: 0.91,
          timestamp: '2024-01-10T02:35:00Z'
        },
        layer2: {
          mitigations: [
            'Audit data access logs for unusual patterns',
            'Implement temporary network segmentation',
            'Review outbound network traffic for anomalies',
            'Verify data encryption on all storage systems'
          ],
          priority: 'Critical',
          estimatedImpact: 'Risk of data loss or compromise',
          recommendedActions: [
            'Notify security team immediately',
            'Document all findings and actions taken',
            'Prepare incident report for management',
            'Coordinate with IT security for further investigation'
          ],
          timestamp: '2024-01-10T02:40:00Z'
        },
        layer3: {
          contextualInsights: 'Similar incidents have been reported in 3 other facilities this quarter. This threat pattern aligns with recent industry-wide trends in biotech security.',
          relatedThreats: ['threat-001', 'threat-012'],
          timestamp: '2024-01-10T02:45:00Z'
        }
      }
    },
    {
      id: 'threat-007',
      title: 'Ransomware Detection on Backup Server',
      description: 'Backup server detected ransomware encryption attempt. System automatically isolated affected volumes. No production systems appear compromised.',
      date: '2024-01-09',
      source: 'Backup System Monitor',
      createdAt: '2024-01-09T16:45:00Z',
      updatedAt: '2024-01-09T16:45:00Z',
      ai: {
        layer1: {
          risk: 88,
          category: 'Biotech Malware',
          summary: 'Initial assessment shows signs of biotech malware activity. Ransomware specifically targeting backup infrastructure detected.',
          confidence: 0.94,
          timestamp: '2024-01-09T16:50:00Z'
        },
        layer2: {
          mitigations: [
            'Isolate affected laboratory systems immediately',
            'Run comprehensive malware scan on all connected devices',
            'Review recent software installations and updates',
            'Enable enhanced monitoring on lab equipment networks'
          ],
          priority: 'Critical',
          estimatedImpact: 'Potential for significant operational disruption',
          recommendedActions: [
            'Notify security team immediately',
            'Document all findings and actions taken',
            'Prepare incident report for management',
            'Coordinate with IT security for further investigation'
          ],
          timestamp: '2024-01-09T16:55:00Z'
        },
        layer3: {
          contextualInsights: 'Advanced persistent threat (APT) characteristics detected in the attack vector. Threat actor methodology suggests state-sponsored activity.',
          relatedThreats: ['threat-003', 'threat-011'],
          timestamp: '2024-01-09T17:00:00Z'
        }
      }
    },
    {
      id: 'threat-008',
      title: 'Multiple Failed Badge Access Attempts',
      description: 'Security system logged 12 consecutive failed badge access attempts at Lab A entrance over 30-minute period. All attempts used cloned badge credentials.',
      date: '2024-01-08',
      source: 'Access Control System',
      createdAt: '2024-01-08T11:20:00Z',
      updatedAt: '2024-01-08T11:20:00Z',
      ai: {
        layer1: {
          risk: 75,
          category: 'Unauthorized Lab Access',
          summary: 'Detected potential unauthorized lab access targeting biotech infrastructure. Cloned credentials indicate sophisticated attack.',
          confidence: 0.85,
          timestamp: '2024-01-08T11:25:00Z'
        },
        layer2: {
          mitigations: [
            'Review physical access logs and badge records',
            'Check security camera footage for the timeframe',
            'Verify all personnel credentials are current',
            'Implement additional authentication requirements'
          ],
          priority: 'High',
          estimatedImpact: 'Possible regulatory compliance implications',
          recommendedActions: [
            'Notify security team immediately',
            'Document all findings and actions taken',
            'Prepare incident report for management',
            'Coordinate with IT security for further investigation'
          ],
          timestamp: '2024-01-08T11:30:00Z'
        },
        layer3: {
          contextualInsights: 'This threat pattern aligns with recent industry-wide trends in biotech security. Similar incidents have been reported in 3 other facilities this quarter.',
          relatedThreats: ['threat-002'],
          timestamp: '2024-01-08T11:35:00Z'
        }
      }
    },
    {
      id: 'threat-009',
      title: 'Privilege Escalation Attempt Detected',
      description: 'System logs show multiple attempts by user account to escalate privileges and access administrative functions. Account belongs to contractor with limited access.',
      date: '2024-01-07',
      source: 'Identity Management System',
      createdAt: '2024-01-07T09:10:00Z',
      updatedAt: '2024-01-07T09:10:00Z',
      ai: {
        layer1: {
          risk: 58,
          category: 'Insider Threat',
          summary: 'Pattern matching suggests insider threat behavior. Privilege escalation attempts indicate malicious intent.',
          confidence: 0.73,
          timestamp: '2024-01-07T09:15:00Z'
        },
        layer2: {
          mitigations: [
            'Conduct confidential employee interviews',
            'Review user activity logs across all systems',
            'Implement enhanced monitoring on flagged accounts',
            'Restrict access to sensitive data temporarily'
          ],
          priority: 'Medium',
          estimatedImpact: 'May affect research integrity and timelines',
          recommendedActions: [
            'Notify security team immediately',
            'Document all findings and actions taken',
            'Prepare incident report for management',
            'Coordinate with IT security for further investigation'
          ],
          timestamp: '2024-01-07T09:20:00Z'
        },
        layer3: {
          contextualInsights: 'Similar incidents have been reported in 3 other facilities this quarter. This threat pattern aligns with recent industry-wide trends in biotech security.',
          relatedThreats: ['threat-004'],
          timestamp: '2024-01-07T09:25:00Z'
        }
      }
    },
    {
      id: 'threat-010',
      title: 'Tampered Equipment Delivery',
      description: 'Receiving department reported that equipment package from vendor showed signs of tampering. Seals were broken and resealed. Contents verified but packaging suspicious.',
      date: '2024-01-06',
      source: 'Receiving Department',
      createdAt: '2024-01-06T13:30:00Z',
      updatedAt: '2024-01-06T13:30:00Z',
      ai: {
        layer1: {
          risk: 55,
          category: 'Supply Chain Compromise',
          summary: 'Threat analysis indicates supply chain compromise with moderate to high risk. Physical tampering detected in shipment.',
          confidence: 0.78,
          timestamp: '2024-01-06T13:35:00Z'
        },
        layer2: {
          mitigations: [
            'Verify integrity of recent equipment deliveries',
            'Audit vendor access to systems and facilities',
            'Review all third-party software installations',
            'Implement enhanced supplier verification protocols'
          ],
          priority: 'Medium',
          estimatedImpact: 'Possible regulatory compliance implications',
          recommendedActions: [
            'Notify security team immediately',
            'Document all findings and actions taken',
            'Prepare incident report for management',
            'Coordinate with IT security for further investigation'
          ],
          timestamp: '2024-01-06T13:40:00Z'
        },
        layer3: {
          contextualInsights: 'Threat actor methodology suggests state-sponsored activity. Advanced persistent threat (APT) characteristics detected in the attack vector.',
          relatedThreats: ['threat-005'],
          timestamp: '2024-01-06T13:45:00Z'
        }
      }
    },
    {
      id: 'threat-011',
      title: 'Suspicious Process Running on Lab Computer',
      description: 'Endpoint detection system flagged unusual process running on Lab C workstation. Process attempting to communicate with external servers and access encrypted research files.',
      date: '2024-01-05',
      source: 'Endpoint Detection System',
      createdAt: '2024-01-05T15:00:00Z',
      updatedAt: '2024-01-05T15:00:00Z',
      ai: {
        layer1: {
          risk: 70,
          category: 'Biotech Malware',
          summary: 'Detected potential biotech malware targeting biotech infrastructure. Malicious process detected on laboratory equipment.',
          confidence: 0.83,
          timestamp: '2024-01-05T15:05:00Z'
        },
        layer2: {
          mitigations: [
            'Isolate affected laboratory systems immediately',
            'Run comprehensive malware scan on all connected devices',
            'Review recent software installations and updates',
            'Enable enhanced monitoring on lab equipment networks'
          ],
          priority: 'High',
          estimatedImpact: 'Risk of data loss or compromise',
          recommendedActions: [
            'Notify security team immediately',
            'Document all findings and actions taken',
            'Prepare incident report for management',
            'Coordinate with IT security for further investigation'
          ],
          timestamp: '2024-01-05T15:10:00Z'
        },
        layer3: {
          contextualInsights: 'This threat pattern aligns with recent industry-wide trends in biotech security. Similar incidents have been reported in 3 other facilities this quarter.',
          relatedThreats: ['threat-003', 'threat-007'],
          timestamp: '2024-01-05T15:15:00Z'
        }
      }
    },
    {
      id: 'threat-012',
      title: 'Database Query Anomaly Detected',
      description: 'Database monitoring system detected unusual query patterns accessing sensitive research data. Queries executed during off-hours and accessed multiple restricted tables.',
      date: '2024-01-04',
      source: 'Database Activity Monitor',
      createdAt: '2024-01-04T20:15:00Z',
      updatedAt: '2024-01-04T20:15:00Z',
      ai: {
        layer1: {
          risk: 63,
          category: 'Data Exfiltration',
          summary: 'Initial assessment shows signs of data exfiltration activity. Unusual database access patterns detected.',
          confidence: 0.79,
          timestamp: '2024-01-04T20:20:00Z'
        },
        layer2: {
          mitigations: [
            'Audit data access logs for unusual patterns',
            'Implement temporary network segmentation',
            'Review outbound network traffic for anomalies',
            'Verify data encryption on all storage systems'
          ],
          priority: 'High',
          estimatedImpact: 'Possible regulatory compliance implications',
          recommendedActions: [
            'Notify security team immediately',
            'Document all findings and actions taken',
            'Prepare incident report for management',
            'Coordinate with IT security for further investigation'
          ],
          timestamp: '2024-01-04T20:25:00Z'
        },
        layer3: {
          contextualInsights: 'Similar incidents have been reported in 3 other facilities this quarter. This threat pattern aligns with recent industry-wide trends in biotech security.',
          relatedThreats: ['threat-001', 'threat-006'],
          timestamp: '2024-01-04T20:30:00Z'
        }
      }
    },
    {
      id: 'threat-013',
      title: 'Low Risk: Scheduled Maintenance Alert',
      description: 'Routine security scan completed. Minor vulnerabilities detected in non-critical systems. No immediate action required.',
      date: '2024-01-03',
      source: 'Automated Security Scanner',
      createdAt: '2024-01-03T10:00:00Z',
      updatedAt: '2024-01-03T10:00:00Z',
      ai: {
        layer1: {
          risk: 22,
          category: 'Biotech Malware',
          summary: 'Threat analysis indicates biotech malware with low risk. Routine security scan completed successfully.',
          confidence: 0.65,
          timestamp: '2024-01-03T10:05:00Z'
        },
        layer2: {
          mitigations: [
            'Isolate affected laboratory systems immediately',
            'Run comprehensive malware scan on all connected devices',
            'Review recent software installations and updates',
            'Enable enhanced monitoring on lab equipment networks'
          ],
          priority: 'Low',
          estimatedImpact: 'May affect research integrity and timelines',
          recommendedActions: [
            'Notify security team immediately',
            'Document all findings and actions taken',
            'Prepare incident report for management',
            'Coordinate with IT security for further investigation'
          ],
          timestamp: '2024-01-03T10:10:00Z'
        },
        layer3: {
          contextualInsights: 'This threat pattern aligns with recent industry-wide trends in biotech security. Similar incidents have been reported in 3 other facilities this quarter.',
          relatedThreats: [],
          timestamp: '2024-01-03T10:15:00Z'
        }
      }
    },
    {
      id: 'threat-014',
      title: 'Phishing Email Campaign Detected',
      description: 'Email security system blocked phishing campaign targeting research staff. Emails impersonated equipment vendor and requested login credentials.',
      date: '2024-01-02',
      source: 'Email Security Gateway',
      createdAt: '2024-01-02T08:45:00Z',
      updatedAt: '2024-01-02T08:45:00Z',
      ai: {
        layer1: {
          risk: 45,
          category: 'Data Exfiltration',
          summary: 'Pattern matching suggests data exfiltration behavior. Phishing campaign targeting credentials detected.',
          confidence: 0.71,
          timestamp: '2024-01-02T08:50:00Z'
        },
        layer2: {
          mitigations: [
            'Audit data access logs for unusual patterns',
            'Implement temporary network segmentation',
            'Review outbound network traffic for anomalies',
            'Verify data encryption on all storage systems'
          ],
          priority: 'Medium',
          estimatedImpact: 'Possible regulatory compliance implications',
          recommendedActions: [
            'Notify security team immediately',
            'Document all findings and actions taken',
            'Prepare incident report for management',
            'Coordinate with IT security for further investigation'
          ],
          timestamp: '2024-01-02T08:55:00Z'
        },
        layer3: {
          contextualInsights: 'Similar incidents have been reported in 3 other facilities this quarter. This threat pattern aligns with recent industry-wide trends in biotech security.',
          relatedThreats: [],
          timestamp: '2024-01-02T09:00:00Z'
        }
      }
    },
    {
      id: 'threat-015',
      title: 'Unauthorized USB Device Connected',
      description: 'Security policy violation: Unauthorized USB device connected to Lab B workstation. Device automatically blocked by endpoint protection system.',
      date: '2024-01-01',
      source: 'Endpoint Protection System',
      createdAt: '2024-01-01T14:20:00Z',
      updatedAt: '2024-01-01T14:20:00Z',
      ai: {
        layer1: {
          risk: 38,
          category: 'Biotech Malware',
          summary: 'Detected potential biotech malware targeting biotech infrastructure. Unauthorized device connection blocked.',
          confidence: 0.68,
          timestamp: '2024-01-01T14:25:00Z'
        },
        layer2: {
          mitigations: [
            'Isolate affected laboratory systems immediately',
            'Run comprehensive malware scan on all connected devices',
            'Review recent software installations and updates',
            'Enable enhanced monitoring on lab equipment networks'
          ],
          priority: 'Medium',
          estimatedImpact: 'May affect research integrity and timelines',
          recommendedActions: [
            'Notify security team immediately',
            'Document all findings and actions taken',
            'Prepare incident report for management',
            'Coordinate with IT security for further investigation'
          ],
          timestamp: '2024-01-01T14:30:00Z'
        },
        layer3: {
          contextualInsights: 'This threat pattern aligns with recent industry-wide trends in biotech security. Similar incidents have been reported in 3 other facilities this quarter.',
          relatedThreats: [],
          timestamp: '2024-01-01T14:35:00Z'
        }
      }
    }
  ]
};

// Function to generate random variations for auto-refresh
function generateRandomVariation(data) {
  const newData = JSON.parse(JSON.stringify(data));
  
  // Randomly change facility status (mostly stays secure)
  const statuses = ['SECURE', 'ALERT', 'CRITICAL'];
  const rand = Math.random();
  if (rand > 0.85) {
    newData.facilityStatus = statuses[Math.floor(Math.random() * statuses.length)];
  }
  
  // Vary notification count
  newData.notifications = Math.max(0, Math.min(10, data.notifications + Math.floor(Math.random() * 3 - 1)));
  
  // Vary status card values slightly
  newData.statusCards.forEach(card => {
    if (card.value.includes('%')) {
      const num = parseFloat(card.value);
      const variation = (Math.random() - 0.5) * 2;
      newData.statusCards.find(c => c.id === card.id).value = Math.max(0, Math.min(100, num + variation)).toFixed(1) + '%';
    } else if (card.value.includes('°C')) {
      const num = parseFloat(card.value);
      const variation = (Math.random() - 0.5) * 0.5;
      newData.statusCards.find(c => c.id === card.id).value = (num + variation).toFixed(1) + '°C';
    } else if (card.value.includes('/')) {
      // Access points format
      const parts = card.value.split('/');
      const current = parseInt(parts[0]);
      const total = parseInt(parts[1]);
      const variation = Math.floor(Math.random() * 3 - 1);
      newData.statusCards.find(c => c.id === card.id).value = Math.max(0, Math.min(total, current + variation)) + '/' + total;
    } else {
      // Active protocols
      const num = parseInt(card.value);
      const variation = Math.floor(Math.random() * 3 - 1);
      newData.statusCards.find(c => c.id === card.id).value = Math.max(0, num + variation).toString();
    }
    
    // Vary trend
    const trendVariation = (Math.random() - 0.5) * 0.5;
    const currentTrend = card.trend.value;
    newData.statusCards.find(c => c.id === card.id).trend.value = Math.max(0, currentTrend + trendVariation).toFixed(1);
    
    if (Math.random() > 0.7) {
      const directions = ['up', 'down', 'stable'];
      newData.statusCards.find(c => c.id === card.id).trend.direction = directions[Math.floor(Math.random() * directions.length)];
    }
  });
  
  // Vary chart data
  newData.chartData.forEach((point, index) => {
    const variation = Math.floor((Math.random() - 0.5) * 20);
    newData.chartData[index].activity = Math.max(0, Math.min(100, point.activity + variation));
  });
  
  return newData;
}

// Threat data utility functions

/**
 * Get all threats
 */
function getAllThreats() {
  return mockData.threats || [];
}

/**
 * Get threat by ID
 */
function getThreatById(id) {
  return mockData.threats.find(threat => threat.id === id);
}

/**
 * Get threats by category
 */
function getThreatsByCategory(category) {
  return mockData.threats.filter(threat => threat.ai.layer1.category === category);
}

/**
 * Get threats by risk level
 */
function getThreatsByRiskLevel(level) {
  const riskRanges = {
    low: [0, 25],
    medium: [26, 50],
    high: [51, 75],
    critical: [76, 100]
  };
  
  const [min, max] = riskRanges[level.toLowerCase()] || [0, 100];
  return mockData.threats.filter(threat => {
    const risk = threat.ai.layer1.risk;
    return risk >= min && risk <= max;
  });
}

/**
 * Calculate global insights from threats
 */
function calculateGlobalInsights() {
  const threats = mockData.threats;
  
  if (threats.length === 0) {
    return {
      totalThreats: 0,
      avgRisk: 0,
      topCategory: 'Data Exfiltration',
      trendingPattern: 'No threats detected',
      riskDistribution: {
        low: 0,
        medium: 0,
        high: 0,
        critical: 0
      },
      recentActivity: {
        last24h: 0,
        last7d: 0,
        last30d: 0
      }
    };
  }
  
  // Calculate average risk
  const avgRisk = Math.round(
    threats.reduce((sum, threat) => sum + threat.ai.layer1.risk, 0) / threats.length
  );
  
  // Find top category
  const categoryCounts = {};
  threats.forEach(threat => {
    const cat = threat.ai.layer1.category;
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
  });
  
  const topCategory = Object.entries(categoryCounts)
    .sort(([, a], [, b]) => b - a)[0]?.[0] || 'Data Exfiltration';
  
  // Calculate risk distribution
  const riskDistribution = {
    low: 0,
    medium: 0,
    high: 0,
    critical: 0
  };
  
  threats.forEach(threat => {
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
    last24h: threats.filter(t => 
      now.getTime() - new Date(t.createdAt).getTime() < day
    ).length,
    last7d: threats.filter(t => 
      now.getTime() - new Date(t.createdAt).getTime() < 7 * day
    ).length,
    last30d: threats.filter(t => 
      now.getTime() - new Date(t.createdAt).getTime() < 30 * day
    ).length
  };
  
  // Generate trending pattern
  let trendingPattern = 'Stable threat levels';
  if (recentActivity.last24h > threats.length * 0.3) {
    trendingPattern = 'Significant spike in recent threats';
  } else if (avgRisk > 60) {
    trendingPattern = 'Elevated risk levels across all threats';
  } else if (topCategory === 'Insider Threat') {
    trendingPattern = 'Increased insider threat activity detected';
  }
  
  return {
    totalThreats: threats.length,
    avgRisk,
    topCategory,
    trendingPattern,
    riskDistribution,
    recentActivity
  };
}

/**
 * Generate a new threat with random data
 */
function generateRandomThreat() {
  const categories = [
    'Biotech Malware',
    'Data Exfiltration',
    'Unauthorized Lab Access',
    'Insider Threat',
    'Supply Chain Compromise'
  ];
  
  const titles = [
    'Suspicious Network Activity Detected',
    'Unauthorized Access Attempt',
    'Malware Signature Detected',
    'Unusual Data Access Pattern',
    'Compromised Vendor Software',
    'Large Data Transfer Detected',
    'Ransomware Detection',
    'Failed Badge Access Attempts',
    'Privilege Escalation Attempt',
    'Tampered Equipment Delivery'
  ];
  
  const descriptions = [
    'Multiple failed login attempts from unknown IP addresses detected.',
    'Security system logged unauthorized access attempts at facility entrance.',
    'Antivirus scan detected known malware signature on laboratory equipment.',
    'User activity logs show unusual access patterns outside normal hours.',
    'Security audit revealed suspicious code in vendor software package.',
    'Network monitoring detected large data transfer to external IP address.',
    'Backup server detected ransomware encryption attempt.',
    'Access control system logged multiple failed badge access attempts.',
    'System logs show privilege escalation attempts by user account.',
    'Receiving department reported tampered equipment package.'
  ];
  
  const sources = [
    'Network Security Monitor',
    'Physical Security System',
    'Endpoint Protection System',
    'User Activity Monitor',
    'Supply Chain Audit',
    'Network Traffic Analyzer',
    'Backup System Monitor',
    'Access Control System',
    'Identity Management System',
    'Receiving Department'
  ];
  
  const category = categories[Math.floor(Math.random() * categories.length)];
  const risk = Math.floor(Math.random() * 80) + 15; // 15-95
  const daysAgo = Math.floor(Math.random() * 30);
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  
  const threatId = 'threat-' + String(mockData.threats.length + 1).padStart(3, '0');
  const createdAt = new Date(date);
  createdAt.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));
  
  const priority = risk >= 75 ? 'Critical' : 
                  risk >= 50 ? 'High' : 
                  risk >= 25 ? 'Medium' : 'Low';
  
  return {
    id: threatId,
    title: titles[Math.floor(Math.random() * titles.length)],
    description: descriptions[Math.floor(Math.random() * descriptions.length)],
    date: date.toISOString().split('T')[0],
    source: sources[Math.floor(Math.random() * sources.length)],
    createdAt: createdAt.toISOString(),
    updatedAt: createdAt.toISOString(),
    ai: {
      layer1: {
        risk,
        category,
        summary: `Detected potential ${category.toLowerCase()} targeting biotech infrastructure.`,
        confidence: Math.random() * 0.3 + 0.7, // 0.7 to 1.0
        timestamp: new Date(createdAt.getTime() + 5 * 60000).toISOString()
      },
      layer2: {
        mitigations: [
          'Review security logs for unusual patterns',
          'Implement enhanced monitoring protocols',
          'Notify security team immediately',
          'Document all findings and actions taken'
        ],
        priority,
        estimatedImpact: 'Risk of data loss or compromise',
        recommendedActions: [
          'Notify security team immediately',
          'Document all findings and actions taken',
          'Prepare incident report for management',
          'Coordinate with IT security for further investigation'
        ],
        timestamp: new Date(createdAt.getTime() + 10 * 60000).toISOString()
      },
      layer3: {
        contextualInsights: 'This threat pattern aligns with recent industry-wide trends in biotech security.',
        relatedThreats: [],
        timestamp: new Date(createdAt.getTime() + 15 * 60000).toISOString()
      }
    }
  };
}

// Make available globally
window.mockData = mockData;
window.generateRandomVariation = generateRandomVariation;
window.getAllThreats = getAllThreats;
window.getThreatById = getThreatById;
window.getThreatsByCategory = getThreatsByCategory;
window.getThreatsByRiskLevel = getThreatsByRiskLevel;
window.calculateGlobalInsights = calculateGlobalInsights;
window.generateRandomThreat = generateRandomThreat;


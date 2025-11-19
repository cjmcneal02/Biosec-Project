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

// Make available globally
window.mockData = mockData;
window.generateRandomVariation = generateRandomVariation;


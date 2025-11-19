// Header Component
let timeIntervalSet = false;

function renderHeader(data) {
  const header = document.getElementById('header');
  if (!header) return;
  
  const statusClass = data.facilityStatus.toLowerCase();
  const statusText = data.facilityStatus;
  
  header.innerHTML = `
    <div class="header-content">
      <div class="header-left">
        <div class="logo">🛡️ BioSec Dashboard</div>
        <div class="status-indicator">
          <span class="status-dot ${statusClass}"></span>
          <span>${statusText}</span>
        </div>
      </div>
      <div class="header-right">
        <div class="notification-bell" onclick="handleNotificationClick()">
          🔔
          ${data.notifications > 0 ? `<span class="notification-badge">${data.notifications}</span>` : ''}
        </div>
        <div class="time-display" id="timeDisplay"></div>
      </div>
    </div>
  `;
  
  updateTime();
  // Only set interval once
  if (!timeIntervalSet) {
    setInterval(updateTime, 1000);
    timeIntervalSet = true;
  }
}

function updateTime() {
  const timeDisplay = document.getElementById('timeDisplay');
  if (timeDisplay) {
    const now = new Date();
    timeDisplay.textContent = now.toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }
}

// Make it available globally for onclick
window.handleNotificationClick = function() {
  console.log('Notification bell clicked');
  // Could open a modal or navigate to notifications page
};

// Status Card Component
function renderStatusCard(card) {
  const trendArrow = card.trend.direction === 'up' ? '↑' : 
                     card.trend.direction === 'down' ? '↓' : '→';
  const trendClass = card.trend.direction === 'up' ? 'trend-up' : 
                     card.trend.direction === 'down' ? 'trend-down' : 'trend-stable';
  const trendValue = card.trend.value > 0 ? `+${card.trend.value}%` : 
                     card.trend.value < 0 ? `${card.trend.value}%` : '0%';
  
  return `
    <div class="status-card">
      <div class="status-card-header">
        <div class="status-card-icon ${card.status}">${card.icon}</div>
      </div>
      <div class="status-card-title">${card.title}</div>
      <div class="status-card-value">${card.value}</div>
      <div class="status-card-trend ${trendClass}">
        <span>${trendArrow}</span>
        <span>${trendValue}</span>
      </div>
    </div>
  `;
}

// Alert Feed Component
function renderAlertFeed(alerts) {
  const alertIcons = {
    warning: '⚠️',
    critical: '⛔',
    info: 'ℹ️'
  };
  
  const alertItems = alerts.slice(0, 5).map(alert => {
    return `
      <div class="alert-item ${alert.type}" onclick="handleAlertClick(${alert.id})">
        <div style="display: flex; align-items: flex-start;">
          <span class="alert-icon">${alertIcons[alert.type] || 'ℹ️'}</span>
          <div style="flex: 1;">
            <div class="alert-title">${alert.title}</div>
            <div class="alert-description">${alert.description}</div>
            <div class="alert-time">${alert.time}</div>
          </div>
        </div>
      </div>
    `;
  }).join('');
  
  return `
    <div class="alert-feed">
      <h3>Recent Alerts</h3>
      ${alertItems}
    </div>
  `;
}

// Make it available globally for onclick
window.handleAlertClick = function(alertId) {
  console.log('Alert clicked:', alertId);
  // Could open a detail modal or navigate to alert details
};

// Chart Component
let chartInstance = null;

function renderChart(chartData) {
  const ctx = document.getElementById('activityChart');
  if (!ctx) return;
  
  // Destroy existing chart if it exists
  if (chartInstance) {
    chartInstance.destroy();
  }
  
  const labels = chartData.map(d => d.time);
  const data = chartData.map(d => d.activity);
  
  chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Activity Level',
        data: data,
        backgroundColor: (context) => {
          const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, '#1E3A5F');
          gradient.addColorStop(1, '#5A9BD4');
          return gradient;
        },
        borderColor: '#1E3A5F',
        borderWidth: 1,
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: 12,
          titleFont: {
            size: 14
          },
          bodyFont: {
            size: 12
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: {
            stepSize: 20
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.05)'
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      }
    }
  });
}

// Make available globally
window.renderHeader = renderHeader;
window.renderStatusCard = renderStatusCard;
window.renderAlertFeed = renderAlertFeed;
window.renderChart = renderChart;


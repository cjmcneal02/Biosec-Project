let currentData;

// Initialize dashboard
function initDashboard() {
  // Ensure mockData is loaded
  if (!window.mockData) {
    console.error('mockData not loaded');
    return;
  }
  
  currentData = window.mockData;
  renderDashboard(currentData);
  
  // Auto-refresh every 30 seconds
  setInterval(() => {
    currentData = window.generateRandomVariation(currentData);
    renderDashboard(currentData);
  }, 30000);
}

function renderDashboard(data) {
  // Render header
  window.renderHeader(data);
  
  // Render dashboard content
  const dashboard = document.getElementById('dashboard');
  if (!dashboard) return;
  
  // Hero status
  const heroStatus = `
    <div class="hero-status">
      <h2>Facility Overview</h2>
      <p>Real-time monitoring and security status</p>
    </div>
  `;
  
  // Status cards
  const statusCards = `
    <div class="status-grid">
      ${data.statusCards.map(card => window.renderStatusCard(card)).join('')}
    </div>
  `;
  
  // Dashboard layout (alerts + chart)
  const dashboardLayout = `
    <div class="dashboard-layout">
      ${window.renderAlertFeed(data.recentAlerts)}
      <div class="chart-container">
        <h3>Activity Level (24h)</h3>
        <div class="chart-wrapper">
          <canvas id="activityChart"></canvas>
        </div>
      </div>
    </div>
  `;
  
  dashboard.innerHTML = heroStatus + statusCards + dashboardLayout;
  
  // Render chart after DOM is updated
  setTimeout(() => {
    window.renderChart(data.chartData);
  }, 100);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initDashboard);
} else {
  initDashboard();
}


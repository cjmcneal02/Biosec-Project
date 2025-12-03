# BioSec Threat Intelligence Dashboard

A modern, frontend-first threat intelligence platform designed for biotech and cybersecurity operations. This dashboard provides AI-powered threat analysis, risk assessment, and actionable mitigation recommendations.

## Overview

BioSec is currently in its **frontend-only phase**, focusing on UI/UX design, data flow, and mock AI services. All AI outputs are simulated locally—no backend or real AI integration exists yet.

This project demonstrates a complete threat intelligence workflow with three layers of AI analysis:
- **Layer 1**: Initial threat assessment (risk scoring, categorization)
- **Layer 2**: Mitigation recommendations and action plans
- **Layer 3**: Contextual insights and threat correlation

## Features

### Core Functionality

- **Threat Intake** - Submit new threats via an intuitive form interface
- **AI-Powered Analysis** - Automatic risk scoring, categorization, and mitigation generation (mocked)
- **Threat Dashboard** - View all threats with advanced sorting and filtering
- **Detailed Threat View** - Comprehensive analysis with all three AI layers
- **Global Insights** - Analytics dashboard with trends, risk distribution, and activity metrics
- **Dark Theme UI** - Modern cybersecurity-focused design
- **Local Persistence** - All data stored in localStorage (no database required)

### Threat Categories

- Biotech Malware
- Data Exfiltration
- Unauthorized Lab Access
- Insider Threat
- Supply Chain Compromise

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **State Management**: React Context API
- **Data Persistence**: localStorage
- **Package Manager**: npm

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   cd biosec-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
biosec-project/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Dashboard homepage
│   ├── layout.tsx                # Root layout with providers
│   ├── globals.css               # Global styles
│   ├── threats/
│   │   ├── page.tsx              # All threats list
│   │   ├── new/page.tsx          # Report new threat
│   │   └── [id]/page.tsx         # Threat detail view
│   └── insights/page.tsx         # Analytics & insights
│
├── components/                   # Reusable UI components
│   ├── DashboardLayout.tsx       # Main layout wrapper
│   ├── Sidebar.tsx               # Navigation sidebar
│   ├── ThreatCard.tsx            # Threat preview card
│   ├── ThreatForm.tsx             # Threat submission form
│   ├── RiskBadge.tsx             # Risk score indicator
│   ├── InsightsPanel.tsx         # Analytics panel
│   └── ThreatTrendChart.tsx     # Threat trend visualization
│
├── scripts/                      # Vanilla JavaScript files
│   ├── components.js             # Component rendering functions
│   ├── main.js                   # Main dashboard logic
│   └── mockData.js               # Dummy data and utilities
│
├── styles/                       # Custom CSS styles
│   └── main.css                  # Main stylesheet
│
├── services/                     # Business logic & utilities
│   ├── fakeAI.ts                 # Mock AI analysis generator
│   ├── insights.ts               # Analytics calculations
│   └── seedData.ts               # Seed data utilities
│
├── state/                        # State management
│   └── ThreatContext.tsx         # React Context for threats
│
├── types/                        # TypeScript type definitions
│   └── Threat.ts                 # Core data models
│
├── index.html                    # Vanilla HTML entry point
├── next.config.ts                # Next.js configuration
├── tailwind.config.ts            # TailwindCSS configuration
├── tsconfig.json                 # TypeScript configuration
├── postcss.config.mjs            # PostCSS configuration
├── package.json                  # Dependencies & scripts
└── claude.md                     # Project guidelines
```

## Usage Guide

### 1. Report a Threat

1. Navigate to **Report Threat** in the sidebar
2. Fill out the form:
   - Threat title
   - Description
   - Date detected
   - Source
3. Click **Submit Threat**
4. AI analysis will run automatically (mocked)
5. View the new threat details

### 2. View All Threats

- Navigate to **All Threats**
- Sort by date or risk score
- Filter by category
- Click any threat to view details

### 3. Analyze Threat Details

- Click **View Details** on any threat card
- Review all three AI analysis layers
- Click **Refresh AI Analysis** to regenerate mock data
- Delete threats if needed

### 4. View Global Insights

- Navigate to **Insights**
- View aggregate statistics:
  - Total threats
  - Average risk score
  - Top category
  - Risk distribution
  - Activity trends
- Review AI-generated summary

## Mock AI Services

All AI functionality is currently simulated using randomized data:

### Layer 1: Initial Assessment
- Risk score (0-100)
- Category classification
- Confidence rating
- Summary text

### Layer 2: Mitigation Recommendations
- Priority level (Low, Medium, High, Critical)
- Mitigation steps
- Recommended actions
- Estimated impact

### Layer 3: Contextual Insights
- Pattern analysis
- Related threats
- Situational awareness

## Data Persistence

All threat data is stored in browser **localStorage** under the key `biosec_threats`. Data persists between sessions but is local to your browser. Clearing browser data will reset the dashboard.

## Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Run production server
npm run lint     # Run ESLint
```

### Code Style

- **TypeScript**: Strict mode enabled
- **Components**: Functional components with hooks
- **Styling**: TailwindCSS utility classes
- **State**: Context API with hooks

## Future Roadmap

### Phase 2: Backend Integration
- [ ] Real database (PostgreSQL/MongoDB)
- [ ] REST/GraphQL API
- [ ] User authentication
- [ ] Multi-user support

### Phase 3: Real AI Integration
- [ ] LLM-powered threat analysis
- [ ] Pattern recognition
- [ ] Automated categorization
- [ ] Predictive analytics

### Phase 4: Advanced Features
- [ ] Email notifications
- [ ] Export reports (PDF, CSV)
- [ ] Advanced charts/visualizations
- [ ] Threat timeline view
- [ ] Team collaboration features

## Known Limitations

- **Frontend only** - No backend server or database
- **Mock AI** - All AI outputs are randomly generated
- **Single user** - No authentication or multi-user support
- **Local data** - Data stored in browser localStorage only
- **No external integrations** - No threat feeds or external APIs

## Contributing

This is currently a demonstration project. To extend it:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for educational and demonstration purposes.

## Support

For issues or questions, please refer to the `claude.md` file for project guidelines.

---

**Version**: 1.0.0
**Status**: Frontend Demo
**Last Updated**: 2025

Built with Next.js, TypeScript, and TailwindCSS

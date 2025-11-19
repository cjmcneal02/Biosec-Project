laude.md
📌 Project: BioSec Threat Intelligence Dashboard

This file defines all instructions and constraints for Claude when assisting with the BioSec project.
Claude should follow these guidelines when generating code, modifying files, or building features.

🧭 Project Summary

BioSec is a frontend-first project for a biotech/cybersecurity threat-intelligence dashboard.

The system will eventually ingest threat alerts and use AI in three layers, but for now:

🚫 NO real AI or backend is implemented.

All AI outputs must be mocked, faked, or generated locally.

This phase of the project focuses entirely on the frontend, UI structure, and dummy data flows.

🎯 Goals for This Phase (Frontend-Only)

Claude should help build:

1. Threat Intake Page

A form to manually submit a threat with:

title

description

date

source

When submitted:

generate mocked AI scoring

assign a fake category

generate fake mitigations

store the threat in local state

2. Threat List Dashboard

Displays all threats with:

title

category

risk score badge (color-coded)

preview of description

“View details” button

Sorting & filtering:

by risk score

by category

by date

3. Threat Detail Page

Shows all data for a single threat:

user-provided fields

mocked AI Layer 1 (risk, category, summary)

mocked AI Layer 2 (mitigations / recommended actions)

placeholder section for AI Layer 3 (overall insights)

Button:

Refresh fake AI outputs for this threat

4. Insights Overview Page

Contains fully mocked global threat analytics:

avg risk

top categories

simple trend chart

total threats

“AI Insights Summary” box (fake)

🛠️ Technical Requirements
Frontend Tech Stack

Claude should assume:

Next.js (preferred) or React + Vite

TypeScript

TailwindCSS

Zustand or Context API for state

React Query or SWR for data fetching (mocked)

Project Structure

Claude should keep files organized like:

/src
  /components
    ThreatCard.tsx
    ThreatForm.tsx
    RiskBadge.tsx
    InsightsPanel.tsx
  /pages or /app
    /threats
      index.tsx
      [id].tsx
      new.tsx
    /insights
      index.tsx
  /state
    threatStore.ts
  /services
    fakeAI.ts
    insights.ts
  /types
    Threat.ts

🤖 Mock AI Functions Required

Claude should create a fake AI scoring service:

export async function fakeAIScoring(threat) {
  return {
    risk: Math.floor(Math.random() * 100),
    category: pickRandom([
      "Biotech Malware",
      "Data Exfiltration",
      "Unauthorized Lab Access",
      "Insider Threat",
      "Supply Chain Compromise"
    ]),
    summary: "Mock AI summary for now.",
    mitigations: [
      "Step 1: Investigate logs.",
      "Step 2: Contain affected systems.",
      "Step 3: Notify security team."
    ]
  };
}


Overall insights generator:

export function generateOverallInsights(threats) {
  return {
    avgRisk: calculateAverage(threats.map(t => t.ai.risk)),
    topCategory: getTopCategory(threats),
    trending: "Mock trend: Increased credential attacks.",
    summary: "Situational awareness description (placeholder)."
  };
}


All data must remain local until backend integration begins.

🎨 UI/Design Guidelines

Claude should follow these patterns:

Modern cybersecurity dashboard look

Dark theme with Tailwind

Cards, grids, and panels

Clear risk levels with visual cues

Sidebar navigation

Clean typography

📌 Rules for Claude

Claude must follow these rules strictly:

1. No backend yet

Do not create database logic, API routes, or server-side AI calls.

2. Mock everything AI-related

All AI layers (risk scoring, mitigations, global insights) must use placeholder logic.

3. Frontend-first development

Claude should prioritize pages, components, state management, and data flow.

4. Maintain clean file structure

Whenever Claude writes code, it must follow the folder layout above unless intentionally modified.

5. Use TypeScript everywhere
6. Keep code modular

Avoid giant components—use reusable UI pieces.

🧪 Desired Output From Claude

Claude should be able to:

generate full pages

build components

create Zustand stores

write mock services

fix bugs

scaffold the entire project

gradually evolve the frontend

When unsure, Claude should ask clarifying questions.

📦 Deliverables Claude Should Be Prepared to Generate

Full React/Next.js page code

Tailwind-styled components

TypeScript types

Dummy AI data generators

State management store

README instructions

Suggestions for file cleanup or improvements
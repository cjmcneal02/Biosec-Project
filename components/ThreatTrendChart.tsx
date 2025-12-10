"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { Threat } from "@/types/Threat";

interface ThreatTrendChartProps {
  threats: Threat[];
}

type TimeHorizon = "day" | "week" | "month" | "year";

export default function ThreatTrendChart({ threats }: ThreatTrendChartProps) {
  const [timeHorizon, setTimeHorizon] = useState<TimeHorizon>("week");

  // Generate trend data based on selected time horizon
  const generateTrendData = () => {
    const now = new Date();
    const data = [];

    let periods: number;
    let periodSize: number; // in milliseconds
    let dateFormat: (date: Date) => string;

    switch (timeHorizon) {
      case "day":
        periods = 24; // 24 hours
        periodSize = 60 * 60 * 1000; // 1 hour
        dateFormat = (date) =>
          date.toLocaleTimeString("en-US", { hour: "numeric", hour12: true });
        break;
      case "week":
        periods = 7; // 7 days
        periodSize = 24 * 60 * 60 * 1000; // 1 day
        dateFormat = (date) =>
          date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
        break;
      case "month":
        periods = 30; // 30 days
        periodSize = 24 * 60 * 60 * 1000; // 1 day
        dateFormat = (date) =>
          date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
        break;
      case "year":
        periods = 12; // 12 months
        dateFormat = (date) =>
          date.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
        break;
    }

    // Special handling for year (calendar months)
    if (timeHorizon === "year") {
      for (let i = periods - 1; i >= 0; i--) {
        const periodStart = new Date(now);
        periodStart.setMonth(periodStart.getMonth() - i);
        periodStart.setDate(1);
        periodStart.setHours(0, 0, 0, 0);

        const periodEnd = new Date(periodStart);
        periodEnd.setMonth(periodEnd.getMonth() + 1);

        // Count threats in this month
        const periodThreats = threats.filter((threat) => {
          const threatDate = new Date(threat.createdAt);
          return threatDate >= periodStart && threatDate < periodEnd;
        });

        // Calculate average risk (only analyzed threats)
        const analyzedThreats = periodThreats.filter(
          (t) => t.ai.layer1.risk >= 0 && t.ai.layer1.confidence > 0
        );
        const avgRisk =
          analyzedThreats.length > 0
            ? Math.round(
                analyzedThreats.reduce((sum, t) => sum + t.ai.layer1.risk, 0) /
                  analyzedThreats.length
              )
            : 0;

        // Count by risk level
        const riskLevels = {
          low: analyzedThreats.filter((t) => t.ai.layer1.risk <= 25).length,
          medium: analyzedThreats.filter(
            (t) => t.ai.layer1.risk > 25 && t.ai.layer1.risk <= 50
          ).length,
          high: analyzedThreats.filter(
            (t) => t.ai.layer1.risk > 50 && t.ai.layer1.risk <= 75
          ).length,
          critical: analyzedThreats.filter((t) => t.ai.layer1.risk > 75).length,
        };

        data.push({
          date: dateFormat(periodStart),
          threats: periodThreats.length,
          avgRisk,
          low: riskLevels.low,
          medium: riskLevels.medium,
          high: riskLevels.high,
          critical: riskLevels.critical,
        });
      }
      return data;
    }

    // For day, week, and month - use period-based approach
    for (let i = periods - 1; i >= 0; i--) {
      const periodStart = new Date(now.getTime() - i * periodSize);
      
      // For day view, align to hour boundaries
      if (timeHorizon === "day") {
        periodStart.setMinutes(0, 0, 0);
      } else {
        periodStart.setHours(0, 0, 0, 0);
      }

      const periodEnd = new Date(periodStart.getTime() + periodSize);

      // Count threats in this period
      const periodThreats = threats.filter((threat) => {
        const threatDate = new Date(threat.createdAt);
        return threatDate >= periodStart && threatDate < periodEnd;
      });

      // Calculate average risk for the period (only analyzed threats)
      const analyzedThreats = periodThreats.filter(
        (t) => t.ai.layer1.risk >= 0 && t.ai.layer1.confidence > 0
      );
      const avgRisk =
        analyzedThreats.length > 0
          ? Math.round(
              analyzedThreats.reduce(
                (sum, t) => sum + t.ai.layer1.risk,
                0
              ) / analyzedThreats.length
            )
          : 0;

      // Count by risk level (only analyzed threats)
      const riskLevels = {
        low: analyzedThreats.filter((t) => t.ai.layer1.risk <= 25).length,
        medium: analyzedThreats.filter(
          (t) => t.ai.layer1.risk > 25 && t.ai.layer1.risk <= 50
        ).length,
        high: analyzedThreats.filter(
          (t) => t.ai.layer1.risk > 50 && t.ai.layer1.risk <= 75
        ).length,
        critical: analyzedThreats.filter((t) => t.ai.layer1.risk > 75).length,
      };

      data.push({
        date: dateFormat(periodStart),
        threats: periodThreats.length,
        avgRisk,
        low: riskLevels.low,
        medium: riskLevels.medium,
        high: riskLevels.high,
        critical: riskLevels.critical,
      });
    }

    return data;
  };

  const trendData = generateTrendData();

  const getTimeHorizonLabel = () => {
    switch (timeHorizon) {
      case "day":
        return "Last 24 Hours";
      case "week":
        return "Last 7 Days";
      case "month":
        return "Last 30 Days";
      case "year":
        return "Last 12 Months";
    }
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-lg">
          <p className="text-gray-900 dark:text-white font-semibold mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm text-gray-700 dark:text-gray-300">
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Time Horizon Selector */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Time Horizon:
          </label>
          <div className="flex gap-2">
            {(["day", "week", "month", "year"] as TimeHorizon[]).map((horizon) => (
              <button
                key={horizon}
                onClick={() => setTimeHorizon(horizon)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  timeHorizon === horizon
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {horizon.charAt(0).toUpperCase() + horizon.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Threat Activity Over Time */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Threat Activity Trend ({getTimeHorizonLabel()})
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={trendData}>
            <defs>
              <linearGradient id="colorThreats" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700" />
            <XAxis dataKey="date" stroke="#6b7280" className="dark:stroke-gray-400" />
            <YAxis stroke="#6b7280" className="dark:stroke-gray-400" />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="threats"
              stroke="#3b82f6"
              fillOpacity={1}
              fill="url(#colorThreats)"
              name="Threats Detected"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Risk Level Distribution Over Time */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Risk Level Distribution ({getTimeHorizonLabel()})
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700" />
            <XAxis dataKey="date" stroke="#6b7280" className="dark:stroke-gray-400" />
            <YAxis stroke="#6b7280" className="dark:stroke-gray-400" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="critical"
              stroke="#ef4444"
              strokeWidth={2}
              name="Critical"
              dot={{ fill: "#ef4444" }}
            />
            <Line
              type="monotone"
              dataKey="high"
              stroke="#f97316"
              strokeWidth={2}
              name="High"
              dot={{ fill: "#f97316" }}
            />
            <Line
              type="monotone"
              dataKey="medium"
              stroke="#eab308"
              strokeWidth={2}
              name="Medium"
              dot={{ fill: "#eab308" }}
            />
            <Line
              type="monotone"
              dataKey="low"
              stroke="#22c55e"
              strokeWidth={2}
              name="Low"
              dot={{ fill: "#22c55e" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Average Risk Score Trend */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Average Risk Score Trend ({getTimeHorizonLabel()})
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={trendData}>
            <defs>
              <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700" />
            <XAxis dataKey="date" stroke="#6b7280" className="dark:stroke-gray-400" />
            <YAxis domain={[0, 100]} stroke="#6b7280" className="dark:stroke-gray-400" />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="avgRisk"
              stroke="#8b5cf6"
              strokeWidth={3}
              name="Avg Risk Score"
              dot={{ fill: "#8b5cf6", r: 4 }}
              fill="url(#colorRisk)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

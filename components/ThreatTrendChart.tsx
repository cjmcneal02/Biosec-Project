"use client";

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

export default function ThreatTrendChart({ threats }: ThreatTrendChartProps) {
  // Generate 7-day trend data
  const generateTrendData = () => {
    const days = 7;
    const now = new Date();
    const data = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);

      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);

      // Count threats for this day
      const dayThreats = threats.filter((threat) => {
        const threatDate = new Date(threat.createdAt);
        return threatDate >= date && threatDate < nextDate;
      });

      // Calculate average risk for the day
      const avgRisk =
        dayThreats.length > 0
          ? Math.round(
              dayThreats.reduce((sum, t) => sum + t.ai.layer1.risk, 0) /
                dayThreats.length
            )
          : 0;

      // Count by risk level
      const riskLevels = {
        low: dayThreats.filter((t) => t.ai.layer1.risk <= 25).length,
        medium: dayThreats.filter(
          (t) => t.ai.layer1.risk > 25 && t.ai.layer1.risk <= 50
        ).length,
        high: dayThreats.filter(
          (t) => t.ai.layer1.risk > 50 && t.ai.layer1.risk <= 75
        ).length,
        critical: dayThreats.filter((t) => t.ai.layer1.risk > 75).length,
      };

      data.push({
        date: date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        threats: dayThreats.length,
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

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 shadow-lg">
          <p className="text-white font-semibold mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
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
      {/* Threat Activity Over Time */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">
          Threat Activity Trend (Last 7 Days)
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={trendData}>
            <defs>
              <linearGradient id="colorThreats" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
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
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">
          Risk Level Distribution (Last 7 Days)
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
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
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">
          Average Risk Score Trend (Last 7 Days)
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={trendData}>
            <defs>
              <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" stroke="#9ca3af" />
            <YAxis domain={[0, 100]} stroke="#9ca3af" />
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

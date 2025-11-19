import { getRiskLevel, getRiskBgColor } from "@/services/insights";

interface RiskBadgeProps {
  score: number;
  showScore?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function RiskBadge({
  score,
  showScore = true,
  size = "md",
}: RiskBadgeProps) {
  const level = getRiskLevel(score);
  const bgColor = getRiskBgColor(score);

  const sizeClasses = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-2",
  };

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border font-semibold ${bgColor} ${sizeClasses[size]}`}
    >
      {showScore && <span>{score}</span>}
      <span>{level}</span>
    </span>
  );
}

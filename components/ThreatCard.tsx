import Link from "next/link";
import type { Threat } from "@/types/Threat";
import RiskBadge from "./RiskBadge";

interface ThreatCardProps {
  threat: Threat;
}

export default function ThreatCard({ threat }: ThreatCardProps) {
  const { id, title, description, ai, date } = threat;

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-5 hover:border-gray-700 transition-colors">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
          <p className="text-sm text-gray-400">{date}</p>
        </div>
        <RiskBadge score={ai.layer1.risk} />
      </div>

      <div className="mb-3">
        <span className="inline-block px-2 py-1 text-xs rounded bg-blue-500/20 text-blue-400 border border-blue-500">
          {ai.layer1.category}
        </span>
      </div>

      <p className="text-gray-300 text-sm mb-4 line-clamp-2">{description}</p>

      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-500">
          Confidence: {(ai.layer1.confidence * 100).toFixed(0)}%
        </p>
        <Link
          href={`/threats/${id}`}
          className="text-sm text-blue-400 hover:text-blue-300 font-medium"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}

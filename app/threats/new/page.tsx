"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useThreats } from "@/state/ThreatContext";
import DashboardLayout from "@/components/DashboardLayout";
import ThreatForm from "@/components/ThreatForm";
import type { ThreatInput } from "@/types/Threat";

export default function NewThreatPage() {
  const router = useRouter();
  const { addThreat } = useThreats();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (input: ThreatInput) => {
    setIsSubmitting(true);
    try {
      const newThreat = await addThreat(input);
      router.push(`/threats/${newThreat.id}`);
    } catch (error) {
      console.error("Failed to submit threat:", error);
      alert("Failed to submit threat. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Report New Threat
          </h1>
          <p className="text-gray-400">
            Submit a new threat for AI-powered analysis and risk assessment
          </p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-lg p-8">
          <ThreatForm onSubmit={handleSubmit} isLoading={isSubmitting} />
        </div>

        {isSubmitting && (
          <div className="mt-6 bg-blue-500/10 border border-blue-500 rounded-lg p-4">
            <p className="text-blue-400 text-sm">
              🤖 AI is analyzing your threat submission...
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

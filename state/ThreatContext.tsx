"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import type { Threat, ThreatInput } from "@/types/Threat";
import { generateCompleteAIAnalysis } from "@/services/fakeAI";
import { SAMPLE_THREATS, isSeeded, markAsSeeded } from "@/services/seedData";

interface ThreatContextType {
  threats: Threat[];
  isLoading: boolean;
  addThreat: (input: ThreatInput) => Promise<Threat>;
  updateThreat: (id: string, updates: Partial<Threat>) => void;
  deleteThreat: (id: string) => void;
  getThreatById: (id: string) => Threat | undefined;
  refreshAI: (id: string) => Promise<void>;
  loadSampleData: () => void;
  clearAllData: () => void;
}

const ThreatContext = createContext<ThreatContextType | undefined>(undefined);

const STORAGE_KEY = "biosec_threats";

/**
 * Load threats from localStorage
 * Auto-seeds with sample data on first load
 */
function loadThreatsFromStorage(): Threat[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    // If no threats exist and app hasn't been seeded, load sample data
    if (!stored && !isSeeded()) {
      markAsSeeded();
      saveThreatsToStorage(SAMPLE_THREATS);
      return SAMPLE_THREATS;
    }

    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to load threats from localStorage:", error);
    return [];
  }
}

/**
 * Save threats to localStorage
 */
function saveThreatsToStorage(threats: Threat[]): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(threats));
  } catch (error) {
    console.error("Failed to save threats to localStorage:", error);
  }
}

/**
 * Generate unique ID for threats
 */
function generateId(): string {
  return `THREAT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function ThreatProvider({ children }: { children: React.ReactNode }) {
  const [threats, setThreats] = useState<Threat[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load threats on mount
  useEffect(() => {
    const loaded = loadThreatsFromStorage();
    setThreats(loaded);
    setIsLoading(false);
  }, []);

  // Save threats whenever they change
  useEffect(() => {
    if (!isLoading) {
      saveThreatsToStorage(threats);
    }
  }, [threats, isLoading]);

  /**
   * Add a new threat with AI analysis
   */
  const addThreat = async (input: ThreatInput): Promise<Threat> => {
    // Generate AI analysis
    const aiAnalysis = await generateCompleteAIAnalysis(input);

    const newThreat: Threat = {
      ...input,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ai: aiAnalysis,
    };

    setThreats((prev) => [newThreat, ...prev]);
    return newThreat;
  };

  /**
   * Update an existing threat
   */
  const updateThreat = (id: string, updates: Partial<Threat>) => {
    setThreats((prev) =>
      prev.map((threat) =>
        threat.id === id
          ? { ...threat, ...updates, updatedAt: new Date().toISOString() }
          : threat
      )
    );
  };

  /**
   * Delete a threat
   */
  const deleteThreat = (id: string) => {
    setThreats((prev) => prev.filter((threat) => threat.id !== id));
  };

  /**
   * Get threat by ID
   */
  const getThreatById = (id: string): Threat | undefined => {
    return threats.find((threat) => threat.id === id);
  };

  /**
   * Refresh AI analysis for a threat
   */
  const refreshAI = async (id: string) => {
    const threat = getThreatById(id);
    if (!threat) return;

    const input: ThreatInput = {
      title: threat.title,
      description: threat.description,
      date: threat.date,
      source: threat.source,
    };

    const newAI = await generateCompleteAIAnalysis(input);
    updateThreat(id, { ai: newAI });
  };

  /**
   * Load sample threat data
   */
  const loadSampleData = () => {
    setThreats(SAMPLE_THREATS);
    markAsSeeded();
  };

  /**
   * Clear all threat data
   */
  const clearAllData = () => {
    setThreats([]);
  };

  const value: ThreatContextType = {
    threats,
    isLoading,
    addThreat,
    updateThreat,
    deleteThreat,
    getThreatById,
    refreshAI,
    loadSampleData,
    clearAllData,
  };

  return (
    <ThreatContext.Provider value={value}>{children}</ThreatContext.Provider>
  );
}

/**
 * Hook to use threat context
 */
export function useThreats() {
  const context = useContext(ThreatContext);
  if (context === undefined) {
    throw new Error("useThreats must be used within a ThreatProvider");
  }
  return context;
}

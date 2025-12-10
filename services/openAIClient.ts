import type { ThreatInput, AILayer1, AILayer2 } from "@/types/Threat";

/**
 * Call OpenAI API via Next.js route with fallback to mock AI
 */
async function callAPI<T>(
  endpoint: string,
  body: any,
  mockFallback: () => Promise<T>
): Promise<T> {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }

    const data = await response.json();
    
    // Check if there's an error field
    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    console.warn(`API call failed, using fallback:`, error);
    return mockFallback();
  }
}

/**
 * Analyze threat using real OpenAI API with mock fallback
 */
export async function analyzeThreatWithAI(
  threat: ThreatInput,
  mockFallback: () => Promise<AILayer1>
): Promise<AILayer1> {
  return callAPI("/api/ai/analyze-threat", threat, mockFallback);
}

/**
 * Generate actionable steps using real OpenAI API with mock fallback
 */
export async function generateStepsWithAI(
  threat: ThreatInput,
  layer1: AILayer1,
  mockFallback: () => Promise<AILayer2>
): Promise<AILayer2> {
  return callAPI(
    "/api/ai/generate-steps",
    { threat, layer1 },
    mockFallback
  );
}

/**
 * Get dashboard recommendation using real OpenAI API with mock fallback
 */
export async function getDashboardRecommendation(
  threats: any[],
  insights: any,
  mockFallback: () => Promise<{ recommendation: string }>
): Promise<{ recommendation: string }> {
  return callAPI(
    "/api/ai/dashboard-recommendation",
    { threats, insights },
    mockFallback
  );
}


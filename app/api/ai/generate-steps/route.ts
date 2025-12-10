import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import type { ThreatInput, AILayer1, AILayer2 } from "@/types/Threat";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      );
    }

    const { threat, layer1 }: { threat: ThreatInput; layer1: AILayer1 } =
      await request.json();

    const prompt = `You are a cybersecurity expert providing actionable mitigation steps for a biotech threat.

Threat Details:
Title: ${threat.title}
Description: ${threat.description}
Category: ${layer1.category}
Risk Score: ${layer1.risk}/100

Generate specific, actionable mitigation steps for this threat. Provide:
1. 3-5 specific mitigation steps (as a JSON array of strings)
2. Priority level: "Low", "Medium", "High", or "Critical" (based on risk score)
3. Estimated impact (one sentence)
4. Recommended actions (3-4 items as JSON array of strings)

Respond in JSON format only:
{
  "mitigations": ["step 1", "step 2", ...],
  "priority": "<Low|Medium|High|Critical>",
  "estimatedImpact": "<one sentence>",
  "recommendedActions": ["action 1", "action 2", ...]
}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a cybersecurity expert providing actionable mitigation strategies. Always respond with valid JSON only, no additional text.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.4,
      max_tokens: 500,
    });

    const responseText = completion.choices[0]?.message?.content || "{}";
    
    // Clean up response
    const cleanResponse = responseText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    
    const aiAnalysis = JSON.parse(cleanResponse);

    // Determine priority if not provided
    let priority: "Low" | "Medium" | "High" | "Critical" = "Medium";
    if (layer1.risk >= 75) priority = "Critical";
    else if (layer1.risk >= 50) priority = "High";
    else if (layer1.risk >= 25) priority = "Medium";
    else priority = "Low";

    const result: AILayer2 = {
      mitigations:
        Array.isArray(aiAnalysis.mitigations) && aiAnalysis.mitigations.length > 0
          ? aiAnalysis.mitigations
          : ["Review threat details", "Notify security team", "Implement monitoring"],
      priority: aiAnalysis.priority || priority,
      estimatedImpact:
        aiAnalysis.estimatedImpact ||
        "Potential operational impact requires immediate attention.",
      recommendedActions:
        Array.isArray(aiAnalysis.recommendedActions) &&
        aiAnalysis.recommendedActions.length > 0
          ? aiAnalysis.recommendedActions
          : [
              "Notify security team immediately",
              "Document all findings",
              "Prepare incident report",
              "Coordinate with IT security",
            ],
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("OpenAI API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate steps" },
      { status: 500 }
    );
  }
}


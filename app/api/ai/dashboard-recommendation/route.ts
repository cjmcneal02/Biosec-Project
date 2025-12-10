import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import type { Threat, GlobalInsights } from "@/types/Threat";

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

    const { threats, insights }: { threats: Threat[]; insights: GlobalInsights } =
      await request.json();

    if (threats.length === 0) {
      return NextResponse.json({
        recommendation: "No threats detected. Continue monitoring for potential security issues.",
      });
    }

    // Summarize threats for context
    const threatSummary = threats
      .slice(0, 10) // Limit to first 10 for context
      .map(
        (t, i) =>
          `${i + 1}. ${t.title} - ${t.ai.layer1.category} (Risk: ${t.ai.layer1.risk}/100)`
      )
      .join("\n");

    const prompt = `You are a cybersecurity expert analyzing the overall threat landscape for a biotech company.

Current Threat Landscape:
- Total Threats: ${insights.totalThreats}
- Average Risk Score: ${insights.avgRisk}/100
- Top Category: ${insights.topCategory}
- Risk Distribution: Low: ${insights.riskDistribution.low}, Medium: ${insights.riskDistribution.medium}, High: ${insights.riskDistribution.high}, Critical: ${insights.riskDistribution.critical}
- Recent Activity: ${insights.recentActivity.last24h} in last 24h, ${insights.recentActivity.last7d} in last 7 days

Recent Threats:
${threatSummary}

Provide a concise, actionable recommendation (2-4 sentences) about the overall threat landscape and what should be prioritized. Focus on practical guidance for the security team.

Respond with JSON only:
{
  "recommendation": "<your recommendation text>"
}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a cybersecurity expert providing strategic threat intelligence recommendations. Always respond with valid JSON only, no additional text.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.5,
      max_tokens: 200,
    });

    const responseText = completion.choices[0]?.message?.content || "{}";
    
    // Clean up response
    const cleanResponse = responseText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    
    const aiAnalysis = JSON.parse(cleanResponse);

    return NextResponse.json({
      recommendation:
        aiAnalysis.recommendation ||
        "Continue monitoring threats and prioritize high-risk items for immediate review.",
    });
  } catch (error: any) {
    console.error("OpenAI API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate recommendation" },
      { status: 500 }
    );
  }
}


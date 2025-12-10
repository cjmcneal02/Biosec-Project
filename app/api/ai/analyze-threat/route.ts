import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import type { ThreatInput, AILayer1 } from "@/types/Threat";

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

    const threat: ThreatInput = await request.json();

    const prompt = `You are a cybersecurity analyst specializing in biotech threat intelligence. Analyze the following threat and provide a risk assessment.

Threat Title: ${threat.title}
Description: ${threat.description}
Date Detected: ${threat.date}
Source: ${threat.source}

Please provide:
1. A risk score from 0-100 (as a number only)
2. One of these categories: "Biotech Malware", "Data Exfiltration", "Unauthorized Lab Access", "Insider Threat", "Supply Chain Compromise"
3. A brief 2-3 sentence summary of the threat
4. A confidence level from 0.7 to 1.0 (as a decimal number)

Respond in JSON format only:
{
  "risk": <number 0-100>,
  "category": "<category name>",
  "summary": "<brief summary>",
  "confidence": <number 0.7-1.0>
}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a cybersecurity expert analyzing biotech threats. Always respond with valid JSON only, no additional text.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.3,
      max_tokens: 300,
    });

    const responseText = completion.choices[0]?.message?.content || "{}";
    
    // Clean up response (remove markdown code blocks if present)
    const cleanResponse = responseText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    
    const aiAnalysis = JSON.parse(cleanResponse);

    const result: AILayer1 = {
      risk: Math.min(100, Math.max(0, parseInt(aiAnalysis.risk) || 50)),
      category: aiAnalysis.category || "Data Exfiltration",
      summary: aiAnalysis.summary || "Threat analysis completed.",
      confidence: Math.min(1.0, Math.max(0.7, parseFloat(aiAnalysis.confidence) || 0.85)),
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("OpenAI API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to analyze threat" },
      { status: 500 }
    );
  }
}


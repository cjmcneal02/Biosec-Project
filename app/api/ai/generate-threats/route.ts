import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import type { ThreatInput } from "@/types/Threat";

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

    const { count = 25 } = await request.json();

    const prompt = `You are a cybersecurity expert generating realistic biotech threat intelligence reports.

Generate exactly ${count} diverse, realistic biotech security threat scenarios. Each threat should be unique and cover different categories:
- Biotech Malware
- Data Exfiltration  
- Unauthorized Lab Access
- Insider Threat
- Supply Chain Compromise

For each threat, provide:
- title: A concise, realistic threat title (10-15 words)
- description: A detailed description of the threat (2-4 sentences)
- date: A date in YYYY-MM-DD format within the last 90 days
- source: A realistic source name (e.g., "Network Security Monitor", "Lab Security System", "SIEM Alert", "Employee Report", "Vendor Notification")

Respond with JSON only in this exact format:
{
  "threats": [
    {
      "title": "...",
      "description": "...",
      "date": "YYYY-MM-DD",
      "source": "..."
    },
    ...
  ]
}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a cybersecurity expert. Always respond with valid JSON only, no additional text or markdown formatting.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.8,
      max_tokens: 4000,
    });

    const responseText = completion.choices[0]?.message?.content || "{}";
    
    // Clean up response (remove markdown code blocks if present)
    let cleanResponse = responseText.trim();
    cleanResponse = cleanResponse.replace(/```json\n?/g, "");
    cleanResponse = cleanResponse.replace(/```\n?/g, "");
    cleanResponse = cleanResponse.trim();
    
    const result = JSON.parse(cleanResponse);
    
    if (!result.threats || !Array.isArray(result.threats)) {
      throw new Error("Invalid response format from OpenAI");
    }

    // Validate and return threats
    const threats: ThreatInput[] = result.threats
      .slice(0, count)
      .map((t: any) => ({
        title: t.title || "Unknown Threat",
        description: t.description || "No description provided.",
        date: t.date || new Date().toISOString().split("T")[0],
        source: t.source || "Unknown Source",
      }));

    return NextResponse.json({ threats });
  } catch (error: any) {
    console.error("OpenAI API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate threats" },
      { status: 500 }
    );
  }
}


import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, aspect_ratio = "1:1", negative_prompt = "" } = body;

    if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
      return NextResponse.json(
        { error: "Prompt is required and must be a non-empty string" },
        { status: 400 }
      );
    }

    if (prompt.length > 2000) {
      return NextResponse.json(
        { error: "Prompt must be less than 2000 characters" },
        { status: 400 }
      );
    }

    // Call AI image generation service
    const generateResponse = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/ai/generate-image`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          aspect_ratio,
          negative_prompt,
        }),
      }
    );

    if (!generateResponse.ok) {
      const errorData = await generateResponse.json();
      throw new Error(errorData.error || "Failed to generate image");
    }

    const data = await generateResponse.json();

    return NextResponse.json(
      {
        success: true,
        imageUrl: data.imageUrl,
        generatedAt: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Image generation error:", error);

    const message =
      error instanceof Error ? error.message : "Unknown error occurred";

    return NextResponse.json(
      { error: `Image generation failed: ${message}` },
      { status: 500 }
    );
  }
}
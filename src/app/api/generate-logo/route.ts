import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    // Call the generate_image tool through the internal API
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/generate-image`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          aspect_ratio: "1:1",
          negative_prompt: "blurry, low quality, distorted, text, watermark, realistic photo, cluttered, busy, too many details"
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to generate image");
    }

    const data = await response.json();

    return NextResponse.json({ imageUrl: data.imageUrl });
  } catch (error) {
    console.error("Logo generation error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to generate logo" },
      { status: 500 }
    );
  }
}

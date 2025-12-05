"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Loader2, Download, Sparkles } from "lucide-react";

type LogoStyle = "modern" | "minimalist" | "abstract" | "geometric" | "gradient";

const styleDescriptions: Record<LogoStyle, string> = {
  modern: "sleek, contemporary, professional logo design with clean lines",
  minimalist: "minimalist, simple, elegant logo with negative space",
  abstract: "abstract, artistic, creative logo with flowing shapes",
  geometric: "geometric, angular, structured logo with precise shapes",
  gradient: "vibrant gradient, colorful, dynamic logo with smooth color transitions"
};

export default function LogoGenerator() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState<LogoStyle>("modern");
  const [generatedLogo, setGeneratedLogo] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Please enter a description for your logo");
      return;
    }

    setIsGenerating(true);
    setError(null);
    setGeneratedLogo(null);

    try {
      const fullPrompt = `Professional logo design for "${prompt}", ${styleDescriptions[style]}, vector art style, centered composition, white background, high quality, crisp details, suitable for branding`;
      
      const response = await fetch("/api/generate-logo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: fullPrompt }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate logo");
      }

      setGeneratedLogo(data.imageUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate logo");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (generatedLogo) {
      const link = document.createElement("a");
      link.href = generatedLogo;
      link.download = `orchid-logo-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <Card className="p-6 space-y-6 bg-white/50 dark:bg-black/50 backdrop-blur-sm border-purple-200 dark:border-purple-800">
        <div className="space-y-2">
          <Label htmlFor="prompt" className="text-lg font-semibold">
            What logo would you like to create?
          </Label>
          <Input
            id="prompt"
            placeholder="e.g., Tech startup, Coffee shop, Fitness brand..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="text-base h-12 border-purple-200 dark:border-purple-800 focus-visible:ring-purple-500"
            onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="style" className="text-lg font-semibold">
            Logo Style
          </Label>
          <Select value={style} onValueChange={(value) => setStyle(value as LogoStyle)}>
            <SelectTrigger id="style" className="h-12 border-purple-200 dark:border-purple-800 focus:ring-purple-500">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="modern">Modern</SelectItem>
              <SelectItem value="minimalist">Minimalist</SelectItem>
              <SelectItem value="abstract">Abstract</SelectItem>
              <SelectItem value="geometric">Geometric</SelectItem>
              <SelectItem value="gradient">Gradient</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={handleGenerate}
          disabled={isGenerating || !prompt.trim()}
          className="w-full h-12 text-base bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Generating Your Logo...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-5 w-5" />
              Generate Logo
            </>
          )}
        </Button>

        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-600 dark:text-red-400 text-sm font-medium">{error}</p>
          </div>
        )}
      </Card>

      {generatedLogo && (
        <Card className="p-6 space-y-4 bg-white/50 dark:bg-black/50 backdrop-blur-sm border-purple-200 dark:border-purple-800">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Your Generated Logo</h3>
            <Button
              onClick={handleDownload}
              variant="outline"
              className="border-purple-200 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-950"
            >
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
          
          <div className="relative aspect-square w-full max-w-lg mx-auto bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 rounded-lg overflow-hidden border-2 border-purple-200 dark:border-purple-800">
            <img
              src={generatedLogo}
              alt="Generated logo"
              className="w-full h-full object-contain p-8"
            />
          </div>
        </Card>
      )}
    </div>
  );
}

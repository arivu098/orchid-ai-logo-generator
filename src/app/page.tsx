import LogoGenerator from "@/components/LogoGenerator";
import { Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 dark:from-purple-950 dark:via-pink-950 dark:to-purple-900">
      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center space-y-4 mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-10 h-10 text-purple-600 dark:text-purple-400" />
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              Orchid AI
            </h1>
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white">
            Logo Generator
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Create stunning, professional logos in seconds with the power of AI.
            Just describe your vision and watch it come to life.
          </p>
        </div>

        <LogoGenerator />

        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Powered by advanced AI image generation technology
          </p>
        </div>
      </main>
    </div>
  );
}
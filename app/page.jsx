"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleStart = () => {
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col min-h-screen justify-between bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white font-sans">
      {/* Header */}
      <header className="text-center py-6 text-4xl font-extrabold tracking-wide text-blue-400 shadow-md backdrop-blur-sm bg-white/5 border-b border-blue-900 rounded-b-4xl">
        AIcruit
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center justify-center text-center px-6">
        <div className="backdrop-blur-md bg-white/5 border border-blue-900 rounded-3xl p-10 shadow-lg max-w-3xl w-full">
          <h1 className="text-4xl md:text-5xl font-bold leading-snug text-white drop-shadow-md">
            Master Interviews <br />
            <span className="text-blue-400">with AI Insights</span>
          </h1>

          <p className="mt-6 text-base md:text-lg text-gray-300 max-w-2xl mx-auto">
            Simulate real interview questions, analyze your responses, and get instant feedback.
            Improve your communication and confidence with every session.
          </p>

          <ul className="mt-8 text-gray-200 text-base space-y-2 max-w-md mx-auto text-left">
            <li>✅ Real-time feedback and scoring</li>
            <li>✅ Personalized improvement suggestions</li>
            <li>✅ Practice with curated questions across domains</li>
            <li>✅ Build confidence for your big day</li>
          </ul>

          <Button
            onClick={handleStart}
            className="mt-10 px-8 py-6 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            🚀 Start Your Prep
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full text-center text-sm rounded-t-4xl text-gray-400 py-4 border-t border-gray-700 bg-white/5 backdrop-blur-md">
        © {new Date().getFullYear()} Interview Prep powered by AI — Built for future achievers — CareerCrafts
      </footer>
    </div>
  );
}

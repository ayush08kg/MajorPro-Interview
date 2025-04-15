"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleStart = () => {
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col min-h-screen justify-between bg-gradient-to-br from-white via-blue-50 to-blue-100 text-gray-800">
      {/* Header */}
      <header className="text-center py-6 bg-transparent shadow-md text-3xl font-bold rounded-b-4xl text-blue-700">
        AIcruit
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold leading-snug text-blue-900">
          Master Interviews <br />
          <span className="text-blue-500">with AI Insights</span>
        </h1>

        <p className="mt-6 text-base md:text-lg text-gray-600 max-w-2xl">
          Simulate real interview questions, analyze your responses, and get instant feedback.
          Improve your communication and confidence with every session.
        </p>

        <ul className="mt-8 text-gray-700 text-base space-y-2 max-w-md text-left">
          <li>✅ Real-time feedback and scoring</li>
          <li>✅ Personalized improvement suggestions</li>
          <li>✅ Practice with curated questions across domains</li>
          <li>✅ Build confidence for your big day</li>
        </ul>

        <Button
          onClick={handleStart}
          className="mt-10 px-6 py-4 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md transition duration-300"
        >
          Start Your Prep
        </Button>
      </main>

      {/* Footer */}
      <footer className="w-full text-center text-sm text-gray-500 py-4 border-t border-blue-200 bg-white/70 backdrop-blur-sm rounded-t-4xl">
        © {new Date().getFullYear()} Interview Prep powered by AI — Built for future achievers — CareerCrafts
      </footer>
    </div>
  );
}

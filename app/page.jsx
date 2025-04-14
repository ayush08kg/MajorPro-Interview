"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleStart = () => {
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col min-h-screen justify-between bg-gradient-to-br from-white via-blue-50 to-blue-100">
      <main className="flex flex-1 flex-col items-center justify-center text-center px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 leading-tight">
          Master Your Interview Skills<br />
          <span className="text-blue-600">with AI-Powered Insights</span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl">
          Our intelligent system simulates real interview questions, analyzes your responses, and provides instant feedback with scoring.
          Learn how to articulate your thoughts better and stand out from the competition.
        </p>

        <ul className="mt-8 text-gray-700 text-base space-y-2 max-w-md">
          <li>✅ Real-time feedback and scoring</li>
          <li>✅ Personalized improvement suggestions</li>
          <li>✅ Practice with curated questions across domains</li>
          <li>✅ Build confidence for your big day</li>
        </ul>

        <Button onClick={handleStart} className="mt-10 px-8 py-4 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md transition cursor-pointer">
          Start Your Prep
        </Button>
      </main>

      <footer className="w-full text-center text-sm text-gray-500 py-4 border-t border-gray-200 bg-white/70 backdrop-blur-sm">
        © {new Date().getFullYear()} Interview Prep powered by AI — Built for future achievers.
      </footer>
    </div>
  );
}

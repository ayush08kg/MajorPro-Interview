"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import dynamic from 'next/dynamic';
import { useEffect, useState } from "react";

// Dynamically import Lottie with no SSR
const Lottie = dynamic(
  () => import('lottie-react'),
  { ssr: false }
);

export default function Home() {
  const router = useRouter();
  const [animationData, setAnimationData] = useState(null);
  const [animationError, setAnimationError] = useState(null);

  useEffect(() => {
    const loadAnimation = async () => {
      try {
        // Correct path to your animation file
        const response = await fetch('/lottie/InterviewHome.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAnimationData(data);
      } catch (error) {
        console.error('Error loading animation:', error);
        setAnimationError('Failed to load animation');
      }
    };

    loadAnimation();
  }, []);

  const handleStart = () => {
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col min-h-screen justify-between bg-gradient-to-br from-white via-gray-100 to-gray-200 text-gray-800 font-sans">
      {/* Header */}
      <header className="relative overflow-hidden text-center py-4 bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg rounded-b-4xl">
  {/* Animated background elements */}
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-white/10 animate-pulse"></div>
    <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-white/10 animate-pulse delay-300"></div>
    <div className="absolute top-1/4 right-1/4 w-16 h-16 rounded-full bg-white/15 animate-pulse delay-500"></div>
  </div>

  {/* Main header content */}
  <div className="relative z-10">
    <h1 className="text-5xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-100 drop-shadow-lg">
      AIcruit
    </h1>
    <p className="mt-2 text-blue-100 font-medium tracking-wider animate-pulse">
      Your AI-Powered Interview Coach
    </p>
  </div>

  {/* Decorative elements */}
  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
</header>

      {/* Main Content */}
      <main className="flex-1 w-full px-6 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            {/* Text Content - Left Side */}
            <div className="lg:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-snug text-gray-800">
                Master Interviews <br />
                <span className="text-blue-600">with AI Insights</span>
              </h1>

              <p className="text-lg text-gray-600">
                Simulate real interview questions, analyze your responses, and get instant feedback.
                Improve your communication and confidence with every session.
              </p>

              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>Real-time feedback and scoring</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>Personalized improvement suggestions</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>Practice with curated questions across domains</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>Build confidence for your big day</span>
                </li>
              </ul>

              <Button
                onClick={handleStart}
                className="px-8 py-6 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                🚀 Start Your Prep
              </Button>
            </div>

            {/* Animation - Right Side */}
            <div className="lg:w-1/2 flex justify-center">
              {animationError ? (
                <div className="text-red-500 p-4 bg-red-50 rounded-lg">
                  {animationError}
                </div>
              ) : animationData ? (
                <div className="w-full max-w-lg">
                  <Lottie 
                    animationData={animationData} 
                    loop={true} 
                    autoplay={true}
                    className="w-full h-auto"
                  />
                </div>
              ) : (
                <div className="w-full max-w-lg h-80 bg-gray-100 rounded-lg animate-pulse flex items-center justify-center">
                  <span className="text-gray-400">Loading animation...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full text-center text-sm rounded-t-4xl text-gray-500 py-4 border-t border-gray-300 bg-white/70 backdrop-blur-md">
        © {new Date().getFullYear()} Interview Prep powered by AI — Built for future achievers — CareerCrafts
      </footer>
    </div>
  );
}
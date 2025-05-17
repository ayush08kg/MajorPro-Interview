'use client';

import { Lightbulb } from "lucide-react";
import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic';

// Dynamically import Lottie with no SSR
const Lottie = dynamic(
  () => import('lottie-react'),
  { ssr: false }
);

function QuestionSection({ mockInterviewQuestion, activeQuestionIndex, setActiveQuestionIndex }) {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch("/lottie/404Error.json")
      .then((res) => res.json())
      .then(setAnimationData);
  }, []);

  return mockInterviewQuestion ? (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* Question Navigation */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-3">Questions</h3>
        <div className="flex flex-wrap gap-2">
          {mockInterviewQuestion.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveQuestionIndex(index)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeQuestionIndex === index
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Current Question */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-500 mb-1">Question</h3>
        <p className="text-lg text-gray-800">
          {mockInterviewQuestion[activeQuestionIndex]?.question}
        </p>
      </div>

      {/* Info Note */}
      <div className="bg-blue-50 border-l-4 border-blue-400 rounded-lg p-4 mb-4">
        <div className="flex items-start">
          <Lightbulb className="flex-shrink-0 h-5 w-5 text-blue-500 mt-0.5" />
          <div className="ml-3">
            <h4 className="text-sm font-medium text-blue-800">Note</h4>
            <p className="text-sm text-blue-700 mt-1">
              {process.env.NEXT_PUBLIC_QUESTION_NOTE}
            </p>
          </div>
        </div>
      </div>

      {/* Warning Message */}
      <div className="bg-red-50 border-l-4 border-red-400 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            {/* Optional: Add an icon here if needed */}
          </div>
          <div className="ml-3">
            <h4 className="text-sm font-medium text-red-800">Important</h4>
            <p className="text-sm text-red-700 mt-1">
              Please wait for the confirmation popup saying "Answer recorded"
              before moving to the next question. If you don't see the popup,
              your answer might not be saved.
            </p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="bg-white border border-red-200 rounded-2xl p-6 md:p-8 shadow-lg flex flex-col items-center text-center space-y-4">
      {/* Lottie Animation */}
      <div className="w-64 h-64">
        {animationData ? (
          <Lottie animationData={animationData} loop={true} autoplay={true} />
        ) : (
          <p>Loading animation...</p>
        )}
      </div>

      {/* Heading */}
      <h2 className="text-2xl font-semibold text-red-700">
        Something Went Wrong
      </h2>

      {/* Description */}
      <p className="text-gray-600 max-w-md">
        We couldn't load your interview questions due to a fetch issue. Please
        try again shortly.
      </p>
    </div>
  );
}

export default QuestionSection;
import { Lightbulb } from "lucide-react";
import { MdErrorOutline } from "react-icons/md";
import React from "react";

function QuestionSection({ mockInterviewQuestion, activeQuestionIndex }) {
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
            <svg
              className="h-5 w-5 text-red-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
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
      {/* Icon */}
      <div className="text-red-500 text-6xl">
        <MdErrorOutline />
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

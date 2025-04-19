import { Lightbulb } from "lucide-react";
import React from "react";

function QuestionSection({ mockInterviewQuestion, activeQuestionIndex }) {
  return (
    mockInterviewQuestion && (
      <div className="p-5 border border-gray-200 shadow-md rounded-2xl my-10 bg-white">
        {/* Question Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {mockInterviewQuestion.map((question, index) => {
            const isActive = activeQuestionIndex === index;
            return (
              <h2
                key={index}
                className={`p-3 rounded-xl text-center text-md font-medium cursor-pointer transition-all duration-300 border 
                ${
                  isActive
                    ? "bg-blue-700 text-white border-blue-700"
                    : "bg-cyan-100 text-black hover:bg-cyan-200 border-transparent"
                }`}
              >
                Question #{index + 1}
              </h2>
            );
          })}
        </div>

        {/* Current Question */}
        <h2 className="my-6 text-base md:text-lg font-medium text-gray-800">
          {mockInterviewQuestion[activeQuestionIndex]?.question}
        </h2>

        {/* Info Note */}
        <div className="border rounded-xl p-5 bg-blue-50">
          <h2 className="flex gap-2 items-center text-blue-700 font-medium">
            <Lightbulb />
            <strong>Note:</strong>
          </h2>
          <h2 className="text-sm mt-2 text-blue-800">
            {process.env.NEXT_PUBLIC_QUESTION_NOTE}
          </h2>
        </div>

        {/* Warning Message */}
        <div className="mt-4 bg-red-100 border border-red-300 rounded-xl p-4">
          <h2 className="text-red-700 font-semibold">
            ⚠ Please wait for the confirmation popup saying “Answer recorded” before moving to the next question.
          </h2>
          <p className="text-red-600 text-sm mt-1">
            If you don’t see the popup, your answer might not be saved. Kindly answer again.
          </p>
        </div>
      </div>
    )
  );
}

export default QuestionSection;

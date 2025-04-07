import { Lightbulb } from "lucide-react";
import React from "react";

function QuestionSection({ mockInterviewQuestion, activeQuestionIndex }) {
  return (
    mockInterviewQuestion && (
      <div className="p-5 border rounded-lg my-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {mockInterviewQuestion?.map((question, index) => {
            const isActive = activeQuestionIndex === index;
            return (
              <h2
                key={index}
                className={`p-2 rounded-full text-center cursor-pointer transition-all duration-300 ${
                  isActive ? "bg-blue-700 text-white" : "bg-cyan-100 text-black"
                }`}
              >
                Question #{index + 1}
              </h2>
            );
          })}
        </div>
        <h2 className="my-5 text-md md:text-lg">{mockInterviewQuestion[activeQuestionIndex]?.question}</h2>
        <div className="border rounded-lg p-5 bg-blue-50 mt-15">
            <h2 className="flex gap-2 items-center text-blue-700">
                <Lightbulb/>
                <strong>Note:</strong>
            </h2>
            <h2 className="text-sm my-2">{process.env.NEXT_PUBLIC_QUESTION_NOTE}</h2>
        </div>
      </div>
    )
  );
}

export default QuestionSection;

"use client";

import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import QuestionSection from "./_components/QuestionSection";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";

const RecordAnswerSection = dynamic(() => import("./_components/RecordAnswerSection"), {
  ssr: false,
});

function StartInterview() {
  const { interviewId } = useParams();
  const [interviewData, setInterviewData] = useState(null);
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  useEffect(() => {
    if (interviewId) {
      GetInterviewDetails();
    }
  }, [interviewId]);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, interviewId));

    if (!result || result.length === 0) {
      console.error("No interview found for ID:", interviewId);
      return;
    }

    const jsonMockResp = JSON.parse(result[0].jsonMockResp);
    setMockInterviewQuestion(jsonMockResp.interviewQuestions);
    setInterviewData(result[0]);
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <QuestionSection
            mockInterviewQuestion={mockInterviewQuestion}
            activeQuestionIndex={activeQuestionIndex}
          />
          <RecordAnswerSection
            mockInterviewQuestion={mockInterviewQuestion}
            activeQuestionIndex={activeQuestionIndex}
            interviewData={interviewData}
          />
        </div>

        <div className="flex justify-end gap-4 mt-8">
          {activeQuestionIndex > 0 && (
            <Button 
              variant="outline"
              className="px-6 py-3 border-gray-300 hover:bg-gray-100"
              onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
            >
              ← Previous
            </Button>
          )}
          {activeQuestionIndex !== mockInterviewQuestion?.length - 1 ? (
            <Button 
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700"
              onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
            >
              Next →
            </Button>
          ) : (
            <Link href={`/dashboard/interview/${interviewData?.mockId}/feedback`}>
              <Button className="px-6 py-3 bg-green-600 hover:bg-green-700">
                Finish Interview
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default StartInterview;
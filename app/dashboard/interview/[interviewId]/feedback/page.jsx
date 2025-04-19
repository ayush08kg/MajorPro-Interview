"use client";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState, use } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function Feedback({ params }) {
  const { interviewId } = use(params);
  const [feedbackList, setFeedbackList] = useState([]);
  const [rating, setRating] = useState(0);
  const router = useRouter();

  const GetFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, interviewId))
      .orderBy(UserAnswer.id);
    setFeedbackList(result);
  };

  const calc = () => {
    let total = 0;
    feedbackList.forEach((item) => {
      total += parseInt(item.rating || "0", 10);
    });
    if (feedbackList.length > 0) {
      const avg = (total / feedbackList.length).toFixed(1);
      setRating(avg);
    }
  };

  useEffect(() => {
    GetFeedback();
  }, []);

  useEffect(() => {
    calc();
  }, [feedbackList]);

  return (
    <div className="p-8 md:p-12 max-w-4xl mx-auto">
      {feedbackList?.length === 0 ? (
        <h2 className="font-bold text-2xl text-gray-400 text-center">
          No Interview Feedback Record Found
        </h2>
      ) : (
        <>
          <div className="text-center mb-10">
            <h2 className="text-4xl font-extrabold text-gradient bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Congratulations 🎉
            </h2>
            <h3 className="text-xl font-medium text-gray-700 mt-2">
              Here's your Interview Feedback
            </h3>
            <p className="text-md text-gray-500 mt-3">
              Overall rating:{" "}
              <span className="text-indigo-600 font-bold">{rating}/10</span>
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Check your answers vs AI's suggestions for improvements.
            </p>
          </div>

          {feedbackList.map((item, index) => (
            <Collapsible
              key={index}
              className="bg-white shadow-md rounded-2xl mb-5 overflow-hidden transition-all duration-300 hover:shadow-xl"
            >
              <CollapsibleTrigger className="w-full p-5 bg-gradient-to-r from-gray-100 to-gray-50 hover:from-gray-200 hover:to-gray-100 text-left flex justify-between items-center gap-3 font-semibold text-gray-700 rounded-t-2xl">
                {item.question}
                <ChevronsUpDown className="h-5 w-5 text-gray-500" />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-5 bg-white flex flex-col gap-3">
                <div className="text-sm text-gray-600">
                  <strong className="text-red-500">Rating:</strong> {item.rating}
                </div>

                <div className="rounded-lg border-l-4 border-red-400 bg-red-50 p-4 text-sm text-red-700">
                  <strong>Your Answer:</strong> {item.userAns}
                </div>

                <div className="rounded-lg border-l-4 border-blue-400 bg-blue-50 p-4 text-sm text-blue-800">
                  <strong>AI's Answer:</strong> {item.correctAns}
                </div>

                <div className="rounded-lg border-l-4 border-yellow-400 bg-yellow-50 p-4 text-sm text-yellow-700">
                  <strong>Feedback:</strong> {item.feedback}
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </>
      )}

      <div className="text-center mt-10">
        <Button
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-full shadow-lg transition-all duration-300"
          onClick={() => router.replace("/dashboard")}
        >
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
}

export default Feedback;

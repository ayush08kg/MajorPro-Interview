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
  const { interviewId } = use(params); // ✅ Unwrap params correctly
  const [feedbackList, setFeedbackList] = useState([]);
  const [rating, setRating] = useState(0);
  const router = useRouter();

  const GetFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, interviewId))
      .orderBy(UserAnswer.id);
    console.log(result);
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
    <div className="p-10">
      {feedbackList?.length === 0 ? (
        <h2 className="font-bold text-2xl text-gray-500">
          No Interview Feedback Record Found
        </h2>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-green-500">Congratulations</h2>
          <h2 className="font-semibold text-2xl">Here's your Feedback</h2>
          <h2 className="text-blue-800 text-lg my-3">
            Your overall interview rating: <strong>{rating}/10</strong>
          </h2>

          <h2 className="text-sm text-gray-500">
            Below you can find comparison of your answer with AI's answer for
            quality improvement.
          </h2>

          {feedbackList.map((item, index) => (
            <Collapsible key={index} className="mt-5">
              <CollapsibleTrigger className="w-full p-5 bg-gray-50 rounded-xl my-2 text-left flex justify-between gap-7">
                {item.question} <ChevronsUpDown className="h-5 w-5" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="flex flex-col gap-2">
                  <h2 className="text-red-500 p-2 rounded-lg">
                    <strong>Rating:</strong> {item.rating}
                  </h2>
                  <h2 className="p-5 border rounded-xl bg-red-50 text-sm text-red-900">
                    <strong>Your Answer: </strong>
                    {item.userAns}
                  </h2>
                  <h2 className="p-5 border rounded-xl bg-blue-50 text-sm text-blue-900">
                    <strong>AI's Answer: </strong>
                    {item.correctAns}
                  </h2>
                  <h2 className="p-5 border rounded-xl bg-yellow-50 text-sm text-orange-600">
                    <strong>Feedback: </strong>
                    {item.feedback}
                  </h2>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </>
      )}
      <Button className="bg-blue-700 mt-7" onClick={() => router.replace("/dashboard")}>
        Home
      </Button>
    </div>
  );
}

export default Feedback;

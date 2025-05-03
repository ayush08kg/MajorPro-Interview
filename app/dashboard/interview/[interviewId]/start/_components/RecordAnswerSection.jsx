"use client";

import Webcam from "react-webcam";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic } from "lucide-react";
import { toast } from "sonner";
import { UserAnswer } from "@/utils/schema";
import { db } from "@/utils/db";
import { useUser } from "@clerk/nextjs";
import moment from "moment";

function RecordAnswerSection({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
}) {
  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    results.forEach((result) => {
      setUserAnswer((prevAns) => prevAns + result?.transcript);
    });
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 2 && !hasSubmitted) {
      setHasSubmitted(true);
      stopSpeechToText();
      UpdateUserAnswer();
    }
  }, [isRecording, userAnswer]);

  const StartStopRecording = () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      setUserAnswer("");
      setResults([]);
      startSpeechToText();
    }
  };

  const UpdateUserAnswer = async () => {
    setLoading(true);

    const feedbackPrompt = `
You are an interview evaluator.
Strictly respond only with a JSON object like:
{
  "rating": number (out of 10),
  "feedback": "short text feedback"
}
Do not include any explanations, only the JSON.

Question: ${mockInterviewQuestion[activeQuestionIndex]?.question}
User Answer: ${userAnswer}
    `.trim();

    let mockJsonResp = "";

    try {
      const res = await fetch("/api/geminiModal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: feedbackPrompt }),
      });

      const data = await res.json();
      mockJsonResp = data.response
        .replace("```json", "")
        .replace("```", "")
        .trim();
    } catch (err) {
      console.error("Error fetching from Gemini API:", err);
      toast.error("Gemini API failed.");
      setLoading(false);
      setHasSubmitted(false);
      return;
    }

    let JsonFeedbackResp;
    try {
      const jsonMatch = mockJsonResp.match(/({[^]*})/);
      if (!jsonMatch) throw new Error("No JSON found in response");

      JsonFeedbackResp = JSON.parse(jsonMatch[0]);
    } catch (parseErr) {
      console.error("JSON parse error:", parseErr);
      toast.error("Invalid feedback format. Using fallback.");
      JsonFeedbackResp = {
        feedback: "Feedback not available due to formatting error.",
        rating: 6,
      };
    }

    try {
      const resp = await db
        .insert(UserAnswer)
        .values({
          mockIdRef: interviewData?.mockId,
          question: mockInterviewQuestion[activeQuestionIndex]?.question,
          correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
          userAns: userAnswer,
          feedback: JsonFeedbackResp?.feedback,
          rating: JsonFeedbackResp?.rating,
          userEmail: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("DD-MM-yyyy"),
        })
        .returning();

      if (resp.length > 0) {
        toast.success("Answer recorded successfully");
      } else {
        toast.error("Nothing inserted in DB.");
      }
    } catch (err) {
      console.error("DB insert error:", err);
      toast.error("Failed to store answer.");
    }

    setResults([]);
    setUserAnswer("");
    setLoading(false);
    setHasSubmitted(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Record Your Answer</h3>
      
      <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden mb-4">
        <Image
          src="/webcam.png"
          alt="Webcam Icon"
          fill
          className="object-cover opacity-20"
        />
        <Webcam
          mirrored={true}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      <Button
        disabled={loading}
        className={`w-full py-3 text-base font-medium transition-colors ${
          isRecording
            ? "bg-red-600 hover:bg-red-700 text-white"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
        onClick={StartStopRecording}
      >
        <Mic className="w-5 h-5 mr-2" />
        {isRecording ? "Stop Recording" : "Start Recording"}
      </Button>

      {(userAnswer || interimResult) && (
        <div className="mt-4 p-4 rounded-lg bg-gray-50 border border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Your Answer</h4>
          <div className="p-3 bg-white rounded border border-gray-200">
            <p className="text-gray-800 whitespace-pre-wrap">
              {interimResult || userAnswer}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default RecordAnswerSection;
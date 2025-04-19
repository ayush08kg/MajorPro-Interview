"use client";
import Webcam from "react-webcam";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic } from "lucide-react";
import { toast } from "sonner";
import { ChatSession } from "@google/generative-ai";
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
    results.map((result) =>
      setUserAnswer((prevAns) => prevAns + result?.transcript)
    );
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      UpdateUserAnswer();
    }
  }, [userAnswer]);

  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  const UpdateUserAnswer = async () => {
    setLoading(true);

    const feedbackPrompt =
      "Question:" +
      mockInterviewQuestion[activeQuestionIndex]?.question +
      ", User Answer:" +
      userAnswer +
      ",depending on question and user answer for given interview question" +
      "please give us rating out of 10 and please be easy on giving rating, rate a little higher for answer and feedback as area of improvement if any." +
      "I just need one feedback inside my json containing 3-4 lines" +
      " in JSON format with rating field and feedback field ";

    let mockJsonResp = "";

    try {
      const res = await fetch("/api/geminiModal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: feedbackPrompt }),
      });

      const data = await res.json();
      mockJsonResp = data.response
        .replace("```json", "")
        .replace("```", "")
        .trim();

      console.log("Raw Gemini Response:", mockJsonResp);
    } catch (err) {
      console.error("Error fetching from Gemini API:", err);
      toast.error("Gemini API failed.");
      setLoading(false);
      return;
    }

    let JsonFeedbackResp;

    try {
      JsonFeedbackResp = JSON.parse(mockJsonResp);
    } catch (parseErr) {
      console.error("Error parsing Gemini JSON:", parseErr);
      toast.error("Invalid feedback format from Gemini.");
      setLoading(false);
      return;
    }

    try {
      const resp = await db.insert(UserAnswer).values({
        mockIdRef: interviewData?.mockId,
        question: mockInterviewQuestion[activeQuestionIndex]?.question,
        correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
        userAns: userAnswer,
        feedback: JsonFeedbackResp?.feedback,
        rating: JsonFeedbackResp?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format("DD-MM-yyyy"),
      });

      if (resp) {
        toast.success("Answer recorded successfully ✅");
        setResults([]);
      }
    } catch (err) {
      console.error("Error inserting into DB:", err);
      toast.error("Failed to store answer.");
    }
    setResults([]);
    setUserAnswer("");
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center flex-col px-4">
      <div className="flex mt-16 flex-col justify-center items-center bg-gray-900 rounded-2xl p-5 relative shadow-lg w-full max-w-md">
        <Image
          src="/webcam.png"
          alt="Webcam Icon"
          width={200}
          height={200}
          className="absolute opacity-20"
        />
        <Webcam
          mirrored={true}
          style={{
            height: 300,
            width: "100%",
            borderRadius: "1rem",
            zIndex: 10,
            objectFit: "cover",
          }}
        />
      </div>

      <Button
        disabled={loading}
        variant="outline"
        className={`my-8 px-6 py-3 rounded-full text-base font-medium transition-all duration-300 ${
          isRecording
            ? "bg-red-100 text-red-700 border-red-300 hover:bg-red-200"
            : "bg-blue-100 text-blue-700 border-blue-300 hover:bg-blue-200"
        }`}
        onClick={StartStopRecording}
      >
        <span className="flex items-center gap-2">
          <Mic className="w-5 h-5" />
          {isRecording ? "Stop Recording" : "Record Answer"}
        </span>
      </Button>
    </div>
  );
}

export default RecordAnswerSection;

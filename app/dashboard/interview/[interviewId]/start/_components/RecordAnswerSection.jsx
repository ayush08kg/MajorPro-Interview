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
    setResults
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
    console.log(userAnswer);
    setLoading(true);

    const feedbackPrompt =
      "Question:" +
      mockInterviewQuestion[activeQuestionIndex]?.question +
      ", User Answer:" +
      userAnswer +
      ",depending on question and user answer for given interview question" +
      "please give us rating for answer and feedback as area of improvement if any." +
      "I just need one feedback inside my json containing 3-4 lines" +
      " in JSON format with rating field and feedback field ";

    let mockJsonResp = ""; // ✅ Declare here so it's always accessible

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

      if (resp){
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
    <div className="flex items-center justify-center flex-col">
      <div className="flex mt-20 flex-col justify-center bg-black items-center rounded-lg p-5">
        <Image
          src="/webcam.png"
          alt="Webcam Icon"
          width={200}
          height={200}
          className="absolute"
        />
        <Webcam
          mirrored={true}
          style={{
            height: 300,
            width: "100%",
            zindex: 10,
          }}
        />
      </div>
      <Button
        disabled={loading}
        variant="outline"
        className="my-10 hover:cursor-pointer"
        onClick={StartStopRecording}
      >
        {isRecording ? (
          <h2 className="text-red-600 flex gap-2">
            <Mic /> Stop Recording
          </h2>
        ) : (
          <h2 className="text-blue-600 flex gap-2">
            <Mic /> Record Answer
          </h2>
        )}
      </Button>

      {/* <h1>Recording: {isRecording.toString()}</h1>
      <button onClick={isRecording ? stopSpeechToText : startSpeechToText}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      <ul>
        {results.map((result) => (
          <li key={result.timestamp}>{result.transcript}</li>
        ))}
        {interimResult && <li>{interimResult}</li>}
      </ul> */}
    </div>
  );
}

export default RecordAnswerSection;

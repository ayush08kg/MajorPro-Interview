"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState, use } from "react";
import Webcam from "react-webcam";

function Interview({ params }) {
  const unwrappedParams = use(params);
  const [interviewData, setInterviewData] = useState();
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, unwrappedParams.interviewId));
    setInterviewData(result[0]);
  };

  return (
    <div className="min-h-screen mt-5 mb-5 py-12 px-6 md:px-16 bg-gradient-to-br from-gray-200 via-blue-100 to-white rounded-4xl">
      <h2 className="text-4xl font-bold text-center text-blue-700 mb-10">
        Ready for Your Interview?
        <br />
        Just a Small Environment Checkup.
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto items-start">
        <div className="flex flex-col items-center justify-center bg-white rounded-3xl p-6 shadow-lg border">
          {webCamEnabled ? (
            <>
            <Webcam
              onUserMedia={() => setWebCamEnabled(true)}
              onUserMediaError={() => setWebCamEnabled(false)}
              mirrored={true}
              audio={true}
              muted = {true}
              className="rounded-2xl shadow-md"
              style={{ width: "100%", height: "auto", maxWidth: "500px" }}
            />
            <h2 className="font-bold mt-2 text-green-600">Everything looks fine..You are Good to Go 🏁 <br />To be on 
            a safer side check if your Mic is enabled or not!!!</h2>
            </>
          ) : (
            <>
              <div className="w-full flex justify-center items-center h-64 bg-blue-100 rounded-xl mb-6">
                <WebcamIcon className="h-20 w-20" />
              </div>
              <Button
                className="w-full bg-blue-700 text-white rounded-xl hover:bg-blue-800 transition"
                onClick={() => setWebCamEnabled(true)}
              >
                Enable Webcam & Microphone
              </Button>
            </>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <div className="p-6 rounded-2xl shadow-md border bg-white space-y-4">
            {interviewData ? (
              <>
                <h2 className="text-lg text-gray-700">
                  <span className="font-bold text-green-600">Job Role:</span> {interviewData.jobPosition}
                </h2>
                <h2 className="text-lg text-gray-700">
                  <span className="font-bold text-green-600">Description:</span> {interviewData.jobDesc}
                </h2>
                <h2 className="text-lg text-gray-700">
                  <span className="font-bold text-green-600">Experience:</span> {interviewData.jobExperience}
                </h2>
              
              </>
            ) : (
              <p className="text-gray-500">Loading interview details...</p>
            )}
          </div>

          <div className="p-5 rounded-2xl border-l-4 border-yellow-400 bg-yellow-50 shadow-sm">
            <div className="flex gap-2 items-center text-yellow-700 font-medium">
              <Lightbulb className="w-5 h-5" />
              <span>Pro Tip</span>
            </div>
            <p className="text-yellow-700 mt-2 text-sm">
              {process.env.NEXT_PUBLIC_INFORMATION}
            </p>
          </div>

          <Link href={`/dashboard/interview/${unwrappedParams.interviewId}/start`}>
            <Button className="w-full py-7 text-lg font-semibold bg-gradient-to-r from-blue-700 to-indigo-600 text-white rounded-xl hover:from-indigo-700 hover:to-blue-800 transition-all shadow-lg">
              Start Interview
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Interview;

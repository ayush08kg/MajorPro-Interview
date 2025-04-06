"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, WebcamIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";

function Interview({ params }) {
  const [interviewData, setInterviewData] = useState();
  const [webCamEnabled, setWebCamEnabled] = useState(false);
  useEffect(() => {
    console.log(params.interviewId);
    GetInterviewDetails();
  }, []);
  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));
    setInterviewData(result[0]);
  };
  return (
    <div className="my-10 flex justify-center flex-col items-center">
      <h2 className="font-bold text-2xl">Let's Get Started</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          {webCamEnabled ? (
            <Webcam
              onUserMedia={() => setWebCamEnabled(true)}
              onUserMediaError={() => setWebCamEnabled(false)}
              mirrored={true}
              style={{
                height: 300,
                width: 300,
              }}
            />
          ) : (
            // <div className="h-[300px] w-[300px] bg-secondary rounded-lg border flex flex-col items-center justify-center gap-5">
            //   <WebcamIcon className="h-20 w-20 text-gray-500" />
            //   <Button
            //     className="bg-gray-300 text-black hover:bg-gray-100 hover:text-black hover:cursor-pointer"
            //     onClick={() => setWebCamEnabled(true)}
            //   >
            //     Enable Web Cam and Microphone
            //   </Button>
            // </div>
            <>
            <WebcamIcon className="h-72 w-full my-7 p-20 bg-secondary rounded-lg border" />
            <Button className="w-full rounded-2xl " onClick={() => setWebCamEnabled(true)}>
              Enable Web Cam and Microphone
            </Button>
          </>
          )}
        </div>

        <div className="flex flex-col my-5 gap-5">
          <div className="flex flex-col p-5 rounded-lg border gap-5">
            {interviewData ? (
              <>
                <h2 className="text-lg">
                  <strong>Job Role/Job Position : </strong>
                  {interviewData.jobPosition}
                </h2>
                <h2 className="text-lg">
                  <strong>Job Description/Tech Stack : </strong>
                  {interviewData.jobDesc}
                </h2>
                <h2 className="text-lg">
                  <strong>Years of Experience : </strong>
                  {interviewData.jobExperience}
                </h2>
              </>
            ) : (
              <p>Loading interview details...</p>
            )}
          </div>

          <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100">
            <h2 className="flex gap-2 items-center text-yellow-600">
              <Lightbulb />
              <strong>Information</strong>
            </h2>
            <h2 className="mt-2 text-yellow-700">
              {process.env.NEXT_PUBLIC_INFORMATION}
            </h2>
          </div>

          <Button className="bg-blue-700 text-white border border-transparent hover:bg-white hover:text-blue-700 hover:border-blue-800 hover:cursor-pointer rounded-2xl">
            Start Interview
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Interview;

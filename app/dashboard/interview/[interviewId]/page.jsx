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
    <div className="min-h-screen py-12 px-4 sm:px-8 ">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Ready for Your Interview?
          </h2>
          <p className="text-lg text-gray-600">
            Let's make sure everything is set up perfectly
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Webcam Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Environment Check
              </h3>
              
              {webCamEnabled ? (
                <div className="space-y-4">
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                    <Webcam
                      onUserMedia={() => setWebCamEnabled(true)}
                      onUserMediaError={() => setWebCamEnabled(false)}
                      mirrored={true}
                      audio={true}
                      muted={true}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm text-green-600 font-medium flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Everything looks good! Check your microphone is enabled.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="aspect-video flex items-center justify-center bg-gray-100 rounded-lg">
                    <div className="text-center p-6">
                      <WebcamIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 mb-4">
                        Enable your camera and microphone to test your setup
                      </p>
                      <Button
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => setWebCamEnabled(true)}
                      >
                        Enable Webcam & Microphone
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Interview Details Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Interview Details
              </h3>
              
              {interviewData ? (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Job Role</h4>
                    <p className="text-lg font-semibold text-gray-900">{interviewData.jobPosition}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Description</h4>
                    <p className="text-gray-700">{interviewData.jobDesc}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Experience Level</h4>
                    <p className="text-gray-700">{interviewData.jobExperience}</p>
                  </div>
                </div>
              ) : (
                <div className="flex justify-center py-8">
                  <div className="animate-pulse flex space-x-4">
                    <div className="flex-1 space-y-4 py-1">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Pro Tip Card */}
            <div className="bg-blue-50 border-l-4 border-blue-400 rounded-lg p-5">
              <div className="flex items-start">
                <Lightbulb className="flex-shrink-0 h-5 w-5 text-blue-500 mt-0.5" />
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-blue-800">Pro Tip</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    {process.env.NEXT_PUBLIC_INFORMATION}
                  </p>
                </div>
              </div>
            </div>

            {/* Start Button */}
            <Link href={`/dashboard/interview/${unwrappedParams.interviewId}/start`}>
              <Button className="w-full py-6 text-lg font-medium bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md transition-all">
                Start Interview Now
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Interview;
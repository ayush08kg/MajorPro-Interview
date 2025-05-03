"use client";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState, use } from "react"; // Added 'use' import
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown, ArrowLeft, Star, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

function Feedback({ params }) {
  const { interviewId } = use(params); // Properly unwrap params with use()
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
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            variant="ghost"
            className="mb-6 text-white hover:text-white hover:bg-blue-400 cursor-pointer bg-blue-600 transition-colors"
            onClick={() => router.replace("/dashboard")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </motion.div>

        {feedbackList?.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-sm p-8 text-center"
          >
            <h2 className="font-bold text-2xl text-gray-400">
              No Interview Feedback Record Found
            </h2>
          </motion.div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-sm overflow-hidden mb-8"
            >
              <div className="p-8 md:p-10 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                <div className="flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 mr-2" />
                  <h2 className="text-3xl md:text-4xl font-bold text-center">
                    Interview Results
                  </h2>
                </div>
                <p className="text-center text-indigo-100 max-w-lg mx-auto">
                  Here's your detailed performance analysis with AI-powered feedback
                  to help you improve.
                </p>

                <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-xs mx-auto">
                  <div className="flex items-center justify-center mb-2">
                    {[...Array(10)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-white/30'}`}
                      />
                    ))}
                  </div>
                  <div className="text-center">
                    <span className="text-4xl font-bold">{rating}</span>
                    <span className="text-xl opacity-80">/10</span>
                  </div>
                  <p className="text-center text-sm mt-2 text-indigo-100">
                    Average Rating
                  </p>
                </div>
              </div>
            </motion.div>

            <div className="space-y-4">
              {feedbackList.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Collapsible className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md cursor-pointer">
                    <CollapsibleTrigger className="w-full p-6 text-left flex justify-between items-center gap-3 font-medium text-gray-800 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start">
                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full  text-indigo-800 text-sm font-semibold mr-3 mt-0.5">
                          {index + 1}
                        </span>
                        <span>{item.question}</span>
                      </div>
                      <ChevronsUpDown className="h-5 w-5 text-gray-400 shrink-0" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="p-6 pt-0 space-y-4">
                      <div className="flex items-center">
                        <div className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-sm font-medium flex items-center">
                          <Star className="h-4 w-4 mr-1 fill-amber-400 text-amber-400" />
                          Rating: {item.rating}/10
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <h3 className="font-medium text-gray-700 mb-2 flex items-center">
                            <span className="inline-block h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                            Your Answer
                          </h3>
                          <p className="text-gray-600">{item.userAns}</p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <h3 className="font-medium text-gray-700 mb-2 flex items-center">
                            <span className="inline-block h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                            AI's Suggestion
                          </h3>
                          <p className="text-gray-600">{item.correctAns}</p>
                        </div>
                      </div>

                      <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-100">
                        <h3 className="font-medium text-indigo-700 mb-2">Feedback</h3>
                        <p className="text-indigo-600">{item.feedback}</p>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Feedback;
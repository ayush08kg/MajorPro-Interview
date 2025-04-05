"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle } from "lucide-react";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading,setLoading] = useState(false);

  const onSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    console.log("Sending Prompt:", jobPosition, jobDesc, jobExperience);

    const InputPrompt = `Job Position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}. Depending on this information, please provide me 5 interview questions with answers in JSON format. Give 'questions' and 'answers' as fields in the JSON.`;

    try {
      const response = await fetch("/api/geminiModal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: InputPrompt }),
      });

      const data = await response.json();
      // console.log("Full Response:", data); it is the full response

      const raw = data.response;
      if (!raw) {
        console.error("AI response is undefined or empty:", data);
        return;
      }

      // Clean the string and parse the JSON
      let cleaned = raw
        .replace(/```json|```/g, "")     // remove triple backticks and 'json'
        .replace(/^AI Response:\s*/i, "") // remove "AI Response:"
        .trim();

      const parsed = JSON.parse(cleaned);
      const interviewQuestions = parsed.interviewQuestions;

      console.log(interviewQuestions); //json format questions
    } catch (error) {
      console.error("Error fetching AI response:", error);
    }
    setLoading(false )
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="font-semibold text-lg text-center">+ Add New</h2>
      </div>

      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your job interview
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <h2>
                    Add details about your job position/role, job description,
                    and years of experience
                  </h2>
                  <div className="mt-7 my-3">
                    <label>Job Role/Job Position</label>
                    <Input
                      placeholder="Ex. Full Stack Developer"
                      required
                      onChange={(event) =>
                        setJobPosition(event.target.value)
                      }
                    />
                  </div>
                  <div className="my-3">
                    <label>Job Description/ Tech Stack</label>
                    <Textarea
                      placeholder="Ex. React, Angular, NodeJs etc"
                      required
                      onChange={(event) => setJobDesc(event.target.value)}
                    />
                  </div>
                  <div className="my-3">
                    <label>Years of experience</label>
                    <Input
                      placeholder="Ex. 5"
                      type="number"
                      max="100"
                      required
                      onChange={(event) =>
                        setJobExperience(event.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="flex gap-5 justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled = {loading}>
                    {loading?
                    <>
                    <LoaderCircle className="animate-spin"/> 'Generating from AI'
                    </>: 'Start Interview'}</Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;

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
import { MockInterview } from "@/utils/schema";
import { db } from "@/utils/db";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const [questionno,setQuestionno] = useState(5);
  const router = useRouter();
  const { user } = useUser();

  const handlechange = (e) =>{
    const change = parseInt(e.target.value,10);
    console.log(change);
    if(isNaN(change) || change>5 || change<2){
      setError(true);
      toast.error("Invalid No. of Questions")
      return ;
    }
    else{
      setQuestionno(change);
      setError(false)
    }
  }

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const InputPrompt = `Job Position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}. Depending on this information, please provide me ${questionno} interview questions with answers in JSON format. Give 'questions' and 'answers' as fields in the JSON.`;

    try {
      const response = await fetch("/api/geminiModal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: InputPrompt }),
      });

      const data = await response.json();
      const raw = data.response;

      if (!raw) {
        console.error("AI response is undefined or empty:", data);
        return;
      }

      let cleaned = raw
        .replace(/```json|```/g, "")
        .replace(/^AI Response:\s*/i, "")
        .trim();

      const parsed = JSON.parse(cleaned);
      const interviewQuestions = parsed.interviewQuestions;

      setJsonResponse(cleaned);

      const resp = await db.insert(MockInterview).values({
        mockId: uuidv4(),
        jsonMockResp: cleaned,
        jobPosition: jobPosition,
        jobDesc: jobDesc,
        jobExperience: jobExperience,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format("DD-MM-yyyy"),
      }).returning({ mockId: MockInterview.mockId });

      if (resp) {
        setOpenDialog(false);
        router.push('/dashboard/interview/' + resp[0]?.mockId);
      }
    } catch (error) {
      console.error("Error fetching or parsing AI response:", error);
    }

    setLoading(false);
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-black text-white hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="font-semibold text-lg text-center">+ Add New</h2>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your job interview
            </DialogTitle>
            <DialogDescription>
              Add details about your job position/role, job description, and years of experience.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={onSubmit}>
            <div className="mt-4">
              <div className="mt-7 my-3">
                <label>Job Role/Job Position</label>
                <Input
                  placeholder="Ex. Full Stack Developer"
                  required
                  onChange={(event) => setJobPosition(event.target.value)}
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
                  onChange={(event) => setJobExperience(event.target.value)}
                />
              </div>
              <div className="my-3">
                <label>No. Of Questions</label>
                <Input
                  placeholder="Enter number of questions (min: 3, max: 5)"
                  type="number"
                  max="100"
                  required
                  onChange={handlechange}
                />
              </div>
            </div>

            <div className="flex gap-5 justify-end mt-6">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setOpenDialog(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading || error}>
                {loading ? (
                  <>
                    <LoaderCircle className="animate-spin" /> Generating from AI
                  </>
                ) : (
                  "Start Interview"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;

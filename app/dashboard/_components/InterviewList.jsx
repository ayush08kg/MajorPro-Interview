"use client"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { desc, eq , and} from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import InterviewItemCard from './InterviewItemCard';

function InterviewList() {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);

  useEffect(() => {
    user && GetInterviewList();
  }, [user]);

  const GetInterviewList = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(MockInterview.id));
    console.log(result);
    setInterviewList(result);
  };

  const handleDelete = async (mockId) => {
    try {
      await db
        .delete(MockInterview)
        .where(eq(MockInterview.mockId, mockId)); // assuming `mockId` is primary key
  
      const updatedList = interviewList.filter(item => item.mockId !== mockId);
      setInterviewList(updatedList);
  
      console.log(`Deleted interview with mockId: ${mockId}`);
    } catch (error) {
      console.error("Failed to delete from DB:", error);
    }
  };

  return (
    <div>
      <h2 className='font-bold text-xl'>Previous Interviews</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-3'>
        {interviewList &&
          interviewList.map((interview, index) => (
            <InterviewItemCard
              key={interview.mockId || index}
              interview={interview}
              onDelete={handleDelete}
            />
          ))}
      </div>
    </div>
  );
}

export default InterviewList;

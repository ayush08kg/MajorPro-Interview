'use client'
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import InterviewItemCard from './InterviewItemCard';

function InterviewList() {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    user && GetInterviewList();
  }, [user]);

  const GetInterviewList = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(MockInterview.id));
    
    setInterviewList(result);
  };

  const handleDelete = async (mockId) => {
    try {
      await db
        .delete(MockInterview)
        .where(eq(MockInterview.mockId, mockId));

      const updatedList = interviewList.filter(item => item.mockId !== mockId);
      setInterviewList(updatedList);
    } catch (error) {
      console.error("Failed to delete from DB:", error);
    }
  };

  const visibleInterviews = showAll ? interviewList : interviewList.slice(0, 3);

  return (
    <div className='w-full'>
      <h2 className='font-bold text-xl text-gray-700 mb-2'>Previous Interviews</h2>

      {interviewList.length === 0 ? (
        <p className='text-gray-500'>No interviews yet.</p>
      ) : (
        <>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4'>
            {visibleInterviews.map((interview, index) => (
              <InterviewItemCard
                key={interview.mockId || index}
                interview={interview}
                onDelete={handleDelete}
              />
            ))}
          </div>

          {interviewList.length > 3 && (
            <div className='flex justify-end'>
              <button
                onClick={() => setShowAll(!showAll)}
                className='px-4 py-2 text-sm font-medium bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition duration-200'
              >
                {showAll ? 'Show Less' : 'View All'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default InterviewList;

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

function InterviewItemCard({ interview , onDelete }) {
  const router = useRouter();

  const onStart = () => {
    router.push('/dashboard/interview/' + interview?.mockId);
  };

  const onFeedback = () => {
    router.push('/dashboard/interview/' + interview?.mockId + "/feedback");
  };
  
  

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-4 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-white/40 hover:border-white/40 cursor-pointer">
      <h2 className="font-bold text-black">{interview?.jobPosition}</h2>
      <h2 className="text-sm text-gray-400">{interview?.jobExperience} Years of Experience</h2>
      <h2 className="text-xs text-gray-600">Created On: {interview.createdAt}</h2>
      <div className="flex justify-between mt-3">
        <Button size="sm" variant="outline" onClick={onFeedback} className="cursor-pointer">Feedback</Button>
        <div className="flex justify-between gap-2">
        <Button size="sm" onClick={onStart} className="cursor-pointer">Start</Button>
        <Button
          size="sm"
          className="bg-red-400  hover:bg-white "
          onClick={() => onDelete(interview.mockId)}
        ><img src="dustbin.png" className='w-4 h-5 cursor-pointer' alt="" /></Button>
        </div>
        
      </div>
    </div>
  );
}

export default InterviewItemCard;

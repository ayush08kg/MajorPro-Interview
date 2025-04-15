'use client'
import { useUser } from '@clerk/nextjs'
import React from 'react'
import AddNewInterview from './_components/AddNewInterview'
import InterviewList from './_components/InterviewList'

function Dashboard() {
  const { user } = useUser();

  return (
    <div className='p-10 min-h-screen bg-gradient-to-br mt-3 mb-3 from-gray-200 via-blue-100 to-white rounded-4xl'>
      {/* Top Section: Heading + User Photo + Name */}
      <div className='flex justify-between items-start md:items-center flex-wrap gap-4'>
        {/* Left Side: Heading */}
        <div>
          <h2 className='font-bold text-3xl'>Dashboard</h2>
          <h2 className='text-gray-500'>Hey you let's get you onboard to a Mock Interview powered by AI.</h2>
        </div>

        {/* Right Side: User Profile Section */}
        {user && (
          <div className='flex flex-col items-center bg-white/10 backdrop-blur-md border cursor-pointer border-blue-200 rounded-3xl p-4 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-blue-300'>
            <img
              src={user.imageUrl}
              alt='User Profile'
              className='w-20 h-20 rounded-full object-cover shadow-md'
            />
            <h2 className='mt-2 text-lg font-bold text-gray-800 text-center'>
              {user.fullName}
            </h2>
            <h2 className='text-sm text-gray-500 text-center'>
              {user.primaryEmailAddress?.emailAddress}
            </h2>
          </div>
        )}
      </div>

      {/* Add Interview Button */}
      <div className='grid grid-cols-1 md:grid-cols-3 mb-8'>
        <AddNewInterview />
      </div>

      {/* Previous Interviews */}
      <div>
        <InterviewList />
      </div>
    </div>
  )
}

export default Dashboard

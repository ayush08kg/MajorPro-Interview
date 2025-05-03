'use client'
import { useUser } from '@clerk/nextjs'
import React from 'react'
import AddNewInterview from './_components/AddNewInterview'
import InterviewList from './_components/InterviewList'

function Dashboard() {
  const { user } = useUser();

  return (
    <div className='p-10 min-h-screen bg-gradient-to-br mt-3 from-gray-200 via-blue-100 to-white rounded-4xl font-sans'>
      {/* Top Section: Heading + User Photo + Name */}
      <div className='flex justify-between items-start md:items-center flex-wrap gap-4 mb-6'>
        {/* Left Side: Heading */}
        <div>
          <h2 className='font-extrabold text-4xl text-blue-900'>Dashboard</h2>
          <p className='text-gray-600 mt-1 text-md'>Get started with interview prep powered by AI!</p>
          <span className='inline-block mt-2 px-4 py-2 text-xs font-semibold text-white bg-blue-500 rounded-full animate-pulse shadow-md'>
            🚀 Welcome back!
          </span>
        </div>

        {/* Right Side: User Profile Section */}
        {user && (
          <div className='relative flex flex-col items-center bg-white/30 backdrop-blur-lg border border-blue-200 cursor-pointer rounded-3xl p-4 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-blue-300'>
            <div className='relative'>
              <img
                src={user.imageUrl}
                alt='User Profile'
                className='w-20 h-20 rounded-full object-cover shadow-md'
              />
              <span className='absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full'></span>
            </div>
            <h2 className='mt-3 text-lg font-semibold text-gray-800 text-center'>
              {user.fullName}
            </h2>
            <p className='text-sm text-gray-500 text-center'>
              {user.primaryEmailAddress?.emailAddress}
            </p>
          </div>
        )}
      </div>

      {/* Section Divider */}
      <hr className='my-6 border-t border-blue-200/40' />

      {/* Add Interview Button */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-12'>
        <AddNewInterview />
      </div>

      {/* Previous Interviews */}
      <div className='bg-white/50 backdrop-blur-md rounded-2xl p-6 shadow-md border border-blue-100'>
        <InterviewList />
      </div>
    </div>
  )
}

export default Dashboard

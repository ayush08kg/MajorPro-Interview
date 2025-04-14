import React from "react";

function Resources() {
  return (
    <div>
      <div className="mt-3">
        <h2 className="text-2xl mt-7 font-bold text-blue-700 mb-5">Interview Prep Guide:</h2>

        {/* Section 1 - DSA */}
        <h1 className="font-extrabold text-3xl my-3">1. Data Structures & Algorithms</h1>
        <div className="pl-7">
          <p className="text-md text-gray-500">
            Master the core concepts tested in technical interviews, from arrays to dynamic programming. <br />
            This section includes structured topic breakdowns and trusted resources like DSA sheets and Youtube Gurus.
            <br />
            Here's a complete <strong>Roadmap</strong>:
          </p>

          <a href="https://medium.com/@najmulhaque069/dsa-roadmap-in-2024-28cb5edbe7a2" target="_blank">
            <img src="/DSA_Road.png" alt="DSA Roadmap" className="rounded-2xl py-3" />
          </a>

          <div className="flex gap-2 items-center">
            <img src="/yt.png" alt="YouTube Icon" className="h-10 w-10" />
            <p className="font-extrabold">Playlists:</p>
          </div>

          <div className="grid grid-cols-3 gap-5 pl-5 mt-3">
            {/* Striver */}
            <div className="relative w-60 h-50 group cursor-pointer">
              <a href="https://www.youtube.com/@takeUforward/playlists" target="_blank" rel="noopener noreferrer">
                <img src="/striver.png" alt="TakeUForward" className="rounded-full w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-110" />
                <div className="absolute inset-0 bg-transparent bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-lg font-semibold">Striver Playlists</p>
                </div>
              </a>
            </div>

            {/* Abdul Bari */}
            <div className="relative w-60 h-50 group cursor-pointer">
              <a href="https://www.youtube.com/@abdul_bari/playlists" target="_blank" rel="noopener noreferrer">
                <img src="/abdul.png" alt="Abdul Bari" className="rounded-full w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-110" />
                <div className="absolute inset-0 bg-transparent bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-lg font-semibold">Abdul Bari Playlists</p>
                </div>
              </a>
            </div>

            {/* CodeHelp */}
            <div className="relative w-60 h-50 group cursor-pointer">
              <a href="https://www.youtube.com/@CodeHelp/playlists" target="_blank" rel="noopener noreferrer">
                <img src="/luv.png" alt="CodeHelp" className="rounded-full w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-110" />
                <div className="absolute inset-0 bg-transparent bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-lg font-semibold">CodeHelp Playlists</p>
                </div>
              </a>
            </div>
          </div>

          {/* Sheets Section */}
          <div className="flex gap-2 items-center mt-6">
            <img src="/doc.png" alt="Document Icon" className="h-10 w-10" />
            <p className="font-extrabold">Sheets:</p>
          </div>

          <div className="space-y-2 mt-3">
            <h2 className="font-semibold text-lg p-3 bg-gray-100 rounded-xl hover:scale-105 transition-transform">
              <a href="https://www.naukri.com/code360/problem-lists/love-babbar-dsa-sheet-problems" target="_blank">
                1. Luv Babbar DSA Sheet
              </a>
            </h2>
            <h2 className="font-semibold text-lg p-3 bg-gray-100 rounded-xl hover:scale-105 transition-transform">
              <a href="https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems" target="_blank">
                2. Striver DSA Sheet
              </a>
            </h2>
            <h2 className="font-semibold text-lg p-3 bg-gray-100 rounded-xl hover:scale-105 transition-transform">
              <a href="https://github.com/aman0046/TOP-100-DSA-Interview-Questions" target="_blank">
                3. Top-100 DSA Questions
              </a>
            </h2>
          </div>
        </div>

        {/* Section 2 - Behavioral */}
        <h1 className="font-extrabold text-3xl mb-3 mt-8">2. Behavioral Interview Frameworks</h1>
        <p className="text-md text-gray-500 mb-3 pl-7">
          Ace the HR and managerial rounds with frameworks like STAR and SPSE.<br />
          Learn to structure impactful stories and present your soft skills effectively.
        </p>
        <div className="pl-7 space-y-4">
          <div>
            <h2 className="text-xl font-bold text-green-600">STAR Methodology:</h2>
            <a href="https://capd.mit.edu/resources/the-star-method-for-behavioral-interviews/" target="_blank">
              <img src="/start.png" alt="STAR Method" className="h-100 w-150 mt-2" />
            </a>
          </div>
          <div>
            <h2 className="text-xl font-bold text-green-600">SPSE Methodology:</h2>
            <a href="https://www.futurelearn.com/info/courses/english-for-study-intermediate/0/steps/35202" target="_blank">
              <img src="/SPSE.png" alt="SPSE Method" className="h-100 w-150 mt-2" />
            </a>
          </div>
        </div>

        {/* Section 3 - Coursework */}
        <h1 className="font-extrabold text-3xl mb-3 mt-8">3. CourseWork Preparation</h1>
        <p className="text-md text-gray-500 mb-3 pl-7">
          Brush up on OS, DBMS, CN, and OOPs — pillars of technical interviews.<br />
          Use these resources for quick revisions and interview-focused notes.
        </p>
        <div className="pl-7 mt-2 space-y-3">
          {[
            ["https://www.interviewbit.com/technical-interview-questions/", "InterviewBit"],
            ["https://www.sanfoundry.com/professional-communication-questions-answers-types-interview/#google_vignette", "SanFoundary"],
            ["https://www.simplilearn.com/hr-interview-questions-answers-article", "SimpliLearn"],
            ["https://www.naukri.com/code360/library/interview-questions", "Naukri"],
            ["https://prepinsta.com/interview-preparation/", "PrepInsta"],
          ].map(([link, label]) => (
            <a href={link} target="_blank" key={label}>
              <div className="flex gap-5 bg-gray-50 w-120 rounded-xl hover:scale-105 hover:cursor-pointer p-3">
                <img src="/wesbite.png" alt={`${label} Icon`} className="h-10 mt-2" />
                <h2 className="pt-2 font-semibold">{label}</h2>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Resources;

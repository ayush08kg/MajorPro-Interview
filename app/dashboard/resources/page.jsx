import React from "react";

function Resources() {
  return (
    <div className="p-5 md:p-10">
      <div className="mt-3">
        <h2 className="text-3xl font-bold text-blue-700 mb-8">Interview Prep Guide:</h2>

        {/* Section 1 - DSA */}
        <h1 className="font-extrabold text-2xl md:text-3xl mb-4">1. Data Structures & Algorithms</h1>
        <div className="pl-4 md:pl-7 text-gray-600">
          <p className="mb-4">
            Master the core concepts tested in technical interviews, from arrays to dynamic programming.
            This section includes structured topic breakdowns and trusted resources like DSA sheets and YouTube Gurus.
            <br />
            Here's a complete <strong className="text-black">Roadmap</strong>:
          </p>

          <a href="https://medium.com/@najmulhaque069/dsa-roadmap-in-2024-28cb5edbe7a2" target="_blank" rel="noreferrer">
            <img src="/DSA_Road.png" alt="DSA Roadmap" className="rounded-2xl py-3 shadow-lg hover:scale-105 transition-transform" />
          </a>

          {/* YouTube Section */}
          <div className="flex items-center gap-3 mt-5">
            <img src="/yt.png" alt="YouTube Icon" className="h-8 w-8" />
            <p className="font-bold text-lg">Playlists:</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            {[
              { href: "https://www.youtube.com/@takeUforward/playlists", img: "/striver.png", label: "Striver Playlists" },
              { href: "https://www.youtube.com/@abdul_bari/playlists", img: "/abdul.png", label: "Abdul Bari Playlists" },
              { href: "https://www.youtube.com/@CodeHelp/playlists", img: "/luv.png", label: "CodeHelp Playlists" },
            ].map(({ href, img, label }) => (
              <div key={label} className="relative w-full group cursor-pointer aspect-square">
                <a href={href} target="_blank" rel="noopener noreferrer">
                  <img src={img} alt={label} className="rounded-full w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-110 shadow-md" />
                  <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white text-lg font-semibold">{label}</p>
                  </div>
                </a>
              </div>
            ))}
          </div>

          {/* Sheets Section */}
          <div className="flex gap-2 items-center mt-8">
            <img src="/doc.png" alt="Document Icon" className="h-8 w-8" />
            <p className="font-bold text-lg">Sheets:</p>
          </div>

          <div className="mt-4 space-y-3">
            {[
              ["https://www.naukri.com/code360/problem-lists/love-babbar-dsa-sheet-problems", "1. Luv Babbar DSA Sheet"],
              ["https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems", "2. Striver DSA Sheet"],
              ["https://github.com/aman0046/TOP-100-DSA-Interview-Questions", "3. Top-100 DSA Questions"],
            ].map(([href, label]) => (
              <h2 key={label} className="font-medium text-md bg-gray-100 p-4 rounded-xl shadow-sm hover:scale-[1.03] transition-transform">
                <a href={href} target="_blank" rel="noopener noreferrer">{label}</a>
              </h2>
            ))}
          </div>
        </div>

        {/* Section 2 - Behavioral */}
        <h1 className="font-extrabold text-2xl md:text-3xl mt-12 mb-3">2. Behavioral Interview Frameworks</h1>
        <p className="text-md text-gray-600 pl-4 md:pl-7 mb-4">
          Ace the HR and managerial rounds with frameworks like STAR and SPSE.
          Learn to structure impactful stories and present your soft skills effectively.
        </p>
        <div className="pl-4 md:pl-7 grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-bold text-green-600 mb-2">STAR Methodology:</h2>
            <a href="https://capd.mit.edu/resources/the-star-method-for-behavioral-interviews/" target="_blank" rel="noreferrer">
              <img src="/start.png" alt="STAR Method" className="rounded-xl shadow-md hover:scale-105 transition-transform" />
            </a>
          </div>
          <div>
            <h2 className="text-xl font-bold text-green-600 mb-2">SPSE Methodology:</h2>
            <a href="https://www.futurelearn.com/info/courses/english-for-study-intermediate/0/steps/35202" target="_blank" rel="noreferrer">
              <img src="/SPSE.png" alt="SPSE Method" className="rounded-xl shadow-md hover:scale-105 transition-transform" />
            </a>
          </div>
        </div>

        {/* Section 3 - Coursework */}
        <h1 className="font-extrabold text-2xl md:text-3xl mt-12 mb-3">3. CourseWork Preparation</h1>
        <p className="text-md text-gray-600 pl-4 md:pl-7 mb-3">
          Brush up on OS, DBMS, CN, and OOPs — pillars of technical interviews.
          Use these resources for quick revisions and interview-focused notes.
        </p>

        <div className="pl-4 md:pl-7 mt-3 space-y-4">
          {[
            ["https://www.interviewbit.com/technical-interview-questions/", "InterviewBit"],
            ["https://www.sanfoundry.com/professional-communication-questions-answers-types-interview/#google_vignette", "SanFoundry"],
            ["https://www.simplilearn.com/hr-interview-questions-answers-article", "SimpliLearn"],
            ["https://www.naukri.com/code360/library/interview-questions", "Naukri"],
            ["https://prepinsta.com/interview-preparation/", "PrepInsta"],
          ].map(([href, label]) => (
            <a href={href} target="_blank" rel="noopener noreferrer" key={label}>
              <div className="flex items-center gap-4 bg-gray-50 hover:bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all hover:scale-105">
                <img src="/wesbite.png" alt={`${label} Icon`} className="h-8" />
                <h2 className="font-semibold text-md">{label}</h2>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Resources;

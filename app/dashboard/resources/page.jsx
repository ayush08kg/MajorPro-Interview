'use client'
import React from "react";
import { FaYoutube, FaFileAlt, FaGlobe, FaStar, FaChevronRight } from "react-icons/fa";

function Resources() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
          Interview Preparation Resources
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Curated collection of the best DSA, behavioral, and technical resources to ace your interviews
        </p>
      </div>

      {/* DSA Section */}
      <section className="mb-16 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-3 h-8 bg-blue-600 rounded-full"></div>
          <h2 className="text-2xl font-bold text-gray-800">Data Structures & Algorithms</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Roadmap */}
          <div className="bg-gray-50 p-5 rounded-lg">
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <FaChevronRight className="text-blue-500" /> Learning Roadmap
            </h3>
            <a href="https://medium.com/@najmulhaque069/dsa-roadmap-in-2024-28cb5edbe7a2" target="_blank" rel="noreferrer">
              <div className="relative overflow-hidden rounded-lg group">
                <img 
                  src="/DSA_Road.png" 
                  alt="DSA Roadmap" 
                  className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
              </div>
            </a>
          </div>

          {/* YouTube Playlists */}
          <div className="bg-gray-50 p-5 rounded-lg">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <FaYoutube className="text-red-500" /> Video Playlists
            </h3>
            <div className="space-y-4">
              {[
                { name: "Striver's Playlist", url: "https://www.youtube.com/@takeUforward/playlists", icon: "/striver.png" },
                { name: "Abdul Bari", url: "https://www.youtube.com/@abdul_bari/playlists", icon: "/abdul.png" },
                { name: "CodeHelp", url: "https://www.youtube.com/@CodeHelp/playlists", icon: "/luv.png" },
              ].map((resource) => (
                <a 
                  key={resource.name}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3 hover:bg-white rounded-lg transition-colors"
                >
                  <img src={resource.icon} alt={resource.name} className="w-10 h-10 rounded-full object-cover" />
                  <span className="font-medium">{resource.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* DSA Sheets */}
        <div className="mt-8 bg-gray-50 p-5 rounded-lg">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <FaFileAlt className="text-blue-500" /> Practice Sheets
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { name: "Love Babbar DSA Sheet", url: "https://www.naukri.com/code360/problem-lists/love-babbar-dsa-sheet-problems" },
              { name: "Striver's SDE Sheet", url: "https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems" },
              { name: "Top 100 DSA Questions", url: "https://github.com/aman0046/TOP-100-DSA-Interview-Questions" },
            ].map((sheet) => (
              <a
                key={sheet.name}
                href={sheet.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-white hover:bg-blue-50 rounded-lg border border-gray-200 transition-colors"
              >
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>{sheet.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Behavioral Section */}
      <section className="mb-16 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-3 h-8 bg-green-600 rounded-full"></div>
          <h2 className="text-2xl font-bold text-gray-800">Behavioral Interviews</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <FaStar className="text-yellow-500" /> STAR Method
            </h3>
            <a href="https://capd.mit.edu/resources/the-star-method-for-behavioral-interviews/" target="_blank" rel="noreferrer">
              <div className="relative overflow-hidden rounded-lg group">
                <img 
                  src="/start.png" 
                  alt="STAR Method" 
                  className="w-full h-auto border border-gray-200 transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </div>
            </a>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <FaStar className="text-yellow-500" /> SPSE Method
            </h3>
            <a href="https://www.futurelearn.com/info/courses/english-for-study-intermediate/0/steps/35202" target="_blank" rel="noreferrer">
              <div className="relative overflow-hidden rounded-lg group">
                <img 
                  src="/SPSE.png" 
                  alt="SPSE Method" 
                  className="w-full h-auto border border-gray-200 transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Technical Section */}
      <section className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-3 h-8 bg-purple-600 rounded-full"></div>
          <h2 className="text-2xl font-bold text-gray-800">Technical Resources</h2>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { name: "InterviewBit", url: "https://www.interviewbit.com/technical-interview-questions/" },
            { name: "SanFoundry", url: "https://www.sanfoundry.com/professional-communication-questions-answers-types-interview/#google_vignette" },
            { name: "SimpliLearn", url: "https://www.simplilearn.com/hr-interview-questions-answers-article" },
            { name: "Naukri Code360", url: "https://www.naukri.com/code360/library/interview-questions" },
            { name: "PrepInsta", url: "https://prepinsta.com/interview-preparation/" },
          ].map((resource) => (
            <a
              key={resource.name}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-white rounded-lg border border-gray-200 transition-all hover:shadow-sm"
            >
              <FaGlobe className="text-blue-500" />
              <span className="font-medium">{resource.name}</span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Resources;
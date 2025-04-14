import React from 'react';

const tips = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto text-gray-800">
      <h1 className="text-2xl font-bold text-blue-700 mb-6">Tips & Tricks to Crack Interviews</h1>

      {/* Before the Interview */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">🔍 Before the Interview</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>📄 Research the company: Learn about their mission, culture, and recent developments.</li>
          <li>🧠 Brush up on core CS subjects: DSA, OS, DBMS, CN, OOPs, and System Design.</li>
          <li>📝 Review your resume: Be ready to explain every project or experience you list.</li>
          <li>🎯 Practice common interview questions using the STAR or SPSE technique.</li>
          <li>💻 Solve coding problems on platforms like LeetCode, HackerRank, or CodeStudio.</li>
        </ul>
      </section>

      {/* During the Interview */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">🎙️ During the Interview</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>⏱️ Be punctual: Arrive early or join the virtual call on time.</li>
          <li>🧘 Stay calm and collected: It’s okay to take a moment before answering.</li>
          <li>💬 Speak your thoughts out loud while solving problems.</li>
          <li>❓ Ask questions if you need clarity on the problem statement.</li>
          <li>🗣️ Be honest about your knowledge—don't fake answers.</li>
        </ul>
      </section>

      {/* After the Interview */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">📩 After the Interview</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>📧 Send a polite thank-you email to your interviewer.</li>
          <li>🧠 Reflect on what went well and what you can improve.</li>
          <li>🛠️ Keep preparing while waiting for results—don’t lose momentum!</li>
        </ul>
      </section>

      {/* Bonus Tips */}
      <section>
        <h2 className="text-2xl font-semibold text-green-700 mb-4">🚀 Bonus Tips</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>🎥 Record yourself during mock interviews to observe posture and delivery.</li>
          <li>🔄 Explore past interview experiences on Glassdoor or LinkedIn.</li>
          <li>🧩 Start learning system design if aiming for big tech or senior roles.</li>
          <li>📚 Read tech blogs, GitHub projects, or books like "Cracking the Coding Interview".</li>
        </ul>
      </section>
    </div>
  );
};

export default tips;

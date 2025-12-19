
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-20 pb-16 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-semibold mb-8">
          <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse"></span>
          Powered by Gemini 3 Pro
        </div>
        <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tight leading-[1.05] mb-8">
          Precision Prep for <br/> 
          <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-emerald-500 bg-clip-text text-transparent">Elite Aspirants.</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-12 leading-relaxed">
          Master competitive exams with AI-curated assessments, deep-focus diagnostics, and conceptual synthesis. Designed for the 1%.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button 
            onClick={() => document.getElementById('exams')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-10 py-5 bg-slate-900 text-white rounded-[2rem] font-bold text-lg hover:bg-slate-800 transition-all shadow-2xl shadow-slate-200 hover:-translate-y-1"
          >
            Start Curated Drill
          </button>
          <button 
            onClick={() => window.location.hash = '/synthesis'}
            className="px-10 py-5 bg-white text-slate-900 border-2 border-slate-100 rounded-[2rem] font-bold text-lg hover:border-indigo-200 transition-all shadow-xl shadow-slate-50 hover:-translate-y-1"
          >
            Enter Content Lab
          </button>
        </div>
      </div>
      
      {/* Abstract decorations */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] bg-gradient-to-b from-indigo-50/30 to-transparent rounded-full -z-0 blur-3xl pointer-events-none" />
    </section>
  );
};

export default Hero;

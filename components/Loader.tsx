
import React from 'react';

const Loader: React.FC<{ message?: string }> = ({ message = "Synthesizing intelligence..." }) => {
  return (
    <div className="fixed inset-0 bg-white/95 backdrop-blur-md z-[100] flex flex-col items-center justify-center p-6 text-center">
      <div className="relative mb-12">
        <div className="w-24 h-24 border-4 border-indigo-50 rounded-full" />
        <div className="absolute inset-0 w-24 h-24 border-t-4 border-indigo-600 rounded-full animate-spin" />
        <div className="absolute inset-4 bg-indigo-600/10 rounded-full animate-pulse" />
      </div>
      <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">ExamPro AI</h2>
      <p className="text-xl text-slate-500 font-medium max-w-sm leading-relaxed">{message}</p>
      
      <div className="mt-12 flex gap-1.5">
        <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
        <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
        <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce" />
      </div>
    </div>
  );
};

export default Loader;

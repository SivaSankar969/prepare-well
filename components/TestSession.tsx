
import React, { useState, useEffect } from 'react';
import { MCQ, UserAnswer } from '../types';

interface TestSessionProps {
  questions: MCQ[];
  onFinish: (answers: UserAnswer[]) => void;
}

const TestSession: React.FC<TestSessionProps> = ({ questions, onFinish }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [timers, setTimers] = useState<number[]>(new Array(questions.length).fill(0));
  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers(prev => {
        const next = [...prev];
        next[currentIdx] += 1;
        return next;
      });
      setTotalTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [currentIdx]);

  const handleSelect = (idx: number) => {
    setAnswers(prev => {
      const next = [...prev];
      next[currentIdx] = idx;
      return next;
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuestion = questions[currentIdx];
  const progress = ((currentIdx + 1) / questions.length) * 100;

  const handleSubmit = () => {
    const results: UserAnswer[] = questions.map((q, i) => ({
      questionId: q.id,
      selectedOption: answers[i],
      timeSpent: timers[i]
    }));
    onFinish(results);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-['Inter']">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 h-2 bg-slate-100 z-50">
        <div 
          className="h-full bg-indigo-600 transition-all duration-500 ease-out" 
          style={{ width: `${progress}%` }} 
        />
      </div>

      <div className="flex-1 max-w-4xl mx-auto w-full px-6 pt-32 pb-40">
        <div className="mb-12 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="w-12 h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center font-bold">
              {currentIdx + 1}
            </span>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Question Segment</p>
              <h4 className="font-bold text-slate-900">{currentQuestion.metadata.subject}</h4>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Timer</p>
            <p className="text-xl font-mono font-bold text-indigo-600">{formatTime(totalTime)}</p>
          </div>
        </div>

        <div className="space-y-12">
          <h2 className="text-3xl md:text-4xl font-medium text-slate-900 leading-tight">
            {currentQuestion.question}
          </h2>

          <div className="grid grid-cols-1 gap-4">
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className={`group text-left p-8 rounded-3xl border-2 transition-all duration-300 flex items-center gap-6 ${
                  answers[currentIdx] === idx 
                  ? 'border-indigo-600 bg-indigo-50 shadow-lg' 
                  : 'border-slate-50 bg-slate-50 hover:border-slate-200'
                }`}
              >
                <span className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all ${
                  answers[currentIdx] === idx 
                  ? 'bg-indigo-600 border-indigo-600 text-white' 
                  : 'bg-white border-slate-200 text-slate-400 group-hover:border-indigo-300'
                }`}>
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="text-xl text-slate-700 font-normal">{option}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Minimalist Footer */}
      <footer className="fixed bottom-0 left-0 right-0 p-8 z-50 flex justify-center pointer-events-none">
        <div className="glass px-8 py-5 rounded-[2.5rem] flex items-center gap-8 shadow-2xl pointer-events-auto border border-white/40">
          <button 
            disabled={currentIdx === 0}
            onClick={() => setCurrentIdx(prev => prev - 1)}
            className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 disabled:opacity-30"
          >
            ←
          </button>
          
          <div className="h-6 w-px bg-slate-200" />
          
          <div className="text-sm font-bold text-slate-400">
            {currentIdx + 1} <span className="mx-2 text-slate-200">/</span> {questions.length}
          </div>

          <div className="h-6 w-px bg-slate-200" />

          {currentIdx === questions.length - 1 ? (
            <button 
              onClick={handleSubmit}
              className="px-8 py-3 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all"
            >
              FINISH SESSION
            </button>
          ) : (
            <button 
              onClick={() => setCurrentIdx(prev => prev + 1)}
              className="px-8 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 shadow-lg shadow-slate-200 transition-all flex items-center gap-2"
            >
              NEXT <span className="text-lg">→</span>
            </button>
          )}
        </div>
      </footer>
    </div>
  );
};

export default TestSession;

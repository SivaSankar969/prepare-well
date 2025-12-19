
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { MCQ, PerformanceInsights, UserAnswer } from '../types';

interface ResultsPanelProps {
  questions: MCQ[];
  insights: PerformanceInsights;
  answers: UserAnswer[];
  onReset: () => void;
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({ questions, insights, answers, onReset }) => {
  const correctCount = answers.filter((a, i) => a.selectedOption === questions[i].correctAnswer).length;
  const incorrectCount = questions.length - correctCount;

  const chartData = [
    { name: 'Correct', value: correctCount },
    { name: 'Incorrect', value: incorrectCount },
  ];

  const COLORS = ['#10B981', '#F43F5E'];

  return (
    <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <span className="bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4 inline-block tracking-wider uppercase">Intelligence Report</span>
          <h2 className="text-5xl font-black text-slate-900 tracking-tight">Performance Diagnostics</h2>
        </div>
        <button 
          onClick={onReset}
          className="px-8 py-4 bg-slate-900 text-white rounded-[2rem] font-bold shadow-xl shadow-slate-200 hover:-translate-y-1 transition-all"
        >
          New Assessment
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-10">
        <div className="lg:col-span-2 space-y-10">
          <div className="bg-white rounded-[3rem] p-12 border border-slate-100 shadow-xl shadow-slate-50">
            <h3 className="text-2xl font-bold text-slate-900 mb-8">Synthesis Insights</h3>
            <p className="text-xl text-slate-600 leading-relaxed italic border-l-4 border-indigo-500 pl-8">
              "{insights.synthesis}"
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-emerald-50/50 rounded-[3rem] p-10 border border-emerald-100">
              <h4 className="text-emerald-700 font-bold mb-6 flex items-center gap-2">
                <span className="text-2xl">⚡</span> Domain Strengths
              </h4>
              <ul className="space-y-4">
                {insights.strengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700 font-medium">
                    <span className="w-6 h-6 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center text-xs">✓</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-rose-50/50 rounded-[3rem] p-10 border border-rose-100">
              <h4 className="text-rose-700 font-bold mb-6 flex items-center gap-2">
                <span className="text-2xl">🎯</span> Focus Areas
              </h4>
              <ul className="space-y-4">
                {insights.focusAreas.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700 font-medium">
                    <span className="w-6 h-6 bg-rose-100 text-rose-600 rounded-lg flex items-center justify-center text-xs">!</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-10">
          <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-xl shadow-slate-50 flex flex-col items-center">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Accuracy Index</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center mt-4">
              <div className="text-5xl font-black text-slate-900 mb-1">{insights.overallScore}%</div>
              <div className="text-slate-400 font-bold uppercase tracking-widest text-xs">Aggregate Merit</div>
            </div>
          </div>

          <div className="bg-indigo-600 rounded-[3rem] p-10 text-white shadow-xl shadow-indigo-100">
            <h3 className="text-xl font-bold mb-4">AI Proactive Support</h3>
            <p className="text-indigo-100 mb-8">Based on your conceptual decay in "{insights.focusAreas[0]}", we recommend a deep-dive review session tomorrow morning.</p>
            <button className="w-full py-4 bg-white text-indigo-600 rounded-2xl font-bold hover:bg-indigo-50 transition-all">
              Schedule AI Tutoring
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPanel;

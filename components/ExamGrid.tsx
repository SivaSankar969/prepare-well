
import React from 'react';
import { ExamCategory } from '../types';

interface ExamGridProps {
  categories: ExamCategory[];
  onSelect: (cat: ExamCategory) => void;
}

const ExamGrid: React.FC<ExamGridProps> = ({ categories, onSelect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat)}
          className="group text-left bg-white p-10 rounded-[3rem] border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_48px_rgba(79,70,229,0.08)] hover:border-indigo-100 transition-all duration-500 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 text-5xl opacity-10 group-hover:scale-125 transition-transform duration-500">
            {cat.icon}
          </div>
          <div className="text-4xl mb-6">{cat.icon}</div>
          <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
            {cat.name}
          </h3>
          <p className="text-slate-500 leading-relaxed mb-6">
            {cat.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {cat.subjects.slice(0, 3).map((sub) => (
              <span key={sub} className="px-3 py-1 bg-slate-50 text-slate-600 rounded-lg text-xs font-medium border border-slate-100">
                {sub}
              </span>
            ))}
            {cat.subjects.length > 3 && (
              <span className="px-3 py-1 bg-slate-50 text-slate-400 rounded-lg text-xs font-medium">
                +{cat.subjects.length - 3} more
              </span>
            )}
          </div>
        </button>
      ))}
    </div>
  );
};

export default ExamGrid;

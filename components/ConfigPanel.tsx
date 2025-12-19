
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { EXAM_CATEGORIES, DIFFICULTY_LEVELS } from '../constants';
import { TestConfig } from '../types';

interface ConfigPanelProps {
  onStart: (config: TestConfig) => void;
}

const ConfigPanel: React.FC<ConfigPanelProps> = ({ onStart }) => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const category = EXAM_CATEGORIES.find(c => c.id === categoryId);

  const [subject, setSubject] = useState(category?.subjects[0] || "");
  const [difficulty, setDifficulty] = useState<TestConfig['difficulty']>('Medium');
  const [count, setCount] = useState(10);
  const [pyqRule, setPyqRule] = useState(true);

  if (!category) return null;

  return (
    <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <button 
        onClick={() => navigate('/')}
        className="mb-8 text-slate-400 hover:text-indigo-600 transition-colors flex items-center gap-2 font-medium"
      >
        <span className="text-xl">←</span> Back to selection
      </button>

      <div className="bg-white rounded-[3rem] p-12 border border-slate-100 shadow-2xl shadow-slate-100">
        <div className="flex items-center gap-6 mb-12">
          <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-3xl">
            {category.icon}
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900">{category.name}</h2>
            <p className="text-slate-500">Configure your precision drill settings.</p>
          </div>
        </div>

        <div className="space-y-10">
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-4 uppercase tracking-wider">Subject Domain</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {category.subjects.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSubject(sub)}
                  className={`px-6 py-4 rounded-2xl text-left font-semibold border-2 transition-all ${
                    subject === sub 
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-md' 
                    : 'border-slate-50 bg-slate-50 text-slate-500 hover:border-slate-200'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-4 uppercase tracking-wider">Complexity Level</label>
              <select 
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as any)}
                className="w-full bg-slate-50 border-2 border-slate-50 p-4 rounded-2xl font-bold text-slate-700 focus:outline-none focus:border-indigo-200"
              >
                {DIFFICULTY_LEVELS.map(lvl => <option key={lvl} value={lvl}>{lvl}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-4 uppercase tracking-wider">Question Count</label>
              <input 
                type="number"
                min="5"
                max="30"
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value))}
                className="w-full bg-slate-50 border-2 border-slate-50 p-4 rounded-2xl font-bold text-slate-700 focus:outline-none focus:border-indigo-200"
              />
            </div>
          </div>

          <div className="p-8 bg-indigo-50/50 rounded-3xl border border-indigo-100 flex items-center justify-between">
            <div className="max-w-md">
              <h4 className="font-bold text-slate-900 mb-1">PYQ 60% Rule</h4>
              <p className="text-sm text-slate-600">Balance historical patterns (60%) with fresh conceptual challenges (40%) to simulate real exam entropy.</p>
            </div>
            <button 
              onClick={() => setPyqRule(!pyqRule)}
              className={`w-14 h-8 rounded-full transition-all relative ${pyqRule ? 'bg-indigo-600' : 'bg-slate-300'}`}
            >
              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-sm transition-all ${pyqRule ? 'left-7' : 'left-1'}`} />
            </button>
          </div>

          <button 
            onClick={() => onStart({ category: category.name, subject, difficulty, questionCount: count, pyqRule })}
            className="w-full py-6 bg-indigo-600 text-white rounded-[2rem] font-bold text-xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 hover:-translate-y-1"
          >
            Generate Assessment
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfigPanel;

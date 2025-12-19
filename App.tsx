
import React, { useState } from 'react';
import { HashRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { EXAM_CATEGORIES } from './constants';
import { TestConfig, MCQ, PerformanceInsights, UserAnswer } from './types';
import { generateQuestions, generateDiagnosticInsights } from './services/geminiService';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ExamGrid from './components/ExamGrid';
import ConfigPanel from './components/ConfigPanel';
import ContentLab from './components/ContentLab';
import TestSession from './components/TestSession';
import ResultsPanel from './components/ResultsPanel';
import Loader from './components/Loader';

const Main: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [testConfig, setTestConfig] = useState<TestConfig | null>(null);
  const [questions, setQuestions] = useState<MCQ[]>([]);
  const [results, setResults] = useState<{ insights: PerformanceInsights, answers: UserAnswer[] } | null>(null);

  const handleStartDrill = async (config: TestConfig) => {
    setLoading(true);
    setLoadingMessage("AI is curating your premium assessment...");
    try {
      const q = await generateQuestions(config);
      setTestConfig(config);
      setQuestions(q);
      navigate('/test');
    } catch (err) {
      alert("Error generating questions. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleTestFinish = async (answers: UserAnswer[]) => {
    if (!testConfig || questions.length === 0) return;
    
    setLoading(true);
    setLoadingMessage("Synthesizing diagnostic intelligence...");
    try {
      const insights = await generateDiagnosticInsights(questions, answers, testConfig);
      setResults({ insights, answers });
      navigate('/results');
    } catch (err) {
      alert("Error analyzing performance.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader message={loadingMessage} />;

  return (
    <div className="min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home onSelectCategory={(cat) => navigate(`/config/${cat.id}`)} />} />
        <Route path="/config/:categoryId" element={<ConfigPanel onStart={handleStartDrill} />} />
        <Route path="/synthesis" element={<ContentLab onStart={handleStartDrill} />} />
        <Route path="/test" element={<TestSession questions={questions} onFinish={handleTestFinish} />} />
        <Route path="/results" element={results ? <ResultsPanel questions={questions} insights={results.insights} answers={results.answers} onReset={() => navigate('/')} /> : <Home onSelectCategory={(cat) => navigate(`/config/${cat.id}`)} />} />
      </Routes>
    </div>
  );
};

const Home: React.FC<{ onSelectCategory: (cat: any) => void }> = ({ onSelectCategory }) => {
  return (
    <div className="pt-24">
      <Hero />
      <div id="exams" className="max-w-7xl mx-auto px-6 py-20">
        <div className="mb-12">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Curated Drills</h2>
          <p className="text-lg text-slate-500 max-w-2xl">Select your vertical to begin a precision-engineered diagnostic session powered by Gemini AI.</p>
        </div>
        <ExamGrid categories={EXAM_CATEGORIES} onSelect={onSelectCategory} />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 py-20 bg-slate-50 rounded-[3rem] mb-20 shadow-sm border border-slate-100">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <span className="bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6 inline-block">Personal Prep AI</span>
            <h2 className="text-4xl font-extrabold text-slate-900 mb-6 leading-tight">Synthesis: Your Content,<br/>AI Assessment.</h2>
            <p className="text-lg text-slate-600 mb-8">Upload PDFs or paste research papers. ExamPro AI extracts core concepts and generates contextual assessments tailored to your unique study material.</p>
            <button 
              onClick={() => window.location.hash = '/synthesis'}
              className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-semibold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
            >
              Enter Content Lab
            </button>
          </div>
          <div className="flex-1 w-full h-[400px] bg-white rounded-[2rem] shadow-inner border border-slate-200 flex items-center justify-center relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-emerald-50 opacity-50" />
             <div className="z-10 text-6xl">🧪</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <Main />
    </HashRouter>
  );
};

export default App;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TestConfig } from '../types';

interface ContentLabProps {
  onStart: (config: TestConfig) => void;
}

const ContentLab: React.FC<ContentLabProps> = ({ onStart }) => {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type === 'application/pdf') {
      setIsProcessing(true);
      try {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await (window as any).pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let fullText = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          fullText += content.items.map((item: any) => item.str).join(" ") + "\n";
        }
        setText(fullText);
      } catch (err) {
        alert("Error parsing PDF. Please ensure it's a valid text-based PDF.");
      } finally {
        setIsProcessing(false);
      }
    } else {
      const reader = new FileReader();
      reader.onload = (event) => setText(event.target?.result as string);
      reader.readAsText(file);
    }
  };

  return (
    <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <button 
        onClick={() => navigate('/')}
        className="mb-8 text-slate-400 hover:text-indigo-600 transition-colors flex items-center gap-2 font-medium"
      >
        <span className="text-xl">←</span> Exit Lab
      </button>

      <div className="bg-white rounded-[3rem] p-12 border border-slate-100 shadow-2xl shadow-slate-100">
        <div className="flex items-center gap-6 mb-12">
          <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-3xl">🧪</div>
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900">Synthesis Lab</h2>
            <p className="text-slate-500">Transform your study materials into intelligent assessments.</p>
          </div>
        </div>

        <div className="space-y-8">
          <div className="relative border-2 border-dashed border-slate-200 rounded-[2rem] p-12 text-center hover:border-emerald-300 transition-colors">
            <input 
              type="file" 
              accept=".pdf,.txt"
              onChange={handleFileUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <div className="text-4xl mb-4">📄</div>
            <p className="text-lg font-bold text-slate-700">Drop PDF or TXT here</p>
            <p className="text-slate-500 mt-1">Maximum 5MB. AI will analyze the core conceptual density.</p>
          </div>

          <div className="relative">
            <div className="absolute top-4 left-4 text-xs font-bold text-slate-400 uppercase tracking-widest bg-white px-2">OR Paste Raw Content</div>
            <textarea
              className="w-full h-64 bg-slate-50 border-2 border-slate-50 p-8 pt-10 rounded-[2rem] font-medium text-slate-700 focus:outline-none focus:border-emerald-200 resize-none"
              placeholder="Paste research summaries, lecture notes, or technical documents..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          {isProcessing && (
            <div className="text-emerald-600 font-semibold animate-pulse text-center">
              Processing document structure...
            </div>
          )}

          <button 
            disabled={!text || isProcessing}
            onClick={() => onStart({ 
              category: 'Synthesis', 
              subject: 'Custom Material', 
              difficulty: 'Hard', 
              questionCount: 10, 
              pyqRule: false,
              sourceText: text 
            })}
            className="w-full py-6 bg-emerald-600 text-white rounded-[2rem] font-bold text-xl hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? "Processing..." : "Generate Contextual MCQ Set"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContentLab;


export interface MCQ {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  metadata: {
    subject: string;
    difficulty: string;
    concept: string;
  };
}

export interface ExamCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  subjects: string[];
}

export interface UserAnswer {
  questionId: string;
  selectedOption: number | null;
  timeSpent: number;
}

export interface PerformanceInsights {
  overallScore: number;
  strengths: string[];
  focusAreas: string[];
  synthesis: string;
}

export interface TestConfig {
  category: string;
  subject: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Very Hard';
  questionCount: number;
  pyqRule: boolean;
  sourceText?: string;
}

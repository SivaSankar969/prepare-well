
import { ExamCategory } from './types';

export const EXAM_CATEGORIES: ExamCategory[] = [
  {
    id: 'tech',
    name: 'Technical & Engineering',
    description: 'GATE, ESE, and Technical Officer exams.',
    icon: '🏗️',
    subjects: ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering', 'Electronics']
  },
  {
    id: 'admin',
    name: 'Administrative Services',
    description: 'UPSC CSE, State PSC, and Policy Planning.',
    icon: '🏛️',
    subjects: ['Indian Polity', 'Economics', 'History', 'Geography', 'Ethics & Aptitude']
  },
  {
    id: 'medical',
    name: 'Medical Sciences',
    description: 'NEET PG, INI-CET, and Medical Research.',
    icon: '🩺',
    subjects: ['Anatomy', 'Physiology', 'Biochemistry', 'Pathology', 'Pharmacology']
  },
  {
    id: 'mgmt',
    name: 'Management & Finance',
    description: 'CAT, GMAT, and Financial Analyst certifications.',
    icon: '📊',
    subjects: ['Quantitative Aptitude', 'Verbal Ability', 'Data Interpretation', 'Logical Reasoning', 'Business Ethics']
  },
  {
    id: 'law',
    name: 'Legal Studies',
    description: 'CLAT PG, Judiciary, and Corporate Law.',
    icon: '⚖️',
    subjects: ['Constitutional Law', 'Criminal Law', 'Contract Law', 'Tort Law', 'Jurisprudence']
  }
];

export const DIFFICULTY_LEVELS = ['Easy', 'Medium', 'Hard', 'Very Hard'] as const;

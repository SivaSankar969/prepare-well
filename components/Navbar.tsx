
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  const isDark = location.pathname === '/test';

  if (isDark) return null; // Test session is full screen focus

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6 pointer-events-none">
      <div className="glass px-8 py-4 rounded-full flex items-center gap-12 shadow-lg pointer-events-auto border border-white/20">
        <Link to="/" className="text-xl font-extrabold tracking-tighter flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-xs">EP</div>
          <span>EXAMPRO<span className="text-indigo-600">AI</span></span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link to="/" className="hover:text-indigo-600 transition-colors">Drills</Link>
          <Link to="/synthesis" className="hover:text-indigo-600 transition-colors">Content Lab</Link>
          <button className="hover:text-indigo-600 transition-colors">Insights</button>
        </div>
        <div className="h-4 w-px bg-slate-200 hidden md:block" />
        <button className="bg-slate-900 text-white text-xs px-5 py-2.5 rounded-full font-bold hover:bg-slate-800 transition-all">
          PREMIUM ACCESS
        </button>
      </div>
    </nav>
  );
};

export default Navbar;


import React, { useState } from 'react';
import DotGrid from './components/DotGrid';

interface InputPageProps {
  onSubmit: (idea: string) => void;
  isLoading: boolean;
}

const InputPage: React.FC<InputPageProps> = ({ onSubmit, isLoading }) => {
  const [idea, setIdea] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (idea.trim() && !isLoading) {
      onSubmit(idea.trim());
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Interactive Dot Grid Background */}
      <DotGrid 
        dotSize={8} 
        gap={40} 
        baseColor="#1e293b" 
        activeColor="#06b6d4" 
        proximity={200}
      />
      
      <div className="hero-section relative z-10 w-full flex items-center justify-center"> 
        <main className="glass-card">
          <div className="mb-6">
            <h1 className="input-page-title"> 
              Scope AI
            </h1>
            <div className="w-16 h-1 bg-accent-primary mx-auto rounded-full mb-6 opacity-80"></div>
            <p className="input-page-subtitle">
              비즈니스 아이디어를 입력하세요.<br/>
              정밀 분석 리포트를 생성합니다.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-4">
            <div className="space-y-4">
              <div className="input-container relative group">
                <textarea
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  placeholder="분석하고 싶은 아이디어를 상세하게 입력해 주세요."
                  disabled={isLoading}
                  aria-label="아이디어 입력"
                />
                {idea.length > 0 && (
                  <div className="absolute bottom-4 right-4 text-[10px] font-mono text-slate-400 bg-slate-900/80 px-2 py-1 rounded-md border border-white/5 pointer-events-none transition-opacity group-focus-within:opacity-100 opacity-60">
                    {idea.length.toLocaleString()} characters
                  </div>
                )}
              </div>
              
              <button
                type="submit"
                id="cta" 
                disabled={!idea.trim() || isLoading}
                className="group overflow-hidden"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2" aria-label="분석 중">
                    <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>인공지능 분석 중...</span>
                  </div>
                ) : (
                  <span className="flex items-center justify-center space-x-2">
                    <span className="tracking-wide">리포트 생성하기</span>
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 transition-transform group-hover:translate-x-1">
                      <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                    </svg>
                  </span>
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-center gap-6 text-[11px] font-bold text-slate-500 uppercase tracking-[0.15em]">
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse"></span>
              <span>Gemini 3 Pro</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
              <span>Deep Analysis</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default InputPage;

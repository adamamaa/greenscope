import React, { useState, useCallback, useEffect } from 'react';
import InputPage from './InputPage';
import AnalysisPage from './AnalysisPage';
import { AnalysisResult } from './types';
import { generateAnalysis } from './services/geminiService';
import { DEFAULT_ANALYSIS_RESULT, ERROR_ANALYSIS_RESULT } from './constants';

type Page = 'input' | 'analysis';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('input');
  const [idea, setIdea] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (currentPage === 'input') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // Ensure on navigating away or unmounting, overflow is reset
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [currentPage]);


  const handleAnalyzeIdea = useCallback(async (submittedIdea: string) => {
    setIdea(submittedIdea);
    setIsLoading(true);
    setError(null);
    setAnalysisResult(DEFAULT_ANALYSIS_RESULT); 
    setCurrentPage('analysis');

    try {
      const result = await generateAnalysis(submittedIdea);
      setAnalysisResult(result);
    } catch (e) {
      console.error("Analysis failed in App:", e);
      const errorMessage = e instanceof Error ? e.message : "분석 중 알 수 없는 오류가 발생했습니다.";
      setError(errorMessage);
      setAnalysisResult(ERROR_ANALYSIS_RESULT); 
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleGoBack = useCallback(() => {
    setCurrentPage('input');
    setIdea('');
    setAnalysisResult(null);
    setError(null);
    setIsLoading(false); 
  }, []);

  if (currentPage === 'input') {
    return <InputPage onSubmit={handleAnalyzeIdea} isLoading={isLoading} />;
  }

  return (
    <AnalysisPage
      idea={idea}
      analysisResult={analysisResult}
      isLoading={isLoading}
      error={error}
      onGoBack={handleGoBack}
    />
  );
};

export default App;
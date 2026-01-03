
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full p-8" role="status" aria-label="로딩 중">
      {/* Simplified spinner container */}
      <div className="relative h-20 w-20 flex items-center justify-center">
        {/* Center dot - Keep */}
        <div className="w-4 h-4 bg-accent-primary rounded-full animate-pulse"></div>
      </div>

      {/* Loading text with animation - Keep */}
      <div className="mt-6 text-center">
        <div className="text-accent-primary font-medium text-xl mb-2">분석 진행 중</div>
        <div className="flex space-x-1 justify-center">
          <div className="w-2 h-2 bg-accent-primary rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-accent-primary rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-2 h-2 bg-accent-primary rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
      </div>

      {/* Progress indicator - Keep */}
      <div className="mt-4 w-48 bg-surface-dark-secondary rounded-full h-2 relative overflow-hidden">
        <div className="h-full bg-gradient-to-r from-accent-primary to-blue-500 rounded-full relative">
          {/* This div could be used for actual progress if a value was available */}
        </div>
        {/* Shimmer effect on top of the bar */}
        <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/50 to-blue-500/50 rounded-full shimmer"></div>
      </div>

      <div className="mt-3 text-text-light-secondary text-base">
        AI가 아이디어를 심층 분석하고 있습니다
      </div>
    </div>
  );
};

export default LoadingSpinner;
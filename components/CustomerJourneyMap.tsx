
import React from 'react';
import { CustomerJourneyStage } from '../types';

interface CustomerJourneyMapProps {
  stages?: CustomerJourneyStage[];
}

const StageSection: React.FC<{ title: string; items: string[]; baseColor: string }> = ({ title, items, baseColor }) => {
  if (!items || items.length === 0 || (items.length === 1 && items[0] === "정보 없음")) {
    return null;
  }
  return (
    <div className="mb-3 last:mb-0">
      <h4 className={`text-[10px] md:text-xs font-bold text-text-light-primary/60 uppercase tracking-widest mb-1`}>{title}</h4>
      <ul className="list-disc list-inside pl-1 space-y-0.5">
        {items.map((item, index) => (
          <li key={index} className="text-xs md:text-sm text-text-light-secondary leading-snug">{item}</li>
        ))}
      </ul>
    </div>
  );
};

const CustomerJourneyMap: React.FC<CustomerJourneyMapProps> = ({ stages }) => {
  if (!stages || stages.length === 0 || (stages.length === 1 && stages[0].stageName === "정보 없음")) {
    return (
      <div className="bg-surface-dark-secondary p-6 rounded-lg shadow-soft text-text-light-secondary border border-border-dark-primary text-center">
        데이터가 없습니다.
      </div>
    );
  }

  const stageTitleColor = "text-accent-primary";

  return (
    <div className="bg-surface-dark-secondary p-4 md:p-6 rounded-lg shadow-soft border border-border-dark-primary">
      <h3 className={`text-xl md:text-2xl font-semibold ${stageTitleColor} mb-6`}>고객 여정 맵</h3>
      
      {/* Scrollable Container with Custom Scrollbar */}
      {/* Added `pb-6` for scrollbar space and custom scrollbar classes */}
      <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800/30 hover:scrollbar-thumb-accent-primary/50 transition-colors">
        {stages.map((stage, index) => (
          <div key={index} className="flex flex-col md:flex-row items-stretch flex-grow min-w-[300px]">
            <div className={`bg-gray-800/50 p-4 md:p-5 rounded-xl shadow-sm w-full md:w-72 lg:w-80 flex-shrink-0 border border-border-dark-secondary relative overflow-hidden`}>
              {/* Background Step Number */}
              <div className="absolute top-[-10px] right-[-5px] text-5xl font-black text-white/5 pointer-events-none">
                {index + 1}
              </div>
              
              <h4 className={`text-base md:text-lg font-bold ${stageTitleColor} mb-4 pb-2 border-b border-border-dark-secondary flex items-center`}>
                <span className="bg-accent-primary text-gray-900 w-6 h-6 rounded-full text-xs flex items-center justify-center mr-2 flex-shrink-0">
                  {index + 1}
                </span>
                {stage.stageName}
              </h4>
              
              <div className="space-y-4">
                <StageSection title="고객 행동" items={stage.customerActions} baseColor={stageTitleColor} />
                <StageSection title="마케팅 활동" items={stage.touchpoints} baseColor={stageTitleColor} />
                <StageSection title="활용 채널" items={stage.channels} baseColor={stageTitleColor} />
                <StageSection title="측정 지표" items={stage.kpis} baseColor={stageTitleColor} />
              </div>
            </div>
            
            {/* Arrow: Vertical on Mobile, Horizontal on Desktop */}
            {index < stages.length - 1 && (
              <div className="flex items-center justify-center py-2 md:py-0 md:px-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8 text-border-dark-secondary transform rotate-90 md:rotate-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            )}
          </div>
        ))}
        {/* Spacer for padding at the end of scroll */}
        <div className="min-w-[20px] h-1 shrink-0"></div>
      </div>
      <p className="text-[10px] text-text-light-secondary/60 mt-2 text-center md:text-right italic">
        * 가로로 스크롤하여 전체 여정을 확인하세요.
      </p>
    </div>
  );
};

export default CustomerJourneyMap;

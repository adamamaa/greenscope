
import React, { useState, useEffect } from 'react';
import { AnalysisResult, TabKey, PyramidLayerData, PyramidLayerContent, ConcentricCircleLayerData, IdeaGrade } from './types';
import { TABS, DEFAULT_ANALYSIS_RESULT } from './constants';
import LoadingSpinner from './components/LoadingSpinner';
import TabButton from './components/TabButton';
import ContentCard from './components/ContentCard';
import PositioningMap from './components/PositioningMap';
import FeatureComparisonMatrix from './components/FeatureComparisonMatrix';
import KeyRevenueModelSummaryCard from './components/KeyRevenueModelSummaryCard';
import PyramidChart from './components/PyramidChart';
import ConcentricCirclesChart from './components/ConcentricCirclesChart';
import CustomerJourneyMap from './components/CustomerJourneyMap';
import StarRatingReactionCard from './components/StarRatingReactionCard';
import MultiCardView from './components/MultiCardView';


interface AnalysisPageProps {
  idea: string;
  analysisResult: AnalysisResult | null;
  isLoading: boolean;
  error: string | null;
  onGoBack: () => void;
}

const GradeBadge: React.FC<{ grade: IdeaGrade }> = ({ grade }) => {
  const getGradeStyle = (g: IdeaGrade) => {
    switch (g) {
      case 'S':
        return {
          text: 'bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-gradient-x',
          container: 'border-2 border-transparent relative before:absolute before:inset-0 before:p-[2px] before:bg-gradient-to-r before:from-red-500 before:via-yellow-500 before:via-green-500 before:via-blue-500 before:to-purple-500 before:rounded-full before:-z-10'
        };
      case 'A': return { text: 'text-red-500', container: 'border-red-500/50 bg-red-500/10' };
      case 'B': return { text: 'text-blue-500', container: 'border-blue-500/50 bg-blue-500/10' };
      case 'C': return { text: 'text-yellow-500', container: 'border-yellow-500/50 bg-yellow-500/10' };
      case 'D': return { text: 'text-gray-950 dark:text-gray-100', container: 'border-gray-900 bg-gray-900/10' };
      case 'F': return { text: 'text-red-600', container: 'border-red-600/50 bg-red-600/10' };
      default: return { text: 'text-text-light-primary', container: 'border-border-dark-secondary' };
    }
  };

  const style = getGradeStyle(grade);

  return (
    <div className={`inline-flex items-center justify-center px-6 py-2 rounded-full border mb-6 ${style.container}`}>
      <span className={`text-4xl md:text-5xl font-black tracking-tighter ${style.text}`}>
        {grade}
      </span>
      <span className="ml-3 text-sm md:text-base font-bold text-text-light-secondary uppercase tracking-widest">Grade</span>
    </div>
  );
};

const SectionContentGrid: React.FC<{title?: string, items: { title: string; content: string | React.ReactNode }[], titleColorClass?: string}> = 
  ({ title, items, titleColorClass = "text-accent-primary" }) => {
  return (
    <div className={`space-y-4 md:space-y-6 p-0 rounded-lg flex-grow`}>
      {title && <h3 className={`text-xl md:text-2xl font-semibold ${titleColorClass} mb-3 md:mb-4 px-1`}>{title}</h3>}
      <div className={`grid grid-cols-1 ${items.length > 1 ? 'md:grid-cols-2' : 'md:grid-cols-1'} gap-4 md:gap-6 flex-grow`}>
        {items.map((item, index) => (
          <ContentCard key={index} title={item.title} content={item.content} className={`h-full stagger-item`} titleColorClass={item.title.includes("상세") ? "text-text-light-primary" : titleColorClass} />
        ))}
      </div>
    </div>
  );
};


const AnalysisPage: React.FC<AnalysisPageProps> = ({ idea, analysisResult, isLoading, error, onGoBack }) => {
  const [activeTab, setActiveTab] = useState<TabKey>(TabKey.SWOT);
  const [selectedRating, setSelectedRating] = useState<number>(5);
  const [loadingStepText, setLoadingStepText] = useState("AI 분석 엔진 시동 중...");

  // 차단된 아이디어 여부 확인
  const isBlocked = analysisResult?.harshCritique.grade === 'F' && 
                   (analysisResult?.swot.strengths.includes("거부되었습니다") || 
                    analysisResult?.harshCritique.critique.includes("거부되었습니다") ||
                    analysisResult?.harshCritique.critique.includes("부적절"));

  useEffect(() => {
    if (isLoading) {
      const steps = [
        "아이디어 해부 시작...", "안전 가이드라인 준수 여부 검토 중...", "SWOT 매트릭스 구성 중...", "경쟁 환경 스캐닝...", 
        "수익 모델 잠재력 분석...", "타겟 고객 페르소나 정의 중...", "마케팅 전략 구상 중...", 
        "소비자 반응 시뮬레이션 중...", "최종 보고서 생성 중...", "거의 다 됐습니다!"
      ];
      let currentStep = 0;
      setLoadingStepText(steps[currentStep]); 

      const intervalId = setInterval(() => {
        currentStep = (currentStep + 1);
        if (currentStep < steps.length) {
          setLoadingStepText(steps[currentStep]);
        } else {
           clearInterval(intervalId);
        }
      }, 5000); 

      return () => clearInterval(intervalId);
    }
  }, [isLoading]);

  // 차단되었을 때 탭 전환 시 강제적으로 냉정한 비평 탭으로 이동시킬지 여부 결정
  useEffect(() => {
    if (isBlocked && activeTab !== TabKey.HARSH_CRITIQUE) {
      // 차단된 경우 사용자에게 경고가 있는 비평 탭을 보게 함
      setActiveTab(TabKey.HARSH_CRITIQUE);
    }
  }, [isBlocked]);


  const renderMainContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-4 flex-grow">
          <LoadingSpinner />
           <p className="mt-4 text-accent-primary text-base font-medium min-h-[2em]">
            {loadingStepText}
          </p>
        </div>
      );
    }

    const currentData = analysisResult || DEFAULT_ANALYSIS_RESULT;
    const tabInfo = TABS.find(t => t.key === activeTab);

    if (error) {
       return <ContentCard title="오류 발생" content={`분석 과정 중 문제가 발생했습니다: ${error}`} className="bg-red-900/30 border-red-700 text-red-200 flex-grow" titleColorClass="text-red-300" />;
    }
    
    if (!analysisResult) { 
        return <ContentCard title="데이터 없음" content="분석 데이터를 불러올 수 없습니다. 다시 시도해주세요." className="flex-grow text-text-light-primary"/>;
    }

    // 차단된 경우 다른 탭의 내용을 보여주지 않고 경고 메시지만 출력
    if (isBlocked && activeTab !== TabKey.HARSH_CRITIQUE) {
       return (
         <div className="flex flex-col items-center justify-center p-10 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h2 className="text-2xl font-bold text-red-400 mb-2">분석이 제한되었습니다</h2>
            <p className="text-text-light-secondary max-w-md">해당 아이디어는 서비스 가이드라인 위반 가능성이 있어 상세 분석이 수행되지 않았습니다. '냉정한 비평' 탭에서 사유를 확인하세요.</p>
         </div>
       );
    }

    const sectionTitleClass = "text-text-light-primary";

    switch (activeTab) {
      case TabKey.SWOT:
        return (
            <div className={`p-0 rounded-lg flex-grow flex flex-col`}>
                 <MultiCardView
                    categoryTitle={tabInfo?.categoryTitle || "SWOT"}
                    items={[
                        { title: "Strengths (강점)", content: currentData.swot.strengths },
                        { title: "Weaknesses (약점)", content: currentData.swot.weaknesses },
                        { title: "Opportunities (기회)", content: currentData.swot.opportunities },
                        { title: "Threats (위협)", content: currentData.swot.threats },
                    ]}
                    themeColor="accent-primary" 
                />
            </div>
        );
      
      case TabKey.COMPETITIVE_LANDSCAPE:
        const landscapeData = currentData.competitiveLandscape;
        return (
            <div className="space-y-6 md:space-y-8 p-0 rounded-lg flex-grow">
                <h3 className={`text-xl md:text-2xl font-semibold ${sectionTitleClass} mb-4`}>{tabInfo?.categoryTitle || "경쟁 환경 분석"}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <ContentCard title="주요 경쟁자" content={landscapeData.mainCompetitors} className="h-full" titleColorClass="text-text-light-primary" />
                    <ContentCard title="자사 경쟁 우위" content={landscapeData.competitiveAdvantages} className="h-full" titleColorClass="text-text-light-primary" />
                    <ContentCard title="시장 진입 장벽" content={landscapeData.marketEntryBarriers} className="h-full" titleColorClass="text-text-light-primary" />
                    <ContentCard title="차별화 포인트" content={landscapeData.differentiationPoints} className="h-full" titleColorClass="text-text-light-primary" />
                </div>

                {!isBlocked && (
                  <div className="flex flex-col xl:flex-row gap-6 mt-6 md:mt-8">
                      <div className="xl:w-1/2 flex">
                          {landscapeData.positioningMapData && (
                              <PositioningMap data={landscapeData.positioningMapData} />
                          )}
                      </div>
                      <div className="xl:w-1/2 flex">
                          {landscapeData.featureMatrixData && (
                              <FeatureComparisonMatrix data={landscapeData.featureMatrixData} />
                          )}
                      </div>
                  </div>
                )}
            </div>
        );

      case TabKey.MONETIZATION_STRATEGY:
        const monetizationData = currentData.monetizationStrategy;
        return (
          <div className="space-y-6 md:space-y-8 p-0 rounded-lg flex-grow">
            <h3 className={`text-xl md:text-2xl font-semibold ${sectionTitleClass} mb-4`}>{tabInfo?.categoryTitle || "수익 모델"}</h3>
            <KeyRevenueModelSummaryCard
              keyRevenueStreams={monetizationData.keyRevenueStreamsSummary}
              pricingPolicy={monetizationData.pricingPolicySummary}
              keyPayingCustomers={monetizationData.keyPayingCustomersSummary}
              keyStrengths={monetizationData.keyStrengthsSummary}
            />
            <SectionContentGrid
              title="수익 모델 상세 정보"
              items={[
                { title: "주요 수익원 상세", content: monetizationData.revenueStreams },
                { title: "가격 정책 상세", content: monetizationData.pricingPolicy },
                { title: "예상 수익 잠재력", content: monetizationData.estimatedRevenuePotential },
                { title: "결제 및 수금 방법", content: monetizationData.paymentCollectionMethods },
              ]}
              titleColorClass="text-text-light-primary"
            />
          </div>
        );

      case TabKey.TARGET_AUDIENCE:
        const audienceData = currentData.targetAudience;
        const marketSizeCircleData: ConcentricCircleLayerData[] = (!isBlocked && audienceData.marketSizePyramid) ? [
            { 
              name: audienceData.marketSizePyramid.som.name, 
              description: audienceData.marketSizePyramid.som.description,
              details: [
                  audienceData.marketSizePyramid.som.size ? `규모: ${audienceData.marketSizePyramid.som.size}` : '',
                  ...(audienceData.marketSizePyramid.som.characteristics || [])
              ].filter(Boolean),
              color: "fill-accent-primary", 
              value: 1,
              textColor: 'fill-gray-900'
            },
            { 
              name: audienceData.marketSizePyramid.sam.name, 
              description: audienceData.marketSizePyramid.sam.description,
              details: [
                  audienceData.marketSizePyramid.sam.size ? `규모: ${audienceData.marketSizePyramid.sam.size}` : '',
                  ...(audienceData.marketSizePyramid.sam.characteristics || [])
              ].filter(Boolean),
              color: "fill-accent-primary/70", 
              value: 2,
              textColor: 'fill-gray-900'
            }, 
            { 
              name: audienceData.marketSizePyramid.tam.name, 
              description: audienceData.marketSizePyramid.tam.description,
              details: [
                  audienceData.marketSizePyramid.tam.size ? `규모: ${audienceData.marketSizePyramid.tam.size}` : '',
                  ...(audienceData.marketSizePyramid.tam.characteristics || [])
              ].filter(Boolean),
              color: "fill-accent-primary/40", 
              value: 3,
              textColor: 'fill-gray-900'
            }, 
        ] : [];
        
        return (
            <div className="space-y-6 md:space-y-8 p-0 rounded-lg flex-grow stagger-item">
                <h3 className={`text-xl md:text-2xl font-semibold ${sectionTitleClass} mb-4`}>{tabInfo?.categoryTitle || "타겟 고객 분석"}</h3>
                <SectionContentGrid 
                  items={[
                    { title: "주요 타겟 고객", content: audienceData.primaryAudience },
                    { title: "보조 타겟 고객", content: audienceData.secondaryAudience },
                    { title: "고객 니즈 및 문제점", content: audienceData.customerNeedsAndPainPoints },
                    { title: "고객 가치 제안", content: audienceData.valuePropositionToAudience },
                  ]} 
                  titleColorClass="text-text-light-primary"
                />

                {marketSizeCircleData.length > 0 && (
                  <div className="mt-4">
                    <ConcentricCirclesChart title="시장 규모 분석 (TAM-SAM-SOM)" layers={marketSizeCircleData} />
                  </div>
                )}
            </div>
        );

      case TabKey.MARKETING_SALES_STRATEGY:
        const marketingData = currentData.marketingSalesStrategy;
        return (
          <div className="space-y-6 md:space-y-8 p-0 rounded-lg flex-grow">
            <h3 className={`text-xl md:text-2xl font-semibold ${sectionTitleClass} mb-4`}>{tabInfo?.categoryTitle || "마케팅 및 판매 전략"}</h3>
            <SectionContentGrid
              items={[
                { title: "핵심 마케팅 채널", content: marketingData.keyMarketingChannels },
                { title: "영업 프로세스", content: marketingData.salesProcess },
                { title: "고객 확보 전략", content: marketingData.customerAcquisitionStrategy },
                { title: "브랜드 메시징", content: marketingData.brandMessaging },
              ]}
              titleColorClass="text-text-light-primary"
            />
            {!isBlocked && marketingData.customerJourneyMap && marketingData.customerJourneyMap.length > 0 && marketingData.customerJourneyMap[0].stageName !== "정보 없음" && (
                <CustomerJourneyMap stages={marketingData.customerJourneyMap} />
            )}
          </div>
        );

      case TabKey.KPIS:
        return <>
            <h3 className={`text-xl md:text-2xl font-semibold ${sectionTitleClass} mb-4`}>{tabInfo?.categoryTitle || "핵심 성공 지표 (KPI)"}</h3>
            <SectionContentGrid
              items={[
                { title: "주요 KPI", content: currentData.kpis.primaryKPIs },
                { title: "보조 KPI", content: currentData.kpis.secondaryKPIs },
                { title: "측정 도구 및 주기", content: currentData.kpis.measurementToolsAndFrequency },
                { title: "성공 목표치", content: currentData.kpis.successTargets },
              ]}
              titleColorClass="text-text-light-primary"
            />
        </>;

      case TabKey.RISK_ASSESSMENT:
        return <>
          <h3 className={`text-xl md:text-2xl font-semibold ${sectionTitleClass} mb-4`}>{tabInfo?.categoryTitle || "위험 평가 및 완화"}</h3>
          <SectionContentGrid
            items={[
              { title: "기술적 위험", content: currentData.riskAssessment.potentialTechnicalRisks },
              { title: "시장 위험", content: currentData.riskAssessment.potentialMarketRisks },
              { title: "재무 위험", content: currentData.riskAssessment.potentialFinancialRisks },
              { title: "완화 전략", content: currentData.riskAssessment.mitigationStrategies },
            ]}
            titleColorClass="text-text-light-primary"
          />
        </>;
      
      case TabKey.CONSUMER_REACTION_PREDICTION:
        if (isBlocked) {
           return <div className="text-center p-10 text-text-light-secondary italic">부적절한 요청으로 인해 소비자 반응 시뮬레이션이 차단되었습니다.</div>;
        }

        const reactionData = currentData.consumerReactionPrediction;
        const selectedReactionDetails = reactionData.reactionsByStar.find(r => r.rating === selectedRating);

        return (
            <div className="p-0 rounded-lg flex-grow flex flex-col">
                 <h3 className={`text-xl md:text-2xl font-semibold ${sectionTitleClass} mb-4 text-center`}>
                    {tabInfo?.categoryTitle || "소비자 예상 반응 (별점별)"}
                </h3>
                
                <div className="flex flex-col gap-2 mb-8 items-center max-w-lg mx-auto w-full">
                  <div className="grid grid-cols-3 gap-2 w-full">
                    {[5, 4, 3].map(ratingValue => (
                        <button
                            key={ratingValue}
                            onClick={() => setSelectedRating(ratingValue)}
                            className={`flex-1 px-2 py-3 rounded-xl text-[10px] sm:text-xs font-bold transition-all duration-200 border
                                ${selectedRating === ratingValue 
                                    ? 'bg-accent-primary text-gray-900 border-accent-primary shadow-[0_0_15px_rgba(6,182,212,0.4)] transform scale-105' 
                                    : 'bg-surface-dark-secondary hover:bg-gray-700/80 border-border-dark-secondary text-text-light-secondary'
                                }`}
                        >
                            <div className="flex flex-col items-center">
                              <span className="mb-1 text-sm">{'⭐'.repeat(ratingValue)}</span>
                              <span>{ratingValue}점 반응</span>
                            </div>
                        </button>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-2 w-[66.6%]">
                    {[2, 1].map(ratingValue => (
                        <button
                            key={ratingValue}
                            onClick={() => setSelectedRating(ratingValue)}
                            className={`flex-1 px-2 py-3 rounded-xl text-[10px] sm:text-xs font-bold transition-all duration-200 border
                                ${selectedRating === ratingValue 
                                    ? 'bg-accent-primary text-gray-900 border-accent-primary shadow-[0_0_15px_rgba(6,182,212,0.4)] transform scale-105' 
                                    : 'bg-surface-dark-secondary hover:bg-gray-700/80 border-border-dark-secondary text-text-light-secondary'
                                }`}
                        >
                            <div className="flex flex-col items-center">
                              <span className="mb-1 text-sm">{'⭐'.repeat(ratingValue)}</span>
                              <span>{ratingValue}점 반응</span>
                            </div>
                        </button>
                    ))}
                  </div>
                </div>
                
                {selectedReactionDetails ? (
                    <StarRatingReactionCard reaction={selectedReactionDetails} />
                ) : (
                    <div className="bg-surface-dark-secondary/50 p-10 rounded-2xl border border-dashed border-border-dark-secondary text-center">
                      <p className="text-text-light-secondary mb-2">분석 과정에서 해당 별점 데이터가 누락되었습니다.</p>
                    </div>
                )}
            </div>
        );

      case TabKey.HARSH_CRITIQUE:
        return (
          <div className="p-0 rounded-lg flex-grow flex flex-col items-center">
            <h3 className={`text-xl md:text-2xl font-semibold ${sectionTitleClass} mb-4 self-start`}>{tabInfo?.label || "냉정한 비평"}</h3>
            
            <GradeBadge grade={currentData.harshCritique.grade as IdeaGrade} />

            {isBlocked && (
              <div className="mb-6 p-4 bg-red-950/40 border border-red-800 rounded-xl text-red-200 text-sm flex items-start gap-3 w-full">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
                <div className="flex flex-col">
                  <span className="font-bold text-red-400">분석 거부 알림</span>
                  <span>제출된 아이디어가 서비스 운영 정책 및 윤리 가이드라인을 위반하여 분석이 차단되었습니다.</span>
                </div>
              </div>
            )}

            <ContentCard 
              content={currentData.harshCritique.critique} 
              title={isBlocked ? "거부 사유 보고서" : "분석 리포트"} 
              className={isBlocked ? "bg-red-900/20 border-red-800/50 w-full" : "bg-rose-bg-dark border-rose-border-dark w-full"} 
              titleColorClass={isBlocked ? "text-red-400" : "text-rose-200"}
            />
          </div>
        );
      
      default:
        return <ContentCard title="오류" content="표시할 수 없는 탭입니다." />;
    }
  };

  return (
    <div className="min-h-screen bg-bg-dark-primary p-3 md:p-8 flex flex-col">
      <div className="w-full max-w-6xl mx-auto flex-grow flex flex-col">
        <header className="flex flex-col sm:flex-row justify-between items-center mb-6 md:mb-10 gap-4">
          <h1 className="text-2xl md:text-4xl font-bold text-text-light-primary text-center sm:text-left tracking-tight">Scope AI: Report</h1>
          <button
            onClick={onGoBack}
            className="w-full sm:w-auto bg-accent-primary text-gray-900 font-bold py-2.5 px-6 rounded-lg shadow-soft hover:bg-accent-primary-hover transition-all duration-150"
          >
            새 아이디어 분석
          </button>
        </header>
        
        {!isLoading && analysisResult && !error && (
            <div className={`mb-6 p-4 rounded-lg shadow-soft border ${isBlocked ? 'bg-red-950/20 border-red-900/30' : 'bg-surface-dark-primary border-border-dark-primary'}`}>
                <h2 className={`text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-1 ${isBlocked ? 'text-red-500' : 'text-accent-primary'}`}>
                  {isBlocked ? 'Restricted Idea' : 'Target Idea'}
                </h2>
                <p className={`text-base md:text-lg leading-relaxed font-medium ${isBlocked ? 'text-red-200 opacity-60' : 'text-text-light-primary'}`}>
                  "{idea}"
                </p>
            </div>
        )}
        
        <div className="relative flex-grow flex flex-col">
          <nav className="mb-6"> 
            <div className="grid grid-cols-3 md:flex md:flex-row md:justify-center rounded-lg overflow-hidden border border-border-dark-secondary bg-surface-dark-primary shadow-sm" role="group">
              {TABS.map((tab) => (
                <TabButton
                  key={tab.key}
                  label={tab.label}
                  icon={tab.icon}
                  onClick={() => setActiveTab(tab.key)}
                  isActive={activeTab === tab.key}
                  activeColorClass={isBlocked ? "red-600" : "accent-primary"} 
                />
              ))}
            </div>
          </nav>
          <section className={`p-4 md:p-8 shadow-soft rounded-xl border flex-grow flex flex-col min-h-[400px] ${isBlocked ? 'bg-black/40 border-red-900/50' : 'bg-surface-dark-primary border-border-dark-primary'}`}>
            {renderMainContent()}
          </section>
        </div>
      </div>
      <footer className="mt-8 mb-4 text-center text-text-light-secondary/60 text-[10px] md:text-xs shrink-0">
        <p>&copy; {new Date().getFullYear()} Scope AI. Analysis by Google Gemini.</p>
      </footer>
    </div>
  );
};

export default AnalysisPage;

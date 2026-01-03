
import { TabKey, TabItem, AnalysisResult, PyramidLayerContent, CustomerJourneyStage, StarRatingReaction, ConcentricCircleLayerData } from './types';

export const API_MODEL_NAME = 'gemini-3-pro-preview';

export const TABS: TabItem[] = [
  { key: TabKey.SWOT, label: "SWOT", icon: undefined, color: "", activeColor: "accent-primary", categoryTitle: "SWOT" },
  { key: TabKey.COMPETITIVE_LANDSCAPE, label: "경쟁 환경", icon: undefined, color: "", activeColor: "accent-primary", categoryTitle: "경쟁 환경" },
  { key: TabKey.MONETIZATION_STRATEGY, label: "수익 모델", icon: undefined, color: "", activeColor: "accent-primary", categoryTitle: "수익 모델" },
  { key: TabKey.TARGET_AUDIENCE, label: "타겟 고객", icon: undefined, color: "", activeColor: "accent-primary", categoryTitle: "타겟 고객" },
  { key: TabKey.MARKETING_SALES_STRATEGY, label: "마케팅/판매", icon: undefined, color: "", activeColor: "accent-primary", categoryTitle: "마케팅/판매" },
  { key: TabKey.KPIS, label: "KPI", icon: undefined, color: "", activeColor: "accent-primary", categoryTitle: "KPI" },
  { key: TabKey.RISK_ASSESSMENT, label: "위험 평가", icon: undefined, color: "", activeColor: "accent-primary", categoryTitle: "위험 평가" },
  { key: TabKey.CONSUMER_REACTION_PREDICTION, label: "소비자 예상 반응", icon: "⭐", color: "", activeColor: "accent-primary", categoryTitle: "소비자 예상 반응" },
  { key: TabKey.HARSH_CRITIQUE, label: "냉정한 비평", icon: undefined, color: "", activeColor: "accent-primary" },
];


const NA = "정보 없음";
const ERR = "분석 중 오류 발생";

const defaultPositioningMapData = {
  xAxisLabel: "X 축 (예: 혁신성)",
  yAxisLabel: "Y 축 (예: 시장성)",
  ourCompany: { name: "우리 아이디어", x: 5, y: 5 },
  competitors: [],
};

const defaultFeatureMatrixData = {
  competitorNames: [],
  features: [],
};

const defaultMonetizationStrategy = {
  keyRevenueStreamsSummary: ["구독료 기반", "광고 수익", "프리미엄 기능 판매"],
  pricingPolicySummary: NA,
  keyPayingCustomersSummary: [],
  keyStrengthsSummary: NA,
  revenueStreams: NA,
  pricingPolicy: NA,
  estimatedRevenuePotential: NA,
  paymentCollectionMethods: NA,
};

const defaultPyramidLayerContent: PyramidLayerContent = { name: NA, description: NA, size: NA, characteristics: [NA], personas: [NA] };
const errorPyramidLayerContent: PyramidLayerContent = { name: ERR, description: ERR, size: ERR, characteristics: [ERR], personas: [ERR] };


const defaultMarketSizePyramid = {
  tam: { ...defaultPyramidLayerContent, name: "TAM (전체 시장)"},
  sam: { ...defaultPyramidLayerContent, name: "SAM (유효 시장)"},
  som: { ...defaultPyramidLayerContent, name: "SOM (점유 가능 시장)"},
};

const defaultCustomerSegmentationPyramid = {
  primaryTarget: { ...defaultPyramidLayerContent, name: "핵심 타겟"},
  secondaryTarget: { ...defaultPyramidLayerContent, name: "2차 타겟"},
  tertiaryTarget: { ...defaultPyramidLayerContent, name: "확장 타겟"},
};

const defaultCustomerLoyaltyPyramid = {
  advocates: { ...defaultPyramidLayerContent, name: "옹호자/전도사"},
  loyalCustomers: { ...defaultPyramidLayerContent, name: "단골 고객"},
  regularCustomers: { ...defaultPyramidLayerContent, name: "일반 고객"},
  prospects: { ...defaultPyramidLayerContent, name: "잠재 고객/방문자"},
};

const defaultTargetAudience = {
  primaryAudience: NA, 
  secondaryAudience: NA, 
  customerNeedsAndPainPoints: NA, 
  valuePropositionToAudience: NA,
  marketSizePyramid: defaultMarketSizePyramid,
  customerSegmentationPyramid: defaultCustomerSegmentationPyramid,
  customerLoyaltyPyramid: defaultCustomerLoyaltyPyramid,
};

const defaultCustomerJourneyStage: CustomerJourneyStage = {
  stageName: NA,
  customerActions: [NA],
  touchpoints: [NA],
  channels: [NA],
  kpis: [NA],
};

const defaultMarketingSalesStrategy = {
  keyMarketingChannels: NA,
  salesProcess: NA,
  customerAcquisitionStrategy: NA,
  brandMessaging: NA,
  customerJourneyMap: [defaultCustomerJourneyStage],
};

const getDefaultStarRatingReaction = (rating: number, message: string): StarRatingReaction => {
    const stars = '⭐'.repeat(rating) + '☆'.repeat(5-rating); 
    return {
        rating,
        title: `${stars} (${rating}점) - ${message}`,
        expectedComment: message,
        keyReactionPoints: [message],
        startupConsiderations: [message],
    };
};

const defaultConsumerReactionPrediction = {
    reactionsByStar: [
        getDefaultStarRatingReaction(5, NA),
        getDefaultStarRatingReaction(4, NA),
        getDefaultStarRatingReaction(3, NA),
        getDefaultStarRatingReaction(2, NA),
        getDefaultStarRatingReaction(1, NA),
    ]
};

export const DEFAULT_ANALYSIS_RESULT: AnalysisResult = {
  swot: { strengths: NA, weaknesses: NA, opportunities: NA, threats: NA },
  competitiveLandscape: { 
    mainCompetitors: NA, competitiveAdvantages: NA, marketEntryBarriers: NA, differentiationPoints: NA,
    positioningMapData: defaultPositioningMapData,
    featureMatrixData: defaultFeatureMatrixData,
  },
  monetizationStrategy: defaultMonetizationStrategy,
  targetAudience: defaultTargetAudience,
  marketingSalesStrategy: defaultMarketingSalesStrategy,
  kpis: { primaryKPIs: NA, secondaryKPIs: NA, measurementToolsAndFrequency: NA, successTargets: NA },
  riskAssessment: { potentialTechnicalRisks: NA, potentialMarketRisks: NA, potentialFinancialRisks: NA, mitigationStrategies: NA },
  consumerReactionPrediction: defaultConsumerReactionPrediction,
  harshCritique: { grade: 'C', critique: NA },
};

const errorPositioningMapData = {
  xAxisLabel: "오류",
  yAxisLabel: "오류",
  ourCompany: { name: "오류", x: 0, y: 0 },
  competitors: [],
};

const errorFeatureMatrixData = {
  competitorNames: ["오류"],
  features: [{ featureName: "오류", ourCompany: "X", competitorValues: ["X"] }],
};

const errorMonetizationStrategy = {
  keyRevenueStreamsSummary: ["오류"],
  pricingPolicySummary: ERR,
  keyPayingCustomersSummary: ["오류"],
  keyStrengthsSummary: ERR,
  revenueStreams: ERR,
  pricingPolicy: ERR,
  estimatedRevenuePotential: ERR,
  paymentCollectionMethods: ERR,
};

const errorMarketSizePyramid = {
  tam: { ...errorPyramidLayerContent, name: "TAM (전체 시장)"},
  sam: { ...errorPyramidLayerContent, name: "SAM (유효 시장)"},
  som: { ...errorPyramidLayerContent, name: "SOM (점유 가능 시장)"},
};

const errorCustomerSegmentationPyramid = {
  primaryTarget: { ...errorPyramidLayerContent, name: "핵심 타겟"},
  secondaryTarget: { ...errorPyramidLayerContent, name: "2차 타겟"},
  tertiaryTarget: { ...errorPyramidLayerContent, name: "확장 타겟"},
};

const errorCustomerLoyaltyPyramid = {
  advocates: { ...errorPyramidLayerContent, name: "옹호자/전도사"},
  loyalCustomers: { ...errorPyramidLayerContent, name: "단골 고객"},
  regularCustomers: { ...errorPyramidLayerContent, name: "일반 고객"},
  prospects: { ...errorPyramidLayerContent, name: "잠재 고객/방문자"},
};

const errorTargetAudience = {
  primaryAudience: ERR, 
  secondaryAudience: ERR, 
  customerNeedsAndPainPoints: ERR, 
  valuePropositionToAudience: ERR,
  marketSizePyramid: errorMarketSizePyramid,
  customerSegmentationPyramid: errorCustomerSegmentationPyramid,
  customerLoyaltyPyramid: errorCustomerLoyaltyPyramid,
};

const errorCustomerJourneyStage: CustomerJourneyStage = {
  stageName: ERR,
  customerActions: [ERR],
  touchpoints: [ERR],
  channels: [ERR],
  kpis: [ERR],
};

const errorMarketingSalesStrategy = {
  keyMarketingChannels: ERR,
  salesProcess: ERR,
  customerAcquisitionStrategy: ERR,
  brandMessaging: ERR,
  customerJourneyMap: [errorCustomerJourneyStage],
};

const errorConsumerReactionPrediction = {
    reactionsByStar: [
        getDefaultStarRatingReaction(5, ERR),
        getDefaultStarRatingReaction(4, ERR),
        getDefaultStarRatingReaction(3, ERR),
        getDefaultStarRatingReaction(2, ERR),
        getDefaultStarRatingReaction(1, ERR),
    ]
};

export const ERROR_ANALYSIS_RESULT: AnalysisResult = {
  swot: { strengths: ERR, weaknesses: ERR, opportunities: ERR, threats: ERR },
  competitiveLandscape: { 
    mainCompetitors: ERR, competitiveAdvantages: ERR, marketEntryBarriers: ERR, differentiationPoints: ERR,
    positioningMapData: errorPositioningMapData,
    featureMatrixData: errorFeatureMatrixData,
  },
  monetizationStrategy: errorMonetizationStrategy,
  targetAudience: errorTargetAudience,
  marketingSalesStrategy: errorMarketingSalesStrategy,
  kpis: { primaryKPIs: ERR, secondaryKPIs: ERR, measurementToolsAndFrequency: ERR, successTargets: ERR },
  riskAssessment: { potentialTechnicalRisks: ERR, potentialMarketRisks: ERR, potentialFinancialRisks: ERR, mitigationStrategies: ERR },
  consumerReactionPrediction: errorConsumerReactionPrediction,
  harshCritique: { grade: 'F', critique: ERR },
};

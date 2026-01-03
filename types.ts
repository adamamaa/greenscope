
import React from 'react';

export interface SWOTAnalysis {
  strengths: string;
  weaknesses: string;
  opportunities: string;
  threats: string;
}

export interface PositioningMapPoint {
  name: string;
  x: number; 
  y: number; 
}

export interface PositioningMapData {
  xAxisLabel: string;
  yAxisLabel: string;
  ourCompany: PositioningMapPoint;
  competitors: PositioningMapPoint[];
}

export interface FeatureMatrixFeature {
  featureName: string;
  ourCompany: string; 
  competitorValues: string[]; 
}

export interface FeatureMatrixData {
  competitorNames: string[]; 
  features: FeatureMatrixFeature[];
}

export interface CompetitiveLandscapeAnalysis {
  mainCompetitors: string;
  competitiveAdvantages: string;
  marketEntryBarriers: string;
  differentiationPoints: string;
  positioningMapData: PositioningMapData;
  featureMatrixData: FeatureMatrixData;
}

export interface MonetizationStrategyAnalysis {
  keyRevenueStreamsSummary: string[]; 
  pricingPolicySummary: string; 
  keyPayingCustomersSummary: string[]; 
  keyStrengthsSummary?: string; 
  revenueStreams: string;
  pricingPolicy: string;
  estimatedRevenuePotential: string;
  paymentCollectionMethods: string;
}

export interface PyramidLayerContent { 
  name: string;
  description: string;
  size?: string; 
  characteristics?: string[]; 
  personas?: string[]; 
}

export interface MarketSizePyramidLayerSet { 
  tam: PyramidLayerContent;
  sam: PyramidLayerContent;
  som: PyramidLayerContent;
}

export interface CustomerSegmentationPyramidLayerSet {
  primaryTarget: PyramidLayerContent;
  secondaryTarget: PyramidLayerContent;
  tertiaryTarget: PyramidLayerContent;
}

export interface CustomerLoyaltyPyramidLayerSet {
  advocates: PyramidLayerContent;
  loyalCustomers: PyramidLayerContent;
  regularCustomers: PyramidLayerContent;
  prospects: PyramidLayerContent;
}

export interface TargetAudienceAnalysis {
  primaryAudience: string;
  secondaryAudience: string;
  customerNeedsAndPainPoints: string;
  valuePropositionToAudience: string;
  marketSizePyramid?: MarketSizePyramidLayerSet; 
  customerSegmentationPyramid?: CustomerSegmentationPyramidLayerSet;
  customerLoyaltyPyramid?: CustomerLoyaltyPyramidLayerSet;
}

export interface CustomerJourneyStage {
  stageName: string;
  customerActions: string[]; 
  touchpoints: string[];     
  channels: string[];        
  kpis: string[];            
}

export interface MarketingSalesStrategyAnalysis {
  keyMarketingChannels: string;
  salesProcess: string;
  customerAcquisitionStrategy: string;
  brandMessaging: string;
  customerJourneyMap?: CustomerJourneyStage[];
}

export interface KPIAnalysis {
  primaryKPIs: string;
  secondaryKPIs: string;
  measurementToolsAndFrequency: string;
  successTargets: string;
}

export interface RiskAssessmentAnalysis {
  potentialTechnicalRisks: string;
  potentialMarketRisks: string;
  potentialFinancialRisks: string;
  mitigationStrategies: string;
}

export interface StarRatingReaction {
  rating: number; 
  title: string; 
  expectedComment: string;
  keyReactionPoints: string[];
  startupConsiderations: string[];
}

export interface ConsumerReactionPrediction {
  reactionsByStar: StarRatingReaction[]; 
}

export type IdeaGrade = 'S' | 'A' | 'B' | 'C' | 'D' | 'F';

export interface HarshCritiqueAnalysis {
  grade: IdeaGrade;
  critique: string;
}

export interface AnalysisResult {
  swot: SWOTAnalysis;
  competitiveLandscape: CompetitiveLandscapeAnalysis;
  monetizationStrategy: MonetizationStrategyAnalysis;
  targetAudience: TargetAudienceAnalysis;
  marketingSalesStrategy: MarketingSalesStrategyAnalysis;
  kpis: KPIAnalysis;
  riskAssessment: RiskAssessmentAnalysis;
  consumerReactionPrediction: ConsumerReactionPrediction;
  harshCritique: HarshCritiqueAnalysis;
}

export enum TabKey {
  SWOT = "swot",
  COMPETITIVE_LANDSCAPE = "competitiveLandscape",
  MONETIZATION_STRATEGY = "monetizationStrategy",
  TARGET_AUDIENCE = "targetAudience",
  MARKETING_SALES_STRATEGY = "marketingSalesStrategy",
  KPIS = "kpis",
  RISK_ASSESSMENT = "riskAssessment",
  CONSUMER_REACTION_PREDICTION = "consumerReactionPrediction",
  HARSH_CRITIQUE = "harshCritique",
}

export interface TabItem {
  key: TabKey;
  label: string;
  icon?: React.ReactNode; 
  color: string; 
  activeColor: string; 
  categoryTitle?: string;
}

export interface PyramidLayerData {
    name: string;
    description?: string;
    details?: string[];
    color: string;
    textColor?: string;
}

export interface ConcentricCircleLayerData {
    name: string;
    description?: string;
    details?: string[];
    color: string; 
    value: number; 
    textColor?: string;
}

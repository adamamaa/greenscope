
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from '../types';
import { API_MODEL_NAME, DEFAULT_ANALYSIS_RESULT, ERROR_ANALYSIS_RESULT } from '../constants';

export const generateAnalysis = async (idea: string): Promise<AnalysisResult> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("Cannot generate analysis: API_KEY is missing.");
    return JSON.parse(JSON.stringify(DEFAULT_ANALYSIS_RESULT));
  }

  const ai = new GoogleGenAI({ apiKey });

  // 안전 및 품질 가이드라인이 포함된 강화된 프롬프트
  const prompt = `다음 비즈니스 아이디어를 한국어로 심층 분석하여 체계적인 보고서를 작성해주세요: "${idea}"
  
  [중요: 안전 및 윤리 가이드라인]
  입력된 아이디어가 불법적인 활동(마약, 사기, 도박 등), 폭력, 혐오 표현, 성인물, 또는 기타 심각한 윤리적 결함이 있는 경우 다음과 같이 처리하십시오:
  1. 'harshCritique'의 'grade'를 반드시 'F'로 설정하십시오.
  2. 'harshCritique'의 'critique'에 분석이 거부된 구체적인 이유(윤리적/법적 사유)를 작성하십시오.
  3. 다른 모든 텍스트 필드(SWOT, 수익모델 등)의 내용을 "부적절한 요청으로 인해 분석이 거부되었습니다."로 통일하십시오.
  4. 'reactionsByStar' 배열은 비워두거나 동일한 거부 메시지로 채우십시오.

  [분석 품질 및 스타일 가이드라인 (매우 중요)]
  1. **포지셔닝 맵 (보수적 평가)**: 
     - "우리 회사(Our Company)"의 위치를 무조건 (10, 10)이나 최상위권에 두지 마십시오. 초기 아이디어임을 감안하여 **현실적이고 보수적인 위치(예: x=6~8, y=5~7)**에 배치하십시오.
     - 경쟁사들을 강력하게 묘사하고, 시장을 이미 장악하고 있는 플레이어들을 상위권에 배치하십시오.
  
  2. **기능 비교 매트릭스 (기호 엄수)**: 
     - 'featureMatrixData'의 셀 값(competitorValues, ourCompany)에는 오직 **'O' (제공/우수), 'X' (미제공/없음), '△' (보통/부분제공)** 세 가지 기호만 사용하십시오. 
     - 절대 "제공함", "높음" 등의 텍스트를 쓰지 마십시오.

  3. **KPI 및 위험 평가 (철저한 분석)**:
     - KPI는 단순한 지표 나열이 아니라, 초기 스타트업이 생존하기 위해 반드시 확인해야 할 구체적인 수치와 지표를 제시하십시오.
     - 위험 평가는 "잘 해결될 것이다"라는 낙관론을 배제하고, 사업을 망하게 할 수 있는 치명적인 시나리오와 이에 대한 구체적이고 실질적인 대비책을 작성하십시오.

  [일반 지침]
  1. 아이디어에 대해 S, A, B, C, D, F 등급을 매기세요.
  2. 'consumerReactionPrediction' 섹션의 'reactionsByStar' 배열에는 반드시 1점, 2점, 3점, 4점, 5점 등 총 5개의 객체가 하나도 빠짐없이 포함되어야 합니다.
  3. 모든 텍스트는 전문적이고 통찰력 있는 한국어로 작성하세요.
  4. '냉정한 비평' 섹션은 매우 비판적이고 현실적인 관점에서 작성해주세요.`;

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      swot: {
        type: Type.OBJECT,
        properties: {
          strengths: { type: Type.STRING },
          weaknesses: { type: Type.STRING },
          opportunities: { type: Type.STRING },
          threats: { type: Type.STRING }
        },
        required: ["strengths", "weaknesses", "opportunities", "threats"]
      },
      competitiveLandscape: {
        type: Type.OBJECT,
        properties: {
          mainCompetitors: { type: Type.STRING },
          competitiveAdvantages: { type: Type.STRING },
          marketEntryBarriers: { type: Type.STRING },
          differentiationPoints: { type: Type.STRING },
          positioningMapData: {
            type: Type.OBJECT,
            properties: {
              xAxisLabel: { type: Type.STRING },
              yAxisLabel: { type: Type.STRING },
              ourCompany: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  x: { type: Type.NUMBER },
                  y: { type: Type.NUMBER }
                },
                required: ["name", "x", "y"]
              },
              competitors: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    x: { type: Type.NUMBER },
                    y: { type: Type.NUMBER }
                  },
                  required: ["name", "x", "y"]
                }
              }
            },
            required: ["xAxisLabel", "yAxisLabel", "ourCompany", "competitors"]
          },
          featureMatrixData: {
            type: Type.OBJECT,
            properties: {
              competitorNames: { type: Type.ARRAY, items: { type: Type.STRING } },
              features: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    featureName: { type: Type.STRING },
                    ourCompany: { type: Type.STRING },
                    competitorValues: { type: Type.ARRAY, items: { type: Type.STRING } }
                  },
                  required: ["featureName", "ourCompany", "competitorValues"]
                }
              }
            },
            required: ["competitorNames", "features"]
          }
        },
        required: ["mainCompetitors", "competitiveAdvantages", "marketEntryBarriers", "differentiationPoints", "positioningMapData", "featureMatrixData"]
      },
      monetizationStrategy: {
        type: Type.OBJECT,
        properties: {
          keyRevenueStreamsSummary: { type: Type.ARRAY, items: { type: Type.STRING } },
          pricingPolicySummary: { type: Type.STRING },
          keyPayingCustomersSummary: { type: Type.ARRAY, items: { type: Type.STRING } },
          keyStrengthsSummary: { type: Type.STRING },
          revenueStreams: { type: Type.STRING },
          pricingPolicy: { type: Type.STRING },
          estimatedRevenuePotential: { type: Type.STRING },
          paymentCollectionMethods: { type: Type.STRING }
        },
        required: ["keyRevenueStreamsSummary", "pricingPolicySummary", "keyPayingCustomersSummary", "revenueStreams", "pricingPolicy", "estimatedRevenuePotential", "paymentCollectionMethods"]
      },
      targetAudience: {
        type: Type.OBJECT,
        properties: {
          primaryAudience: { type: Type.STRING },
          secondaryAudience: { type: Type.STRING },
          customerNeedsAndPainPoints: { type: Type.STRING },
          valuePropositionToAudience: { type: Type.STRING },
          marketSizePyramid: {
            type: Type.OBJECT,
            properties: {
              tam: {
                type: Type.OBJECT,
                properties: { name: { type: Type.STRING }, description: { type: Type.STRING }, size: { type: Type.STRING }, characteristics: { type: Type.ARRAY, items: { type: Type.STRING } } },
                required: ["name", "description"]
              },
              sam: {
                type: Type.OBJECT,
                properties: { name: { type: Type.STRING }, description: { type: Type.STRING }, size: { type: Type.STRING }, characteristics: { type: Type.ARRAY, items: { type: Type.STRING } } },
                required: ["name", "description"]
              },
              som: {
                type: Type.OBJECT,
                properties: { name: { type: Type.STRING }, description: { type: Type.STRING }, size: { type: Type.STRING }, characteristics: { type: Type.ARRAY, items: { type: Type.STRING } } },
                required: ["name", "description"]
              }
            },
            required: ["tam", "sam", "som"]
          },
          customerSegmentationPyramid: {
            type: Type.OBJECT,
            properties: {
              primaryTarget: {
                type: Type.OBJECT,
                properties: { name: { type: Type.STRING }, description: { type: Type.STRING }, personas: { type: Type.ARRAY, items: { type: Type.STRING } } },
                required: ["name", "description"]
              },
              secondaryTarget: {
                type: Type.OBJECT,
                properties: { name: { type: Type.STRING }, description: { type: Type.STRING }, personas: { type: Type.ARRAY, items: { type: Type.STRING } } },
                required: ["name", "description"]
              },
              tertiaryTarget: {
                type: Type.OBJECT,
                properties: { name: { type: Type.STRING }, description: { type: Type.STRING }, personas: { type: Type.ARRAY, items: { type: Type.STRING } } },
                required: ["name", "description"]
              }
            },
            required: ["primaryTarget", "secondaryTarget", "tertiaryTarget"]
          },
          customerLoyaltyPyramid: {
            type: Type.OBJECT,
            properties: {
              advocates: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, description: { type: Type.STRING }, characteristics: { type: Type.ARRAY, items: { type: Type.STRING } } }, required: ["name", "description"] },
              loyalCustomers: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, description: { type: Type.STRING }, characteristics: { type: Type.ARRAY, items: { type: Type.STRING } } }, required: ["name", "description"] },
              regularCustomers: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, description: { type: Type.STRING }, characteristics: { type: Type.ARRAY, items: { type: Type.STRING } } }, required: ["name", "description"] },
              prospects: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, description: { type: Type.STRING }, characteristics: { type: Type.ARRAY, items: { type: Type.STRING } } }, required: ["name", "description"] }
            },
            required: ["advocates", "loyalCustomers", "regularCustomers", "prospects"]
          }
        },
        required: ["primaryAudience", "secondaryAudience", "customerNeedsAndPainPoints", "valuePropositionToAudience", "marketSizePyramid", "customerSegmentationPyramid", "customerLoyaltyPyramid"]
      },
      marketingSalesStrategy: {
        type: Type.OBJECT,
        properties: {
          keyMarketingChannels: { type: Type.STRING },
          salesProcess: { type: Type.STRING },
          customerAcquisitionStrategy: { type: Type.STRING },
          brandMessaging: { type: Type.STRING },
          customerJourneyMap: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                stageName: { type: Type.STRING },
                customerActions: { type: Type.ARRAY, items: { type: Type.STRING } },
                touchpoints: { type: Type.ARRAY, items: { type: Type.STRING } },
                channels: { type: Type.ARRAY, items: { type: Type.STRING } },
                kpis: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["stageName", "customerActions", "touchpoints", "channels", "kpis"]
            }
          }
        },
        required: ["keyMarketingChannels", "salesProcess", "customerAcquisitionStrategy", "brandMessaging", "customerJourneyMap"]
      },
      kpis: {
        type: Type.OBJECT,
        properties: {
          primaryKPIs: { type: Type.STRING },
          secondaryKPIs: { type: Type.STRING },
          measurementToolsAndFrequency: { type: Type.STRING },
          successTargets: { type: Type.STRING }
        },
        required: ["primaryKPIs", "secondaryKPIs", "measurementToolsAndFrequency", "successTargets"]
      },
      riskAssessment: {
        type: Type.OBJECT,
        properties: {
          potentialTechnicalRisks: { type: Type.STRING },
          potentialMarketRisks: { type: Type.STRING },
          potentialFinancialRisks: { type: Type.STRING },
          mitigationStrategies: { type: Type.STRING }
        },
        required: ["potentialTechnicalRisks", "potentialMarketRisks", "potentialFinancialRisks", "mitigationStrategies"]
      },
      consumerReactionPrediction: {
        type: Type.OBJECT,
        properties: {
          reactionsByStar: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                rating: { type: Type.NUMBER },
                title: { type: Type.STRING },
                expectedComment: { type: Type.STRING },
                keyReactionPoints: { type: Type.ARRAY, items: { type: Type.STRING } },
                startupConsiderations: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["rating", "title", "expectedComment", "keyReactionPoints", "startupConsiderations"]
            }
          }
        },
        required: ["reactionsByStar"]
      },
      harshCritique: {
        type: Type.OBJECT,
        properties: {
          grade: { type: Type.STRING, description: "Idea Grade: S, A, B, C, D, or F" },
          critique: { type: Type.STRING, description: "Detailed harsh critique" }
        },
        required: ["grade", "critique"]
      }
    },
    required: ["swot", "competitiveLandscape", "monetizationStrategy", "targetAudience", "marketingSalesStrategy", "kpis", "riskAssessment", "consumerReactionPrediction", "harshCritique"]
  };

  try {
    const response = await ai.models.generateContent({
      model: API_MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema as any,
        temperature: 0.1, // 안전 판단의 일관성을 위해 온도를 낮게 설정
      },
    });

    const jsonStr = response.text.trim();
    if (!jsonStr) throw new Error("Empty response from AI");
    
    const parsedData = JSON.parse(jsonStr);
    return parsedData as AnalysisResult;

  } catch (error) {
    console.error("Error generating analysis:", error);
    return JSON.parse(JSON.stringify(ERROR_ANALYSIS_RESULT));
  }
};

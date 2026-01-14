
import React from 'react';
import { FeatureMatrixData } from '../types';

interface FeatureComparisonMatrixProps {
  data: FeatureMatrixData;
}

const FeatureComparisonMatrix: React.FC<FeatureComparisonMatrixProps> = ({ data }) => {
  if (!data || !data.features || data.features.length === 0) {
    return (
      <div className="bg-surface-dark-secondary p-6 rounded-lg shadow-soft text-text-light-secondary border border-border-dark-primary text-center">
        비교 데이터가 없습니다.
      </div>
    );
  }

  const { competitorNames, features } = data;

  // 기호 전용 렌더링 함수
  const renderCellValue = (value: string) => {
    // 값이 문자열로 들어오더라도 기호가 포함되어 있는지 확인하여 스타일링
    const trimmed = value.trim();
    
    if (trimmed.includes('O')) return <span className="text-green-400 font-black text-lg">O</span>;
    if (trimmed.includes('X')) return <span className="text-red-400 font-black text-lg">X</span>;
    if (trimmed.includes('△')) return <span className="text-yellow-400 font-black text-lg">△</span>;
    
    // Fallback if AI sends something else, though prompt forbids it
    return <span className="text-text-light-primary text-xs">{value}</span>;
  };

  return (
    <div className="bg-surface-dark-secondary p-4 md:p-6 rounded-lg shadow-soft border border-border-dark-primary w-full flex flex-col overflow-hidden">
      <h3 className="text-xl font-semibold text-text-light-primary mb-4">기능 비교 매트릭스</h3>
      <div className="overflow-x-auto no-scrollbar">
        <table className="min-w-full border-collapse text-[11px] sm:text-xs md:text-sm">
          <thead className="bg-gray-700/50">
            <tr>
              <th scope="col" className="p-2 md:p-3 border border-border-dark-secondary text-left font-bold text-text-light-primary whitespace-nowrap">기능</th>
              <th scope="col" className="p-2 md:p-3 border border-border-dark-secondary text-center font-bold text-accent-primary bg-accent-primary/10 whitespace-nowrap">자사</th>
              {competitorNames.map((name, index) => (
                <th key={index} scope="col" className="p-2 md:p-3 border border-border-dark-secondary text-center font-bold text-text-light-secondary whitespace-nowrap">{name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((feature, featureIndex) => (
              <tr key={featureIndex} className={featureIndex % 2 === 0 ? 'bg-transparent' : 'bg-gray-800/30'}>
                <td className="p-2 md:p-3 border border-border-dark-secondary text-text-light-secondary font-medium whitespace-nowrap">{feature.featureName}</td>
                <td className="p-2 md:p-3 border border-border-dark-secondary text-center bg-accent-primary/5">{renderCellValue(feature.ourCompany)}</td>
                {feature.competitorValues.map((value, valueIndex) => (
                  <td key={valueIndex} className="p-2 md:p-3 border border-border-dark-secondary text-center whitespace-normal min-w-[60px]">{renderCellValue(value)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        <div className="mt-4 flex flex-wrap justify-end gap-x-6 gap-y-1 text-[11px] text-text-light-secondary/80 border-t border-border-dark-secondary pt-3">
            <div className="flex items-center gap-1"><span className="text-green-400 font-bold text-sm">O</span> 제공</div>
            <div className="flex items-center gap-1"><span className="text-yellow-400 font-bold text-sm">△</span> 부분</div>
            <div className="flex items-center gap-1"><span className="text-red-400 font-bold text-sm">X</span> 미제공</div>
        </div>
    </div>
  );
};

export default FeatureComparisonMatrix;

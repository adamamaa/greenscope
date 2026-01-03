
import React from 'react';
import { PositioningMapData } from '../types';

interface PositioningMapProps {
  data: PositioningMapData;
}

const PositioningMap: React.FC<PositioningMapProps> = ({ data }) => {
  if (!data || !data.ourCompany || !data.competitors) {
    return (
      <div className="bg-surface-dark-secondary p-6 rounded-lg shadow-soft text-text-light-secondary border border-border-dark-primary w-full h-full flex items-center justify-center">
        포지셔닝 맵 데이터를 불러오는 중이거나, 데이터가 없습니다.
      </div>
    );
  }

  const { xAxisLabel, yAxisLabel, ourCompany, competitors } = data;

  const padding = 50; 
  const svgWidth = 380; 
  const svgHeight = 320; 
  const plotWidth = svgWidth - padding * 2;
  const plotHeight = svgHeight - padding * 2; 

  const scaleX = (value: number) => (value / 10) * plotWidth + padding;
  const scaleY = (value: number) => plotHeight - (value / 10) * plotHeight + padding;


  return (
    <div className="bg-surface-dark-secondary p-5 md:p-6 rounded-lg shadow-soft border border-border-dark-primary w-full h-full flex flex-col">
      <h3 className="text-lg md:text-xl font-semibold text-text-light-primary mb-4">포지셔닝 맵</h3>
      <div className="flex-grow flex items-center justify-center w-full">
        <svg 
          viewBox={`0 0 ${svgWidth} ${svgHeight}`} 
          className="w-full h-auto max-w-md font-sans" 
          aria-labelledby="positioning-map-title" 
          role="img"
        >
          <title id="positioning-map-title">시장 내 경쟁사 대비 아이디어 포지셔닝 맵</title>
          
          {/* Grid Lines */}
          {[...Array(11)].map((_, i) => (
            <g key={`grid-${i}`}>
              <line 
                x1={scaleX(i)} y1={padding} 
                x2={scaleX(i)} y2={plotHeight + padding} 
                className={i === 5 ? "stroke-border-dark-secondary" : "stroke-border-dark-primary"} 
                strokeWidth={i === 5 ? "1" : "0.5"} 
              />
              <line 
                x1={padding} y1={scaleY(i)} 
                x2={plotWidth + padding} y2={scaleY(i)} 
                className={i === 5 ? "stroke-border-dark-secondary" : "stroke-border-dark-primary"} 
                strokeWidth={i === 5 ? "1" : "0.5"} 
              />
            </g>
          ))}

          {/* Axis Labels */}
          <text x={svgWidth / 2} y={svgHeight - 10} textAnchor="middle" fontSize="11" fontWeight="bold" className="fill-accent-primary uppercase tracking-wider">{xAxisLabel}</text>
          <text x={12} y={svgHeight / 2} transform={`rotate(-90 12,${svgHeight/2})`} textAnchor="middle" fontSize="11" fontWeight="bold" className="fill-accent-primary uppercase tracking-wider">{yAxisLabel}</text>

          {/* Competitors */}
          {competitors.map((comp, index) => (
            <g key={`comp-${index}`} transform={`translate(${scaleX(comp.x)}, ${scaleY(comp.y)})`}>
              <circle r="4.5" className="fill-surface-dark-primary stroke-text-light-secondary" strokeWidth="1.5" />
              <text x="8" y="3" fontSize="9" className="fill-text-light-secondary font-medium">{comp.name}</text>
            </g>
          ))}

          {/* Our Company */}
          <g transform={`translate(${scaleX(ourCompany.x)}, ${scaleY(ourCompany.y)})`}>
            <circle r="8" className="fill-accent-primary animate-pulse opacity-20" />
            <polygon points="0,-7 2.05,-2.05 7,0 2.05,2.05 0,7 -2.05,2.05 -7,0 -2.05,-2.05" className="fill-accent-primary stroke-white" strokeWidth="1"/>
            <text x="10" y="4" fontSize="11" fontWeight="900" className="fill-accent-primary drop-shadow-md">{ourCompany.name}</text>
          </g>
        </svg>
      </div>
      <div className="mt-4 flex justify-center space-x-4 text-[10px] text-text-light-secondary/60">
        <div className="flex items-center"><span className="w-2 h-2 bg-accent-primary mr-1 rounded-sm"></span> 자사</div>
        <div className="flex items-center"><span className="w-2 h-2 border border-text-light-secondary mr-1 rounded-full"></span> 경쟁사</div>
      </div>
    </div>
  );
};

export default PositioningMap;

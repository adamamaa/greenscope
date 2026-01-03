
import React, { useState } from 'react';
import { ConcentricCircleLayerData } from '../types';

interface ConcentricCirclesChartProps {
  title: string;
  layers: ConcentricCircleLayerData[];
}

const ConcentricCirclesChart: React.FC<ConcentricCirclesChartProps> = ({ title, layers }) => {
  const [hoveredLayerDetails, setHoveredLayerDetails] = useState<ConcentricCircleLayerData | null>(null);

  if (!layers || layers.length === 0) {
    return (
      <div className="bg-surface-dark-secondary p-6 rounded-lg shadow-soft text-text-light-secondary border border-border-dark-primary">
        {title} 데이터를 불러오는 중이거나, 데이터가 없습니다.
      </div>
    );
  }

  const sortedLayers = [...layers].sort((a, b) => b.value - a.value); 

  const svgSize = 300;
  const svgWidth = svgSize;
  const svgHeight = svgSize; 

  const horizontalPadding = 20;
  const bottomPadding = 20;
  
  const centerX = svgWidth / 2;
  const baseLineY = svgHeight - bottomPadding; 

  const maxRadius = (svgHeight - bottomPadding - 20) / 2; 

  const getRadius = (value: number, maxValue: number) => {
    const minValRadiusFactor = 0.35; 
    const valueRatio = (value / maxValue);
    return maxRadius * (minValRadiusFactor + (1 - minValRadiusFactor) * Math.pow(valueRatio, 1.5));
  };
  
  const maxValue = Math.max(...layers.map(l => l.value), 1);


  return (
    <div className="bg-surface-dark-secondary p-5 md:p-6 rounded-lg shadow-soft border border-border-dark-primary">
      <h3 className="text-xl md:text-2xl font-semibold text-text-light-primary mb-4">{title}</h3>
      <div className="overflow-x-auto flex justify-center">
        <svg 
            viewBox={`0 0 ${svgWidth} ${svgHeight}`} 
            className="min-w-[280px] w-full max-w-xs font-sans cursor-default" 
            aria-labelledby={`${title.replace(/\s+/g, '-').toLowerCase()}-title`} 
            role="img"
        >
          <title id={`${title.replace(/\s+/g, '-').toLowerCase()}-title`}>{title}</title>
          {sortedLayers.map((layer) => {
            const radius = getRadius(layer.value, maxValue);
            const cy = baseLineY - radius; 
            return (
              <g 
                key={layer.name}
                onMouseEnter={() => setHoveredLayerDetails(layer)}
                onMouseLeave={() => setHoveredLayerDetails(null)}
                className="cursor-pointer group"
              >
                <circle 
                  cx={centerX} 
                  cy={cy} 
                  r={radius} 
                  className={`${layer.color} transition-opacity duration-150 ease-in-out group-hover:opacity-100`}
                  stroke="rgba(255,255,255,0.08)" 
                  strokeWidth="1"
                  opacity={hoveredLayerDetails === layer || hoveredLayerDetails === null ? 1 : 0.85}
                />
              </g>
            );
          })}
          {sortedLayers.slice().reverse().map((layer) => { 
             const radius = getRadius(layer.value, maxValue);
             const cy_layer = baseLineY - radius;
             let textY = cy_layer;

             if (layer.name.includes("TAM")) textY = cy_layer - radius * 0.4; 
             else if (layer.name.includes("SAM")) textY = cy_layer; 
             else if (layer.name.includes("SOM")) textY = cy_layer + radius * 0.4; 


            return (
                <text
                    key={`text-${layer.name}`}
                    x={centerX}
                    y={textY}
                    textAnchor="middle"
                    dy=".3em" 
                    className={`font-semibold text-sm pointer-events-none ${layer.textColor || 'fill-text-light-primary'}`} 
                    opacity={hoveredLayerDetails === layer || hoveredLayerDetails === null ? 1 : 0.7}
                >
                    {layer.name}
                </text>
            )
          })}
        </svg>
      </div>
      <div className="mt-4 p-3 bg-gray-600 rounded-md min-h-[100px] border border-border-dark-secondary"> 
        {hoveredLayerDetails ? (
          <>
            <h4 className="text-md font-semibold text-text-light-primary mb-1">{hoveredLayerDetails.name} 상세 정보</h4>
            {hoveredLayerDetails.description && (
              <p className="text-sm text-text-light-secondary mb-1">{hoveredLayerDetails.description}</p>
            )}
            {hoveredLayerDetails.details && hoveredLayerDetails.details.length > 0 && (
              <ul className="list-disc list-inside pl-1 space-y-0.5">
                {hoveredLayerDetails.details.filter(d => d && d.trim() !== '').map((detail, i) => (
                  <li key={i} className="text-xs text-text-light-secondary/80">{detail}</li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <p className="text-sm text-text-light-secondary text-center flex items-center justify-center h-full">
            원의 각 부분에 마우스를 올리면 여기에 자세한 설명이 표시됩니다.
          </p>
        )}
      </div>
    </div>
  );
};

export default ConcentricCirclesChart;
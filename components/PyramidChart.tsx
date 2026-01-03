
import React, { useState } from 'react';
import { PyramidLayerData } from '../types';

interface PyramidChartProps {
  title: string;
  layers: PyramidLayerData[];
  baseColorClass?: string; 
}

const PyramidChart: React.FC<PyramidChartProps> = ({ title, layers, baseColorClass = "accent-primary" }) => {
  const [hoveredLayerDetails, setHoveredLayerDetails] = useState<PyramidLayerData | null>(null);

  if (!layers || layers.length === 0) {
    return (
      <div className="bg-surface-dark-secondary p-6 rounded-lg shadow-soft text-text-light-secondary border border-border-dark-primary">
        {title} 데이터를 불러오는 중이거나, 데이터가 없습니다.
      </div>
    );
  }

  const layerHeight = 75; 
  const verticalPadding = 20;
  const svgWidth = 450; 
  const svgHeight = layers.length * layerHeight + verticalPadding * 2;
  const horizontalPadding = 20;
  
  const topLayerMinWidth = Math.max(svgWidth * 0.1, 40); 
  const bottomLayerWidth = svgWidth - horizontalPadding * 2;
  
  const widthDecrement = layers.length > 1 
    ? (bottomLayerWidth - topLayerMinWidth) / (layers.length -1) 
    : 0;

  const getLayerPoints = (index: number): string => {
    const y1 = verticalPadding + index * layerHeight;
    const y2 = y1 + layerHeight;
    const actualIndex = layers.length - 1 - index; 

    const currentTrapezoidBottomWidth = bottomLayerWidth - (actualIndex * widthDecrement);
    const currentTrapezoidTopWidth = bottomLayerWidth - ((actualIndex + 1) * widthDecrement);
    
    if (actualIndex === layers.length -1 ) { 
        const midX = svgWidth / 2;
        const baseOfTriangle = Math.max(topLayerMinWidth, currentTrapezoidBottomWidth); 
        const x1_bottom = (svgWidth - baseOfTriangle) / 2;
        const x2_bottom = x1_bottom + baseOfTriangle;
        return `${midX},${y1} ${x2_bottom},${y2} ${x1_bottom},${y2}`;
    }
    
    const x1_top = (svgWidth - currentTrapezoidTopWidth) / 2;
    const x2_top = x1_top + currentTrapezoidTopWidth;
    const x1_bottom = (svgWidth - currentTrapezoidBottomWidth) / 2;
    const x2_bottom = x1_bottom + currentTrapezoidBottomWidth;

    return `${x1_top},${y1} ${x2_top},${y1} ${x2_bottom},${y2} ${x1_bottom},${y2}`;
  };

  const renderLayerName = (layer: PyramidLayerData, index: number) => {
    const yBase = verticalPadding + index * layerHeight + layerHeight / 2;
    
    // Default text color logic for dark theme: if layer.color is a dark variant of accent (e.g. cyan-700), use light text.
    // If it's a light variant (e.g. cyan-300), use dark text.
    // This example uses accent-primary which is cyan-500, text should be dark (e.g., gray-900) for good contrast.
    // If layer.color is like 'fill-cyan-700', text should be 'text-white' or 'fill-white'.
    // For 'fill-cyan-300', text should be 'fill-gray-800'.
    // This is a heuristic and might need adjustment based on actual layer.color values.
    const isDarkFill = layer.color.includes('700') || layer.color.includes('800') || layer.color.includes('900') || layer.color.includes('accent-primary');
    const defaultTextColorClass = isDarkFill ? 'fill-white' : 'fill-gray-900';
    const textColorClass = layer.textColor || defaultTextColorClass;


    return (
      <text 
        x={svgWidth/2} 
        y={yBase + 5} 
        textAnchor="middle" 
        fontWeight="semibold" 
        fontSize="14px" 
        className={textColorClass}
        pointerEvents="none" 
      >
        {layer.name}
      </text>
    );
  };

  return (
    <div className="bg-surface-dark-secondary p-5 md:p-6 rounded-lg shadow-soft border border-border-dark-primary">
      <h3 className={`text-xl md:text-2xl font-semibold text-${baseColorClass} mb-4`}>{title}</h3>
      <div className="overflow-x-auto">
        <svg 
            viewBox={`0 0 ${svgWidth} ${svgHeight}`} 
            className="min-w-[380px] w-full font-sans cursor-default" 
            aria-labelledby={`${title.replace(/\s+/g, '-').toLowerCase()}-title`} 
            role="img"
        >
          <title id={`${title.replace(/\s+/g, '-').toLowerCase()}-title`}>{title}</title>
          {layers.map((layer, index) => (
            <g 
              key={index} 
              onMouseEnter={() => setHoveredLayerDetails(layer)}
              onMouseLeave={() => setHoveredLayerDetails(null)}
              className="cursor-pointer" 
            >
              <polygon 
                points={getLayerPoints(index)} 
                className={`${layer.color} transition-opacity duration-150 ease-in-out`}
                stroke="#1F2937" /* gray-800, new surface-dark-primary for stroke */
                strokeWidth="2" 
                opacity={hoveredLayerDetails === layer || hoveredLayerDetails === null ? 1 : 0.7}
              />
              {renderLayerName(layer, index)}
            </g>
          ))}
        </svg>
      </div>
      <div className="mt-4 p-3 bg-gray-600 rounded-md min-h-[100px] border border-border-dark-secondary"> {/* Darker detail box */}
        {hoveredLayerDetails ? (
          <>
            <h4 className={`text-md font-semibold text-text-light-primary mb-1`}>{hoveredLayerDetails.name} 상세 정보</h4>
            {hoveredLayerDetails.description && (
              <p className="text-sm text-text-light-secondary mb-1">{hoveredLayerDetails.description}</p>
            )}
            {hoveredLayerDetails.details && hoveredLayerDetails.details.length > 0 && (
              <ul className="list-disc list-inside pl-1 space-y-0.5">
                {hoveredLayerDetails.details.map((detail, i) => (
                  <li key={i} className="text-xs text-text-light-secondary/80">{detail}</li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <p className="text-sm text-text-light-secondary text-center flex items-center justify-center h-full">
            피라미드의 각 계층에 마우스를 올리면 여기에 자세한 설명이 표시됩니다.
          </p>
        )}
      </div>
    </div>
  );
};

export default PyramidChart;
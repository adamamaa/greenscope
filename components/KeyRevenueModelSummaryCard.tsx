
import React from 'react';

interface KeyRevenueModelSummaryCardProps {
  keyRevenueStreams: string[];
  pricingPolicy: string;
  keyPayingCustomers: string[];
  keyStrengths?: string;
}

const SummarySection: React.FC<{ title: string; items?: string | string[]; className?: string }> = ({ title, items, className }) => {
  if (!items || (Array.isArray(items) && items.length === 0 && typeof items !== 'string')) {
    return null;
  }

  return (
    <div className={className}>
      <h4 className="text-sm font-semibold text-text-light-primary mb-1">{title}</h4>
      {Array.isArray(items) ? (
        <ul className="list-disc list-inside pl-1 space-y-0.5">
          {items.map((item, index) => (
            <li key={index} className="text-text-light-secondary text-sm">{item}</li>
          ))}
        </ul>
      ) : (
        <p className="text-text-light-secondary text-sm">{items}</p>
      )}
    </div>
  );
};

const KeyRevenueModelSummaryCard: React.FC<KeyRevenueModelSummaryCardProps> = ({
  keyRevenueStreams,
  pricingPolicy,
  keyPayingCustomers,
  keyStrengths,
}) => {
  const hasData = keyRevenueStreams.length > 0 || pricingPolicy !== "정보 없음" || keyPayingCustomers.length > 0 || (keyStrengths && keyStrengths !== "정보 없음");

  if (!hasData) {
    return (
      <div className="bg-surface-dark-secondary p-5 rounded-lg shadow-soft text-text-light-secondary text-center border border-border-dark-primary">
        수익 모델 요약 정보가 없습니다.
      </div>
    );
  }

  return (
    <div className="bg-surface-dark-secondary p-5 md:p-6 rounded-lg shadow-soft border border-border-dark-primary">
      <h3 className="text-xl md:text-2xl font-semibold text-text-light-primary mb-4">핵심 수익 모델 요약</h3>
      <div className="space-y-4">
        <SummarySection title="주요 수익원" items={keyRevenueStreams} />
        <SummarySection title="가격 정책" items={pricingPolicy} />
        <SummarySection title="주요 지불 고객" items={keyPayingCustomers} />
        {keyStrengths && keyStrengths !== "정보 없음" && (
          <SummarySection title="핵심 강점" items={keyStrengths} />
        )}
      </div>
    </div>
  );
};

export default KeyRevenueModelSummaryCard;
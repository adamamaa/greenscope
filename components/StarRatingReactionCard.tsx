
import React from 'react';
import { StarRatingReaction } from '../types';

interface StarRatingReactionCardProps {
  reaction: StarRatingReaction;
}

const InfoSection: React.FC<{ title: string; content: string | string[]; className?: string }> = ({ title, content, className }) => {
  return (
    <div className={className}>
      <h4 className="text-md font-semibold text-text-light-primary mb-1.5">{title}</h4>
      {Array.isArray(content) ? (
        <ul className="list-disc list-inside pl-1 space-y-1 text-sm text-text-light-secondary">
          {content.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-text-light-secondary whitespace-pre-line">{content}</p>
      )}
    </div>
  );
};

const StarRatingReactionCard: React.FC<StarRatingReactionCardProps> = ({ reaction }) => {
  if (!reaction) {
    return <div className="bg-surface-dark-secondary p-4 rounded-lg shadow-soft text-text-light-secondary border border-border-dark-primary">반응 데이터가 없습니다.</div>;
  }

  return (
    <div className="bg-surface-dark-secondary p-5 md:p-6 rounded-lg shadow-soft border border-border-dark-primary">
      <h3 className="text-lg md:text-xl font-semibold text-text-light-primary mb-3 pb-2 border-b border-border-dark-secondary">
        {reaction.title}
      </h3>
      <div className="space-y-4">
        <InfoSection title="예상 댓글" content={reaction.expectedComment} />
        <hr className="my-3 border-border-dark-primary/60" />
        <InfoSection title="주요 반응 포인트" content={reaction.keyReactionPoints} />
        <hr className="my-3 border-border-dark-primary/60" />
        <InfoSection title="고려사항 (스타트업)" content={reaction.startupConsiderations} />
      </div>
    </div>
  );
};

export default StarRatingReactionCard;
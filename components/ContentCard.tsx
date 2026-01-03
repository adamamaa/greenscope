import React from 'react';

interface ContentCardProps {
  title: string;
  content: string | React.ReactNode;
  className?: string;
  titleColorClass?: string; 
}

const ContentCard: React.FC<ContentCardProps> = ({ title, content, className, titleColorClass = "text-text-light-primary" }) => {
  const renderContent = () => {
    if (typeof content === 'string') {
      return content.split('\n').map((paragraph, index) => (
        <p key={index} className="mb-2 last:mb-0">{paragraph.trim() || "\u00A0"}</p>
      ));
    }
    return content;
  };

  return (
    <div className={`bg-surface-dark-secondary p-5 md:p-6 rounded-lg shadow-soft border border-border-dark-primary h-full ${className}`}>
      {title && <h3 className={`text-xl md:text-2xl font-semibold ${titleColorClass} mb-4`}>{title}</h3>}
      <div className="text-text-light-primary text-sm md:text-base leading-relaxed prose prose-sm sm:prose-base max-w-none 
                     prose-p:text-text-light-secondary prose-strong:text-text-light-primary prose-headings:text-text-light-primary 
                     prose-ul:text-text-light-secondary prose-ol:text-text-light-secondary
                     prose-a:text-accent-primary hover:prose-a:text-accent-primary-hover
                     prose-code:text-accent-secondary prose-blockquote:border-accent-primary prose-blockquote:text-text-light-secondary">
        {renderContent()}
      </div>
    </div>
  );
};

export default ContentCard;
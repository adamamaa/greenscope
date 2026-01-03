
import React from 'react';
import ContentCard from './ContentCard';

interface MultiCardViewItem {
  title: string;
  content: string | React.ReactNode;
}

interface MultiCardViewProps {
  categoryTitle: string;
  items: MultiCardViewItem[];
  themeColor?: string;
}

const MultiCardView: React.FC<MultiCardViewProps> = ({ categoryTitle, items, themeColor = "accent-primary" }) => {
  const circleBgClass = `bg-${themeColor}`; 
  const circleTextClass = themeColor === 'accent-primary' ? 'text-gray-900' : 'text-text-light-primary'; 
  const cardTitleClass = `text-${themeColor}`; 

  if (!items || items.length === 0) {
    return <ContentCard title={categoryTitle} content="표시할 항목이 없습니다." titleColorClass={cardTitleClass} />;
  }

  return (
    <div className="relative flex flex-col w-full h-full">
      {/* Mobile Title Header */}
      <div className="md:hidden mb-6 flex items-center justify-center">
        <div className={`${circleBgClass} ${circleTextClass} px-6 py-3 rounded-full shadow-lg border-2 border-surface-dark-primary`}>
          <h3 className="text-xl font-bold tracking-tight">{categoryTitle}</h3>
        </div>
      </div>

      <div className="relative p-0 md:p-6 w-full flex-grow flex items-center justify-center">
        {/* Desktop Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 w-full max-w-5xl items-stretch">
          {items[0] && (
            <div className="md:col-span-5">
              <ContentCard title={items[0].title} content={items[0].content} titleColorClass={cardTitleClass} className="h-full" />
            </div>
          )}

          <div className="md:col-span-2 hidden md:block"></div>

          {items[1] && (
            <div className="md:col-span-5">
              <ContentCard title={items[1].title} content={items[1].content} titleColorClass={cardTitleClass} className="h-full" />
            </div>
          )}

          <div className="md:col-span-12 h-6 md:h-10 hidden md:block"></div>

          {items[2] && (
            <div className="md:col-span-5">
              <ContentCard title={items[2].title} content={items[2].content} titleColorClass={cardTitleClass} className="h-full" />
            </div>
          )}

          <div className="md:col-span-2 hidden md:block"></div>

          {items[3] && (
            <div className="md:col-span-5">
              <ContentCard title={items[3].title} content={items[3].content} titleColorClass={cardTitleClass} className="h-full" />
            </div>
          )}
        </div>

        {/* Desktop Central Circle Title */}
        <div 
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                      hidden md:flex
                      w-32 h-32 md:w-40 md:h-40 
                      rounded-full items-center justify-center text-center 
                      p-3 shadow-xl border-4 border-surface-dark-primary
                      ${circleBgClass} ${circleTextClass} z-10`}
        >
          <h3 className="text-xl md:text-2xl font-bold drop-shadow-sm leading-tight">
            {categoryTitle}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default MultiCardView;

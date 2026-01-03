
import React, { useState } from 'react';

interface TabButtonProps {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  isActive: boolean;
  activeColorClass?: string;
}

const TabButton: React.FC<TabButtonProps> = ({ label, icon, onClick, isActive, activeColorClass = "accent-primary" }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const activeClasses = `bg-gradient-to-br from-${activeColorClass} to-blue-600 text-white shadow-inner z-10`;
  const inactiveClasses = "bg-surface-dark-primary hover:bg-gray-700/50 text-text-light-secondary hover:text-text-light-primary";

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`px-1 py-3 md:px-5 md:py-3.5 font-bold transition-all duration-200 ease-out focus:outline-none
                  whitespace-normal md:whitespace-nowrap text-[10px] sm:text-xs md:text-sm 
                  border-r border-b border-border-dark-secondary last:border-r-0 md:last:border-r-0 md:border-b-0
                  flex flex-col md:flex-row items-center justify-center flex-1 min-h-[60px] md:min-h-0
                  ${isActive ? activeClasses : inactiveClasses}`}
      aria-pressed={isActive}
    >
      {/* Active indicator for desktop */}
      {isActive && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/30 hidden md:block"></div>
      )}
      
      {/* Button content */}
      {icon && <span className="mb-1 md:mb-0 md:mr-2 text-sm sm:text-base relative z-10" aria-hidden="true">{icon}</span>}
      <span className="relative z-10 text-center leading-tight">
        {label}
      </span>
    </button>
  );
};

export default TabButton;

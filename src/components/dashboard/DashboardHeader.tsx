import { useState } from 'react';
import { MicrosoftHeader } from './MicrosoftHeader';
// import { NavigationMenu } from './NavigationMenu';

interface DashboardHeaderProps {
  activeSection?: string;
  onNavigate?: (section: string) => void;
}

export function DashboardHeader({ activeSection = 'overview', onNavigate }: DashboardHeaderProps) {
  const [currentSection, setCurrentSection] = useState(activeSection);

  const handleNavigate = (section: string) => {
    setCurrentSection(section);
    if (onNavigate) {
      onNavigate(section);
    }
  };

  return (
    <div className="sticky top-0 left-0 right-0 z-50 bg-white shadow-sm">
      {/* Navigation Menu */}
      <MicrosoftHeader 
        activeSection={currentSection} 
        onNavigate={handleNavigate} 
      />
    </div>
  );
}
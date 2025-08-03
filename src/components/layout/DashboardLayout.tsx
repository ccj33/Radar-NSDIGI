import { ReactNode } from 'react';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { InteractiveBanner } from '@/components/dashboard/InteractiveBanner';

interface DashboardLayoutProps {
  children: ReactNode;
  activeSection?: string;
  onNavigate?: (section: string) => void;
}

export function DashboardLayout({ children, activeSection, onNavigate }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Dashboard Header - Sticky no topo */}
      <DashboardHeader 
        activeSection={activeSection} 
        onNavigate={onNavigate} 
      />
      
      {/* Banner - Não fixo, aparece logo abaixo do header */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <InteractiveBanner />
        </div>
      </div>
      
      {/* Main Content - Sem padding-top extra */}
      <main className="pt-8">
        {children}
      </main>
    </div>
  );
} 
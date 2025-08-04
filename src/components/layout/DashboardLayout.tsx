import { ReactNode } from 'react';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { InteractiveBanner } from '@/components/dashboard/InteractiveBanner';
import { VisaoGeralBanner } from '@/components/dashboard/VisaoGeralBanner';

interface DashboardLayoutProps {
  children: ReactNode;
  activeSection?: string;
  onNavigate?: (section: string) => void;
  selectedMicroregiao?: string;
}

export function DashboardLayout({ 
  children, 
  activeSection, 
  onNavigate, 
  selectedMicroregiao 
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Dashboard Header - Sticky no topo */}
      <DashboardHeader 
        activeSection={activeSection} 
        onNavigate={onNavigate} 
      />
      
      {/* Banner - Diferente baseado na seção ativa */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          {activeSection === 'overview' ? (
            <VisaoGeralBanner selectedMicroregiao={selectedMicroregiao} />
          ) : (
            <InteractiveBanner />
          )}
        </div>
      </div>
      
      {/* Main Content - Sem padding-top extra */}
      <main className="pt-8">
        {children}
      </main>
    </div>
  );
} 
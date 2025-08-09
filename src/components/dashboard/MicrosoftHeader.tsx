import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  BarChart3, 
  PieChart, 
  Users, 
  Table, 
  BookOpen, 
  TrendingUp, 
  Target,
  Menu,
  X,
  ChevronDown,
  Grid
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ZoomControl from '@/components/ZoomControl';

interface MicrosoftHeaderProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const sections = [
  { id: 'overview', label: 'Visão Geral', icon: Home, description: 'Resumo completo', path: '/dashboard' },
  { id: 'populacao', label: 'População', icon: Users, description: 'Distribuição demográfica', path: '/populacao' },
  { id: 'barras', label: 'Ranking', icon: BarChart3, description: 'Ranking de maturidade', path: '/barras' },
  { id: 'radar', label: 'Análise por Eixos', icon: PieChart, description: 'Comparação por eixos', path: '/radar' },
  { id: 'executivo', label: 'Dashboard Executivo', icon: Target, description: 'Visão estratégica', path: '/dashboard/executivo' },
  { id: 'detalhamento', label: 'Detalhamento', icon: Table, description: 'Detalhamento por eixos', path: '/dashboard/detalhamento' },
  { id: 'recomendacoes', label: 'Recomendações', icon: BookOpen, description: 'Sugestões por eixo', path: '/dashboard/recomendacoes' },
  { id: 'avancada', label: 'Análise Avançada', icon: TrendingUp, description: 'Comparação entre regiões', path: '/dashboard/avancada' },
];

export const MicrosoftHeader: React.FC<MicrosoftHeaderProps> = ({ activeSection, onNavigate }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const currentActiveSection = activeSection;
  const activeLabel = (sections.find(s => s.id === currentActiveSection)?.label) || 'Visão Geral';

  const handleNavigate = (sectionId: string) => {
    const section = sections.find(s => s.id === sectionId);
    if (section) {
      // Usar a mesma lógica da página inicial
      navigate('/dashboard', { state: { activeSection: sectionId } });
    } else {
      // Fallback para navegação interna
      onNavigate(sectionId);
    }
    setShowMobileMenu(false);
  };

  return (
    <>
             {/* Microsoft Style Header */}
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm backdrop-blur-sm [padding-top:env(safe-area-inset-top)] [padding-left:env(safe-area-inset-left)] [padding-right:env(safe-area-inset-right)]">
          <div className="w-full px-4 sm:px-6">
            <div className="flex items-center justify-between h-14 sm:h-16 min-w-0 gap-3 sm:gap-4 flex-wrap">
             
             {/* Esquerda: Logo + Nome (agora atua como botão Início) */}
              <button
                type="button"
                onClick={() => navigate('/')}
                aria-label="Ir para a página inicial"
                className="flex items-center gap-3 flex-shrink-0 min-h-[44px] hover:opacity-90 focus-visible:outline-none"
              >
               <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-sm ring-1 ring-blue-200/60 shrink-0">
                  <Target className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-lg font-semibold text-gray-900 sm:whitespace-nowrap">RADAR NSDIGI</h1>
                  <p className="text-xs text-gray-500 sm:whitespace-nowrap">Sistema de Transformação Digital</p>
               </div>
             </button>

             {/* Linha Vertical */}
              <div className="w-px h-6 bg-gray-300 mx-3 sm:mx-4 flex-shrink-0 hidden sm:block"></div>

             {/* Removido o botão "Início"; a logo agora cumpre essa função */}

             {/* Navegação Principal - Menu Dropdown "Áreas" + indicador da área atual */}
              <div className="flex-1 min-w-0 overflow-hidden">
                <div className="flex items-center gap-2 min-w-0">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="inline-flex items-center gap-2 rounded-full bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 hover:border-blue-300 px-3 sm:px-4 py-2 font-medium min-h-[40px] sm:min-h-[44px] max-w-full shadow-sm"
                      >
                        <Grid className="w-4 h-4" aria-hidden="true" />
                        Áreas
                        <ChevronDown className="w-4 h-4" aria-hidden="true" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-[min(92vw,16rem)] p-2 max-h-[60dvh] overflow-y-auto">
                      <div className="grid grid-cols-1 gap-1">
                        {sections.map((section) => {
                          const Icon = section.icon;
                          const isActive = currentActiveSection === section.id;
                          return (
                            <DropdownMenuItem
                              key={section.id}
                              onClick={() => handleNavigate(section.id)}
                              className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition-all duration-200 min-h-[44px] ${
                                isActive
                                  ? 'bg-blue-100 text-blue-700 font-medium'
                                  : 'text-gray-700 hover:bg-gray-100'
                              }`}
                            >
                              <Icon className="w-4 h-4" aria-hidden="true" />
                              <div className="flex flex-col">
                                <span className="text-sm font-medium">{section.label}</span>
                                <span className="text-xs text-gray-500">{section.description}</span>
                              </div>
                            </DropdownMenuItem>
                          );
                        })}
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-50 text-slate-700 border border-slate-200 text-xs sm:text-sm font-medium whitespace-nowrap max-w-[50vw] truncate shadow-sm">
                    {activeLabel}
                  </span>
                </div>
              </div>

             {/* Direita: Ações (apenas o controle de zoom) */}
              <div className="flex items-center gap-2 flex-shrink-0">
               <div className="hidden md:block">
                 <ZoomControl />
               </div>
             </div>
           </div>
         </div>

        {/* Navegação mobile removida */}
      </header>
    </>
  );
};

export default MicrosoftHeader; 
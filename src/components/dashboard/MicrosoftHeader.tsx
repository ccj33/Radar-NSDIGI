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
       <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm backdrop-blur-sm">
         <div className="w-full px-6">
           <div className="flex items-center h-16">
             
             {/* Esquerda: Logo + Nome (Sempre visível) */}
             <div className="flex items-center gap-3 flex-shrink-0">
               <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-sm">
                 <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                   <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                   <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
                   <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                 </svg>
               </div>
               <div className="hidden sm:block">
                 <h1 className="text-lg font-semibold text-gray-900 whitespace-nowrap">RADAR NSDIGI</h1>
                 <p className="text-xs text-gray-500 whitespace-nowrap">Sistema de Transformação Digital</p>
               </div>
             </div>

             {/* Linha Vertical */}
             <div className="w-px h-6 bg-gray-300 mx-4 flex-shrink-0 hidden sm:block"></div>

             {/* Botão Início - Lado esquerdo das Áreas */}
             <Button
               variant="outline"
               size="sm"
               onClick={() => navigate('/')}
               className="text-gray-700 border-gray-300 hover:bg-gray-50 px-3 py-2 text-sm mr-3"
             >
               <Home className="w-4 h-4 mr-2" />
               Início
             </Button>

             {/* Navegação Principal - Menu Dropdown "Áreas" */}
             <div className="flex-1 min-w-0">
               <DropdownMenu>
                 <DropdownMenuTrigger asChild>
                   <Button
                     variant="outline"
                     size="sm"
                     className="bg-blue-50 border-blue-300 text-blue-700 hover:bg-blue-100 hover:border-blue-400 px-4 py-2 font-medium"
                   >
                     <Grid className="w-4 h-4 mr-2" />
                     Áreas
                     <ChevronDown className="w-4 h-4 ml-2" />
                   </Button>
                 </DropdownMenuTrigger>
                 <DropdownMenuContent align="start" className="w-64 p-2">
                   <div className="grid grid-cols-1 gap-1">
                     {sections.map((section) => {
                       const Icon = section.icon;
                       const isActive = currentActiveSection === section.id;
                       
                       return (
                         <DropdownMenuItem
                           key={section.id}
                           onClick={() => handleNavigate(section.id)}
                           className={`flex items-center px-3 py-2 rounded-md cursor-pointer transition-all duration-200 ${
                             isActive 
                               ? 'bg-blue-100 text-blue-700 font-medium' 
                               : 'text-gray-700 hover:bg-gray-100'
                           }`}
                         >
                           <Icon className="w-4 h-4 mr-3" />
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
             </div>

             {/* Direita: Botões de Ação (Sempre visíveis) */}
             <div className="flex items-center gap-2 flex-shrink-0">
               {/* Zoom Control - Visível em desktop */}
               <div className="hidden md:block">
                 <ZoomControl />
               </div>
               

               

               
               {/* Menu Mobile - Apenas para telas muito pequenas */}
               <Button
                 variant="ghost"
                 size="icon"
                 onClick={() => setShowMobileMenu(!showMobileMenu)}
                 className="lg:hidden text-gray-600 hover:text-blue-600 w-8 h-8"
               >
                 {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
               </Button>
             </div>
           </div>
         </div>

        {/* Menu de Navegação Mobile */}
        {showMobileMenu && (
          <div className="lg:hidden border-t border-gray-200 bg-white shadow-md">
            <div className="px-4 py-4">
              <nav className="flex flex-col gap-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  const isActive = currentActiveSection === section.id;
                  
                  return (
                    <Button
                      key={section.id}
                      variant={isActive ? "default" : "ghost"}
                      size="sm"
                      onClick={() => {
                        handleNavigate(section.id);
                        setShowMobileMenu(false);
                      }}
                      className={`justify-start px-4 py-3 text-sm font-medium transition-all duration-200 ${
                        isActive 
                          ? 'bg-blue-600 text-white shadow-sm' 
                          : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-3" />
                      {section.label}
                    </Button>
                  );
                })}
              </nav>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default MicrosoftHeader; 
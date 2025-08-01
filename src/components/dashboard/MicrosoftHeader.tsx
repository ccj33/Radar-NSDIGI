import React, { useState } from 'react';
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
  Search,
  Bell,
  Settings,
  User,
  ChevronDown
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface MicrosoftHeaderProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const sections = [
  { id: 'overview', label: 'Visão Geral', icon: Home, description: 'Resumo completo' },
  { id: 'populacao', label: 'População', icon: Users, description: 'Distribuição demográfica' },
  { id: 'barras', label: 'Ranking', icon: BarChart3, description: 'Ranking de maturidade' },
  { id: 'radar', label: 'Análise por Eixos', icon: PieChart, description: 'Comparação por eixos' },
  { id: 'executivo', label: 'Dashboard Executivo', icon: Target, description: 'Visão estratégica' },
  { id: 'tabela', label: 'Detalhamento', icon: Table, description: 'Detalhamento por eixos' },
  { id: 'recomendacoes', label: 'Recomendações', icon: BookOpen, description: 'Sugestões por eixo' },
  { id: 'analise-avancada', label: 'Análise Avançada', icon: TrendingUp, description: 'Comparação entre regiões' },
];

export const MicrosoftHeader: React.FC<MicrosoftHeaderProps> = ({ activeSection, onNavigate }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [scrollPosition, setScrollPosition] = useState({ start: true, end: false });
  const navRef = React.useRef<HTMLDivElement>(null);

  const handleNavigate = (sectionId: string) => {
    onNavigate(sectionId);
    setShowMobileMenu(false);
  };

  const handleScroll = () => {
    if (navRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = navRef.current;
      setScrollPosition({
        start: scrollLeft === 0,
        end: scrollLeft + clientWidth >= scrollWidth - 1
      });
    }
  };

  React.useEffect(() => {
    const navElement = navRef.current;
    if (navElement) {
      navElement.addEventListener('scroll', handleScroll);
      handleScroll(); // Verificar posição inicial
      return () => navElement.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <>
             {/* Microsoft Style Header */}
       <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
         <div className="w-full px-4">
           <div className="flex items-center h-16">
             
             {/* Esquerda: Logo + Nome (Sempre visível) */}
             <div className="flex items-center gap-3 flex-shrink-0">
               <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm">
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

                           {/* Navegação Principal - Sempre Acessível */}
              <div className="flex-1 min-w-0 mx-4">
                {/* Container com Scroll Horizontal */}
                <div 
                  ref={navRef}
                  className={`overflow-x-auto scrollbar-hide nav-scroll-container ${
                    scrollPosition.start ? 'scroll-start' : ''
                  } ${
                    scrollPosition.end ? 'scroll-end' : ''
                  }`}
                >
                  <nav className="flex items-center gap-2 pb-1" style={{ minWidth: 'max-content' }}>
                   {sections.map((section) => {
                     const Icon = section.icon;
                     const isActive = activeSection === section.id;
                     
                     return (
                       <Button
                         key={section.id}
                         variant={isActive ? "default" : "ghost"}
                         size="sm"
                         onClick={() => handleNavigate(section.id)}
                         className={`px-3 py-2 text-sm font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                           isActive 
                             ? 'bg-blue-600 text-white shadow-sm' 
                             : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                         }`}
                       >
                         <Icon className="w-4 h-4 mr-2" />
                         {section.label}
                       </Button>
                     );
                   })}
                 </nav>
               </div>
             </div>

             {/* Direita: Botões de Ação (Sempre visíveis) */}
             <div className="flex items-center gap-2 flex-shrink-0">
               {/* Ícones de Ação */}
               <div className="flex items-center gap-1">
                 <Button variant="ghost" size="icon" className="text-gray-600 hover:text-blue-600 w-8 h-8">
                   <Search className="w-4 h-4" />
                 </Button>
                 <DropdownMenu>
                   <DropdownMenuTrigger asChild>
                     <Button variant="ghost" size="icon" className="text-gray-600 hover:text-blue-600 w-8 h-8">
                       <User className="w-4 h-4" />
                     </Button>
                   </DropdownMenuTrigger>
                   <DropdownMenuContent align="end" className="w-48">
                     <DropdownMenuItem>
                       <User className="w-4 h-4 mr-2" />
                       Perfil
                     </DropdownMenuItem>
                     <DropdownMenuItem>
                       <Settings className="w-4 h-4 mr-2" />
                       Configurações
                     </DropdownMenuItem>
                   </DropdownMenuContent>
                 </DropdownMenu>
               </div>
               
               {/* Botão Início */}
               <Button
                 variant="outline"
                 size="sm"
                 onClick={() => window.location.href = '/'}
                 className="text-gray-700 border-gray-300 hover:bg-gray-50 px-3 py-2 text-sm"
               >
                 <Home className="w-4 h-4 mr-2" />
                 Início
               </Button>
               
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
                  const isActive = activeSection === section.id;
                  
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
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  Home,
  BarChart3,
  MapPin,
  Users,
  Settings,
  FileText,
  TrendingUp,
  Target,
  ChevronRight,
  Star,
  Activity,
  PieChart,
  Table,
  BookOpen
} from 'lucide-react';
import { useMediaQuery } from '@/hooks/use-mobile';

interface AppArea {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  badge?: string;
  isActive?: boolean;
  isNew?: boolean;
  path: string;
}

interface MobileAppAreaSwitcherProps {
  currentArea?: string;
  onAreaChange?: (areaId: string) => void;
  className?: string;
}

export const MobileAppAreaSwitcher: React.FC<MobileAppAreaSwitcherProps> = ({
  currentArea = 'dashboard',
  onAreaChange,
  className = ""
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const navigate = useNavigate();
  const location = useLocation();

  // Áreas do aplicativo com rotas mapeadas
  const appAreas: AppArea[] = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      description: 'Visão geral e métricas principais',
      icon: <Home className="w-5 h-5" />,
      path: '/dashboard',
      isActive: location.pathname === '/dashboard'
    },
    {
      id: 'populacao',
      name: 'População',
      description: 'Dados demográficos e sociais',
      icon: <Users className="w-5 h-5" />,
      path: '/populacao',
      isActive: location.pathname === '/populacao'
    },
    {
      id: 'barras',
      name: 'Ranking',
      description: 'Ranking de maturidade',
      icon: <BarChart3 className="w-5 h-5" />,
      path: '/barras',
      isActive: location.pathname === '/barras'
    },
    {
      id: 'radar',
      name: 'Análise por Eixos',
      description: 'Comparação por eixos',
      icon: <PieChart className="w-5 h-5" />,
      path: '/radar',
      isActive: location.pathname === '/radar'
    },
    {
      id: 'executivo',
      name: 'Dashboard Executivo',
      description: 'Visão estratégica',
      icon: <Target className="w-5 h-5" />,
      path: '/dashboard/executivo',
      isActive: location.pathname === '/dashboard/executivo'
    },
    {
      id: 'detalhamento',
      name: 'Detalhamento',
      description: 'Detalhamento por eixos',
      icon: <Table className="w-5 h-5" />,
      path: '/dashboard/detalhamento',
      isActive: location.pathname === '/dashboard/detalhamento'
    },
    {
      id: 'recomendacoes',
      name: 'Recomendações',
      description: 'Sugestões por eixo',
      icon: <BookOpen className="w-5 h-5" />,
      path: '/dashboard/recomendacoes',
      isActive: location.pathname === '/dashboard/recomendacoes'
    },
    {
      id: 'avancada',
      name: 'Análise Avançada',
      description: 'Comparação entre regiões',
      icon: <TrendingUp className="w-5 h-5" />,
      path: '/dashboard/avancada',
      isActive: location.pathname === '/dashboard/avancada'
    }
  ];

  const currentAreaData = appAreas.find(area => area.path === location.pathname) || appAreas[0];

  const handleAreaSelect = (areaId: string) => {
    const area = appAreas.find(a => a.id === areaId);
    if (area) {
      // Mapear os IDs das áreas para as seções correspondentes
      const sectionMapping: { [key: string]: string } = {
        'dashboard': 'overview',
        'populacao': 'populacao',
        'barras': 'barras',
        'radar': 'radar',
        'executivo': 'executivo',
        'recomendacoes': 'recomendacoes',
        'avancada': 'analise-avancada'
      };

      const section = sectionMapping[areaId];
      
      if (section) {
        // Usar a mesma lógica da página inicial
        navigate('/dashboard', { state: { activeSection: section } });
      } else {
        // Para detalhamento e outras páginas específicas, navegar diretamente
        navigate(area.path);
      }
    } else {
      // Fallback para navegação interna
      onAreaChange?.(areaId);
    }
    setIsExpanded(false);
  };

  // Componente de área compacta para mobile
  const CompactAreaCard = ({ area }: { area: AppArea }) => (
    <Card 
      className={`p-3 cursor-pointer transition-all duration-200 touch-target ${
        area.isActive 
          ? 'bg-primary/10 border-primary/30 shadow-sm' 
          : 'hover:bg-muted/50 border-border'
      }`}
      onClick={() => handleAreaSelect(area.id)}
    >
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-lg ${
          area.isActive ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
        }`}>
          {area.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <h4 className={`font-medium text-sm truncate ${
              area.isActive ? 'text-primary' : 'text-foreground'
            }`}>
              {area.name}
            </h4>
            {area.badge && (
              <Badge variant="secondary" className="text-xs">
                {area.badge}
              </Badge>
            )}
            {area.isNew && (
              <Badge variant="destructive" className="text-xs">
                Novo
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground truncate">
            {area.description}
          </p>
        </div>
        <ChevronRight className="w-4 h-4 text-muted-foreground" />
      </div>
    </Card>
  );

  // Grid responsivo de áreas
  const AreasGrid = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {appAreas.map((area) => (
        <CompactAreaCard key={area.id} area={area} />
      ))}
    </div>
  );

  // Componente de navegação rápida
  const QuickNavigation = () => (
    <div className="flex items-center justify-between w-full p-2 bg-muted/30 rounded-lg">
      {appAreas.slice(0, 4).map((area) => (
        <button
          key={area.id}
          className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors touch-target ${
            area.isActive 
              ? 'bg-primary/20 text-primary' 
              : 'hover:bg-muted/50 text-muted-foreground'
          }`}
          onClick={() => handleAreaSelect(area.id)}
        >
          <div className="p-1">
            {area.icon}
          </div>
          <span className="text-xs font-medium">{area.name}</span>
        </button>
      ))}
    </div>
  );

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header da Área Atual */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/20 rounded-lg text-primary">
            {currentAreaData?.icon}
          </div>
          <div>
            <h3 className="font-semibold text-lg">
              {currentAreaData?.name || 'Dashboard'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {currentAreaData?.description || 'Visão geral e métricas principais'}
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="touch-target"
        >
          {isExpanded ? 'Fechar' : 'Trocar Área'}
        </Button>
      </div>

      {/* Navegação Rápida - Apenas em mobile */}
      {isMobile && !isExpanded && (
        <QuickNavigation />
      )}

      {/* Grid Completo de Áreas */}
      {isExpanded && (
        <>
          <Separator />
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Todas as Áreas</h4>
              <Badge variant="outline" className="text-xs">
                {appAreas.length} áreas
              </Badge>
            </div>
            <AreasGrid />
          </div>
        </>
      )}

      {/* Indicador de Breakpoint para Debug */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-2 right-2 p-1 text-xs bg-primary text-primary-foreground rounded">
          {isMobile ? 'Mobile' : 'Desktop'}
        </div>
      )}
    </div>
  );
};

export default MobileAppAreaSwitcher; 
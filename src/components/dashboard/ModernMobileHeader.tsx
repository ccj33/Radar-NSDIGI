import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Menu, 
  X, 
  Search, 
  Filter, 
  Settings, 
  User,
  Bell,
  Home,
  BarChart3,
  MapPin,
  ChevronDown
} from 'lucide-react';
import { useMediaQuery } from '@/hooks/use-mobile';
import ZoomControlMobile from '@/components/ZoomControlMobile';

interface ModernMobileHeaderProps {
  onMenuToggle?: () => void;
  onSearchToggle?: () => void;
  onFilterToggle?: () => void;
  activeFiltersCount?: number;
  currentPage?: string;
  userName?: string;
  notificationsCount?: number;
}

export const ModernMobileHeader: React.FC<ModernMobileHeaderProps> = ({
  onMenuToggle,
  onSearchToggle,
  onFilterToggle,
  activeFiltersCount = 0,
  currentPage = 'Dashboard',
  userName = 'Usuário',
  notificationsCount = 0
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
    onMenuToggle?.();
  };

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    onSearchToggle?.();
  };

  const handleFilterToggle = () => {
    onFilterToggle?.();
  };

  // Componente de navegação rápida para mobile
  const QuickNavigation = () => (
    <div className="flex items-center justify-between w-full px-2 py-1 bg-muted/30 rounded-lg">
      <Button
        variant="ghost"
        size="sm"
        className="flex-1 h-12 px-2 text-sm font-medium touch-target no-zoom"
        onClick={() => {/* Navegar para Dashboard */}}
      >
        <Home className="w-4 h-4 mr-1" />
        Dashboard
      </Button>
      <Separator orientation="vertical" className="h-8" />
      <Button
        variant="ghost"
        size="sm"
        className="flex-1 h-12 px-2 text-sm font-medium touch-target no-zoom"
        onClick={() => {/* Navegar para Análise */}}
      >
        <BarChart3 className="w-4 h-4 mr-1" />
        Análise
      </Button>
      <Separator orientation="vertical" className="h-8" />
      <Button
        variant="ghost"
        size="sm"
        className="flex-1 h-12 px-2 text-sm font-medium touch-target no-zoom"
        onClick={() => {/* Navegar para Mapa */}}
      >
        <MapPin className="w-4 h-4 mr-1" />
        Mapa
      </Button>
    </div>
  );

  // Componente de busca expandida
  const ExpandedSearch = () => (
    <div className="absolute top-full left-0 right-0 bg-background border-b shadow-lg z-50 p-4">
      <div className="flex items-center space-x-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar micro-regiões, indicadores..."
            className="w-full pl-10 pr-4 py-4 text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary touch-target no-zoom"
            autoFocus
          />
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSearchToggle}
          className="touch-target no-zoom h-11 w-11 p-0"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );

  return (
    <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4">
        {/* Header Principal */}
        <div className="flex items-center justify-between h-16 space-x-2">
          {/* Logo e Título */}
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMenuToggle}
              className="h-11 w-11 p-0 touch-target no-zoom"
              aria-label="Menu principal"
            >
              <Menu className="w-6 h-6" />
            </Button>
            
            <div className="flex-1 min-w-0">
              <h1 className="text-lg font-semibold truncate">
                Radar NSDIGI
              </h1>
              <p className="text-xs text-muted-foreground truncate">
                {currentPage}
              </p>
            </div>
          </div>

          {/* Ações Principais - Espaçamento adequado e sem sobreposição */}
          <div className="flex items-center gap-2 no-zoom">
            {/* Zoom Control - Versão compacta para mobile */}
            <div className="md:hidden">
              <ZoomControlMobile />
            </div>
            
            {/* Botão de Busca - Oculto em mobile */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSearchToggle}
              className="h-11 w-11 p-0 touch-target no-zoom hidden md:flex"
              aria-label="Buscar"
            >
              <Search className="w-5 h-5" />
            </Button>

            {/* Botão de Filtros */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleFilterToggle}
              className="h-11 w-11 p-0 touch-target no-zoom relative"
              aria-label="Filtros"
            >
              <Filter className="w-5 h-5" />
              {activeFiltersCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center"
                >
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>

            {/* Notificações */}
            <Button
              variant="ghost"
              size="sm"
              className="h-11 w-11 p-0 touch-target no-zoom relative"
              aria-label="Notificações"
            >
              <Bell className="w-5 h-5" />
              {notificationsCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center"
                >
                  {notificationsCount}
                </Badge>
              )}
            </Button>

            {/* Perfil do Usuário - Simplificado em mobile */}
            <Button
              variant="ghost"
              size="sm"
              className="h-11 px-3 touch-target no-zoom"
              aria-label="Perfil do usuário"
            >
              <User className="w-5 h-5" />
              <span className="text-sm font-medium hidden md:block ml-2">
                {userName}
              </span>
              <ChevronDown className="w-4 h-4 ml-1 hidden md:block" />
            </Button>
          </div>
        </div>

        {/* Busca Expandida - Apenas em desktop */}
        {isSearchOpen && !isMobile && <ExpandedSearch />}

        {/* Navegação Rápida - Apenas em mobile */}
        {isMobile && !isSearchOpen && (
          <div className="pb-3">
            <QuickNavigation />
          </div>
        )}

        {/* Indicador de Breakpoint para Debug */}
        {process.env.NODE_ENV === 'development' && (
          <div className="absolute top-0 right-0 p-1 text-xs bg-primary text-primary-foreground rounded-bl">
            {isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop'}
          </div>
        )}
      </div>
    </header>
  );
};

export default ModernMobileHeader; 
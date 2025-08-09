import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import { ChevronDown, Search, Grid3X3 } from 'lucide-react';
import { navItems, NavItem } from '@/lib/navItems';
import { useMediaQuery } from '@/hooks/use-mobile';

interface AppAreaSwitcherProps {
  className?: string;
}

export function AppAreaSwitcher({ className }: AppAreaSwitcherProps) {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Filtro de itens baseado na busca
  const filteredItems = navItems.filter((item) =>
    item.label.toLowerCase().includes(searchValue.toLowerCase()) ||
    item.desc.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleSelect = (item: NavItem) => {
    try {
      console.log('Navegando para:', item.key, item.path); // Debug
      
      // Mapear as chaves dos itens para as seções correspondentes
      const sectionMapping: { [key: string]: string } = {
        'pop': 'populacao',
        'ranking': 'barras',
        'axes': 'radar',
        'exec': 'executivo',
        'recom': 'recomendacoes',
        'advanced': 'analise-avancada',
        'home': 'overview',
        'overview': 'overview'
      };

      const section = sectionMapping[item.key];
      
      if (section) {
        console.log('Navegando para dashboard com seção:', section); // Debug
        // Usar a mesma lógica da página inicial
        navigate('/dashboard', { state: { activeSection: section } });
      } else {
        console.log('Navegando diretamente para:', item.path); // Debug
        // Para detalhamento e outras páginas específicas, navegar diretamente
        navigate(item.path);
      }
      
      setOpen(false);
      setSearchValue('');
    } catch (error) {
      console.error('Erro na navegação:', error);
    }
  };

  // Verificar se o item atual está ativo
  const isItemActive = (path: string) => {
    return location.pathname === path;
  };

  const triggerButton = (
    <Button
      variant="ghost"
      size="sm"
      className={`flex items-center gap-2 text-white hover:bg-white/10 px-3 py-2 ${className}`}
    >
      <Grid3X3 className="w-4 h-4" />
      <span className="hidden sm:inline">Áreas</span>
      <ChevronDown className="w-4 h-4" />
    </Button>
  );

  const commandContent = (
    <div className="w-full">
      <div className="p-3 border-b">
        <div className="relative min-w-0">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar área..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
        </div>
      </div>
      <div className="max-h-[60vh] sm:max-h-[300px] overflow-y-auto">
        {filteredItems.length === 0 ? (
          <div className="p-3 text-center text-sm text-muted-foreground">
            Nenhuma área encontrada.
          </div>
        ) : (
          <div className="p-1">
            {filteredItems.map((item) => {
              const Icon = item.icon;
              const isActive = isItemActive(item.path);
              return (
                <button
                  key={item.key}
                  onClick={() => handleSelect(item)}
                  className={`w-full flex items-center gap-3 px-3 py-3 cursor-pointer rounded-md transition-colors ${
                    isActive 
                      ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                      : 'hover:bg-accent'
                  }`}
                >
                  <div className={`flex items-center justify-center w-8 h-8 rounded-md ${
                    isActive ? 'bg-blue-500' : 'bg-primary/10'
                  }`}>
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-primary'}`} />
                  </div>
                  <div className="flex flex-col flex-1 text-left">
                    <span className={`font-medium text-sm ${isActive ? 'text-blue-700' : ''}`}>
                      {item.label}
                    </span>
                    <span className="text-xs text-muted-foreground">{item.desc}</span>
                  </div>
                  {isActive && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );

  // Atalho global Ctrl/Cmd + K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(true);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  // Renderização responsiva
  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          {triggerButton}
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[80vh] p-0">
          <div className="p-4 border-b">
            <h3 className="text-lg font-semibold">Navegar para Área</h3>
            <p className="text-sm text-muted-foreground">
              Selecione uma área para navegar
            </p>
          </div>
          <div className="flex-1 overflow-hidden">
            {commandContent}
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {triggerButton}
      </PopoverTrigger>
      <PopoverContent 
        className="w-[min(92vw,400px)] p-0" 
        align="start"
        sideOffset={8}
      >
        <div className="p-3 border-b">
          <h3 className="text-sm font-medium">Navegar para Área</h3>
          <p className="text-xs text-muted-foreground">
            Use Ctrl+K para abrir rapidamente
          </p>
        </div>
        {commandContent}
      </PopoverContent>
    </Popover>
  );
} 
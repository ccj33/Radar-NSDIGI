import React, { useState, useMemo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  Filter, 
  X, 
  Search, 
  MapPin, 
  BarChart3,
  Users,
  TrendingUp,
  Check,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useMediaQuery } from '@/hooks/use-mobile';

interface FilterOption {
  value: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

interface SmartFiltersProps {
  macroRegions: FilterOption[];
  microRegions: FilterOption[];
  indicators: FilterOption[];
  onFiltersChange: (filters: {
    macroRegion?: string;
    microRegion?: string;
    indicators: string[];
  }) => void;
  className?: string;
}

export const SmartFilters: React.FC<SmartFiltersProps> = ({
  macroRegions,
  microRegions,
  indicators,
  onFiltersChange,
  className = ""
}) => {
  const [selectedMacroRegion, setSelectedMacroRegion] = useState<string>('');
  const [selectedMicroRegion, setSelectedMicroRegion] = useState<string>('');
  const [selectedIndicators, setSelectedIndicators] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  // Filtros disponíveis baseados na macro-região selecionada
  const availableMicroRegions = useMemo(() => {
    if (!selectedMacroRegion) {
      return microRegions; // Mostra todas se nenhuma macro-região estiver selecionada
    }
    return microRegions.filter(region => 
      region.value.includes(selectedMacroRegion) || 
      region.label.toLowerCase().includes(selectedMacroRegion.toLowerCase())
    );
  }, [microRegions, selectedMacroRegion]);

  // Indicadores filtrados por busca
  const filteredIndicators = useMemo(() => {
    if (!searchTerm) return indicators;
    return indicators.filter(indicator =>
      indicator.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [indicators, searchTerm]);

  // Contagem de filtros ativos
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedMacroRegion) count++;
    if (selectedMicroRegion) count++;
    if (selectedIndicators.length > 0) count += selectedIndicators.length;
    return count;
  }, [selectedMacroRegion, selectedMicroRegion, selectedIndicators]);

  // Aplicar filtros
  const applyFilters = useCallback(() => {
    onFiltersChange({
      macroRegion: selectedMacroRegion || undefined,
      microRegion: selectedMicroRegion || undefined,
      indicators: selectedIndicators
    });
  }, [selectedMacroRegion, selectedMicroRegion, selectedIndicators, onFiltersChange]);

  // Limpar todos os filtros
  const clearAllFilters = useCallback(() => {
    setSelectedMacroRegion('');
    setSelectedMicroRegion('');
    setSelectedIndicators([]);
    setSearchTerm('');
    onFiltersChange({
      indicators: []
    });
  }, [onFiltersChange]);

  // Toggle indicador
  const toggleIndicator = useCallback((indicatorValue: string) => {
    setSelectedIndicators(prev => 
      prev.includes(indicatorValue)
        ? prev.filter(v => v !== indicatorValue)
        : [...prev, indicatorValue]
    );
  }, []);

  // Componente de seleção inteligente para mobile
  const MobileSelector = ({ 
    options, 
    selectedValue, 
    onSelect, 
    placeholder, 
    icon 
  }: {
    options: FilterOption[];
    selectedValue: string;
    onSelect: (value: string) => void;
    placeholder: string;
    icon: React.ReactNode;
  }) => (
    <div className="relative">
      <Button
        variant="outline"
        className="w-full justify-between h-12 text-left font-normal touch-target no-zoom"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-2">
          {icon}
          <span className={`text-base ${selectedValue ? 'text-foreground' : 'text-muted-foreground'}`}>
            {selectedValue || placeholder}
          </span>
        </div>
        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </Button>
      
      {isExpanded && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-background border rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {options.map((option) => (
            <button
              key={option.value}
              className={`w-full px-4 py-4 text-left hover:bg-muted/50 focus:bg-muted/50 focus:outline-none touch-target no-zoom ${
                selectedValue === option.value ? 'bg-primary/10 text-primary' : ''
              }`}
              onClick={() => {
                onSelect(option.value);
                setIsExpanded(false);
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-base">{option.label}</span>
                {option.count && (
                  <Badge variant="secondary" className="text-xs">
                    {option.count}
                  </Badge>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );

  // Componente de busca de indicadores
  const IndicatorSearch = () => (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Buscar indicadores..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-4 text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary touch-target no-zoom"
        />
      </div>
      
      <div className="max-h-48 overflow-y-auto space-y-1">
        {filteredIndicators.map((indicator) => (
          <button
            key={indicator.value}
            className={`w-full flex items-center justify-between p-4 rounded-lg border text-left hover:bg-muted/50 focus:bg-muted/50 focus:outline-none touch-target no-zoom ${
              selectedIndicators.includes(indicator.value) 
                ? 'bg-primary/10 border-primary/20' 
                : 'bg-background border-border'
            }`}
            onClick={() => toggleIndicator(indicator.value)}
          >
            <div className="flex items-center space-x-2">
              {indicator.icon || <BarChart3 className="w-5 h-5 text-muted-foreground" />}
              <span className="text-base">{indicator.label}</span>
            </div>
            {selectedIndicators.includes(indicator.value) && (
              <Check className="w-5 h-5 text-primary" />
            )}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <Card className={`p-4 space-y-4 ${className}`}>
      {/* Header dos Filtros */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">Filtros</h3>
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="text-xs">
              {activeFiltersCount}
            </Badge>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="h-10 px-3 text-sm touch-target no-zoom"
          >
            <X className="w-4 h-4 mr-1" />
            Limpar
          </Button>
        )}
      </div>

      <Separator />

      {/* Filtros de Região */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-muted-foreground">Região</h4>
        
        {/* Macro-região (Opcional) */}
        <div className="space-y-2">
          <label className="text-xs text-muted-foreground">
            Macro-região (opcional)
          </label>
          <MobileSelector
            options={macroRegions}
            selectedValue={selectedMacroRegion}
            onSelect={setSelectedMacroRegion}
            placeholder="Selecionar macro-região"
            icon={<MapPin className="w-4 h-4" />}
          />
        </div>

        {/* Micro-região */}
        <div className="space-y-2">
          <label className="text-xs text-muted-foreground">
            Micro-região
          </label>
          <MobileSelector
            options={availableMicroRegions}
            selectedValue={selectedMicroRegion}
            onSelect={setSelectedMicroRegion}
            placeholder="Selecionar micro-região"
            icon={<MapPin className="w-4 h-4" />}
          />
        </div>
      </div>

      <Separator />

      {/* Filtros de Indicadores */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-muted-foreground">Indicadores</h4>
        <IndicatorSearch />
      </div>

      <Separator />

      {/* Ações */}
      <div className="flex space-x-2">
        <Button
          onClick={applyFilters}
          className="flex-1 touch-target no-zoom h-12"
          disabled={!selectedMicroRegion && selectedIndicators.length === 0}
        >
          <Check className="w-5 h-5 mr-2" />
          <span className="text-base">Aplicar Filtros</span>
        </Button>
        <Button
          variant="outline"
          onClick={clearAllFilters}
          className="touch-target no-zoom h-12 w-12 p-0"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Indicador de Breakpoint para Debug */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-2 right-2 p-1 text-xs bg-primary text-primary-foreground rounded">
          {isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop'}
        </div>
      )}
    </Card>
  );
};

export default SmartFilters; 
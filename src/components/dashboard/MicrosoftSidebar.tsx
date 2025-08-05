import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Filter, 
  MapPin, 
  Users, 
  Target, 
  X,
  ChevronDown,
  Check,
  Globe,
  Building,
  TrendingUp,
  Info
} from 'lucide-react';
import { MicroRegionData, FilterOptions } from '@/types/dashboard';
import { formatPopulation } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface MicrosoftSidebarProps {
  data: MicroRegionData[];
  selectedMicroregiao: string;
  filters: FilterOptions;
  onMicroregiaoChange: (microrregiao: string) => void;
  onFiltersChange: (filters: FilterOptions) => void;
  selectedData?: MicroRegionData;
}

export const MicrosoftSidebar: React.FC<MicrosoftSidebarProps> = ({
  data,
  selectedMicroregiao,
  filters,
  onMicroregiaoChange,
  onFiltersChange,
  selectedData
}) => {
  // Extrair opções únicas
  const macrorregioes = [...new Set(data.map(item => item.macrorregiao))].sort();
  
  // Filtrar microrregiões baseado na macrorregião selecionada
  const microrregioes = data
    .filter(item => !filters.macrorregiao || item.macrorregiao === filters.macrorregiao)
    .map(item => item.microrregiao)
    .sort();
  
  // Definir ordem das classificações
  const classificacoesOrdenadas = ['Emergente', 'Em Evolução', 'Avançado'];
  
  // Obter classificações disponíveis nos dados
  const classificacoesDisponiveis = [...new Set(data.map(item => item.classificacao_inmsd))];
  
  // Criar array final com todas as classificações na ordem correta
  const classificacoes = classificacoesOrdenadas.filter(classification => 
    classificacoesDisponiveis.includes(classification)
  );

  const handleMacrorregiaoChange = (value: string) => {
    const newFilters = { ...filters, macrorregiao: value === 'Todas' ? undefined : value };
    onFiltersChange(newFilters);
    // Limpar microrregião selecionada se não estiver nos dados filtrados
    if (selectedMicroregiao && !data.filter(item => 
      (!newFilters.macrorregiao || item.macrorregiao === newFilters.macrorregiao) &&
      item.microrregiao === selectedMicroregiao
    ).length) {
      onMicroregiaoChange('');
    }
  };

  const handleClassificacaoChange = (value: string) => {
    const newFilters = { ...filters, classificacao_inmsd: value === 'Todas' ? undefined : value };
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    onFiltersChange({});
    onMicroregiaoChange('');
  };

  const hasActiveFilters = filters.macrorregiao || filters.classificacao_inmsd || selectedMicroregiao;

  return (
    <section className="bg-white rounded-xl shadow-md p-4 md:p-6 w-full space-y-4">
      {/* Header moderno */}
      <div className="flex items-center justify-between">
        <h3 className="text-xs uppercase font-semibold tracking-wider text-gray-500 flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Filtros
        </h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-gray-400 hover:text-red-500 text-xs transition-colors"
          >
            <X className="w-3 h-3 mr-1" />
            Limpar
          </Button>
        )}
      </div>

      {/* Macrorregião Filter */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-600 flex items-center gap-1">
          <Globe className="w-4 h-4" />
          Macrorregião
        </label>
        <Select
          value={filters.macrorregiao || 'Todas'}
          onValueChange={handleMacrorregiaoChange}
        >
          <SelectTrigger className="w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 px-3 py-2 text-sm transition-all bg-white touch-target select-mobile-safe">
            <SelectValue placeholder="Todas as macrorregiões" />
          </SelectTrigger>
          <SelectContent className="max-h-[50vh] mobile-dropdown-scroll">
            <SelectItem value="Todas">Todas as macrorregiões</SelectItem>
            {macrorregioes.map((macrorregiao) => (
              <SelectItem key={macrorregiao} value={macrorregiao}>
                {macrorregiao}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Microrregião Filter */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-600 flex items-center gap-1">
          <Building className="w-4 h-4" />
          Microrregião
        </label>
        <Select
          value={selectedMicroregiao || 'Nenhuma'}
          onValueChange={(value) => onMicroregiaoChange(value === 'Nenhuma' ? '' : value)}
        >
          <SelectTrigger className="w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 px-3 py-2 text-sm transition-all bg-white touch-target select-mobile-safe">
            <SelectValue placeholder="Selecione uma microrregião" />
          </SelectTrigger>
          <SelectContent className="max-h-[50vh] mobile-dropdown-scroll">
            <SelectItem value="Nenhuma">Selecione uma microrregião</SelectItem>
            {microrregioes.map((microrregiao) => (
              <SelectItem key={microrregiao} value={microrregiao}>
                {microrregiao}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Classificação INMSD Filter */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-600 flex items-center gap-1">
          <Target className="w-4 h-4" />
          Classificação INMSD
        </label>
        <div className="flex flex-wrap gap-2">
          {/* Botão "Todas" */}
          <button
            onClick={() => handleClassificacaoChange('Todas')}
            className={`px-4 py-1.5 rounded-full text-sm transition-all touch-target select-mobile-safe ${
              !filters.classificacao_inmsd
                ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Todas
          </button>
          
          {/* Botões das classificações em ordem */}
          {classificacoesOrdenadas.map((classificacao) => {
            const isAvailable = classificacoesDisponiveis.includes(classificacao);
            const isSelected = filters.classificacao_inmsd === classificacao;
            
            const buttonContent = (
              <button
                key={classificacao}
                onClick={() => isAvailable ? handleClassificacaoChange(classificacao) : null}
                disabled={!isAvailable}
                className={`px-4 py-1.5 rounded-full text-sm transition-all touch-target select-mobile-safe ${
                  isSelected
                    ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-200'
                    : isAvailable
                    ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    : 'bg-gray-50 text-gray-400 cursor-not-allowed opacity-50'
                }`}
              >
                {classificacao}
              </button>
            );
            
            if (!isAvailable) {
              return (
                <TooltipProvider key={classificacao}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      {buttonContent}
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-xs">
                      <div className="flex items-center gap-2">
                        <Info className="w-4 h-4 text-blue-500" />
                        <span>Nenhuma microrregião com classificação "{classificacao}" encontrada nos dados atuais.</span>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            }
            
            return buttonContent;
          })}
        </div>
      </div>

      {/* Results Summary - Card integrado */}
      <div className="pt-4 border-t border-gray-100">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Resultados</span>
            <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs">
              {data.filter(item => {
                return (!filters.macrorregiao || item.macrorregiao === filters.macrorregiao) &&
                       (!filters.classificacao_inmsd || item.classificacao_inmsd === filters.classificacao_inmsd);
              }).length}
            </Badge>
          </div>
          
          <div className="space-y-2 text-xs text-gray-600">
            <div className="flex justify-between">
              <span>Macrorregião:</span>
              <span className="font-medium">{filters.macrorregiao || 'Todas'}</span>
            </div>
            <div className="flex justify-between">
              <span>Microrregião:</span>
              <span className="font-medium">{selectedMicroregiao || 'Nenhuma'}</span>
            </div>
            <div className="flex justify-between">
              <span>Classificação:</span>
              <span className="font-medium">{filters.classificacao_inmsd || 'Todas'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Region Info - Card integrado */}
      {selectedData && (
        <div className="pt-4 border-t border-gray-100">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-gray-700">Região Selecionada</span>
            </div>
            <div className="space-y-2">
              <div className="text-sm">
                <span className="font-medium text-gray-900">{selectedData.microrregiao}</span>
              </div>
              <div className="text-xs text-gray-600 space-y-1">
                <div>Índice: {parseFloat(String(selectedData.indice_geral).replace(',', '.')).toFixed(2)}</div>
                <div>Classificação: {selectedData.classificacao_inmsd}</div>
                <div>População: {formatPopulation(selectedData.populacao)}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MicrosoftSidebar; 
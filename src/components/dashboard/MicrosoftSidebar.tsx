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
  TrendingUp
} from 'lucide-react';
import { MicroRegionData, FilterOptions } from '@/types/dashboard';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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
  const microrregioes = data
    .filter(item => !filters.macrorregiao || item.macrorregiao === filters.macrorregiao)
    .map(item => item.microrregiao)
    .sort();
  
  const classificacoes = [...new Set(data.map(item => item.classificacao_inmsd))].sort();

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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">Filtros</h2>
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-gray-500 hover:text-red-600 text-xs"
          >
            <X className="w-3 h-3 mr-1" />
            Limpar
          </Button>
        )}
      </div>

      {/* Macrorregião Filter */}
      <Card className="border-0 shadow-sm bg-gray-50/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Macrorregião
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <Select
            value={filters.macrorregiao || 'Todas'}
            onValueChange={handleMacrorregiaoChange}
          >
            <SelectTrigger className="w-full bg-white border-gray-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Todas">Todas as macrorregiões</SelectItem>
              {macrorregioes.map((macrorregiao) => (
                <SelectItem key={macrorregiao} value={macrorregiao}>
                  {macrorregiao}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Microrregião Filter */}
      <Card className="border-0 shadow-sm bg-gray-50/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Building className="w-4 h-4" />
            Microrregião
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <Select
            value={selectedMicroregiao || 'Nenhuma'}
            onValueChange={(value) => onMicroregiaoChange(value === 'Nenhuma' ? '' : value)}
            disabled={!filters.macrorregiao && macrorregioes.length > 0}
          >
            <SelectTrigger className="w-full bg-white border-gray-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Nenhuma">Selecione uma microrregião</SelectItem>
              {microrregioes.map((microrregiao) => (
                <SelectItem key={microrregiao} value={microrregiao}>
                  {microrregiao}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Classificação Filter */}
      <Card className="border-0 shadow-sm bg-gray-50/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Target className="w-4 h-4" />
            Classificação INMSD
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-2">
          {['Todas', ...classificacoes].map((classificacao) => (
            <Button
              key={classificacao}
              variant={filters.classificacao_inmsd === classificacao || (!filters.classificacao_inmsd && classificacao === 'Todas') ? "default" : "outline"}
              size="sm"
              onClick={() => handleClassificacaoChange(classificacao)}
              className="w-full justify-start text-sm"
            >
              {filters.classificacao_inmsd === classificacao || (!filters.classificacao_inmsd && classificacao === 'Todas') ? (
                <Check className="w-4 h-4 mr-2" />
              ) : (
                <div className="w-4 h-4 mr-2" />
              )}
              {classificacao}
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Results Summary */}
      <Card className="border-0 shadow-sm bg-blue-50/50">
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Resultados</span>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
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
        </CardContent>
      </Card>

      {/* Selected Region Info */}
      {selectedData && (
        <Card className="border-0 shadow-sm bg-green-50/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Região Selecionada
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              <div className="text-sm">
                <span className="font-medium text-gray-900">{selectedData.microrregiao}</span>
              </div>
              <div className="text-xs text-gray-600 space-y-1">
                <div>Índice: {selectedData.indice_geral}</div>
                <div>Classificação: {selectedData.classificacao_inmsd}</div>
                <div>População: {selectedData.populacao}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MicrosoftSidebar; 
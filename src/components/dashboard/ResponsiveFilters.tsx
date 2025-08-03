import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { MicroRegionData, FilterOptions } from "@/types/dashboard";
import { Filter, MapPin, Building, Target, Check, ChevronsUpDown, Search, Database, Smartphone, Monitor, X } from "lucide-react";
import { DownloadPDF } from "./DownloadPDF";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { useDataCache } from "@/hooks/useDataCache";
import { Input } from "@/components/ui/input";
import { useMediaQuery } from '@/hooks/use-mobile';
import { Separator } from "@/components/ui/separator";

interface ResponsiveFiltersProps {
  data: MicroRegionData[];
  selectedMicroregiao: string;
  filters: FilterOptions;
  onMicroregiaoChange: (microrregiao: string) => void;
  onFiltersChange: (filters: FilterOptions) => void;
  selectedData: MicroRegionData;
}

export function ResponsiveFilters({ 
  data, 
  selectedMicroregiao, 
  filters, 
  onMicroregiaoChange, 
  onFiltersChange,
  selectedData
}: ResponsiveFiltersProps) {
  
  const [openMacro, setOpenMacro] = useState(false);
  const [openRegional, setOpenRegional] = useState(false);
  const [openMicroregiao, setOpenMicroregiao] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [pendingFilters, setPendingFilters] = useState<FilterOptions>(filters);
  
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");
  
  // Usar o hook de cache de dados
  const {
    filteredData: cachedFilteredData,
    isLoading,
    searchTerm,
    setSearchTerm,
    clearCache,
    cacheStats
  } = useDataCache(data, filters);

  const uniqueValues = useMemo(() => ({
    macrorregioes: Array.from(new Set(data.map(item => item.macrorregiao))).sort(),
    regionaisSaude: Array.from(new Set(data.map(item => item.regional_saude))).sort(),
    classificacoes: Array.from(new Set(data.map(item => item.classificacao_inmsd))).sort()
  }), [data]);

  // Garante que, se nenhum filtro está aplicado, todas as microrregiões aparecem
  const filteredMicroregioes = (!filters.macrorregiao && !filters.classificacao_inmsd && !searchTerm)
    ? data
    : cachedFilteredData;

  const clearFilters = () => {
    onFiltersChange({});
    onMicroregiaoChange('');
    setPendingFilters({});
  };

  const applyFilters = () => {
    onFiltersChange(pendingFilters);
    setIsDrawerOpen(false);
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length + (selectedMicroregiao ? 1 : 0);

  // Componente de filtro individual
  const FilterItem = ({ 
    label, 
    icon: Icon, 
    value, 
    options, 
    onSelect, 
    placeholder = "Selecionar...",
    isOpen,
    setIsOpen
  }: {
    label: string;
    icon: any;
    value?: string;
    options: string[];
    onSelect: (value: string | undefined) => void;
    placeholder?: string;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
  }) => (
    <div className="space-y-2">
      <label className="text-fluid-sm font-semibold text-foreground flex items-center gap-2">
        <Icon className="h-4 w-4 text-primary" />
        {label}
      </label>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="w-full justify-between touch-target"
          >
            {value || placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
          <Command>
            <CommandInput placeholder="Buscar..." />
            <CommandList>
              <CommandEmpty>Nenhum resultado.</CommandEmpty>
              <CommandGroup>
                <CommandItem onSelect={() => { onSelect(undefined); setIsOpen(false); }}>
                  <Check className={cn("mr-2 h-4 w-4", !value ? "opacity-100" : "opacity-0")} />
                  Todos
                </CommandItem>
                {options.map((option) => (
                  <CommandItem key={option} onSelect={() => { onSelect(option); setIsOpen(false); }}>
                    <Check className={cn("mr-2 h-4 w-4", value === option ? "opacity-100" : "opacity-0")} />
                    {option}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );

  // Filtros para Desktop
  const DesktopFilters = () => (
    <div className="flex flex-col h-full">
      {/* Título e Limpar Filtros */}
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="text-lg font-semibold">Filtros</h3>
        <Button variant="ghost" size="sm" onClick={clearFilters} className="text-primary touch-target">
          Limpar Tudo
        </Button>
      </div>

      {/* Conteúdo dos Filtros */}
      <div className="flex-1 p-4 space-y-6 overflow-y-auto">
        {/* Filtro Macrorregião */}
        <FilterItem
          label="Macrorregião"
          icon={Building}
          value={filters.macrorregiao}
          options={uniqueValues.macrorregioes}
          onSelect={(value) => onFiltersChange({ ...filters, macrorregiao: value })}
          isOpen={openMacro}
          setIsOpen={setOpenMacro}
        />

        {/* Filtro Regional de Saúde */}
        <FilterItem
          label="Regional de Saúde"
          icon={MapPin}
          value={filters.regional_saude}
          options={uniqueValues.regionaisSaude}
          onSelect={(value) => onFiltersChange({ ...filters, regional_saude: value })}
          isOpen={openRegional}
          setIsOpen={setOpenRegional}
        />

        {/* Filtro Classificação INMSD */}
        <FilterItem
          label="Classificação INMSD"
          icon={Target}
          value={filters.classificacao_inmsd}
          options={uniqueValues.classificacoes}
          onSelect={(value) => onFiltersChange({ ...filters, classificacao_inmsd: value })}
          isOpen={openMicroregiao}
          setIsOpen={setOpenMicroregiao}
        />

        {/* Busca */}
        <div className="space-y-2">
          <label className="text-fluid-sm font-semibold text-foreground flex items-center gap-2">
            <Search className="h-4 w-4 text-primary" />
            Buscar Microrregião
          </label>
          <Input
            placeholder="Digite o nome da microrregião..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="touch-target"
          />
        </div>

        {/* Seletor de Microrregião */}
        <div className="space-y-2">
          <label className="text-fluid-sm font-semibold text-foreground flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            Microrregião
          </label>
          <Select value={selectedMicroregiao} onValueChange={onMicroregiaoChange}>
            <SelectTrigger className="touch-target">
              <SelectValue placeholder="Selecione uma microrregião" />
            </SelectTrigger>
            <SelectContent>
              {filteredMicroregioes.map((item) => (
                <SelectItem key={item.microrregiao} value={item.microrregiao}>
                  {item.microrregiao}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Filtros Ativos */}
        {activeFiltersCount > 0 && (
          <div className="space-y-2">
            <label className="text-fluid-sm font-semibold text-foreground">Filtros Ativos</label>
            <div className="flex flex-wrap gap-2">
              {filters.macrorregiao && (
                <Badge variant="secondary" className="text-xs">
                  {filters.macrorregiao}
                  <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => onFiltersChange({ ...filters, macrorregiao: undefined })} />
                </Badge>
              )}
              {filters.regional_saude && (
                <Badge variant="secondary" className="text-xs">
                  {filters.regional_saude}
                  <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => onFiltersChange({ ...filters, regional_saude: undefined })} />
                </Badge>
              )}
              {filters.classificacao_inmsd && (
                <Badge variant="secondary" className="text-xs">
                  {filters.classificacao_inmsd}
                  <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => onFiltersChange({ ...filters, classificacao_inmsd: undefined })} />
                </Badge>
              )}
              {selectedMicroregiao && (
                <Badge variant="secondary" className="text-xs">
                  {selectedMicroregiao}
                  <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => onMicroregiaoChange('')} />
                </Badge>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Download PDF */}
      <div className="p-4 border-t">
        <DownloadPDF selectedData={selectedData} />
      </div>
    </div>
  );

  // Filtros para Mobile
  const MobileFilters = () => (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <DrawerTrigger asChild>
        <Button className="w-full touch-target">
          <Filter className="w-4 h-4 mr-2" />
          Filtros
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-2">{activeFiltersCount}</Badge>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros
          </DrawerTitle>
        </DrawerHeader>
        <div className="p-4 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Filtro Macrorregião */}
          <FilterItem
            label="Macrorregião"
            icon={Building}
            value={pendingFilters.macrorregiao}
            options={uniqueValues.macrorregioes}
            onSelect={(value) => setPendingFilters({ ...pendingFilters, macrorregiao: value })}
            isOpen={openMacro}
            setIsOpen={setOpenMacro}
          />

          {/* Filtro Regional de Saúde */}
          <FilterItem
            label="Regional de Saúde"
            icon={MapPin}
            value={pendingFilters.regional_saude}
            options={uniqueValues.regionaisSaude}
            onSelect={(value) => setPendingFilters({ ...pendingFilters, regional_saude: value })}
            isOpen={openRegional}
            setIsOpen={setOpenRegional}
          />

          {/* Filtro Classificação INMSD */}
          <FilterItem
            label="Classificação INMSD"
            icon={Target}
            value={pendingFilters.classificacao_inmsd}
            options={uniqueValues.classificacoes}
            onSelect={(value) => setPendingFilters({ ...pendingFilters, classificacao_inmsd: value })}
            isOpen={openMicroregiao}
            setIsOpen={setOpenMicroregiao}
          />

          {/* Busca */}
          <div className="space-y-2">
            <label className="text-fluid-sm font-semibold text-foreground flex items-center gap-2">
              <Search className="h-4 w-4 text-primary" />
              Buscar Microrregião
            </label>
            <Input
              placeholder="Digite o nome da microrregião..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="touch-target"
            />
          </div>

          <Separator />

          {/* Seletor de Microrregião */}
          <div className="space-y-2">
            <label className="text-fluid-sm font-semibold text-foreground flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              Microrregião
            </label>
            <Select value={selectedMicroregiao} onValueChange={onMicroregiaoChange}>
              <SelectTrigger className="touch-target">
                <SelectValue placeholder="Selecione uma microrregião" />
              </SelectTrigger>
              <SelectContent>
                {filteredMicroregioes.map((item) => (
                  <SelectItem key={item.microrregiao} value={item.microrregiao}>
                    {item.microrregiao}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Botões de ação */}
          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={clearFilters} className="flex-1 touch-target">
              Limpar
            </Button>
            <Button onClick={applyFilters} className="flex-1 touch-target">
              Aplicar Filtros
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );

  return (
    <div className="w-full">
      {isMobile ? <MobileFilters /> : <DesktopFilters />}
    </div>
  );
} 
import { useState, useEffect } from "react";
import { ResponsiveBarChart } from "./ResponsiveBarChart";
import { ResponsivePopulationChart } from "./ResponsivePopulationChart";
import { ResponsiveRadarChart } from "./ResponsiveRadarChart";
import { ResponsiveFilters } from "./ResponsiveFilters";
import { MicroRegionData, FilterOptions } from "@/types/dashboard";
import { useExcelData } from "@/hooks/useExcelData";
import { calculateMedians } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Smartphone, Monitor, Tablet } from "lucide-react";
import { useMediaQuery } from '@/hooks/use-mobile';

export function ResponsiveDashboardExample() {
  const [selectedMicroregiao, setSelectedMicroregiao] = useState<string>('');
  const [filters, setFilters] = useState<FilterOptions>({});
  const [selectedData, setSelectedData] = useState<MicroRegionData | null>(null);
  
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");
  
  // Usar o hook de dados do Excel
  const { data, loading, error } = useExcelData();
  
  // Calcular medianas
  const medians = calculateMedians(data);
  
  // Atualizar dados selecionados quando a microrregião muda
  useEffect(() => {
    if (selectedMicroregiao && data.length > 0) {
      const found = data.find(item => item.microrregiao === selectedMicroregiao);
      setSelectedData(found || null);
    } else {
      setSelectedData(null);
    }
  }, [selectedMicroregiao, data]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-32 h-32 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground">Carregando dados...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-red-900 mb-2">Erro ao Carregar Dados</h3>
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header responsivo */}
      <div className="bg-card border-b p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Monitor className="h-6 w-6 text-primary" />
              <h1 className="text-fluid-xl font-bold">Radar NSDIGI</h1>
            </div>
            <Badge variant="outline" className="flex items-center gap-1">
              {isMobile ? (
                <>
                  <Smartphone className="h-3 w-3" />
                  Mobile
                </>
              ) : isTablet ? (
                <>
                  <Tablet className="h-3 w-3" />
                  Tablet
                </>
              ) : (
                <>
                  <Monitor className="h-3 w-3" />
                  Desktop
                </>
              )}
            </Badge>
          </div>
          <p className="text-fluid-sm text-muted-foreground">
            Dashboard responsivo com componentes adaptativos
          </p>
        </div>
      </div>

      {/* Layout responsivo */}
      <div className="container mx-auto p-4 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar/Filtros */}
          <div className="lg:col-span-1">
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  Filtros Responsivos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveFilters
                  data={data}
                  selectedMicroregiao={selectedMicroregiao}
                  filters={filters}
                  onMicroregiaoChange={setSelectedMicroregiao}
                  onFiltersChange={setFilters}
                  selectedData={selectedData || data[0]}
                />
              </CardContent>
            </Card>
          </div>

          {/* Conteúdo principal */}
          <div className="lg:col-span-3 space-y-6">
            {/* Gráfico de Barras Responsivo */}
            <ResponsiveBarChart
              data={data}
              selectedMicroregiao={selectedMicroregiao}
              macroFiltro={filters.macrorregiao}
            />

            {/* Grid responsivo para gráficos menores */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Gráfico de População Responsivo */}
              <ResponsivePopulationChart
                data={data}
                selectedMicroregiao={selectedMicroregiao}
              />

              {/* Estatísticas rápidas */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-fluid-base">Estatísticas Rápidas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-primary/10 rounded-lg">
                      <div className="text-2xl font-bold text-primary">
                        {data.length}
                      </div>
                      <div className="text-fluid-sm text-muted-foreground">
                        Microrregiões
                      </div>
                    </div>
                    <div className="text-center p-3 bg-secondary/10 rounded-lg">
                      <div className="text-2xl font-bold text-secondary-foreground">
                        {Array.from(new Set(data.map(item => item.macrorregiao))).length}
                      </div>
                      <div className="text-fluid-sm text-muted-foreground">
                        Macrorregiões
                      </div>
                    </div>
                  </div>
                  
                  {selectedData && (
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <h4 className="font-medium mb-2">Microrregião Selecionada</h4>
                      <p className="text-fluid-sm text-muted-foreground">
                        {selectedData.microrregiao}
                      </p>
                      <p className="text-fluid-sm text-muted-foreground">
                        Índice: {parseFloat(String(selectedData.indice_geral).replace(',', '.')).toFixed(2)}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Gráfico Radar Responsivo */}
            {selectedData && (
              <ResponsiveRadarChart
                data={selectedData}
                allData={data}
                medians={medians}
                onNavigateToRecommendations={(eixoIndex) => {
                  console.log(`Navegar para recomendações do eixo ${eixoIndex}`);
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Footer responsivo */}
      <div className="bg-card border-t p-4 mt-8">
        <div className="text-center">
          <p className="text-fluid-sm text-muted-foreground">
            Dashboard responsivo implementado com componentes adaptativos para diferentes dispositivos
          </p>
          <div className="flex justify-center gap-4 mt-2">
            <Badge variant="outline" className="text-xs">
              Mobile: ≤ 768px
            </Badge>
            <Badge variant="outline" className="text-xs">
              Tablet: ≤ 1024px
            </Badge>
            <Badge variant="outline" className="text-xs">
              Desktop: > 1024px
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
} 
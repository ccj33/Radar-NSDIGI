import React, { useState, useEffect, Suspense } from 'react';
import { ModernMobileHeader } from '@/components/dashboard/ModernMobileHeader';
import { SmartFilters } from '@/components/dashboard/SmartFilters';
import { MobileAppAreaSwitcher } from '@/components/nav/MobileAppAreaSwitcher';
import { ResponsiveBarChart } from '@/components/dashboard/ResponsiveBarChart';
import { ResponsivePopulationChart } from '@/components/dashboard/ResponsivePopulationChart';
import { ResponsiveRadarChart } from '@/components/dashboard/ResponsiveRadarChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useMediaQuery } from '@/hooks/use-mobile';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  MapPin, 
  BarChart3,
  AlertCircle,
  CheckCircle,
  Loader2,
  RefreshCw
} from 'lucide-react';

// Componentes lazy para performance
const LazyResponsiveBarChart = React.lazy(() => import('@/components/dashboard/ResponsiveBarChart'));
const LazyResponsivePopulationChart = React.lazy(() => import('@/components/dashboard/ResponsivePopulationChart'));
const LazyResponsiveRadarChart = React.lazy(() => import('@/components/dashboard/ResponsiveRadarChart'));

interface DashboardData {
  loading: boolean;
  error: string | null;
  data: any;
}

export const DashboardPageFixed: React.FC = () => {
  const [currentArea, setCurrentArea] = useState('dashboard');
  const [activeFilters, setActiveFilters] = useState({
    macroRegion: undefined,
    microRegion: undefined,
    indicators: []
  });
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    loading: true,
    error: null,
    data: null
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  // Dados mock para demonstração
  const mockData = {
    macroRegions: [
      { value: 'norte', label: 'Norte de Minas', count: 89 },
      { value: 'sul', label: 'Sul de Minas', count: 156 },
      { value: 'leste', label: 'Leste de Minas', count: 67 },
      { value: 'oeste', label: 'Oeste de Minas', count: 45 }
    ],
    microRegions: [
      { value: 'uberlandia', label: 'Uberlândia', count: 23 },
      { value: 'uberaba', label: 'Uberaba', count: 18 },
      { value: 'araxa', label: 'Araxá', count: 12 },
      { value: 'patos', label: 'Patos de Minas', count: 15 }
    ],
    indicators: [
      { value: 'populacao', label: 'População Total', icon: <Users className="w-4 h-4" /> },
      { value: 'pib', label: 'PIB per capita', icon: <TrendingUp className="w-4 h-4" /> },
      { value: 'saude', label: 'Cobertura de Saúde', icon: <CheckCircle className="w-4 h-4" /> },
      { value: 'educacao', label: 'Índice de Educação', icon: <BarChart3 className="w-4 h-4" /> }
    ]
  };

  // Simular carregamento de dados
  useEffect(() => {
    const loadData = async () => {
      setDashboardData(prev => ({ ...prev, loading: true, error: null }));
      
      try {
        // Simular delay de carregamento
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setDashboardData({
          loading: false,
          error: null,
          data: {
            barChartData: [
              { name: 'Uberlândia', value: 650000 },
              { name: 'Uberaba', value: 340000 },
              { name: 'Araxá', value: 110000 },
              { name: 'Patos de Minas', value: 150000 }
            ],
            populationData: [
              { name: 'Urbana', value: 70, color: '#3b82f6' },
              { name: 'Rural', value: 30, color: '#10b981' }
            ],
            radarData: [
              { eixo: 'Saúde', valor: 85, mediana: 70 },
              { eixo: 'Educação', valor: 78, mediana: 65 },
              { eixo: 'Infraestrutura', valor: 92, mediana: 75 },
              { eixo: 'Economia', valor: 88, mediana: 80 }
            ]
          }
        });
      } catch (error) {
        setDashboardData({
          loading: false,
          error: 'Erro ao carregar dados. Tente novamente.',
          data: null
        });
      }
    };

    loadData();
  }, [activeFilters]);

  const handleFiltersChange = (filters: any) => {
    setActiveFilters(filters);
  };

  const handleMenuToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleSearchToggle = () => {
    // Implementar busca
    console.log('Busca ativada');
  };

  const handleFilterToggle = () => {
    // Implementar filtros
    console.log('Filtros ativados');
  };

  const handleAreaChange = (areaId: string) => {
    setCurrentArea(areaId);
  };

  const handleRefresh = () => {
    setDashboardData(prev => ({ ...prev, loading: true, error: null }));
    // Recarregar dados
  };

  // Componente de loading
  const LoadingState = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16 mb-2" />
              <Skeleton className="h-3 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[300px] w-full" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[300px] w-full" />
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Componente de erro
  const ErrorState = () => (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <AlertCircle className="w-16 h-16 text-destructive" />
      <h3 className="text-lg font-semibold">Erro ao carregar dados</h3>
      <p className="text-muted-foreground text-center max-w-md">
        {dashboardData.error}
      </p>
      <Button onClick={handleRefresh} className="touch-target">
        <RefreshCw className="w-4 h-4 mr-2" />
        Tentar Novamente
      </Button>
    </div>
  );

  // Componente de estado vazio
  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <BarChart3 className="w-16 h-16 text-muted-foreground" />
      <h3 className="text-lg font-semibold">Nenhum dado disponível</h3>
      <p className="text-muted-foreground text-center max-w-md">
        Selecione uma micro-região e indicadores para visualizar os dados.
      </p>
    </div>
  );

  // Estatísticas rápidas
  const QuickStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">População Total</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1.250.000</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-600">+2.1%</span> em relação ao ano anterior
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">PIB Regional</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">R$ 45.2B</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-600">+3.8%</span> crescimento anual
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Micro-regiões</CardTitle>
          <MapPin className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">67</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-blue-600">4</span> ativas no momento
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Indicadores</CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">24</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-600">+2</span> novos este mês
          </p>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header Moderno */}
      <ModernMobileHeader
        onMenuToggle={handleMenuToggle}
        onSearchToggle={handleSearchToggle}
        onFilterToggle={handleFilterToggle}
        activeFiltersCount={activeFilters.indicators.length + (activeFilters.microRegion ? 1 : 0)}
        currentPage="Dashboard"
        userName="Administrador"
        notificationsCount={3}
      />

      <div className="container mx-auto p-4 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar/Filtros */}
          <div className="lg:col-span-1 space-y-6">
            {/* Seletor de Área */}
            <MobileAppAreaSwitcher
              currentArea={currentArea}
              onAreaChange={handleAreaChange}
            />

            {/* Filtros Inteligentes */}
            <SmartFilters
              macroRegions={mockData.macroRegions}
              microRegions={mockData.microRegions}
              indicators={mockData.indicators}
              onFiltersChange={handleFiltersChange}
            />
          </div>

          {/* Conteúdo Principal */}
          <div className="lg:col-span-3 space-y-6">
            {/* Estatísticas Rápidas */}
            <QuickStats />

            {/* Estados de Loading/Erro/Vazio */}
            {dashboardData.loading && <LoadingState />}
            {dashboardData.error && <ErrorState />}
            {!dashboardData.loading && !dashboardData.error && !dashboardData.data && <EmptyState />}

            {/* Gráficos Responsivos */}
            {!dashboardData.loading && !dashboardData.error && dashboardData.data && (
              <Suspense fallback={<LoadingState />}>
                <div className="space-y-6">
                  {/* Gráfico de Barras */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>População por Micro-região</span>
                        <Badge variant="outline">Responsivo</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <LazyResponsiveBarChart
                        data={dashboardData.data.barChartData}
                        selectedMicroregiao={activeFilters.microRegion}
                        height={isMobile ? 300 : isTablet ? 350 : 400}
                      />
                    </CardContent>
                  </Card>

                  {/* Gráficos em Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Gráfico de População */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Distribuição Populacional</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <LazyResponsivePopulationChart
                          data={dashboardData.data.populationData}
                          selectedMicroregiao={activeFilters.microRegion}
                        />
                      </CardContent>
                    </Card>

                    {/* Card de Métricas */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Métricas Rápidas</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                          <div>
                            <p className="text-sm font-medium">Densidade Populacional</p>
                            <p className="text-xs text-muted-foreground">Habitantes/km²</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold">45.2</p>
                            <p className="text-xs text-green-600">+2.1%</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                          <div>
                            <p className="text-sm font-medium">Taxa de Crescimento</p>
                            <p className="text-xs text-muted-foreground">Anual</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold">1.8%</p>
                            <p className="text-xs text-green-600">+0.3%</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Gráfico de Radar */}
                  {activeFilters.microRegion && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Análise Multidimensional</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <LazyResponsiveRadarChart
                          data={dashboardData.data.radarData}
                          selectedMicroregiao={activeFilters.microRegion}
                        />
                      </CardContent>
                    </Card>
                  )}
                </div>
              </Suspense>
            )}
          </div>
        </div>
      </div>

      {/* Indicador de Breakpoint para Debug */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 p-2 bg-primary text-primary-foreground rounded-lg text-xs z-50">
          {isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop'}
        </div>
      )}
    </div>
  );
};

export default DashboardPageFixed; 
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { MicroRegionData } from "@/types/dashboard";
import { Users, MapPin, Smartphone, Monitor, TrendingUp } from "lucide-react";
import { Suspense, lazy, useState, useEffect, useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useMediaQuery } from '@/hooks/use-mobile';

// Lazy load do componente de gráfico
const LazyPopulationChartComponent = lazy(() => import('./PopulationChartComponent').then(module => ({ default: module.PopulationChartComponent })));

interface ResponsivePopulationChartProps {
  data: MicroRegionData[];
  selectedMicroregiao?: string;
}

// Skeleton loading component responsivo
function ResponsivePopulationChartSkeleton() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  return (
    <div className={`w-full ${isMobile ? 'h-[280px]' : 'h-[350px] md:h-[400px]'} flex items-center justify-center`}>
      <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
        <div className="w-32 h-32 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin"></div>
        <Skeleton className={`${isMobile ? 'h-3 w-32' : 'h-4 w-48'}`} />
        <Skeleton className={`${isMobile ? 'h-2 w-24' : 'h-3 w-32'}`} />
      </div>
    </div>
  );
}

export function ResponsivePopulationChart({ data, selectedMicroregiao }: ResponsivePopulationChartProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  const handleChartLoad = () => {
    setIsLoaded(true);
  };

  // Dados adaptados por viewport
  const adaptedData = useMemo(() => {
    const populationData = data.reduce((acc, item) => {
      const populacao = parseInt(String(item.populacao).replace(/\D/g, '')) || 0;
      
      let category = '';
      if (populacao < 50000) category = 'Pequena';
      else if (populacao < 200000) category = 'Média';
      else if (populacao < 500000) category = 'Grande';
      else category = 'Metropolitana';
      
      const existing = acc.find(cat => cat.name === category);
      if (existing) {
        existing.value += 1;
        existing.populacao += populacao;
      } else {
        acc.push({
          name: category,
          value: 1,
          populacao: populacao,
          color: getCategoryColor(category)
        });
      }
      
      return acc;
    }, [] as Array<{name: string, value: number, populacao: number, color: string}>);

    return populationData.sort((a, b) => b.value - a.value);
  }, [data]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Pequena': return 'hsl(var(--chart-primary))';
      case 'Média': return 'hsl(var(--chart-secondary))';
      case 'Grande': return 'hsl(var(--chart-tertiary))';
      case 'Metropolitana': return 'hsl(var(--chart-quaternary))';
      default: return 'hsl(var(--chart-primary))';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Pequena': return '🏘️';
      case 'Média': return '🏙️';
      case 'Grande': return '🌆';
      case 'Metropolitana': return '🏢';
      default: return '🏘️';
    }
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card border border-border rounded-lg p-4 shadow-xl">
          <div className="mb-3">
            <h4 className="font-semibold text-foreground text-base mb-1 flex items-center gap-2">
              {getCategoryIcon(data.name)} {data.name}
            </h4>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Microrregiões:</span>
              <span className="text-lg font-bold text-primary">
                {data.value}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">População Total:</span>
              <span className="text-sm font-medium text-foreground">
                {data.populacao.toLocaleString('pt-BR')}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Percentual:</span>
              <span className="text-sm font-medium text-foreground">
                {((data.value / adaptedData.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }: any) => {
    if (!payload || payload.length === 0) return null;

    return (
      <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} gap-2 mt-4`}>
        {payload.map((entry: any, index: number) => (
          <div key={`legend-${index}`} className="flex items-center gap-2 text-fluid-sm">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-muted-foreground">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  // Verificar se há dados para exibir
  if (!adaptedData || adaptedData.length === 0) {
    return (
      <div className="bg-card rounded-lg border p-6 shadow-sm chart-min-height">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="text-blue-600 text-6xl mb-4">👥</div>
            <h3 className="text-xl font-semibold text-blue-900 mb-2">Nenhum Dado Disponível</h3>
            <p className="text-blue-700">Não há dados populacionais para exibir.</p>
            <p className="text-sm text-blue-600 mt-2">Verifique os filtros aplicados.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border p-4 md:p-6 shadow-sm" data-chart="responsive-population">
      {/* Cabeçalho responsivo */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 md:mb-6 space-y-2 md:space-y-0">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <h3 className="text-fluid-base font-semibold">
            Distribuição por Faixa Populacional
          </h3>
          {isMobile && (
            <Badge variant="outline" className="text-xs">
              <Smartphone className="h-3 w-3 mr-1" />
              Adaptado
            </Badge>
          )}
        </div>
        <p className="text-fluid-sm text-muted-foreground">
          Categorização das microrregiões por tamanho populacional
        </p>
      </div>
      
      {/* Container do gráfico responsivo */}
      <div className={`w-full ${isMobile ? 'h-[280px]' : isTablet ? 'h-[320px]' : 'h-[350px] md:h-[400px]'}`}>
        <Suspense fallback={<ResponsivePopulationChartSkeleton />}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={adaptedData}
                cx="50%"
                cy="50%"
                outerRadius={isMobile ? 80 : isTablet ? 100 : 120}
                innerRadius={isMobile ? 40 : isTablet ? 50 : 60}
                dataKey="value"
                paddingAngle={2}
              >
                {adaptedData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              {!isMobile && <Tooltip content={<CustomTooltip />} />}
              {!isMobile && <Legend content={<CustomLegend />} />}
            </PieChart>
          </ResponsiveContainer>
        </Suspense>
      </div>
      
      {/* Informações adicionais para mobile */}
      {isMobile && adaptedData.length > 0 && (
        <div className="mt-4 p-3 bg-muted/30 rounded-lg">
          <div className="text-fluid-sm text-muted-foreground">
            <p className="font-medium mb-2">Resumo da Distribuição:</p>
            <div className="grid grid-cols-2 gap-2">
              {adaptedData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span>{getCategoryIcon(item.name)}</span>
                  <span className="font-medium">{item.value}</span>
                  <span className="text-xs">({item.name})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {!isLoaded && (
        <div className="mt-4 p-3 bg-muted/30 rounded-lg">
          <div className="text-fluid-sm text-muted-foreground text-center">
            <p>Carregando distribuição populacional...</p>
          </div>
        </div>
      )}

    </div>
  );
} 
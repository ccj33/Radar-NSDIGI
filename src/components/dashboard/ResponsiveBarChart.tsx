import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';
import { MicroRegionData } from "@/types/dashboard";
import { TrendingUp, Smartphone, Monitor } from "lucide-react";
import { Suspense, lazy, useState, useEffect, useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useMediaQuery } from '@/hooks/use-mobile';

// Lazy load do componente de gráfico
const LazyBarChartComponent = lazy(() => import('./BarChartComponent').then(module => ({ default: module.BarChartComponent })));

interface ResponsiveBarChartProps {
  data: MicroRegionData[];
  selectedMicroregiao: string;
  macroFiltro?: string;
}

// Skeleton loading component responsivo
function ResponsiveBarChartSkeleton() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  return (
    <div className={`w-full ${isMobile ? 'h-[300px]' : 'h-[400px] md:h-[450px]'} flex items-center justify-center`}>
      <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
        <div className="w-32 h-32 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin"></div>
        <Skeleton className={`${isMobile ? 'h-3 w-32' : 'h-4 w-48'}`} />
        <Skeleton className={`${isMobile ? 'h-2 w-24' : 'h-3 w-32'}`} />
      </div>
    </div>
  );
}

export function ResponsiveBarChart({ data, selectedMicroregiao, macroFiltro }: ResponsiveBarChartProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  const handleChartLoad = () => {
    setIsLoaded(true);
  };

  // Dados adaptados por viewport
  const adaptedData = useMemo(() => {
    const chartData = data
      .map(item => {
        let indice = 0;
        if (item.indice_geral) {
          const cleanValue = String(item.indice_geral).replace(/[,]/g, '.').replace(/[^\d.]/g, '');
          indice = parseFloat(cleanValue) || 0;
        }
        
        return {
          microrregiao: item.microrregiao,
          indice: indice,
          isSelected: item.microrregiao === selectedMicroregiao
        };
      })
      .filter(item => item.indice > 0)
      .sort((a, b) => b.indice - a.indice);

    // Limitar dados em mobile para melhor performance
    return isMobile ? chartData.slice(0, 10) : chartData;
  }, [data, selectedMicroregiao, isMobile]);

  const getClassificationLevel = (value: number) => {
    if (value >= 0.8) return "Excelente";
    if (value >= 0.6) return "Bom";
    if (value >= 0.4) return "Regular";
    if (value >= 0.2) return "Baixo";
    return "Muito Baixo";
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const isSelected = data.isSelected;
      
      return (
        <div className="bg-card border border-border rounded-lg p-4 shadow-xl">
          <div className="mb-3">
            <h4 className="font-semibold text-foreground text-base mb-1">{label}</h4>
            {isSelected && (
              <Badge className="bg-primary text-primary-foreground text-xs">
                Microrregião Selecionada
              </Badge>
            )}
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Índice de Maturidade:</span>
              <span className="text-lg font-bold text-primary">
                {payload[0].value.toFixed(2)}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Classificação:</span>
              <span className="text-sm font-medium text-foreground">
                {getClassificationLevel(payload[0].value)}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Percentual:</span>
              <span className="text-sm font-medium text-foreground">
                {(payload[0].value * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  // Verificar se há dados para exibir
  if (!adaptedData || adaptedData.length === 0) {
    return (
      <div className="bg-card rounded-lg border p-6 shadow-sm chart-min-height">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="text-blue-600 text-6xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-blue-900 mb-2">Nenhum Dado Disponível</h3>
            <p className="text-blue-700">Não há dados para exibir no gráfico de barras.</p>
            <p className="text-sm text-blue-600 mt-2">Verifique os filtros aplicados.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border p-4 md:p-6 shadow-sm" data-chart="responsive-bar">
      {/* Cabeçalho responsivo */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 md:mb-6 space-y-2 md:space-y-0">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h3 className="text-fluid-base font-semibold">
            Comparação do Índice Geral de Maturidade
          </h3>
          {isMobile && (
            <Badge variant="outline" className="text-xs">
              <Smartphone className="h-3 w-3 mr-1" />
              Top 10
            </Badge>
          )}
        </div>
        <p className="text-fluid-sm text-muted-foreground">
          Ranking das microrregiões por índice de maturidade digital
        </p>
      </div>
      
      {/* Container do gráfico responsivo */}
      <div className={`w-full ${isMobile ? 'h-[300px]' : isTablet ? 'h-[350px]' : 'h-[400px] md:h-[450px]'}`}>
        <Suspense fallback={<ResponsiveBarChartSkeleton />}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={adaptedData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
              <XAxis 
                dataKey="microrregiao" 
                angle={isMobile ? -45 : -30}
                textAnchor="end"
                height={isMobile ? 80 : 60}
                tick={{ fontSize: isMobile ? 10 : 12 }}
                interval={isMobile ? 0 : "preserveStart"}
              />
              <YAxis 
                tick={{ fontSize: isMobile ? 10 : 12 }}
                tickFormatter={(value) => value.toFixed(2)}
              />
              {!isMobile && <Tooltip content={<CustomTooltip />} />}
              <Bar 
                dataKey="indice" 
                radius={[4, 4, 0, 0]}
                minPointSize={isMobile ? 8 : 12}
              >
                {adaptedData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`}
                    fill={entry.isSelected ? "hsl(var(--primary))" : "hsl(var(--chart-primary))"}
                    opacity={entry.isSelected ? 1 : 0.8}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Suspense>
      </div>
      
      {/* Informações adicionais para mobile */}
      {isMobile && adaptedData.length > 0 && (
        <div className="mt-4 p-3 bg-muted/30 rounded-lg">
          <div className="text-fluid-sm text-muted-foreground">
            <p className="font-medium mb-2">Dados da Microrregião Selecionada:</p>
            {adaptedData.find(item => item.isSelected) ? (
              <div className="space-y-1">
                <p><strong>Índice:</strong> {adaptedData.find(item => item.isSelected)?.indice.toFixed(2)}</p>
                <p><strong>Classificação:</strong> {getClassificationLevel(adaptedData.find(item => item.isSelected)?.indice || 0)}</p>
                <p><strong>Percentual:</strong> {((adaptedData.find(item => item.isSelected)?.indice || 0) * 100).toFixed(1)}%</p>
              </div>
            ) : (
              <p>Nenhuma microrregião selecionada</p>
            )}
          </div>
        </div>
      )}
      
      {!isLoaded && (
        <div className="mt-4 p-3 bg-muted/30 rounded-lg">
          <div className="text-fluid-sm text-muted-foreground text-center">
            <p>Carregando comparação de maturidade...</p>
          </div>
        </div>
      )}

    </div>
  );
} 
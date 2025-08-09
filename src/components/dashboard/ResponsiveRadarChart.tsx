import { ResponsiveContainer, RadarChart as RechartsRadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import { MicroRegionData, EIXOS_NAMES } from "@/types/dashboard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target, Download, Eye, EyeOff, Smartphone, Monitor, TrendingUp } from "lucide-react";
import { useState, Suspense, useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { RadarChartComponent } from './RadarChartComponent';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { calculateMedians, calculateMediansByMacroregion } from '@/data/mockData';
import { useMediaQuery } from '@/hooks/use-mobile';

const LegendItem = ({ color, textColor, label, value }: { color: string, textColor: string, label: string, value: string }) => (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full ${color}`}></div>
      <span className={`text-xs font-medium ${textColor}`}>{label}</span>
      <span className="text-xs text-muted-foreground">{value}</span>
    </div>
  );

interface ResponsiveRadarChartProps {
  data: MicroRegionData;
  allData: MicroRegionData[];
  medians: Record<string, number>;
  onNavigateToRecommendations?: (eixoIndex: number) => void;
  onLoad?: () => void;
}

// Skeleton responsivo para loading
const ResponsiveRadarChartSkeleton = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  return (
    <div className={`w-full ${isMobile ? 'h-[300px]' : 'h-[400px] md:h-[450px]'} mb-4`}>
      <Skeleton className="w-full h-full" />
    </div>
  );
};

export function ResponsiveRadarChart({ data, allData, medians, onNavigateToRecommendations, onLoad }: ResponsiveRadarChartProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredEixo, setHoveredEixo] = useState<number | null>(null);
  const [showRadar, setShowRadar] = useState(true);
  const [compareWithMacroregion, setCompareWithMacroregion] = useState(false);
  
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  const handleChartLoad = () => {
    setIsLoaded(true);
    if (onLoad) {
      onLoad();
    }
  };

  // Calcular medianas baseadas na escolha do usuário
  const currentMedians = compareWithMacroregion 
    ? calculateMediansByMacroregion(allData, data.macrorregiao)
    : medians;

  // Dados adaptados por viewport
  const adaptedData = useMemo(() => {
    const radarData = EIXOS_NAMES.map((eixoName, index) => {
      const eixoKey = `eixo_${index + 1}` as keyof MicroRegionData;
      const value = parseFloat(String(data[eixoKey] || 0).replace(/[,]/g, '.')) || 0;
      const median = currentMedians[eixoKey] || 0;
      
      return {
        eixo: isMobile ? eixoName.split(' ')[0] : eixoName, // Abreviar em mobile
        fullName: eixoName,
        value: value,
        median: median,
        index: index
      };
    });

    return radarData;
  }, [data, currentMedians, isMobile]);

  // Identificar pontos fortes e oportunidades
  const strengths = adaptedData.filter(item => item.value > item.median).slice(0, 3);
  const opportunities = adaptedData.filter(item => item.value < item.median).slice(0, 3);

  const exportChartAsImage = () => {
    const chartElement = document.querySelector('.recharts-wrapper');
    if (chartElement) {
      import('html2canvas').then((html2canvas) => {
        html2canvas.default(chartElement as HTMLElement, {
          backgroundColor: '#ffffff',
          scale: 2,
          useCORS: true,
          allowTaint: true,
          width: chartElement.scrollWidth,
          height: chartElement.scrollHeight
        }).then((canvas) => {
          const finalCanvas = document.createElement('canvas');
          const ctx = finalCanvas.getContext('2d');
          const padding = 20;
          const titleHeight = 40;
          
          finalCanvas.width = canvas.width + (padding * 2);
          finalCanvas.height = canvas.height + padding + titleHeight;
          
          if (ctx) {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);
            
            ctx.fillStyle = '#1e40af';
            ctx.font = 'bold 18px Arial, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(data.microrregiao, finalCanvas.width / 2, 25);
            
            ctx.drawImage(canvas, padding, titleHeight);
            
            const link = document.createElement('a');
            link.download = `grafico-radar-${data.microrregiao.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.png`;
            link.href = finalCanvas.toDataURL('image/png', 1.0);
            link.click();
          }
        });
      });
    }
  };

  const LegendContent = () => (
    <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-2 mt-4`}>
      <LegendItem 
        color="bg-primary" 
        textColor="text-primary" 
        label="Microrregião" 
        value={data.microrregiao}
      />
      <LegendItem 
        color="bg-muted-foreground" 
        textColor="text-muted-foreground" 
        label="Mediana" 
        value={compareWithMacroregion ? "Macrorregião" : "Geral"}
      />
    </div>
  );

  // Verificar se há dados para exibir
  if (!adaptedData || adaptedData.length === 0) {
    return (
      <div className="bg-card rounded-lg border p-6 shadow-sm chart-min-height">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="text-blue-600 text-6xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold text-blue-900 mb-2">Nenhum Dado Disponível</h3>
            <p className="text-blue-700">Não há dados para exibir no gráfico radar.</p>
            <p className="text-sm text-blue-600 mt-2">Verifique os filtros aplicados.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border p-4 md:p-6 shadow-sm" data-chart="responsive-radar">
      {/* Cabeçalho responsivo */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 md:mb-6 space-y-2 md:space-y-0">
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          <h3 className="text-fluid-base font-semibold">
            Análise Radar por Eixos
          </h3>
          {isMobile && (
            <Badge variant="outline" className="text-xs">
              <Smartphone className="h-3 w-3 mr-1" />
              Adaptado
            </Badge>
          )}
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <Label htmlFor="compare-segment" className="text-fluid-sm whitespace-nowrap">
              Comparar com
            </Label>
            <ToggleGroup
              id="compare-segment"
              type="single"
              value={compareWithMacroregion ? "macro" : "geral"}
              onValueChange={(value) => {
                if (value) setCompareWithMacroregion(value === "macro");
              }}
              className="bg-muted/40 p-1 rounded-full"
              size={isMobile ? "sm" : "default"}
            >
              <ToggleGroupItem value="geral" aria-label="Comparar com geral">
                Geral
              </ToggleGroupItem>
              <ToggleGroupItem value="macro" aria-label="Comparar com macrorregião">
                Macrorregião
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          <Button
            variant="outline"
            size={isMobile ? "sm" : "default"}
            onClick={exportChartAsImage}
            className="touch-target"
          >
            <Download className="h-4 w-4 mr-2" />
            {!isMobile && "Exportar"}
          </Button>
        </div>
      </div>
      
      {/* Container do gráfico responsivo */}
      <div className={`w-full ${isMobile ? 'h-[300px]' : isTablet ? 'h-[350px]' : 'h-[400px] md:h-[450px]'}`}>
        <Suspense fallback={<ResponsiveRadarChartSkeleton />}>
          <ResponsiveContainer width="100%" height="100%">
            <RechartsRadarChart
              data={adaptedData}
              margin={{
                top: isMobile ? 10 : 20,
                right: isMobile ? 10 : 30,
                left: isMobile ? 10 : 20,
                bottom: isMobile ? 10 : 20
              }}
            >
              <PolarGrid stroke="hsl(var(--muted))" />
              <PolarAngleAxis 
                dataKey="eixo" 
                tick={{ fontSize: isMobile ? 10 : 12 }}
                tickLine={false}
              />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 1]} 
                tick={{ fontSize: isMobile ? 10 : 12 }}
                tickFormatter={(value) => value.toFixed(1)}
              />
              <Radar
                name="Microrregião"
                dataKey="value"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Radar
                name="Mediana"
                dataKey="median"
                stroke="hsl(var(--muted-foreground))"
                fill="hsl(var(--muted-foreground))"
                fillOpacity={0.1}
                strokeWidth={1}
                strokeDasharray="5 5"
              />
              {!isMobile && <Legend content={<LegendContent />} />}
            </RechartsRadarChart>
          </ResponsiveContainer>
        </Suspense>
      </div>
      
      {/* Informações adicionais para mobile */}
      {isMobile && adaptedData.length > 0 && (
        <div className="mt-4 space-y-3">
          {/* Pontos fortes */}
          {strengths.length > 0 && (
            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-800 mb-2 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Pontos Fortes
              </h4>
              <div className="space-y-1">
                {strengths.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-green-700">{item.fullName}</span>
                    <span className="font-medium text-green-800">{item.value.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Oportunidades */}
          {opportunities.length > 0 && (
            <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
              <h4 className="font-medium text-orange-800 mb-2 flex items-center gap-2">
                <Target className="h-4 w-4" />
                Oportunidades
              </h4>
              <div className="space-y-1">
                {opportunities.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-orange-700">{item.fullName}</span>
                    <span className="font-medium text-orange-800">{item.value.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Controles responsivos */}
      <div className="mt-4 flex flex-col sm:flex-row gap-2">
        <Button
          variant="outline"
          size={isMobile ? "sm" : "default"}
          onClick={() => setShowRadar(!showRadar)}
          className="touch-target"
        >
          {showRadar ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
          {!isMobile && (showRadar ? "Ocultar" : "Mostrar")} Radar
        </Button>
        
        {onNavigateToRecommendations && (
          <Button
            size={isMobile ? "sm" : "default"}
            onClick={() => onNavigateToRecommendations(hoveredEixo || 0)}
            className="touch-target"
          >
            Ver Recomendações
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        )}
      </div>
      
      {!isLoaded && (
        <div className="mt-4 p-3 bg-muted/30 rounded-lg">
          <div className="text-fluid-sm text-muted-foreground text-center">
            <p>Carregando análise radar...</p>
          </div>
        </div>
      )}

    </div>
  );
} 
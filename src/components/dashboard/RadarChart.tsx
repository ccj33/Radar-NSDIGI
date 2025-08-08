import { ResponsiveContainer, RadarChart as RechartsRadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import { MicroRegionData, EIXOS_NAMES } from "@/types/dashboard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target, Download, Eye, EyeOff } from "lucide-react";
import { useState, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { RadarChartComponent } from './RadarChartComponent';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

const LegendItem = ({ color, textColor, label, value }: { color: string, textColor: string, label: string, value: string }) => (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full ${color}`}></div>
      <span className={`text-xs font-medium ${textColor}`}>{label}</span>
      <span className="text-xs text-muted-foreground">{value}</span>
    </div>
  );

interface RadarChartProps {
  data: MicroRegionData;
  allData: MicroRegionData[];
  medians: Record<string, number>;
  onNavigateToRecommendations?: (eixoIndex: number) => void;
  onLoad?: () => void;
}

// Skeleton para loading
const RadarChartSkeleton = () => (
  <div className="h-[350px] sm:h-[400px] md:h-[450px] w-full mb-4">
    <Skeleton className="w-full h-full" />
  </div>
);

export function DashboardRadarChart({ data, allData, medians, onNavigateToRecommendations, onLoad }: RadarChartProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredEixo, setHoveredEixo] = useState<number | null>(null);
  const [showRadar, setShowRadar] = useState(true);
  const [compareWithMacroregion, setCompareWithMacroregion] = useState(false);

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

  const exportChartAsImage = () => {
    // Capturar apenas o gráfico radar puro
    const chartElement = document.querySelector('.recharts-wrapper');
    if (chartElement) {
      // Usar html2canvas para capturar o gráfico
      import('html2canvas').then((html2canvas) => {
        html2canvas.default(chartElement as HTMLElement, {
          backgroundColor: '#ffffff',
          scale: 2,
          useCORS: true,
          allowTaint: true,
          width: chartElement.scrollWidth,
          height: chartElement.scrollHeight
        }).then((canvas) => {
          // Criar canvas com nome da microrregião
          const finalCanvas = document.createElement('canvas');
          const ctx = finalCanvas.getContext('2d');
          const padding = 20;
          const titleHeight = 40;
          
          finalCanvas.width = canvas.width + (padding * 2);
          finalCanvas.height = canvas.height + padding + titleHeight;
          
          if (ctx) {
            // Fundo branco
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);
            
            // Adicionar nome da microrregião
            ctx.fillStyle = '#1e40af';
            ctx.font = 'bold 18px Arial, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(data.microrregiao, finalCanvas.width / 2, 25);
            
            // Adicionar o gráfico
            ctx.drawImage(canvas, padding, titleHeight);
            
            // Criar link de download
            const link = document.createElement('a');
            link.download = `grafico-radar-${data.microrregiao.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.png`;
            link.href = finalCanvas.toDataURL('image/png', 1.0);
            link.click();
          }
        });
      }).catch((error) => {
        console.error('Erro ao exportar gráfico:', error);
        alert('Erro ao exportar gráfico. Tente novamente.');
      });
    } else {
      alert('Gráfico não encontrado. Aguarde o carregamento completo.');
    }
  };

  const LegendContent = () => (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-xs p-2">
      <div>
        <h5 className="font-semibold text-primary mb-2">Classificação por Valor</h5>
        <div className="space-y-2">
          <LegendItem color="bg-orange-400" textColor="text-orange-800" label="Emergente" value="(≤ 0,33)" />
          <LegendItem color="bg-yellow-400" textColor="text-yellow-800" label="Em Evolução" value="(0,33 - 0,66)" />
          <LegendItem color="bg-green-400" textColor="text-green-700" label="Avançado" value="(> 0,66)" />
        </div>
      </div>
      <div>
        <h5 className="font-semibold text-primary mb-2">Status vs Mediana</h5>
        <div className="space-y-2">
          <LegendItem color="bg-blue-400" textColor="text-blue-700" label="↑ Acima" value="(melhor)" />
          <LegendItem color="bg-gray-400" textColor="text-gray-800" label="= Na Mediana" value="(na média)" />
          <LegendItem color="bg-yellow-500" textColor="text-yellow-800" label="↓ Abaixo" value="(pior)" />
        </div>
      </div>
    </div>
  );

  return (
    <div data-section="radar" className="bg-card rounded-lg border p-4 sm:p-6 shadow-sm">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Target className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold">Análise por Eixos</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Comparativo da microrregião e medianas
              </p>
            </div>
          </div>
        </div>
        <div className="text-left sm:text-right">
          <div className="text-lg sm:text-xl font-bold text-primary">
            {data.microrregiao}
          </div>
        </div>
      </div>



      {/* Botão de exportar e visibilidade */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <Label htmlFor="compare-segment" className="text-sm font-medium whitespace-nowrap">
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
            size="sm"
          >
            <ToggleGroupItem value="geral" aria-label="Comparar com todas as regiões">
              Geral
            </ToggleGroupItem>
            <ToggleGroupItem value="macro" aria-label="Comparar com macrorregião">
              Macrorregião
            </ToggleGroupItem>
          </ToggleGroup>
          <div className="text-xs text-muted-foreground ml-2">
            {compareWithMacroregion 
              ? `Mediana da ${data.macrorregiao}` 
              : 'Mediana geral (89 microrregiões)'
            }
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            onClick={() => setShowRadar(v => !v)}
            variant="outline"
            size="sm"
            aria-label={showRadar ? 'Ocultar gráfico' : 'Mostrar gráfico'}
          >
            {showRadar ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
          <Button 
            onClick={exportChartAsImage}
            className="export-button bg-blue-600 hover:bg-blue-700 text-white"
            size="sm"
          >
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Caixinhas dos eixos clicáveis */}
      {isLoaded && (
        <div className="mb-4">
          <Accordion type="single" collapsible defaultValue="legend" className="w-full mb-4">
            <AccordionItem value="legend">
              <AccordionTrigger className="text-sm font-semibold text-primary hover:no-underline">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  Legenda dos Eixos
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <LegendContent />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <div className="p-2 bg-primary/10 border border-primary/20 rounded-lg mb-3">
            <p className="text-xs text-primary font-medium text-center">
              💡 <strong>Dica:</strong> Clique em um eixo para ver as recomendações. 
              {compareWithMacroregion 
                ? ` Comparando com a mediana da macrorregião ${data.macrorregiao}.`
                : ' Comparando com a mediana geral de todas as 89 microrregiões.'
              }
            </p>
          </div>
          <div className="axis-cards grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {EIXOS_NAMES.map((nome, index) => {
              const eixoKey = `eixo_${index + 1}` as keyof MicroRegionData;
              const valor = parseFloat(String(data[eixoKey]).replace(',', '.'));
              const mediana = currentMedians[eixoKey] || 0;
              const diferenca = valor - mediana;
              
              // Classificação por valor do eixo
              let classificationColor = '';
              let classificationText = '';
              
              if (valor <= 0.33) {
                classificationColor = 'bg-orange-100 text-orange-800 border-orange-300';
                classificationText = 'Emergente';
              } else if (valor <= 0.66) {
                classificationColor = 'bg-yellow-100 text-yellow-800 border-yellow-300';
                classificationText = 'Em Evolução';
              } else {
                classificationColor = 'bg-green-100 text-green-700 border-green-300';
                classificationText = 'Avançado';
              }
              
              // Status em relação à mediana
              let statusColor = 'bg-gray-100 text-gray-800 border-gray-200';
              let statusText = 'Na Mediana';
              let statusIcon = '=';
              
              if (diferenca > 0.1) {
                statusColor = 'bg-blue-100 text-blue-700 border-blue-300';
                statusText = 'Acima da Mediana';
                statusIcon = '↑';
              } else if (diferenca < -0.1) {
                statusColor = 'bg-yellow-50 text-yellow-700 border-yellow-200';
                statusText = 'Abaixo da Mediana';
                statusIcon = '↓';
              }
              
              return (
                <button
                  key={index}
                  onClick={() => onNavigateToRecommendations?.(index)}
                  onMouseEnter={() => setHoveredEixo(index)}
                  onMouseLeave={() => setHoveredEixo(null)}
                  className={`h-full min-h-[140px] p-3 text-center rounded-lg border-2 border-transparent hover:border-primary ${statusColor} hover:shadow-md transition-all flex flex-col justify-between items-center`}
                >
                  <div className="w-full">
                    <div className="text-xs font-bold mb-1">Eixo {index + 1}</div>
                    <div className="text-xs opacity-90 leading-tight mb-2 min-h-[2.5rem] flex items-center justify-center">{nome}</div>
                  </div>
                  
                  <div className="w-full">
                    <div className="text-sm font-bold text-primary mb-1">{valor.toFixed(2)}</div>
                    <div className="text-xs opacity-70 text-muted-foreground mb-2">
                      (Mediana: {mediana.toFixed(2)})
                      {compareWithMacroregion && (
                        <span className="text-xs text-blue-600 ml-1">
                          • {data.macrorregiao}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="w-full space-y-2">
                    <div className="flex items-center justify-center">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${classificationColor}`}>
                        {classificationText}
                      </span>
                    </div>
                    <div className="flex items-center justify-center gap-1 min-h-[2rem]">
                      <span className="font-bold text-xs w-4 text-center">{statusIcon}</span>
                      <span className="text-xs">{statusText}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
      
      {showRadar && (
        <div className="w-full h-[300px] sm:h-[450px]">
          <Suspense fallback={<RadarChartSkeleton />}>
            <RadarChartComponent 
              data={data}
              medians={currentMedians}
              onNavigateToRecommendations={onNavigateToRecommendations}
              onLoad={handleChartLoad}
              hoveredEixo={hoveredEixo}
              setHoveredEixo={setHoveredEixo}
              compareWithMacroregion={compareWithMacroregion}
            />
          </Suspense>
        </div>
      )}

      {/* Fonte ABNT */}
      <div className="pt-2 text-right w-full">
        <span className="text-[10px] sm:text-xs text-muted-foreground">
          Fonte: Ministério da Saúde/SEIDIGI
        </span>
      </div>
    </div>
  );
}
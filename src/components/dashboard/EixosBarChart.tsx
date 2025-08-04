import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { EIXOS_NAMES } from "@/types/dashboard";
import { useMemo, useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';
import { useMediaQuery } from '@/hooks/use-mobile';

interface EixosBarChartProps {
  eixosValues: number[];
  microrregiao: string;
}

const getBarColor = (value: number) => {
  if (value > 0.66) return '#22c55e'; // Verde para Avançado
  if (value > 0.33) return '#3b82f6'; // Azul para Em Evolução
  return '#f97316'; // Laranja para Emergente
};

// Componente para renderizar o label customizado na barra
const CustomBarLabel = (props: any) => {
  const { x, y, width, value, payload } = props;
  
  // Verificação de segurança
  if (payload === undefined || value === undefined) {
    return null;
  }

  const { status } = payload;
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Posição do texto e do indicador - ajustado para mobile
  const textAnchorX = x + width + (isMobile ? 8 : 15);
  const textY = y + 12;

  let indicator = null;
  if (status === 'best') {
    indicator = <circle cx={textAnchorX + (isMobile ? 32 : 48)} cy={textY - 4} r={isMobile ? 3 : 5} fill="#22c55e" />;
  } else if (status === 'worst') {
    indicator = <circle cx={textAnchorX + (isMobile ? 32 : 48)} cy={textY - 4} r={isMobile ? 3 : 5} fill="#facc15" />;
  }

  return (
    <g>
      <text 
        x={textAnchorX} 
        y={textY} 
        fill="#333" 
        textAnchor="start" 
        fontSize={isMobile ? 10 : 13} 
        fontWeight="bold"
      >
        {`${value.toFixed(1)}%`}
      </text>
      {indicator}
    </g>
  );
};

// Componente simplificado para mobile
const MobileEixosView = ({ chartData }: { chartData: any[] }) => {
  const getStatusText = (value: number) => {
    if (value > 66) return { text: 'Avançado', color: 'text-green-600', bg: 'bg-green-50' };
    if (value > 33) return { text: 'Em Evolução', color: 'text-blue-600', bg: 'bg-blue-50' };
    return { text: 'Emergente', color: 'text-orange-600', bg: 'bg-orange-50' };
  };

  return (
    <div className="space-y-3">
      {chartData.map((item, index) => {
        const status = getStatusText(item.value);
        return (
          <div key={index} className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-700">{item.name}</span>
                {item.status === 'best' && (
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full font-medium">
                    Melhor
                  </span>
                )}
                {item.status === 'worst' && (
                  <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full font-medium">
                    Prioridade
                  </span>
                )}
              </div>
              <div className="text-right">
                <span className="text-xl font-bold text-gray-900">{item.value.toFixed(1)}%</span>
                <div className={`text-xs font-medium ${status.color}`}>{status.text}</div>
              </div>
            </div>
            
            <div className="text-sm text-gray-600 mb-3 font-medium">{item.label}</div>
            
            <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
              <div 
                className="h-4 rounded-full transition-all duration-500 ease-out"
                style={{ 
                  width: `${item.value}%`, 
                  backgroundColor: getBarColor(item.value / 100) 
                }}
              ></div>
            </div>
            
            <div className="flex justify-between text-xs text-gray-500">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
            
            <div className={`mt-3 p-2 rounded-md ${status.bg} border border-gray-100`}>
              <div className="text-xs text-gray-700">
                <strong>Status:</strong> {status.text} - {item.value < 33 ? 'Necessita atenção prioritária' : item.value < 66 ? 'Em desenvolvimento' : 'Bem desenvolvido'}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export function EixosBarChart({ eixosValues, microrregiao }: EixosBarChartProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");
  const [isClient, setIsClient] = useState(false);

  // Garantir que o componente só renderize no cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  const chartData = useMemo(() => {
    const data = EIXOS_NAMES.map((nome, index) => ({
      name: `Eixo ${index + 1}`,
      value: eixosValues[index] * 100,
      label: nome,
    })).sort((a, b) => b.value - a.value);

    // Adiciona status de 'best' e 'worst'
    return data.map((item, index) => {
      let status;
      // O melhor é o primeiro (após ordenar)
      if (index === 0) {
        status = 'best';
      }
      // Os 3 piores são os últimos
      if (index >= data.length - 3 && status !== 'best') {
        status = 'worst';
      }
      return { ...item, status, displayLabel: `${item.name}: ${item.label}` };
    });
  }, [eixosValues]);

  // Se não estiver no cliente, mostrar um placeholder
  if (!isClient) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <BarChart3 className="h-6 w-6 text-primary" />
            <CardTitle className="text-xl font-bold">Análise por Eixos</CardTitle>
          </div>
          <p className="text-sm text-muted-foreground">
            Comparativo da microrregião e medianas
          </p>
        </CardHeader>
        <CardContent>
          <div className={`w-full ${isMobile ? 'h-[300px]' : isTablet ? 'h-[350px]' : 'h-[400px]'} flex items-center justify-center bg-gray-50 rounded-lg`}>
            <p className="text-gray-500">Carregando gráfico...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <BarChart3 className="h-6 w-6 text-primary" />
          <CardTitle className="text-xl font-bold">Análise por Eixos</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Comparativo da microrregião e medianas
        </p>
      </CardHeader>
      <CardContent>
        {isMobile ? (
          // Versão simplificada para mobile
          <MobileEixosView chartData={chartData} />
        ) : (
          // Versão completa para desktop/tablet
          <div className={`w-full ${isTablet ? 'h-[350px]' : 'h-[400px]'}`}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ 
                  top: 5, 
                  right: isTablet ? 100 : 120, 
                  left: isTablet ? 120 : 120, 
                  bottom: 20 
                }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis 
                  type="number" 
                  domain={[0, 100]} 
                  tickFormatter={(tick) => `${tick}%`}
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  type="category" 
                  dataKey="displayLabel" 
                  width={isTablet ? 180 : 220}
                  tick={{ 
                    fontSize: isTablet ? 10 : 11, 
                    fill: 'hsl(var(--muted-foreground))' 
                  }}
                  axisLine={false}
                  tickLine={false}
                  interval={0}
                />
                <Tooltip
                  cursor={{ fill: 'rgba(240, 240, 240, 0.5)' }}
                  formatter={(value: number) => [`${value.toFixed(1)}%`, "Pontuação"]}
                  labelFormatter={(label) => <span className="font-bold">{label}</span>}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  <LabelList 
                    dataKey="value" 
                    position="right"
                    formatter={(value: number) => `${value.toFixed(1)}%`}
                    style={{ 
                      fontSize: 12, 
                      fontWeight: 'bold', 
                      fill: '#333' 
                    }}
                  />
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getBarColor(entry.value / 100)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
        
        <div className="flex flex-col items-center justify-center mt-4 space-y-2">
          {/* Legenda - Responsiva */}
          <div className={`flex ${isMobile ? 'flex-col' : 'flex-wrap'} justify-center items-center gap-x-4 gap-y-1 text-xs text-gray-600`}>
            <div className="flex items-center">
              <span className="h-3 w-3 rounded-full bg-orange-500 mr-2"></span>
              <span>Emergente (≤ 33%)</span>
            </div>
            <div className="flex items-center">
              <span className="h-3 w-3 rounded-full bg-blue-500 mr-2"></span>
              <span>Em Evolução (33-66%)</span>
            </div>
            <div className="flex items-center">
              <span className="h-3 w-3 rounded-full bg-green-500 mr-2"></span>
              <span>Avançado (&gt; 66%)</span>
            </div>
          </div>
          {/* Fonte */}
          <p className="text-center text-xs text-muted-foreground italic pt-2">
            Fonte: Ministério da Saúde/SEIDIGI
          </p>
        </div>
      </CardContent>
    </Card>
  );
} 
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';

interface EixoData {
  nome: string;
  valor: number;
  categoria: string;
  cor: string;
}

interface EixoBarChartProps {
  eixos: EixoData[];
  microrregiao: string;
  titulo?: string;
}

const getBarColor = (value: number) => {
  if (value > 88) return '#22c55e'; // Verde para Avançado
  if (value > 33) return '#3b82f6'; // Azul para Em Evolução
  return '#f97316'; // Laranja para Emergente
};

// Componente para renderizar o label customizado na barra
const CustomBarLabel = (props: any) => {
  const { x, y, width, value } = props;
  
  // Verificação de segurança
  if (value === undefined) {
    return null;
  }

  // Posição do texto
  const textAnchorX = x + width + 15;
  const textY = y + 12;

  return (
    <g>
      <text x={textAnchorX} y={textY} fill="#333" textAnchor="start" fontSize={13} fontWeight="bold">
        {`${value.toFixed(1)}%`}
      </text>
    </g>
  );
};

export function EixoBarChart({ eixos, microrregiao, titulo = "Análise por Eixos" }: EixoBarChartProps) {
  const chartData = eixos.map((eixo, index) => ({
    name: eixo.nome,
    value: eixo.valor,
    label: eixo.nome,
    categoria: eixo.categoria,
    displayLabel: eixo.nome,
  })).sort((a, b) => b.value - a.value);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <BarChart3 className="h-6 w-6 text-primary" />
          <CardTitle className="text-xl font-bold">{titulo}</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Visualização do desempenho de cada eixo para a microrregião de {microrregiao}.
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] sm:h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 5, right: 120, left: 120, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} tickFormatter={(tick) => `${tick}%`} />
              <YAxis 
                type="category" 
                dataKey="displayLabel" 
                width={220}
                tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
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
                  style={{ fontSize: 12, fontWeight: 'bold', fill: '#333' }}
                />
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.value)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col items-center justify-center mt-4 space-y-2">
          {/* Legenda */}
          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 text-xs text-gray-600">
            <div className="flex items-center">
              <span className="h-3 w-3 rounded-full bg-orange-500 mr-2"></span>
              <span>Emergente (0-33%)</span>
            </div>
            <div className="flex items-center">
              <span className="h-3 w-3 rounded-full bg-blue-500 mr-2"></span>
              <span>Em Evolução (33-88%)</span>
            </div>
            <div className="flex items-center">
              <span className="h-3 w-3 rounded-full bg-green-500 mr-2"></span>
              <span>Avançado (88%+)</span>
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
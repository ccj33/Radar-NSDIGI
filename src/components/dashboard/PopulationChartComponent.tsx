import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, LabelList } from 'recharts';
import { MicroRegionData } from "@/types/dashboard";
import { MapPin, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { formatPopulation } from "@/lib/utils";

interface PopulationChartComponentProps {
  data: MicroRegionData[];
  selectedMicroregiao?: string;
  onLoad?: () => void;
}

export function PopulationChartComponent({ data, selectedMicroregiao, onLoad }: PopulationChartComponentProps) {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  // Ícones para cada categoria
  const CATEGORY_ICONS: Record<string, JSX.Element> = {
    'Pequena (< 50 mil)': <span className="inline-block text-gray-400">👶</span>,
    'Média (50 mil a 200 mil)': <span className="inline-block text-sky-400">🧒</span>,
    'Grande (200 mil a 1 milhão)': <span className="inline-block text-purple-400">🧑‍🎓</span>,
    'Muito Grande (> 1 milhão)': <span className="inline-block text-blue-600">🧑‍🎓</span>,
  };

  useEffect(() => {
    // Simular carregamento do gráfico
    const timer = setTimeout(() => {
      onLoad?.();
    }, 400);

    return () => clearTimeout(timer);
  }, [onLoad]);

  // Categorizar por faixas de população (IBGE Censo 2022)
  const categorizePopulation = (pop: number) => {
    if (pop < 50000) return 'Pequena (< 50 mil)';
    if (pop < 200000) return 'Média (50 mil a 200 mil)';
    if (pop < 1000000) return 'Grande (200 mil a 1 milhão)';
    return 'Muito Grande (> 1 milhão)';
  };

  const chartData = data.reduce((acc, item) => {
            const population = parseFloat(String(item.populacao).replace(/\./g, '').replace(',', '.'));
    const category = categorizePopulation(population);
    
    const existing = acc.find(item => item.category === category);
    if (existing) {
      existing.count += 1;
      existing.totalPop += population;
      existing.microrregioes.push(item.microrregiao);
    } else {
      acc.push({
        category,
        count: 1,
        totalPop: population,
        microrregioes: [item.microrregiao]
      });
    }
    return acc;
  }, [] as Array<{ category: string; count: number; totalPop: number; microrregioes: string[] }>);

  // Encontrar a microrregião selecionada
  const selectedData = selectedMicroregiao ? data.find(item => item.microrregiao === selectedMicroregiao) : null;
        const selectedCategory = selectedData ? categorizePopulation(parseFloat(String(selectedData.populacao).replace(/\./g, '').replace(',', '.'))) : null;

  // Apenas duas cores: amarelo para selecionada, azul para as demais
  const HIGHLIGHT_COLOR = '#facc15'; // amarelo
  const DEFAULT_COLOR = '#3b82f6'; // azul

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const isSelected = data.isSelected;
      return (
        <div className="bg-white border-2 border-blue-400 rounded-xl p-4 shadow-2xl min-w-[220px]">
          <div className="flex items-center gap-2 mb-1">
            {isSelected && <MapPin className="w-5 h-5 text-blue-500" />}
            <span className="font-bold text-blue-900 text-base">{data.category}</span>
          </div>
          <div className="text-lg font-extrabold text-blue-700 mb-1">{data.count} microrregiões</div>
          <div className="text-sm text-gray-500 mb-1">{data.percent}% do total</div>
          <div className="text-xs text-gray-400">
            Pop. Total: {typeof data.totalPop === 'number' ? formatPopulation(data.totalPop) : '-'}
          </div>
          {isSelected && selectedMicroregiao && (
            <div className="mt-2 flex items-center gap-1 text-blue-600 text-xs font-semibold">
              <MapPin className="w-4 h-4" /> Sua microrregião
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  // Ordem fixa das categorias (IBGE Censo 2022)
  const POPULATION_ORDER = [
    'Pequena (< 50 mil)',
    'Média (50 mil a 200 mil)',
    'Grande (200 mil a 1 milhão)',
    'Muito Grande (> 1 milhão)'
  ];

  // Preparar dados para o gráfico de pirâmide, já ordenados
  const pyramidData = POPULATION_ORDER
    .map(category => {
      const item = chartData.find(i => i.category === category);
      return item
        ? {
            category: item.category,
            count: item.count,
            percent: Math.round((item.count / data.length) * 100),
            isSelected: selectedCategory === item.category
          }
        : null;
    })
    .filter(Boolean) as (typeof chartData[0] & { percent: number; isSelected: boolean })[];

  return (
    <div
      data-section="populacao"
      className="bg-slate-50 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-slate-200/80 p-6 flex flex-col h-full"
    >
      {/* 1. HEADER SECTION */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-800 tracking-normal">Distribuição Populacional</h3>
          <p className="text-sm text-slate-500">Microrregiões por faixa de população</p>
        </div>
                {selectedMicroregiao && selectedData && (
          <div className="text-right flex-shrink-0 ml-4">
            <div className="text-xs text-slate-500">Macrorregião</div>
            <div className="text-sm text-slate-600 font-medium mb-1">
              {selectedData.macrorregiao || 'Todas'}
            </div>
            <div className="text-xs text-slate-500">Sua Microrregião</div>
            <div className="flex items-center gap-2 text-sky-600 font-bold">
              <MapPin className="h-4 w-4 text-sky-500" />
              <span>{selectedMicroregiao}</span>
            </div>
          </div>
        )}
      </div>

      {/* 2. CHART SECTION - with legend on the right */}
      <div className="flex-grow flex flex-col md:flex-row items-center gap-6 mt-4">
        
        {/* The chart itself */}
        <div className="w-full md:w-2/3 h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={pyramidData}
              layout="vertical"
              margin={{ top: 5, right: 60, left: 10, bottom: 5 }}
              barCategoryGap="35%"
            >
              <XAxis type="number" hide domain={[0, 'dataMax + 5']} />
              <YAxis
                type="category"
                dataKey="category"
                width={140}
                tickLine={false}
                axisLine={false}
                tick={({ x, y, payload }) => (
                  <g transform={`translate(${x - 10},${y})`}>
                    <text x={0} y={0} dy={4} textAnchor="end" fill="#475569" className="text-xs font-semibold">
                      {payload.value.split('(')[0]}
                    </text>
                     <text x={0} y={0} dy={16} textAnchor="end" fill="#64748b" className="text-xs">
                      {payload.value.match(/\(.*\)/)?.[0]}
                    </text>
                  </g>
                )}
              />
              <Tooltip cursor={{ fill: 'rgba(2, 132, 199, 0.05)' }} content={<CustomTooltip />} />
              <Bar dataKey="count" minPointSize={5} radius={[0, 8, 8, 0]}>
            <LabelList 
              dataKey="count" 
              position="right" 
                  offset={8}
                  content={({ x, y, value }) => (
                     <text x={Number(x) + 8} y={Number(y) + 16} fill="#1e293b" fontSize={13} fontWeight="bold">
                      {`${value} microrreg.`}
                      </text>
                  )}
            />
            {pyramidData.map((entry, idx) => (
              <Cell
                key={`cell-${idx}`}
                fill={entry.isSelected ? HIGHLIGHT_COLOR : DEFAULT_COLOR}
                style={{
                  transition: 'opacity 0.2s',
                  opacity: hoveredBar === null ? (entry.isSelected ? 1 : 0.8) : hoveredBar === idx ? 1 : 0.4,
                  stroke: entry.isSelected ? HIGHLIGHT_COLOR : 'none',
                  strokeWidth: 3,
                }}
                onMouseEnter={() => setHoveredBar(idx)}
                onMouseLeave={() => setHoveredBar(null)}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
        </div>

        {/* The legend on the right */}
        <div className="w-full md:w-1/3 flex flex-col justify-center gap-2 pl-4 md:border-l border-t md:border-t-0 border-slate-200 pt-4 md:pt-0">
          <ul className="space-y-1.5">
            {pyramidData.map((entry) => (
              <li
                key={entry.category}
                className={`flex items-center gap-3 p-2 rounded-lg transition-all border-l-4 ${
                  entry.isSelected
                    ? 'bg-yellow-300/70 border-yellow-500'
                    : 'border-transparent hover:bg-slate-200/60'
                }`}
              >
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: entry.isSelected ? HIGHLIGHT_COLOR : DEFAULT_COLOR }}
                />
                <div className="flex-1">
                  <span
                    className={`text-sm font-medium ${
                      entry.isSelected ? 'text-yellow-900 font-bold' : 'text-blue-800'
                    }`}
                  >
                    {entry.category.split('(')[0].trim()}
                  </span>
                </div>
                <div className="text-right">
                  <div
                    className={`font-bold ${entry.isSelected ? 'text-yellow-900' : 'text-blue-800'}`}
                  >
                    {entry.count}
                  </div>
                  <div className="text-xs text-slate-500">{entry.percent}%</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Legenda Estática */}
      <div className="w-full flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs sm:text-sm mt-4 p-2 bg-muted rounded-md">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-yellow-400 border border-yellow-500"></div>
          <span>Microrregião Selecionada</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-blue-500 border border-blue-600"></div>
          <span>Outras Microrregiões</span>
        </div>
      </div>

      {/* 3. FOOTER */}
      <div className="pt-4 mt-auto text-right w-full">
        <span className="text-xs text-slate-400">
          Fonte: IBGE, Censo Demográfico 2022.
        </span>
      </div>
    </div>
  );
}

export default PopulationChartComponent;
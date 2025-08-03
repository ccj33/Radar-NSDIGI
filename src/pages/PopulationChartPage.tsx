import { useState } from 'react';
import { PopulationChartComponent } from '@/components/dashboard/PopulationChartComponent';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useExcelData } from '@/hooks/useExcelData';
import MicrosoftSidebar from '@/components/dashboard/MicrosoftSidebar';
import { FilterOptions } from '@/types/dashboard';
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';

// Tipo simplificado para dados mock
interface MockData {
  microrregiao: string;
  macrorregiao: string;
  populacao: string;
  indice_geral: string;
  classificacao_inmsd: string;
  eixo_1: string;
  eixo_2: string;
  eixo_3: string;
  eixo_4: string;
  eixo_5: string;
  eixo_6: string;
  eixo_7: string;
}

export default function PopulationChartPage() {
  const { data, loading, error } = useExcelData();
  const [selectedMicroregiao, setSelectedMicroregiao] = useState<string>('');
  const [filters, setFilters] = useState<FilterOptions>({});
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Mock data para demonstração - em produção viria dos dados reais
  const mockData: MockData[] = [
    {
      microrregiao: "Belo Horizonte",
      macrorregiao: "Central",
      populacao: "2.521.564",
      indice_geral: "0.75",
      classificacao_inmsd: "Avançado",
      eixo_1: "0.80",
      eixo_2: "0.70",
      eixo_3: "0.85",
      eixo_4: "0.75",
      eixo_5: "0.80",
      eixo_6: "0.70",
      eixo_7: "0.75"
    },
    {
      microrregiao: "Contagem",
      macrorregiao: "Central",
      populacao: "668.949",
      indice_geral: "0.65",
      classificacao_inmsd: "Em Evolução",
      eixo_1: "0.70",
      eixo_2: "0.60",
      eixo_3: "0.75",
      eixo_4: "0.65",
      eixo_5: "0.70",
      eixo_6: "0.60",
      eixo_7: "0.65"
    },
    {
      microrregiao: "Betim",
      macrorregiao: "Central",
      populacao: "444.784",
      indice_geral: "0.55",
      classificacao_inmsd: "Em Evolução",
      eixo_1: "0.60",
      eixo_2: "0.50",
      eixo_3: "0.65",
      eixo_4: "0.55",
      eixo_5: "0.60",
      eixo_6: "0.50",
      eixo_7: "0.55"
    },
    {
      microrregiao: "Ribeirão das Neves",
      macrorregiao: "Central",
      populacao: "338.197",
      indice_geral: "0.45",
      classificacao_inmsd: "Emergente",
      eixo_1: "0.50",
      eixo_2: "0.40",
      eixo_3: "0.55",
      eixo_4: "0.45",
      eixo_5: "0.50",
      eixo_6: "0.40",
      eixo_7: "0.45"
    },
    {
      microrregiao: "Uberlândia",
      macrorregiao: "Triângulo",
      populacao: "713.232",
      indice_geral: "0.70",
      classificacao_inmsd: "Em Evolução",
      eixo_1: "0.75",
      eixo_2: "0.65",
      eixo_3: "0.80",
      eixo_4: "0.70",
      eixo_5: "0.75",
      eixo_6: "0.65",
      eixo_7: "0.70"
    }
  ];

  // Usar dados reais se disponíveis, senão usar mock
  const allData = data && data.length > 0 ? data : (mockData as any);
  const chartData = allData;

  const handleMicroregiaoChange = (microrregiao: string) => {
    setSelectedMicroregiao(microrregiao);
  };

  const handleFiltersChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  if (loading) {
    return (
      <DashboardLayout activeSection="population">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="text-blue-600 text-6xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-blue-900 mb-2">Carregando dados...</h3>
            <p className="text-blue-700">Aguarde enquanto carregamos as informações de população.</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout activeSection="population">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="text-red-600 text-6xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold text-red-900 mb-2">Erro ao carregar dados</h3>
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout activeSection="population">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Distribuição Populacional</h1>
          <p className="text-gray-600">Análise da população por faixas demográficas das microrregiões</p>
        </div>

        {/* Botão de Filtros para Mobile */}
        <div className="lg:hidden mb-6">
          <Drawer open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
            <DrawerTrigger asChild>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                <Filter className="h-4 w-4 mr-2" />
                Filtrar Microrregiões
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Filtros de Análise</DrawerTitle>
                <DrawerDescription>
                  Selecione os filtros para refinar os dados exibidos.
                </DrawerDescription>
              </DrawerHeader>
              <div className="p-4 overflow-y-auto">
                <MicrosoftSidebar
                  data={allData}
                  selectedMicroregiao={selectedMicroregiao}
                  filters={filters}
                  onMicroregiaoChange={handleMicroregiaoChange}
                  onFiltersChange={handleFiltersChange}
                />
              </div>
              <DrawerFooter>
                <Button onClick={() => setIsFiltersOpen(false)}>Ver Resultados</Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>

        {/* Layout Desktop com Sidebar */}
        <div className="flex gap-8">
          {/* Sidebar de Filtros - Visível apenas em telas grandes */}
          <aside className="hidden lg:block w-1/4 xl:w-1/5 sticky top-20 self-start">
            <MicrosoftSidebar
              data={allData}
              selectedMicroregiao={selectedMicroregiao}
              filters={filters}
              onMicroregiaoChange={handleMicroregiaoChange}
              onFiltersChange={handleFiltersChange}
            />
          </aside>

          {/* Conteúdo Principal */}
          <div className="flex-1 min-w-0">
            {/* Componente original de população */}
            <PopulationChartComponent 
              data={chartData}
              selectedMicroregiao={selectedMicroregiao}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 
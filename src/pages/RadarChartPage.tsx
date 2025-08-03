import { useState } from 'react';
import { DashboardRadarChart } from '@/components/dashboard/RadarChart';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useExcelData } from '@/hooks/useExcelData';
import MicrosoftSidebar from '@/components/dashboard/MicrosoftSidebar';
import { FilterOptions } from '@/types/dashboard';
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Filter, Target } from 'lucide-react';

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

export default function RadarChartPage() {
  const { data, loading, error } = useExcelData();
  const [selectedMicroregiao, setSelectedMicroregiao] = useState<string>('Belo Horizonte');
  const [filters, setFilters] = useState<FilterOptions>({});
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Mock data para demonstração - em produção viria dos dados reais
  const mockData: MockData = {
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
  };

  // Usar dados reais se disponíveis, senão usar mock
  const allData = data && data.length > 0 ? data : [mockData as any];
  const selectedData = selectedMicroregiao ? allData.find(item => item.microrregiao === selectedMicroregiao) : null;

  // Calcular medianas
  const medians = {
    eixo_1: 0.70,
    eixo_2: 0.65,
    eixo_3: 0.75,
    eixo_4: 0.60,
    eixo_5: 0.70,
    eixo_6: 0.65,
    eixo_7: 0.70
  };

  const handleMicroregiaoChange = (microrregiao: string) => {
    setSelectedMicroregiao(microrregiao);
  };

  const handleFiltersChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  if (loading) {
    return (
      <DashboardLayout activeSection="radar">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="text-blue-600 text-6xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-blue-900 mb-2">Carregando dados...</h3>
            <p className="text-blue-700">Aguarde enquanto carregamos as informações de maturidade digital.</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout activeSection="radar">
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
    <DashboardLayout activeSection="radar">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Análise por Eixos</h1>
          <p className="text-gray-600">Visualização detalhada da maturidade digital em cada eixo estratégico</p>
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
                  selectedData={selectedData}
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
              selectedData={selectedData}
            />
          </aside>

          {/* Conteúdo Principal */}
          <div className="flex-1 min-w-0">
            {selectedData ? (
              /* Componente original de radar */
              <DashboardRadarChart 
                data={selectedData}
                allData={allData}
                medians={medians}
              />
            ) : (
              /* Estado vazio quando nenhuma microrregião está selecionada */
              <div className="bg-card rounded-lg border p-8 shadow-sm">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
                    <Target className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Selecione uma Microrregião</h3>
                  <p className="text-gray-600 mb-6">
                    Use os filtros acima para escolher uma microrregião e visualizar todos os dados do dashboard.
                  </p>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-md mx-auto">
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs font-bold">i</span>
                      </div>
                      <div>
                        <div className="font-medium text-yellow-800 mb-1">Dica</div>
                        <div className="text-sm text-yellow-700">
                          Você pode filtrar por macrorregião ou classificação para encontrar a região desejada mais rapidamente.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 
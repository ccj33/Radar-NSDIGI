import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Filter, 
  Download, 
  Search,
  MapPin,
  Users,
  Building,
  Activity,
  Target,
  AlertTriangle,
  CheckCircle,
  Clock,
  Info,
  ArrowRight,
  X
} from "lucide-react";

export default function AnaliseAvancadaPage() {
  const [selectedMacroregiao, setSelectedMacroregiao] = useState<string>("");
  const [selectedMicrorregiao, setSelectedMicrorregiao] = useState<string>("");
  const [selectedEixo, setSelectedEixo] = useState<string>("");
  const [selectedTipoAnalise, setSelectedTipoAnalise] = useState<string>("radar");

  const macroregioes = [
    "Todas as Macrorregiões",
    "Central",
    "Norte",
    "Sul",
    "Leste",
    "Oeste"
  ];

  const microrregioes = [
    "Todas as Microrregiões",
    "Belo Horizonte",
    "Contagem",
    "Betim",
    "Ribeirão das Neves",
    "Santa Luzia"
  ];

  const eixos = [
    "Todos os Eixos",
    "Governança e Liderança",
    "Infraestrutura e Tecnologia",
    "Processos e Serviços",
    "Pessoas e Capacitação"
  ];

  const tiposAnalise = [
    { value: "radar", label: "Gráfico Radar" },
    { value: "barras", label: "Gráfico de Barras" },
    { value: "linha", label: "Gráfico de Linha" },
    { value: "pizza", label: "Gráfico de Pizza" }
  ];

  const insights = [
    {
      id: 1,
      titulo: "Correlação Forte entre Infraestrutura e Performance",
      descricao: "Regiões com melhor infraestrutura de TIC apresentam 40% melhor performance em processos digitais.",
      tipo: "Correlação",
      impacto: "Alto",
      confianca: 95,
      categoria: "Infraestrutura"
    },
    {
      id: 2,
      titulo: "Gap de Capacitação Identificado",
      descricao: "60% das microrregiões apresentam deficiência em capacitação digital da equipe técnica.",
      tipo: "Gap",
      impacto: "Médio",
      confianca: 88,
      categoria: "Pessoas"
    },
    {
      id: 3,
      titulo: "Tendência de Melhoria em Governança",
      descricao: "Observa-se tendência positiva de 15% ao ano na implementação de políticas de TIC.",
      tipo: "Tendência",
      impacto: "Alto",
      confianca: 92,
      categoria: "Governança"
    }
  ];

  const dadosAvancados = [
    {
      regiao: "Belo Horizonte",
      governanca: 85,
      infraestrutura: 70,
      processos: 90,
      pessoas: 75,
      total: 80
    },
    {
      regiao: "Contagem",
      governanca: 75,
      infraestrutura: 65,
      processos: 80,
      pessoas: 70,
      total: 72.5
    },
    {
      regiao: "Betim",
      governanca: 80,
      infraestrutura: 75,
      processos: 85,
      pessoas: 80,
      total: 80
    }
  ];

  const getInsightIcon = (tipo: string) => {
    switch (tipo) {
      case "Correlação": return <TrendingUp className="w-5 h-5 text-blue-500" />;
      case "Gap": return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case "Tendência": return <BarChart3 className="w-5 h-5 text-green-500" />;
      default: return <Target className="w-5 h-5 text-gray-500" />;
    }
  };

  const getImpactoColor = (impacto: string) => {
    switch (impacto) {
      case "Alto": return "bg-red-500";
      case "Médio": return "bg-yellow-500";
      case "Baixo": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const limparComparacao = () => {
    setSelectedMacroregiao("");
    setSelectedMicrorregiao("");
    setSelectedEixo("");
  };

  return (
    <DashboardLayout activeSection="avancada">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Análise Avançada</h1>
                <p className="text-gray-600">Comparação detalhada entre microrregiões</p>
              </div>
            </div>
            <Badge className="bg-blue-100 text-blue-800 px-3 py-1">Araxá</Badge>
          </div>
        </div>

        {/* Banner Informativo */}
        <Card className="mb-6 bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">Como Usar a Análise Avançada</h3>
                <p className="text-blue-800 text-sm">
                  Selecione uma região para comparação e escolha o tipo de análise desejado. 
                  Compare indicadores, identifique gaps e descubra oportunidades de melhoria.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Configuração da Comparação */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Configurar Comparação
            </CardTitle>
            <CardDescription>
              Defina os parâmetros para análise comparativa
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="regiao">Região para Comparação</Label>
                <Select value={selectedMicrorregiao} onValueChange={setSelectedMicrorregiao}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma região" />
                  </SelectTrigger>
                  <SelectContent>
                    {microrregioes.map((regiao) => (
                      <SelectItem key={regiao} value={regiao}>
                        {regiao}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo de Análise</Label>
                <Select value={selectedTipoAnalise} onValueChange={setSelectedTipoAnalise}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {tiposAnalise.map((tipo) => (
                      <SelectItem key={tipo.value} value={tipo.value}>
                        {tipo.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>&nbsp;</Label>
                <Button 
                  variant="outline" 
                  onClick={limparComparacao}
                  className="w-full"
                >
                  <X className="w-4 h-4 mr-2" />
                  Limpar Comparação
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Área de Resultados */}
        {!selectedMicrorregiao ? (
          /* Estado Inicial - Instruções */
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Selecione uma Região para Comparação
              </h3>
              <p className="text-gray-600">
                Escolha uma microrregião da lista acima para iniciar a análise comparativa detalhada.
              </p>
            </CardContent>
          </Card>
        ) : (
          /* Resultados da Análise */
          <div className="space-y-6">
            <Tabs defaultValue="insights" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="insights" className="flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Insights
                </TabsTrigger>
                <TabsTrigger value="dados" className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Dados Detalhados
                </TabsTrigger>
                <TabsTrigger value="tendencias" className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Tendências
                </TabsTrigger>
              </TabsList>

              <TabsContent value="insights" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {insights.map((insight) => (
                    <Card key={insight.id} className="overflow-hidden">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            {getInsightIcon(insight.tipo)}
                            <Badge variant="outline">{insight.tipo}</Badge>
                          </div>
                          <Badge className={`${getImpactoColor(insight.impacto)} text-white`}>
                            {insight.impacto}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg">{insight.titulo}</CardTitle>
                        <CardDescription>{insight.descricao}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Confiança:</span>
                            <span className="font-semibold">{insight.confianca}%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Categoria:</span>
                            <Badge variant="secondary">{insight.categoria}</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="dados" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Análise Comparativa por Região</CardTitle>
                    <CardDescription>
                      Comparação detalhada de indicadores por microrregião
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-3">Região</th>
                            <th className="text-center p-3">Governança</th>
                            <th className="text-center p-3">Infraestrutura</th>
                            <th className="text-center p-3">Processos</th>
                            <th className="text-center p-3">Pessoas</th>
                            <th className="text-center p-3">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dadosAvancados.map((dado, index) => (
                            <tr key={index} className="border-b hover:bg-gray-50">
                              <td className="p-3 font-medium">{dado.regiao}</td>
                              <td className="p-3 text-center">
                                <div className="flex items-center justify-center gap-2">
                                  <span className="font-semibold">{dado.governanca}%</span>
                                  <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div 
                                      className="h-full bg-blue-500 rounded-full" 
                                      style={{ width: `${dado.governanca}%` }}
                                    />
                                  </div>
                                </div>
                              </td>
                              <td className="p-3 text-center">
                                <div className="flex items-center justify-center gap-2">
                                  <span className="font-semibold">{dado.infraestrutura}%</span>
                                  <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div 
                                      className="h-full bg-green-500 rounded-full" 
                                      style={{ width: `${dado.infraestrutura}%` }}
                                    />
                                  </div>
                                </div>
                              </td>
                              <td className="p-3 text-center">
                                <div className="flex items-center justify-center gap-2">
                                  <span className="font-semibold">{dado.processos}%</span>
                                  <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div 
                                      className="h-full bg-purple-500 rounded-full" 
                                      style={{ width: `${dado.processos}%` }}
                                    />
                                  </div>
                                </div>
                              </td>
                              <td className="p-3 text-center">
                                <div className="flex items-center justify-center gap-2">
                                  <span className="font-semibold">{dado.pessoas}%</span>
                                  <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div 
                                      className="h-full bg-orange-500 rounded-full" 
                                      style={{ width: `${dado.pessoas}%` }}
                                    />
                                  </div>
                                </div>
                              </td>
                              <td className="p-3 text-center">
                                <Badge className="text-lg px-3 py-1">
                                  {dado.total.toFixed(1)}%
                                </Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="tendencias" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" />
                        Evolução Temporal
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                        <p className="text-gray-500">Gráfico de evolução temporal</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <PieChart className="w-5 h-5" />
                        Distribuição por Categoria
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                        <p className="text-gray-500">Gráfico de distribuição</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
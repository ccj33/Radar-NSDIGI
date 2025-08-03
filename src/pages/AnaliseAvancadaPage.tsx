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
  Clock
} from "lucide-react";

export default function AnaliseAvancadaPage() {
  const [selectedMacroregiao, setSelectedMacroregiao] = useState<string>("");
  const [selectedMicrorregiao, setSelectedMicrorregiao] = useState<string>("");
  const [selectedEixo, setSelectedEixo] = useState<string>("");

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

  return (
    <DashboardLayout activeSection="advanced">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Análise Avançada</h1>
          <p className="text-gray-600">Exploração detalhada de dados e insights estratégicos</p>
        </div>

        {/* Filtros Avançados */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filtros Avançados
            </CardTitle>
            <CardDescription>
              Configure os parâmetros para análise personalizada
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="space-y-2">
                <Label htmlFor="macroregiao">Macrorregião</Label>
                <Select value={selectedMacroregiao} onValueChange={setSelectedMacroregiao}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    {macroregioes.map((regiao) => (
                      <SelectItem key={regiao} value={regiao}>
                        {regiao}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="microrregiao">Microrregião</Label>
                <Select value={selectedMicrorregiao} onValueChange={setSelectedMicrorregiao}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione..." />
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
                <Label htmlFor="eixo">Eixo de Análise</Label>
                <Select value={selectedEixo} onValueChange={setSelectedEixo}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    {eixos.map((eixo) => (
                      <SelectItem key={eixo} value={eixo}>
                        {eixo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="busca">Buscar</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="busca"
                    placeholder="Digite para buscar..."
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button className="flex items-center gap-2">
                <Search className="w-4 h-4" />
                Aplicar Filtros
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Exportar Dados
              </Button>
            </div>
          </CardContent>
        </Card>

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
    </DashboardLayout>
  );
}
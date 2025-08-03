import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { BarChart, PieChart, TrendingUp, Users, Building, Activity } from "lucide-react";

export default function DetalhamentoPage() {
  const eixos = [
    {
      id: 1,
      nome: "Governança e Liderança",
      descricao: "Estrutura organizacional e tomada de decisão",
      pontuacao: 75,
      status: "Bom",
      cor: "bg-green-500",
      indicadores: [
        { nome: "Política de TIC", valor: 80, meta: 100 },
        { nome: "Comitê de TIC", valor: 70, meta: 100 },
        { nome: "Orçamento TIC", valor: 75, meta: 100 }
      ]
    },
    {
      id: 2,
      nome: "Infraestrutura e Tecnologia",
      descricao: "Recursos tecnológicos e conectividade",
      pontuacao: 65,
      status: "Regular",
      cor: "bg-yellow-500",
      indicadores: [
        { nome: "Conectividade", valor: 60, meta: 100 },
        { nome: "Equipamentos", valor: 70, meta: 100 },
        { nome: "Segurança", valor: 65, meta: 100 }
      ]
    },
    {
      id: 3,
      nome: "Processos e Serviços",
      descricao: "Automação e eficiência operacional",
      pontuacao: 85,
      status: "Excelente",
      cor: "bg-blue-500",
      indicadores: [
        { nome: "Processos Digitais", valor: 90, meta: 100 },
        { nome: "Serviços Online", valor: 85, meta: 100 },
        { nome: "Integração", valor: 80, meta: 100 }
      ]
    },
    {
      id: 4,
      nome: "Pessoas e Capacitação",
      descricao: "Desenvolvimento de competências digitais",
      pontuacao: 70,
      status: "Bom",
      cor: "bg-purple-500",
      indicadores: [
        { nome: "Capacitação", valor: 75, meta: 100 },
        { nome: "Suporte Técnico", valor: 70, meta: 100 },
        { nome: "Cultura Digital", valor: 65, meta: 100 }
      ]
    }
  ];

  return (
    <DashboardLayout activeSection="detail">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Detalhamento por Eixos</h1>
          <p className="text-gray-600">Indicadores detalhados de maturidade digital por eixo estratégico</p>
        </div>

        <Tabs defaultValue="governanca" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="governanca" className="flex items-center gap-2">
              <Building className="w-4 h-4" />
              Governança
            </TabsTrigger>
            <TabsTrigger value="infraestrutura" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Infraestrutura
            </TabsTrigger>
            <TabsTrigger value="processos" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Processos
            </TabsTrigger>
            <TabsTrigger value="pessoas" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Pessoas
            </TabsTrigger>
          </TabsList>

          {eixos.map((eixo) => (
            <TabsContent key={eixo.id} value={eixo.id === 1 ? "governanca" : eixo.id === 2 ? "infraestrutura" : eixo.id === 3 ? "processos" : "pessoas"}>
              <div className="grid gap-6">
                {/* Header do Eixo */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl">{eixo.nome}</CardTitle>
                        <CardDescription className="text-lg">{eixo.descricao}</CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-gray-900">{eixo.pontuacao}%</div>
                        <Badge className={`${eixo.cor} text-white`}>{eixo.status}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Progress value={eixo.pontuacao} className="h-3" />
                  </CardContent>
                </Card>

                {/* Indicadores Detalhados */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {eixo.indicadores.map((indicador, index) => (
                    <Card key={index}>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">{indicador.nome}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-2xl font-bold">{indicador.valor}%</span>
                            <span className="text-sm text-gray-500">Meta: {indicador.meta}%</span>
                          </div>
                          <Progress value={indicador.valor} className="h-2" />
                          <div className="text-sm text-gray-600">
                            {indicador.valor >= 80 ? "Excelente" : 
                             indicador.valor >= 60 ? "Bom" : 
                             indicador.valor >= 40 ? "Regular" : "Necessita Melhoria"}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Gráficos e Análises */}
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart className="w-5 h-5" />
                        Evolução Histórica
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
                        Distribuição de Indicadores
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                        <p className="text-gray-500">Gráfico de distribuição</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
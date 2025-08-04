import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { 
  Lightbulb, 
  Target, 
  Clock, 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  ArrowRight,
  Calendar,
  DollarSign,
  Star,
  Info,
  BookOpen,
  Settings,
  BarChart3
} from "lucide-react";

export default function RecomendacoesPage() {
  const [activeTab, setActiveTab] = useState("todas");

  const recomendacoes = [
    {
      id: 1,
      titulo: "Implementar Política de Segurança da Informação",
      descricao: "Desenvolver e implementar uma política abrangente de segurança da informação para proteger dados e sistemas.",
      prioridade: "Alta",
      impacto: "Alto",
      prazo: "3 meses",
      custo: "R$ 50.000",
      status: "Pendente",
      categoria: "Governança",
      eixo: "Eixo 1 - Gestão e Governança",
      acoes: [
        "Contratar consultoria especializada",
        "Desenvolver documentação da política",
        "Treinar equipe técnica",
        "Implementar controles de segurança"
      ],
      beneficios: [
        "Proteção de dados sensíveis",
        "Conformidade com LGPD",
        "Redução de riscos de segurança"
      ]
    },
    {
      id: 2,
      titulo: "Modernizar Infraestrutura de Rede",
      descricao: "Atualizar equipamentos de rede e aumentar a capacidade de conectividade para melhorar a performance.",
      prioridade: "Média",
      impacto: "Alto",
      prazo: "6 meses",
      custo: "R$ 150.000",
      status: "Em Andamento",
      categoria: "Infraestrutura",
      eixo: "Eixo 2 - Infraestrutura e Conectividade",
      acoes: [
        "Auditoria da infraestrutura atual",
        "Definição de especificações técnicas",
        "Aquisição de equipamentos",
        "Implementação e testes"
      ],
      beneficios: [
        "Melhor performance de rede",
        "Maior confiabilidade",
        "Suporte a novas tecnologias"
      ]
    },
    {
      id: 3,
      titulo: "Capacitação em Tecnologias Digitais",
      descricao: "Programa de treinamento para equipe em ferramentas digitais e novas tecnologias.",
      prioridade: "Alta",
      impacto: "Médio",
      prazo: "4 meses",
      custo: "R$ 30.000",
      status: "Concluído",
      categoria: "Pessoas",
      eixo: "Eixo 4 - Pessoas e Capacitação",
      acoes: [
        "Mapeamento de necessidades",
        "Desenvolvimento de conteúdo",
        "Realização de treinamentos",
        "Avaliação de resultados"
      ],
      beneficios: [
        "Maior produtividade da equipe",
        "Melhor utilização de ferramentas",
        "Redução de erros operacionais"
      ]
    },
    {
      id: 4,
      titulo: "Automatizar Processos Administrativos",
      descricao: "Implementar automação em processos manuais para aumentar eficiência e reduzir erros.",
      prioridade: "Média",
      impacto: "Alto",
      prazo: "5 meses",
      custo: "R$ 80.000",
      status: "Pendente",
      categoria: "Processos",
      eixo: "Eixo 3 - Sistemas e Dados",
      acoes: [
        "Mapeamento de processos atuais",
        "Identificação de oportunidades",
        "Desenvolvimento de soluções",
        "Implementação e treinamento"
      ],
      beneficios: [
        "Redução de tempo de processamento",
        "Menos erros manuais",
        "Maior transparência"
      ]
    },
    {
      id: 5,
      titulo: "Implementar Telemedicina",
      descricao: "Desenvolver plataforma de telemedicina para atendimento remoto.",
      prioridade: "Alta",
      impacto: "Alto",
      prazo: "8 meses",
      custo: "R$ 200.000",
      status: "Em Andamento",
      categoria: "Serviços",
      eixo: "Eixo 5 - Serviços e Atenção",
      acoes: [
        "Definição de requisitos",
        "Desenvolvimento da plataforma",
        "Treinamento de profissionais",
        "Piloto e validação"
      ],
      beneficios: [
        "Acesso ampliado à saúde",
        "Redução de custos",
        "Maior eficiência"
      ]
    },
    {
      id: 6,
      titulo: "Criar Centro de Inovação Digital",
      descricao: "Estabelecer centro para desenvolvimento de soluções inovadoras em saúde digital.",
      prioridade: "Baixa",
      impacto: "Médio",
      prazo: "12 meses",
      custo: "R$ 500.000",
      status: "Pendente",
      categoria: "Inovação",
      eixo: "Eixo 6 - Inovação e Pesquisa",
      acoes: [
        "Definição da estrutura",
        "Contratação de equipe",
        "Aquisição de equipamentos",
        "Parcerias estratégicas"
      ],
      beneficios: [
        "Desenvolvimento de soluções inovadoras",
        "Atração de talentos",
        "Posicionamento estratégico"
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Concluído": return "bg-green-500";
      case "Em Andamento": return "bg-blue-500";
      case "Pendente": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case "Alta": return "bg-red-500";
      case "Média": return "bg-yellow-500";
      case "Baixa": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getCategoriaColor = (categoria: string) => {
    switch (categoria) {
      case "Governança": return "bg-blue-100 text-blue-800";
      case "Infraestrutura": return "bg-green-100 text-green-800";
      case "Processos": return "bg-purple-100 text-purple-800";
      case "Pessoas": return "bg-orange-100 text-orange-800";
      case "Serviços": return "bg-pink-100 text-pink-800";
      case "Inovação": return "bg-indigo-100 text-indigo-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredRecomendacoes = activeTab === "todas" 
    ? recomendacoes 
    : recomendacoes.filter(r => r.status.toLowerCase().replace(" ", "") === activeTab);

  const totalInvestimento = recomendacoes.reduce((acc, r) => acc + parseInt(r.custo.replace(/\D/g, '')), 0);
  const emAndamento = recomendacoes.filter(r => r.status === "Em Andamento").length;
  const concluidas = recomendacoes.filter(r => r.status === "Concluído").length;
  const pendentes = recomendacoes.filter(r => r.status === "Pendente").length;

  return (
    <DashboardLayout activeSection="recomendacoes">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Recomendações e Planos de Ação</h1>
                <p className="text-gray-600">Ações sugeridas para melhoria da maturidade digital</p>
              </div>
            </div>
          </div>
        </div>

        {/* Banner Informativo */}
        <Card className="mb-6 bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">Sobre as Recomendações</h3>
                <p className="text-blue-800 text-sm">
                  Estas recomendações são baseadas na análise dos 7 eixos de maturidade digital. 
                  Cada recomendação inclui ações específicas, benefícios esperados e recursos necessários.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resumo Executivo */}
        <div className="grid gap-4 mb-6 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Target className="w-4 h-4" />
                Total de Recomendações
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{recomendacoes.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Em Andamento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{emAndamento}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Concluídas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{concluidas}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Investimento Total
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                R$ {totalInvestimento.toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros por Status */}
        <div className="mb-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="todas" className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Todas ({recomendacoes.length})
              </TabsTrigger>
              <TabsTrigger value="pendente" className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Pendentes ({pendentes})
              </TabsTrigger>
              <TabsTrigger value="emandamento" className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Em Andamento ({emAndamento})
              </TabsTrigger>
              <TabsTrigger value="concluido" className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Concluídas ({concluidas})
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Lista de Recomendações */}
        <div className="space-y-6">
          {filteredRecomendacoes.map((recomendacao) => (
            <Card key={recomendacao.id} className="overflow-hidden">
              <CardHeader className="bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Lightbulb className="w-5 h-5 text-yellow-600" />
                      <CardTitle className="text-xl">{recomendacao.titulo}</CardTitle>
                    </div>
                    <CardDescription className="text-base">{recomendacao.descricao}</CardDescription>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className={getCategoriaColor(recomendacao.categoria)}>
                        {recomendacao.categoria}
                      </Badge>
                      <Badge variant="outline">{recomendacao.eixo}</Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={`${getPrioridadeColor(recomendacao.prioridade)} text-white`}>
                      {recomendacao.prioridade}
                    </Badge>
                    <Badge className={`${getStatusColor(recomendacao.status)} text-white`}>
                      {recomendacao.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Informações Básicas */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      Detalhes do Projeto
                    </h3>
                    
                    <div className="grid gap-3">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Prazo: <strong>{recomendacao.prazo}</strong></span>
                      </div>
                      <div className="flex items-center gap-3">
                        <DollarSign className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Custo: <strong>{recomendacao.custo}</strong></span>
                      </div>
                      <div className="flex items-center gap-3">
                        <TrendingUp className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Impacto: <strong>{recomendacao.impacto}</strong></span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Categoria: <strong>{recomendacao.categoria}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Ações e Benefícios */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      Ações Principais
                    </h3>
                    
                    <ul className="space-y-2">
                      {recomendacao.acoes.map((acao, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <ArrowRight className="w-3 h-3 mt-1 text-blue-500 flex-shrink-0" />
                          <span>{acao}</span>
                        </li>
                      ))}
                    </ul>

                    <Separator />

                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <Star className="w-5 h-5" />
                      Benefícios Esperados
                    </h3>
                    
                    <ul className="space-y-2">
                      {recomendacao.beneficios.map((beneficio, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-3 h-3 mt-1 text-green-500 flex-shrink-0" />
                          <span>{beneficio}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <Button className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Acompanhar Progresso
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Reportar Problema
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
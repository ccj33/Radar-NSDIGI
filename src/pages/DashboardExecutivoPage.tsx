import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { EixoBarChart } from "@/components/dashboard/EixoBarChart";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { 
  BarChart3, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Target,
  Info
} from "lucide-react";

export default function DashboardExecutivoPage() {
  const eixos = [
    {
      nome: "Eixo 3: Sistemas e Dados",
      valor: 53.5,
      categoria: "Em Evolução",
      cor: "bg-blue-500"
    },
    {
      nome: "Eixo 1: Gestão e Governança",
      valor: 33.0,
      categoria: "Emergente",
      cor: "bg-orange-500"
    },
    {
      nome: "Eixo 4: Capacitação e Desenvolvimento",
      valor: 28.0,
      categoria: "Emergente",
      cor: "bg-orange-500"
    },
    {
      nome: "Eixo 5: Serviços Digitais",
      valor: 25.0,
      categoria: "Emergente",
      cor: "bg-orange-500"
    },
    {
      nome: "Eixo 6: Interoperabilidade",
      valor: 24.0,
      categoria: "Emergente",
      cor: "bg-orange-500"
    },
    {
      nome: "Eixo 7: Segurança e Privacidade",
      valor: 23.5,
      categoria: "Emergente",
      cor: "bg-orange-500"
    },
    {
      nome: "Eixo 2: Infraestrutura e Conectividade",
      valor: 19.5,
      categoria: "Emergente",
      cor: "bg-orange-500"
    }
  ];

  const maturidadeGeral = 30;
  const eixosAcimaMediana = 3;
  const eixosEmergentes = 6;

  return (
    <DashboardLayout activeSection="executivo">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Executivo</h1>
          <p className="text-gray-600">Análise detalhada por eixos da microrregião de Diamantina/Itamarandiba</p>
        </div>

        {/* Análise Detalhada por Eixos - Usando o componente reutilizável */}
        <div className="mb-8">
          <EixoBarChart 
            eixos={eixos}
            microrregiao="Diamantina/Itamarandiba"
            titulo="Análise Detalhada por Eixos"
          />
        </div>

        {/* Resumo Executivo */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Resumo Executivo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3 mb-8">
              {/* Maturidade Geral */}
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                <div className="text-4xl font-bold text-blue-600 mb-2">{maturidadeGeral}%</div>
                <div className="text-lg font-semibold text-gray-800">Maturidade Geral</div>
                <div className="text-sm text-gray-600 mt-1">Nível Emergente</div>
              </div>

              {/* Eixos Acima da Mediana */}
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                <div className="text-4xl font-bold text-green-600 mb-2">{eixosAcimaMediana}</div>
                <div className="text-lg font-semibold text-gray-800">Eixos Acima da Mediana</div>
                <div className="text-sm text-gray-600 mt-1">de 7 eixos</div>
              </div>

              {/* Prioridade */}
              <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
                <div className="text-4xl font-bold text-orange-600 mb-2">{eixosEmergentes}</div>
                <div className="text-lg font-semibold text-gray-800">Prioridade</div>
                <div className="text-sm text-gray-600 mt-1">eixos emergentes</div>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Pontos Fortes */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-700">
                    <CheckCircle className="w-5 h-5" />
                    Pontos Fortes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">Nenhum eixo em nível avançado identificado</p>
                </CardContent>
              </Card>

              {/* Oportunidades de Melhoria */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-700">
                    <AlertTriangle className="w-5 h-5" />
                    Oportunidades de Melhoria
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span><strong>{eixosEmergentes} eixo(s) em nível emergente</strong> - Necessitam de desenvolvimento prioritário</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span><strong>Maioria dos eixos abaixo da mediana</strong> - Oportunidade de crescimento significativo</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span><strong>Índice geral em nível emergente</strong> - Foco em desenvolvimento estrutural</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Recomendação Estratégica */}
            <Card className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <Target className="w-5 h-5" />
                  Recomendação Estratégica
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-900 text-lg leading-relaxed">
                  <strong>Diamantina/Itamarandiba</strong> tem grande potencial de crescimento digital. 
                  Comece com ações práticas e mensuráveis nos eixos mais críticos para criar momentum 
                  e acelerar sua evolução digital!
                </p>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
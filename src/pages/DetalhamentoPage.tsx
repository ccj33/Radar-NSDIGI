import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { EixosTable } from "@/components/dashboard/EixosTable";
import { 
  BarChart, 
  PieChart, 
  TrendingUp, 
  Users, 
  Building, 
  Activity, 
  Eye,
  ChevronLeft,
  ChevronRight,
  Target,
  Info,
  CheckCircle,
  AlertTriangle,
  Clock
} from "lucide-react";

// Dados mockados para demonstração - em produção viriam do backend
const mockData = {
  macrorregiao: "Centro",
  microrregiao: "Belo Horizonte",
  regional_saude: "Metropolitana",
  analista: "João Silva",
  indice_geral: "0.45",
  eixo_1: "0.33",
  eixo_2: "0.08",
  eixo_3: "0.85",
  eixo_4: "0.70",
  eixo_5: "0.55",
  eixo_6: "0.25",
  eixo_7: "0.40",
  idh_completo: "0.731",
  idh_valor: "0.731",
  idh_classificacao: "Alto",
  populacao: "2500000",
  classificacao_inmsd: "Intermediário",
  email_analista: "joao.silva@saude.gov.br",
  ponto_focal: "Maria Santos",
  email_ponto_focal: "maria.santos@saude.gov.br",
  municipios: "Belo Horizonte, Contagem, Betim",
  macro_micro: "Centro-Belo Horizonte",
  status_inmsd: "Ativo",
  pontuacao_geral: "0.45",
  situacao_eixo_1: "Básico",
  recomendacao_eixo_1: "Implementar políticas de TIC",
  ferramenta_eixo_1: "Framework de Governança",
  situacao_eixo_2: "Emergente",
  recomendacao_eixo_2: "Melhorar infraestrutura",
  ferramenta_eixo_2: "Plano de Conectividade",
  situacao_eixo_3: "Avançado",
  recomendacao_eixo_3: "Manter excelência",
  ferramenta_eixo_3: "Sistema Integrado",
  situacao_eixo_4: "Intermediário",
  recomendacao_eixo_4: "Expandir capacitação",
  ferramenta_eixo_4: "Programa de Treinamento",
  situacao_eixo_5: "Intermediário",
  recomendacao_eixo_5: "Ampliar serviços digitais",
  ferramenta_eixo_5: "Portal de Serviços",
  situacao_eixo_6: "Básico",
  recomendacao_eixo_6: "Fomentar inovação",
  ferramenta_eixo_6: "Centro de Inovação",
  situacao_eixo_7: "Básico",
  recomendacao_eixo_7: "Implementar monitoramento",
  ferramenta_eixo_7: "Dashboard de Indicadores"
};

const mockMedians = {
  eixo_1: 0.33,
  eixo_2: 0.15,
  eixo_3: 0.45,
  eixo_4: 0.60,
  eixo_5: 0.50,
  eixo_6: 0.30,
  eixo_7: 0.35
};

export default function DetalhamentoPage() {
  return (
    <DashboardLayout activeSection="detalhamento">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <BarChart className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Detalhamento por Eixos de Maturidade</h1>
              <p className="text-gray-600">Análise detalhada de cada eixo estratégico</p>
            </div>
          </div>
        </div>

        {/* Componente EixosTable - mesma implementação da visão geral */}
        <EixosTable data={mockData} medians={mockMedians} />
      </div>
    </DashboardLayout>
  );
}
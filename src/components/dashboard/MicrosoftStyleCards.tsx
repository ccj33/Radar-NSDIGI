import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  PieChart, 
  Users, 
  Target, 
  TrendingUp, 
  BookOpen, 
  Table, 
  Home,
  ArrowRight,
  Activity,
  Shield,
  Database,
  Wifi,
  GraduationCap,
  Smartphone,
  Link,
  ChevronRight,
  Star,
  Zap,
  Globe,
  Award,
  Lightbulb,
  Settings,
  FileText,
  Calendar,
  CheckCircle,
  Clock,
  BarChart
} from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

interface MicrosoftCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  backgroundImage: string;
  backgroundColor: string;
  action: string;
  onClick: () => void;
  badge?: string;
  stats?: {
    value: string;
    label: string;
  };
}

const MicrosoftCard: React.FC<MicrosoftCardProps> = ({ 
  title, 
  description, 
  icon, 
  backgroundImage,
  backgroundColor,
  action, 
  onClick,
  badge,
  stats
}) => {
  return (
    <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-white h-full rounded-xl border border-gray-100">
      {/* Microsoft Fluent Design Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-5 group-hover:opacity-10 transition-all duration-300"
        style={{ 
          backgroundImage: `url(${backgroundImage})`,
          backgroundColor: backgroundColor
        }}
      />
      
      {/* Microsoft Acrylic Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/98 via-white/95 to-white/90 group-hover:from-white/95 group-hover:via-white/90 group-hover:to-white/85 transition-all duration-300 backdrop-blur-sm" />
      
      {/* Microsoft Reveal Effect - Border */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <CardContent className="relative z-10 p-6 h-full flex flex-col">
        {/* Microsoft Badge Design */}
        {badge && (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs font-medium rounded-md w-fit mb-4 shadow-sm">
            <Star className="w-3 h-3" />
            {badge}
          </div>
        )}
        
        {/* Microsoft Icon Design */}
        <div className="mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white shadow-md group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-105">
            {icon}
          </div>
        </div>
        
        {/* Microsoft Typography */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors duration-200">
            {title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
            {description}
          </p>
          
          {/* Microsoft Stats Design */}
          {stats && (
            <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
              <div className="text-2xl font-bold text-gray-900">{stats.value}</div>
              <div className="text-xs text-gray-500 font-medium">{stats.label}</div>
            </div>
          )}
        </div>
        
        {/* Microsoft Button Design */}
        <div className="mt-auto">
          <Button 
            onClick={onClick}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 group-hover:shadow-md"
          >
            {action}
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

interface MicrosoftStyleCardsProps {
  onNavigate: (section: string) => void;
}

export const MicrosoftStyleCards: React.FC<MicrosoftStyleCardsProps> = ({ onNavigate }) => {
  const microsoftFeatures = [
    {
      title: "Visão Geral Inteligente",
      description: "Acesse insights avançados sobre a maturidade digital da sua microrregião com análises preditivas e comparações regionais em tempo real.",
      icon: <Home className="w-6 h-6" />,
      backgroundImage: "/logo_sus_digital-removebg-preview.png",
      backgroundColor: "#0078d4",
      action: "Explorar insights",
      onClick: () => onNavigate('overview'),
      badge: "Novo",
      stats: {
        value: "853",
        label: "Microrregiões analisadas"
      }
    },
    {
      title: "Análise por Eixos Avançada",
      description: "Visualize forças e fraquezas em cada um dos 7 eixos de maturidade digital com gráficos interativos e análises comparativas.",
      icon: <PieChart className="w-6 h-6" />,
      backgroundImage: "/logo_sus_digital-removebg-preview.png",
      backgroundColor: "#5c2d91",
      action: "Ver análise",
      onClick: () => onNavigate('radar'),
      stats: {
        value: "7",
        label: "Eixos estratégicos"
      }
    },
    {
      title: "Ranking de Performance",
      description: "Compare o desempenho da sua microrregião com outras regiões através de rankings dinâmicos e métricas de evolução.",
      icon: <BarChart3 className="w-6 h-6" />,
      backgroundImage: "/logo_sus_digital-removebg-preview.png",
      backgroundColor: "#107c10",
      action: "Ver ranking",
      onClick: () => onNavigate('barras'),
      stats: {
        value: "Top 10%",
        label: "Performance média"
      }
    },
    {
      title: "Dashboard Executivo",
      description: "Acesse KPIs estratégicos, pontos fortes, oportunidades e recomendações personalizadas para tomada de decisão.",
      icon: <Target className="w-6 h-6" />,
      backgroundImage: "/logo_sus_digital-removebg-preview.png",
      backgroundColor: "#d13438",
      action: "Acessar dashboard",
      onClick: () => onNavigate('executivo'),
      badge: "Premium",
      stats: {
        value: "15+",
        label: "KPIs disponíveis"
      }
    },
    {
      title: "Recomendações IA",
      description: "Receba sugestões inteligentes para cada eixo com planos de ação detalhados e roteiros de evolução da maturidade.",
      icon: <Lightbulb className="w-6 h-6" />,
      backgroundImage: "/logo_sus_digital-removebg-preview.png",
      backgroundColor: "#ff8c00",
      action: "Ver recomendações",
      onClick: () => onNavigate('recomendacoes'),
      badge: "IA",
      stats: {
        value: "100%",
        label: "Personalizado"
      }
    },
    {
      title: "Análise Comparativa",
      description: "Compare duas microrregiões lado a lado e identifique diferenças específicas em cada eixo de maturidade digital.",
      icon: <TrendingUp className="w-6 h-6" />,
      backgroundImage: "/logo_sus_digital-removebg-preview.png",
      backgroundColor: "#00b294",
      action: "Comparar regiões",
      onClick: () => onNavigate('analise-avancada'),
      stats: {
        value: "2x",
        label: "Mais insights"
      }
    },
    {
      title: "Dados Demográficos",
      description: "Explore a distribuição populacional e entenda o impacto das ações de saúde digital na cobertura regional.",
      icon: <Users className="w-6 h-6" />,
      backgroundImage: "/logo_sus_digital-removebg-preview.png",
      backgroundColor: "#e91e63",
      action: "Ver população",
      onClick: () => onNavigate('populacao'),
      stats: {
        value: "22M+",
        label: "Habitantes cobertos"
      }
    },
    {
      title: "Relatórios Detalhados",
      description: "Acesse informações detalhadas sobre cada um dos 7 eixos de maturidade digital em formato tabular e exportável.",
      icon: <FileText className="w-6 h-6" />,
      backgroundImage: "/logo_sus_digital-removebg-preview.png",
      backgroundColor: "#6c757d",
      action: "Gerar relatório",
      onClick: () => onNavigate('tabela'),
      stats: {
        value: "PDF",
        label: "Exportável"
      }
    }
  ];

  const eixosCards = [
    {
      title: "Gestão e Governança",
      description: "Estruturas organizacionais, políticas e processos para transformação digital na saúde com foco em liderança estratégica.",
      icon: <Activity className="w-6 h-6" />,
      backgroundImage: "/logo_sus_digital-removebg-preview.png",
      backgroundColor: "#0078d4",
      action: "Analisar eixo",
      onClick: () => onNavigate('overview'),
      stats: {
        value: "85%",
        label: "Maturidade média"
      }
    },
    {
      title: "Infraestrutura e Conectividade",
      description: "Recursos tecnológicos e conectividade necessários para operação dos serviços digitais com alta disponibilidade.",
      icon: <Wifi className="w-6 h-6" />,
      backgroundImage: "/logo_sus_digital-removebg-preview.png",
      backgroundColor: "#107c10",
      action: "Analisar eixo",
      onClick: () => onNavigate('overview'),
      stats: {
        value: "92%",
        label: "Cobertura"
      }
    },
    {
      title: "Sistemas e Dados",
      description: "Plataformas digitais e gestão de dados para operação dos serviços de saúde com segurança e eficiência.",
      icon: <Database className="w-6 h-6" />,
      backgroundImage: "/logo_sus_digital-removebg-preview.png",
      backgroundColor: "#5c2d91",
      action: "Analisar eixo",
      onClick: () => onNavigate('overview'),
      stats: {
        value: "78%",
        label: "Integração"
      }
    },
    {
      title: "Capacitação e Desenvolvimento",
      description: "Formação e desenvolvimento de competências digitais dos profissionais de saúde para transformação cultural.",
      icon: <GraduationCap className="w-6 h-6" />,
      backgroundImage: "/logo_sus_digital-removebg-preview.png",
      backgroundColor: "#ff8c00",
      action: "Analisar eixo",
      onClick: () => onNavigate('overview'),
      stats: {
        value: "65%",
        label: "Profissionais treinados"
      }
    },
    {
      title: "Serviços Digitais",
      description: "Oferta de serviços digitais para cidadãos e profissionais de saúde com experiência centrada no usuário.",
      icon: <Smartphone className="w-6 h-6" />,
      backgroundImage: "/logo_sus_digital-removebg-preview.png",
      backgroundColor: "#e91e63",
      action: "Analisar eixo",
      onClick: () => onNavigate('overview'),
      stats: {
        value: "45",
        label: "Serviços disponíveis"
      }
    },
    {
      title: "Interoperabilidade",
      description: "Integração e troca de informações entre sistemas e serviços de saúde para continuidade do cuidado.",
      icon: <Link className="w-6 h-6" />,
      backgroundImage: "/logo_sus_digital-removebg-preview.png",
      backgroundColor: "#00b294",
      action: "Analisar eixo",
      onClick: () => onNavigate('overview'),
      stats: {
        value: "73%",
        label: "Sistemas integrados"
      }
    },
    {
      title: "Segurança e Privacidade",
      description: "Proteção de dados e informações dos usuários dos serviços digitais de saúde com conformidade regulatória.",
      icon: <Shield className="w-6 h-6" />,
      backgroundImage: "/logo_sus_digital-removebg-preview.png",
      backgroundColor: "#6c757d",
      action: "Analisar eixo",
      onClick: () => onNavigate('overview'),
      stats: {
        value: "99.9%",
        label: "Uptime"
      }
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-16">
      {/* Enhanced Hero Section Microsoft Style */}
      <ScrollReveal>
        <div className="text-center space-y-12">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 bg-clip-text text-transparent tracking-tight">
              Transformação Digital na Saúde
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Descubra o potencial digital da sua região através de análises avançadas, 
              comparações regionais e recomendações personalizadas para evolução da maturidade digital.
            </p>
          </div>
        
        {/* Enhanced Stats Cards Microsoft Style */}
        <ScrollReveal delay={100}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 rounded-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardContent className="p-8 text-center relative z-10">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <Globe className="w-7 h-7 text-white" />
                  </div>
                </div>
                <h3 className="text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">853</h3>
                <p className="text-blue-100 font-semibold text-lg">Microrregiões Analisadas</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-500 to-green-600 border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 rounded-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-green-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardContent className="p-8 text-center relative z-10">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <Award className="w-7 h-7 text-white" />
                  </div>
                </div>
                <h3 className="text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">7</h3>
                <p className="text-green-100 font-semibold text-lg">Eixos de Maturidade</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-500 to-purple-600 border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 rounded-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardContent className="p-8 text-center relative z-10">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <Zap className="w-7 h-7 text-white" />
                  </div>
                </div>
                <h3 className="text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">100%</h3>
                <p className="text-purple-100 font-semibold text-lg">Cobertura Nacional</p>
              </CardContent>
            </Card>
          </div>
        </ScrollReveal>
      </div>

      {/* Enhanced Main Features Section */}
      <ScrollReveal delay={200}>
        <div className="space-y-12">
          <div className="text-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent">
              Soluções para Transformação Digital
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ferramentas avançadas para impulsionar a maturidade digital da sua região
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {microsoftFeatures.map((feature, index) => (
              <MicrosoftCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Enhanced Eixos Section */}
      <ScrollReveal delay={300}>
        <div className="space-y-12">
          <div className="text-center space-y-6">
            <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-purple-700 bg-clip-text text-transparent">
              Os 7 Eixos da Maturidade Digital
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Explore cada dimensão da transformação digital em saúde e entenda 
              como sua região se posiciona em cada eixo estratégico.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {eixosCards.map((eixo, index) => (
              <MicrosoftCard key={`eixo-${index}`} {...eixo} />
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Enhanced Call to Action Microsoft Style */}
      <ScrollReveal delay={400}>
        <div className="text-center py-16">
          <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 rounded-3xl p-12 text-white shadow-2xl overflow-hidden group">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700" />
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-full translate-x-12 translate-y-12 group-hover:scale-150 transition-transform duration-700" />
            
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-6 group-hover:scale-105 transition-transform duration-300">
                Pronto para começar sua análise?
              </h3>
              <p className="text-blue-100 mb-8 max-w-3xl mx-auto text-lg leading-relaxed">
                Selecione uma microrregião nos filtros e explore todas as funcionalidades 
                do Radar NSDIGI para impulsionar a transformação digital da sua região.
              </p>
              <Button 
                onClick={() => onNavigate('overview')}
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 px-10 py-4 text-xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 rounded-2xl group-hover:bg-blue-50"
              >
                Começar Análise
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
};

export default MicrosoftStyleCards; 
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
    <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white h-full">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-300"
        style={{ 
          backgroundImage: `url(${backgroundImage})`,
          backgroundColor: backgroundColor
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/80 to-white/70" />
      
      <CardContent className="relative z-10 p-6 h-full flex flex-col">
        {/* Badge */}
        {badge && (
          <div className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full w-fit mb-4">
            <Star className="w-3 h-3" />
            {badge}
          </div>
        )}
        
        {/* Icon */}
        <div className="mb-4">
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg">
            {icon}
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 leading-tight">
            {title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            {description}
          </p>
          
          {/* Stats */}
          {stats && (
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">{stats.value}</div>
              <div className="text-xs text-gray-600">{stats.label}</div>
            </div>
          )}
        </div>
        
        {/* Action Button */}
        <Button 
          onClick={onClick}
          variant="ghost" 
          className="w-full justify-between p-0 h-auto text-blue-600 hover:text-blue-700 font-semibold group-hover:translate-x-1 transition-all duration-300 border-t border-gray-100 pt-4 mt-auto"
        >
          <span>{action}</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </Button>
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
      {/* Hero Section Microsoft Style */}
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Transformação Digital na Saúde
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Descubra o potencial digital da sua região através de análises avançadas, 
            comparações regionais e recomendações personalizadas para evolução da maturidade digital.
          </p>
        </div>
        
        {/* Stats Cards Microsoft Style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-3">
                <Globe className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">853</h3>
              <p className="text-gray-600 font-medium">Microrregiões Analisadas</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-3">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">7</h3>
              <p className="text-gray-600 font-medium">Eixos de Maturidade</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-3">
                <Zap className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">100%</h3>
              <p className="text-gray-600 font-medium">Cobertura Nacional</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Features Section */}
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">
            Soluções para Transformação Digital
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ferramentas avançadas para impulsionar a maturidade digital da sua região
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {microsoftFeatures.map((feature, index) => (
            <MicrosoftCard key={index} {...feature} />
          ))}
        </div>
      </div>

      {/* Eixos Section */}
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-bold text-gray-900">
            Os 7 Eixos da Maturidade Digital
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
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

      {/* Call to Action Microsoft Style */}
      <div className="text-center py-12">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white shadow-xl">
          <h3 className="text-2xl font-bold mb-4">
            Pronto para começar sua análise?
          </h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Selecione uma microrregião nos filtros e explore todas as funcionalidades 
            do Radar NSDIGI para impulsionar a transformação digital da sua região.
          </p>
          <Button 
            onClick={() => onNavigate('overview')}
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold shadow-lg"
          >
            Começar Análise
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MicrosoftStyleCards; 
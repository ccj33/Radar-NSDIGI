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
  Globe,
  Shield,
  Database,
  Wifi,
  GraduationCap,
  Smartphone,
  Link
} from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  action: string;
  onClick: () => void;
  image?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  title, 
  description, 
  icon, 
  gradient, 
  action, 
  onClick,
  image 
}) => {
  return (
    <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
      
      <CardContent className="p-6 relative z-10">
        <div className="flex items-start gap-4">
          {/* Icon Section */}
          <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} text-white shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
            {icon}
          </div>
          
          {/* Content Section */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
              {title}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              {description}
            </p>
            <Button 
              onClick={onClick}
              variant="ghost" 
              className="p-0 h-auto text-blue-600 hover:text-blue-700 font-semibold group-hover:translate-x-1 transition-all duration-300"
            >
              {action}
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
        </div>
        
        {/* Background Image/Pattern */}
        {image && (
          <div className="absolute top-0 right-0 w-32 h-32 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
            <img src={image} alt="" className="w-full h-full object-cover" />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface FeatureCardsProps {
  onNavigate: (section: string) => void;
}

export const FeatureCards: React.FC<FeatureCardsProps> = ({ onNavigate }) => {
  const features = [
    {
      title: "Visão Geral",
      description: "Acesse o resumo completo da maturidade digital da sua microrregião com indicadores-chave e comparações regionais.",
      icon: <Home className="w-6 h-6" />,
      gradient: "from-blue-600 to-blue-400",
      action: "Ver visão geral",
      onClick: () => onNavigate('overview'),
      image: "/logo_sus_digital-removebg-preview.png"
    },
    {
      title: "Análise por Eixos",
      description: "Visualize forças e fraquezas em cada um dos 7 eixos de maturidade digital de forma gráfica e interativa.",
      icon: <PieChart className="w-6 h-6" />,
      gradient: "from-purple-600 to-pink-500",
      action: "Explorar eixos",
      onClick: () => onNavigate('radar'),
      image: "/logo_sus_digital-removebg-preview.png"
    },
    {
      title: "Ranking de Maturidade",
      description: "Compare o desempenho da sua microrregião com outras regiões através do ranking de maturidade digital.",
      icon: <BarChart3 className="w-6 h-6" />,
      gradient: "from-green-600 to-emerald-500",
      action: "Ver ranking",
      onClick: () => onNavigate('barras'),
      image: "/logo_sus_digital-removebg-preview.png"
    },
    {
      title: "Dashboard Executivo",
      description: "Acesse KPIs estratégicos, pontos fortes, oportunidades e recomendações para tomada de decisão.",
      icon: <Target className="w-6 h-6" />,
      gradient: "from-orange-600 to-red-500",
      action: "Acessar dashboard",
      onClick: () => onNavigate('executivo'),
      image: "/logo_sus_digital-removebg-preview.png"
    },
    {
      title: "Recomendações Inteligentes",
      description: "Receba sugestões personalizadas para cada eixo com planos de ação detalhados para evolução da maturidade.",
      icon: <BookOpen className="w-6 h-6" />,
      gradient: "from-indigo-600 to-purple-500",
      action: "Ver recomendações",
      onClick: () => onNavigate('recomendacoes'),
      image: "/logo_sus_digital-removebg-preview.png"
    },
    {
      title: "Análise Avançada",
      description: "Compare duas microrregiões lado a lado e identifique diferenças específicas em cada eixo de maturidade.",
      icon: <TrendingUp className="w-6 h-6" />,
      gradient: "from-teal-600 to-cyan-500",
      action: "Fazer comparação",
      onClick: () => onNavigate('analise-avancada'),
      image: "/logo_sus_digital-removebg-preview.png"
    },
    {
      title: "Dados Demográficos",
      description: "Explore a distribuição populacional e entenda o impacto das ações de saúde digital na cobertura regional.",
      icon: <Users className="w-6 h-6" />,
      gradient: "from-pink-600 to-rose-500",
      action: "Ver população",
      onClick: () => onNavigate('populacao'),
      image: "/logo_sus_digital-removebg-preview.png"
    },
    {
      title: "Detalhamento por Eixos",
      description: "Acesse informações detalhadas sobre cada um dos 7 eixos de maturidade digital em formato tabular.",
      icon: <Table className="w-6 h-6" />,
      gradient: "from-gray-600 to-slate-500",
      action: "Ver detalhes",
      onClick: () => onNavigate('tabela'),
      image: "/logo_sus_digital-removebg-preview.png"
    }
  ];

  // Cards dos 7 eixos específicos
  const eixosCards = [
    {
      title: "Gestão e Governança",
      description: "Estruturas organizacionais, políticas e processos para transformação digital na saúde.",
      icon: <Activity className="w-6 h-6" />,
      gradient: "from-blue-600 to-blue-400",
      action: "Analisar eixo",
      onClick: () => onNavigate('overview'),
      image: "/logo_sus_digital-removebg-preview.png"
    },
    {
      title: "Infraestrutura e Conectividade",
      description: "Recursos tecnológicos e conectividade necessários para operação dos serviços digitais.",
      icon: <Wifi className="w-6 h-6" />,
      gradient: "from-green-600 to-emerald-500",
      action: "Analisar eixo",
      onClick: () => onNavigate('overview'),
      image: "/logo_sus_digital-removebg-preview.png"
    },
    {
      title: "Sistemas e Dados",
      description: "Plataformas digitais e gestão de dados para operação dos serviços de saúde.",
      icon: <Database className="w-6 h-6" />,
      gradient: "from-purple-600 to-pink-500",
      action: "Analisar eixo",
      onClick: () => onNavigate('overview'),
      image: "/logo_sus_digital-removebg-preview.png"
    },
    {
      title: "Capacitação e Desenvolvimento",
      description: "Formação e desenvolvimento de competências digitais dos profissionais de saúde.",
      icon: <GraduationCap className="w-6 h-6" />,
      gradient: "from-orange-600 to-red-500",
      action: "Analisar eixo",
      onClick: () => onNavigate('overview'),
      image: "/logo_sus_digital-removebg-preview.png"
    },
    {
      title: "Serviços Digitais",
      description: "Oferta de serviços digitais para cidadãos e profissionais de saúde.",
      icon: <Smartphone className="w-6 h-6" />,
      gradient: "from-indigo-600 to-purple-500",
      action: "Analisar eixo",
      onClick: () => onNavigate('overview'),
      image: "/logo_sus_digital-removebg-preview.png"
    },
    {
      title: "Interoperabilidade",
      description: "Integração e troca de informações entre sistemas e serviços de saúde.",
      icon: <Link className="w-6 h-6" />,
      gradient: "from-teal-600 to-cyan-500",
      action: "Analisar eixo",
      onClick: () => onNavigate('overview'),
      image: "/logo_sus_digital-removebg-preview.png"
    },
    {
      title: "Segurança e Privacidade",
      description: "Proteção de dados e informações dos usuários dos serviços digitais de saúde.",
      icon: <Shield className="w-6 h-6" />,
      gradient: "from-gray-600 to-slate-500",
      action: "Analisar eixo",
      onClick: () => onNavigate('overview'),
      image: "/logo_sus_digital-removebg-preview.png"
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-12">
      {/* Seção Principal - Funcionalidades */}
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">
            Transformação Digital na Saúde
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Descubra o potencial digital da sua região através de análises avançadas, 
            comparações regionais e recomendações personalizadas para evolução da maturidade digital.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>

      {/* Seção dos 7 Eixos */}
      <div className="space-y-6">
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
            <FeatureCard key={`eixo-${index}`} {...eixo} />
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center py-8">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Pronto para começar sua análise?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Selecione uma microrregião nos filtros e explore todas as funcionalidades 
            do Radar NSDIGI para impulsionar a transformação digital da sua região.
          </p>
          <Button 
            onClick={() => onNavigate('overview')}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold"
          >
            Começar Análise
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeatureCards; 
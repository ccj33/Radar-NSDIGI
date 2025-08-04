import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ArrowRight, 
  Play, 
  BarChart3, 
  PieChart, 
  Users, 
  Target, 
  TrendingUp, 
  BookOpen, 
  Table, 
  Home,
  Activity,
  Shield,
  Database,
  Wifi,
  GraduationCap,
  Smartphone,
  Link,
  ChevronDown,
  Star,
  Zap,
  Globe,
  Award
} from 'lucide-react';
import MicrosoftStyleCards from '@/components/dashboard/MicrosoftStyleCards';
import ScrollReveal from '@/components/ScrollReveal';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [showFeatures, setShowFeatures] = useState(false);

  const handleNavigate = (section: string) => {
    navigate('/dashboard', { state: { activeSection: section } });
  };

  const scrollToFeatures = () => {
    setShowFeatures(true);
    setTimeout(() => {
      const element = document.getElementById('features-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="text-center space-y-8">
            {/* Logo e Título */}
            <ScrollReveal>
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-400 shadow-xl border-4 border-white relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 opacity-20 rounded-full"></div>
                  <svg className="h-8 w-8 text-white relative z-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                    <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
                    <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                  </svg>
                  <div className="absolute top-1 right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                <div className="text-left">
                  <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-2">
                    RADAR NSDIGI
                  </h1>
                  <p className="text-xl text-blue-600 font-semibold tracking-wide">
                    Sistema de Transformação Digital
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Subtítulo */}
            <ScrollReveal delay={100}>
              <div className="max-w-4xl mx-auto space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                  Transforme a Saúde Digital da sua Região
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Descubra o potencial digital da sua microrregião através de análises avançadas, 
                  comparações regionais e recomendações personalizadas para evolução da maturidade digital em saúde.
                </p>
              </div>
            </ScrollReveal>

            {/* Call to Action Buttons */}
            <ScrollReveal delay={200}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
                <Button 
                  onClick={() => navigate('/dashboard')}
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Começar Agora
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  onClick={scrollToFeatures}
                  variant="outline"
                  size="lg"
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold"
                >
                  <ChevronDown className="w-5 h-5 mr-2" />
                  Ver Funcionalidades
                </Button>
              </div>
            </ScrollReveal>

            {/* Stats Preview */}
            <ScrollReveal delay={300}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto pt-12">
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-6 text-center">
                    <div className="flex items-center justify-center mb-3">
                      <Globe className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">853</h3>
                    <p className="text-gray-600">Microrregiões Analisadas</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-6 text-center">
                    <div className="flex items-center justify-center mb-3">
                      <Award className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">7</h3>
                    <p className="text-gray-600">Eixos de Maturidade</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-6 text-center">
                    <div className="flex items-center justify-center mb-3">
                      <Zap className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">100%</h3>
                    <p className="text-gray-600">Cobertura Nacional</p>
                  </CardContent>
                </Card>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Features Section */}
      {showFeatures && (
        <div id="features-section" className="py-20 bg-white">
          <MicrosoftStyleCards onNavigate={handleNavigate} />
        </div>
      )}

      {/* Quick Access Section */}
      <div className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-12">
            <ScrollReveal>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-gray-900">
                  Acesso Rápido às Principais Funcionalidades
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Navegue diretamente para as seções mais utilizadas do sistema
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {[
                  {
                    title: "Visão Geral",
                    description: "Resumo completo da maturidade digital",
                    icon: <Home className="w-6 h-6" />,
                    gradient: "from-blue-600 to-blue-400",
                    onClick: () => handleNavigate('overview')
                  },
                  {
                    title: "Análise por Eixos",
                    description: "Gráfico radar interativo",
                    icon: <PieChart className="w-6 h-6" />,
                    gradient: "from-purple-600 to-pink-500",
                    onClick: () => handleNavigate('radar')
                  },
                  {
                    title: "Ranking",
                    description: "Comparação entre regiões",
                    icon: <BarChart3 className="w-6 h-6" />,
                    gradient: "from-green-600 to-emerald-500",
                    onClick: () => handleNavigate('barras')
                  },
                  {
                    title: "Recomendações",
                    description: "Planos de ação personalizados",
                    icon: <BookOpen className="w-6 h-6" />,
                    gradient: "from-orange-600 to-red-500",
                    onClick: () => handleNavigate('recomendacoes')
                  }
                ].map((feature, index) => (
                <Card 
                  key={index}
                  className="group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white"
                  onClick={feature.onClick}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.gradient} text-white shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                        {feature.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-300">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {feature.description}
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            </ScrollReveal>

            {/* Final CTA */}
            <ScrollReveal delay={200}>
              <div className="text-center pt-8">
                <Button 
                  onClick={() => navigate('/dashboard')}
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Star className="w-5 h-5 mr-2" />
                  Explorar Dashboard Completo
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage; 
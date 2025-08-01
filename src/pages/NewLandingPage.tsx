import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Home, 
  BarChart3, 
  PieChart, 
  Users, 
  Table, 
  BookOpen, 
  TrendingUp, 
  Target,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const features = [
  { id: 'overview', title: 'Visão Geral', icon: Home, description: 'Comece com um resumo completo do cenário da saúde digital.' },
  { id: 'populacao', title: 'Análise Populacional', icon: Users, description: 'Explore a distribuição demográfica e seus impactos.' },
  { id: 'barras', title: 'Ranking de Maturidade', icon: BarChart3, description: 'Compare a maturidade digital entre as microrregiões.' },
  { id: 'radar', title: 'Análise por Eixos', icon: PieChart, description: 'Avalie o desempenho em cada eixo da transformação digital.' },
  { id: 'executivo', title: 'Dashboard Executivo', icon: Target, description: 'Obtenha uma visão estratégica com os principais indicadores.' },
  { id: 'recomendacoes', title: 'Plano de Ação', icon: BookOpen, description: 'Receba recomendações personalizadas para evoluir.' },
];

const ImpactNumber = ({ number, label }) => (
  <div className="text-center">
    <p className="text-4xl sm:text-5xl font-bold text-blue-600">{number}</p>
    <p className="text-sm sm:text-base text-gray-500 mt-1">{label}</p>
  </div>
);

const FeatureCard = ({ icon: Icon, title, description, onNavigate }) => (
  <Card className="h-full transform transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl shadow-lg border-gray-200 hover:border-blue-500/50">
    <CardContent className="p-6 flex flex-col items-start h-full">
      <div className="p-3 bg-blue-100 rounded-lg mb-4">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
      <h3 className="text-lg font-bold mb-2 text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600 flex-grow mb-4">{description}</p>
      <Button variant="ghost" className="text-blue-600 hover:text-blue-700 p-0 text-sm font-semibold group" onClick={onNavigate}>
        Saiba mais <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
      </Button>
    </CardContent>
  </Card>
);

const HeroCard = ({ onNavigate }) => (
  <Card className="col-span-1 md:col-span-2 lg:col-span-2 row-span-1 text-white p-8 flex flex-col justify-between rounded-2xl shadow-2xl relative overflow-hidden">
    {/* Background Image */}
    <div 
      className="absolute inset-0 bg-cover bg-center"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/80 via-indigo-600/80 to-purple-600/80"></div>
    </div>
    
    {/* Decorative Background Pattern */}
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
      <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white rounded-full opacity-50"></div>
    </div>
    
    {/* Content */}
    <div className="relative z-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
            <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
            <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
          </svg>
        </div>
        <div>
          <h1 className="text-lg font-bold">RADAR NSDIGI</h1>
          <p className="text-xs opacity-80">Sistema de Transformação Digital</p>
        </div>
      </div>
      <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">Transforme a Saúde Digital da sua Região</h2>
      <p className="text-base lg:text-lg opacity-90 mb-6">Descubra o potencial da sua microrregião através de análises avançadas e comparações.</p>
    </div>
    
    <Button 
      size="lg" 
      className="bg-white text-blue-700 hover:bg-gray-100 font-bold self-start px-6 py-3 text-base relative z-10 group"
      onClick={onNavigate}
    >
      Explorar Dashboard <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
    </Button>
  </Card>
);

const NewLandingPage = () => {
  const navigate = useNavigate();
  const handleNavigation = (path) => navigate(path);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <main className="container mx-auto px-4 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <HeroCard onNavigate={() => handleNavigation('/dashboard')} />
          {features.map((feature) => (
            <FeatureCard 
              key={feature.id} 
              icon={feature.icon}
              title={feature.title} 
              description={feature.description}
              onNavigate={() => handleNavigation('/dashboard')}
            />
          ))}
        </div>

        <section className="py-16 sm:py-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Impacto em Números</h2>
            <p className="text-lg text-gray-600 mt-2">Dados que demonstram nossa abrangência e profundidade.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <ImpactNumber number="853" label="Microrregiões Analisadas" />
            <ImpactNumber number="7" label="Eixos de Maturidade" />
            <ImpactNumber number="1000+" label="Insights Gerados" />
          </div>
        </section>
      </main>
    </div>
  );
};

export default NewLandingPage;
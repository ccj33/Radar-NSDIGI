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
import ImpactoEmNumeros from '@/components/ImpactoEmNumeros';

const features = [
  { id: 'overview', title: 'Visão Geral', icon: Home, description: 'Comece com um resumo completo do cenário da saúde digital.' },
  { id: 'populacao', title: 'Análise Populacional', icon: Users, description: 'Explore a distribuição demográfica e seus impactos.' },
  { id: 'barras', title: 'Ranking de Maturidade', icon: BarChart3, description: 'Compare a maturidade digital entre as microrregiões.' },
  { id: 'radar', title: 'Análise por Eixos', icon: PieChart, description: 'Avalie o desempenho em cada eixo da transformação digital.' },
  { id: 'executivo', title: 'Dashboard Executivo', icon: Target, description: 'Obtenha uma visão estratégica com os principais indicadores.' },
  { id: 'tabela', title: 'Detalhamento', icon: Table, description: 'Veja os detalhamentos por eixo de maturidade.' },
  { id: 'recomendacoes', title: 'Recomendações', icon: BookOpen, description: 'Receba recomendações personalizadas para evoluir.' },
  { id: 'detalhe', title: 'Detalhes da Microrregião', icon: Target, description: 'Veja o design Microsoft implementado em ação.' },
];

const FeatureCard = ({ icon: Icon, title, description, onNavigate }) => (
  <Card className="bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out hover:scale-105 group">
    <CardContent className="p-0">
      <div className="flex items-center space-x-2 text-blue-600 mb-2">
        <Icon className="w-6 h-6" />
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-sm text-gray-600 mb-3">{description}</p>
      <button 
        onClick={onNavigate}
        className="text-blue-600 mt-2 inline-flex items-center gap-1 text-sm hover:underline group-hover:text-blue-700 transition-colors"
        aria-label={`Saiba mais sobre ${title}`}
      >
        Saiba mais →
      </button>
    </CardContent>
  </Card>
);

const HeroCard = ({ onNavigate }) => (
  <div className="lg:col-span-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-2xl shadow-md flex flex-col justify-between min-h-[280px]">
    <div>
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
      <p className="text-base lg:text-lg opacity-90">Descubra o potencial da sua microrregião através de análises avançadas e comparações.</p>
    </div>
    
    <Button 
      size="lg" 
      className="bg-white text-blue-700 hover:bg-gray-100 font-bold self-start px-6 py-3 text-base group transition-all duration-300 ease-in-out hover:scale-105"
      onClick={onNavigate}
    >
      Explorar Dashboard <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
    </Button>
  </div>
);

const NewLandingPage = () => {
  const navigate = useNavigate();
  const handleNavigation = (path) => navigate(path);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <main className="container mx-auto px-4 py-12 sm:py-16">
        {/* Grid principal com banner e cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6 py-8">
          {/* Banner Principal - ocupa 2 colunas */}
          <HeroCard onNavigate={() => handleNavigation('/dashboard')} />
          
          {/* Cards menores - 7 cards organizados conforme especificação */}
          {features.map((feature) => (
            <FeatureCard 
              key={feature.id} 
              icon={feature.icon}
              title={feature.title} 
              description={feature.description}
              onNavigate={() => {
                if (feature.id === 'detalhe') {
                  handleNavigation('/microrregiao-detalhe');
                } else {
                  handleNavigation(`/dashboard?section=${feature.id}`);
                }
              }}
            />
          ))}
        </div>
      </main>

      {/* Seção de Impacto em Números com novo componente */}
      <ImpactoEmNumeros />
    </div>
  );
};

export default NewLandingPage;
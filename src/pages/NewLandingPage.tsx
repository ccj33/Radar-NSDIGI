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
];

const FeatureCard = ({ icon: Icon, title, description, onNavigate }) => (
  <Card className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-300 h-full">
    <CardContent className="p-5 h-full flex flex-col">
      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 ring-1 ring-blue-100 flex items-center justify-center mb-3">
        <Icon className="w-5 h-5" />
      </div>
      <h3 className="text-base font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      <div className="mt-auto">
        <button 
          onClick={onNavigate}
          className="text-blue-700 inline-flex items-center gap-1 text-sm font-medium hover:underline"
          aria-label={`Saiba mais sobre ${title}`}
        >
          Saiba mais <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </CardContent>
  </Card>
);

const HeroCard = ({ onNavigate }) => (
  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl shadow-sm flex flex-col justify-between min-h-[320px]">
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center ring-1 ring-white/25">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
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
      <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight mb-3">Transforme a Saúde Digital da sua Região</h2>
      <p className="text-base lg:text-lg opacity-90 leading-relaxed">Descubra o potencial da sua microrregião através de análises avançadas e comparações.</p>
    </div>
    
    <Button 
      size="lg" 
      className="bg-white text-blue-700 hover:bg-gray-100 font-medium self-start px-6 py-3 text-base"
      onClick={onNavigate}
    >
      Explorar Dashboard <ArrowRight className="w-5 h-5 ml-2" />
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 px-6 py-10">
          {/* Banner Principal - ocupa 4 colunas no desktop */}
          <div className="sm:col-span-2 lg:col-span-4">
            <HeroCard onNavigate={() => handleNavigation('/dashboard')} />
          </div>
          
          {/* Primeira fileira de cards - 4 cards (cada um ocupa 2 colunas no desktop) */}
          {features.slice(0, 4).map((feature) => (
            <div key={feature.id} className="sm:col-span-1 lg:col-span-2">
              <FeatureCard 
                icon={feature.icon}
                title={feature.title} 
                description={feature.description}
                onNavigate={() => {
                  // Usar a mesma lógica da página inicial
                  navigate('/dashboard', { state: { activeSection: feature.id } });
                }}
              />
            </div>
          ))}
          
          {/* Segunda fileira de cards - 3 cards (cada um ocupa 4 colunas no desktop) */}
          {features.slice(4, 7).map((feature) => (
            <div key={feature.id} className="sm:col-span-1 lg:col-span-4">
              <FeatureCard 
                icon={feature.icon}
                title={feature.title} 
                description={feature.description}
                onNavigate={() => {
                  // Usar a mesma lógica da página inicial
                  navigate('/dashboard', { state: { activeSection: feature.id } });
                }}
              />
            </div>
          ))}
        </div>
      </main>

      {/* Seção de Impacto em Números com novo componente */}
      <ImpactoEmNumeros />
    </div>
  );
};

export default NewLandingPage;
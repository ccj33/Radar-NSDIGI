import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Smartphone, 
  TrendingUp, 
  Users, 
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Target,
  Award
} from 'lucide-react';

interface BannerData {
  title: string;
  subtitle?: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
  stats?: { label: string; value: string }[];
}

const bannerVariants: BannerData[] = [
  {
    title: "Maturidade Digital",
    subtitle: "Análise Regional",
    description: "Acompanhe o desenvolvimento da maturidade digital em saúde em diferentes microrregiões de Minas Gerais.",
    icon: <Target className="w-8 h-8" />,
    color: "blue",
    gradient: "from-blue-600 via-blue-700 to-purple-600",
    stats: [
      { label: "Média Geral", value: "45%" },
      { label: "Microrregiões", value: "89" }
    ]
  },
  {
    title: "Tendências em Tempo Real",
    subtitle: "Análise Avançada",
    description: "Visualize indicadores e métricas em tempo real. Descubra padrões e tendências nos dados de saúde digital.",
    icon: <TrendingUp className="w-8 h-8" />,
    color: "green",
    gradient: "from-green-600 via-emerald-600 to-teal-600",
    stats: [
      { label: "Crescimento", value: "+23%" },
      { label: "Usuários", value: "2.4M" }
    ]
  },
  {
    title: "População Atendida",
    subtitle: "Impacto Social",
    description: "Acompanhe a cobertura populacional dos serviços digitais em saúde em cada microrregião.",
    icon: <Users className="w-8 h-8" />,
    color: "purple",
    gradient: "from-purple-600 via-violet-600 to-fuchsia-600",
    stats: [
      { label: "Atendidos", value: "21.2M" },
      { label: "Regiões", value: "89" }
    ]
  }
];

const BannerShowcase: React.FC = () => {
  const [currentBanner, setCurrentBanner] = useState(0);

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % bannerVariants.length);
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + bannerVariants.length) % bannerVariants.length);
  };

  const currentData = bannerVariants[currentBanner];

  return (
    <div className="space-y-6">
      <Tabs defaultValue="interactive" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="interactive">Banner Interativo</TabsTrigger>
          <TabsTrigger value="static">Banner Estático</TabsTrigger>
          <TabsTrigger value="animated">Banner Animado</TabsTrigger>
        </TabsList>

        <TabsContent value="interactive" className="space-y-4">
          <Card className="overflow-hidden">
            <div className={`relative h-64 bg-gradient-to-r ${currentData.gradient} transition-all duration-700 ease-in-out`}>
              <CardContent className="relative h-full flex items-center justify-between p-8">
                <div className="flex-1 text-white space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/20 rounded-xl">
                      {currentData.icon}
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold">{currentData.title}</h2>
                      {currentData.subtitle && (
                        <p className="text-lg opacity-80">{currentData.subtitle}</p>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-xl opacity-90 max-w-2xl leading-relaxed">
                    {currentData.description}
                  </p>

                  {currentData.stats && (
                    <div className="flex gap-6">
                      {currentData.stats.map((stat, index) => (
                        <div key={index} className="text-center">
                          <div className="text-2xl font-bold">{stat.value}</div>
                          <div className="text-sm opacity-80">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={prevBanner}
                    className="text-white hover:bg-white/20 rounded-full w-10 h-10 p-0"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={nextBanner}
                    className="text-white hover:bg-white/20 rounded-full w-10 h-10 p-0"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="static" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Banner Estático</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`h-32 bg-gradient-to-r ${currentData.gradient} rounded-lg p-6 text-white`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    {currentData.icon}
                  </div>
                  <h3 className="text-xl font-bold">{currentData.title}</h3>
                </div>
                <p className="opacity-90">{currentData.description}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="animated" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Banner Animado</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`h-32 bg-gradient-to-r ${currentData.gradient} rounded-lg p-6 text-white animate-pulse`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    {currentData.icon}
                  </div>
                  <h3 className="text-xl font-bold">{currentData.title}</h3>
                </div>
                <p className="opacity-90">{currentData.description}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export { BannerShowcase };
export default BannerShowcase; 
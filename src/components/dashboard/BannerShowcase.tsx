import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Lightbulb, 
  TrendingUp, 
  Users, 
  Globe, 
  Activity, 
  BarChart3,
  Smartphone,
  Wifi
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
    title: "Serviços Digitais",
    subtitle: "Cobertura Nacional",
    description: "O eixo de 'Serviços Digitais' apresenta maior variabilidade entre microrregiões. Confira o desempenho da sua região!",
    icon: <Smartphone className="w-8 h-8" />,
    color: "blue",
    gradient: "from-blue-600 via-blue-700 to-purple-600",
    stats: [
      { label: "Cobertura", value: "87%" },
      { label: "Microrregiões", value: "156" }
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
    description: "Acompanhe a cobertura populacional dos serviços digitais em saúde em cada microrregião do Brasil.",
    icon: <Users className="w-8 h-8" />,
    color: "purple",
    gradient: "from-purple-600 via-violet-600 to-fuchsia-600",
    stats: [
      { label: "Atendidos", value: "45M" },
      { label: "Regiões", value: "5.570" }
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
            <div className={`h-64 bg-gradient-to-r ${currentData.gradient} relative`}>
              {/* Animated Background Elements */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/10 rounded-full animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white/10 rounded-full animate-pulse delay-500"></div>
              </div>

              <CardContent className="relative h-full flex items-center justify-between p-8">
                <div className="flex-1 text-white space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
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

                <div className="flex flex-col gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={prevBanner}
                    className="text-white hover:bg-white/20 rounded-full w-12 h-12 p-0"
                  >
                    ←
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={nextBanner}
                    className="text-white hover:bg-white/20 rounded-full w-12 h-12 p-0"
                  >
                    →
                  </Button>
                </div>
              </CardContent>

              {/* Progress Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {bannerVariants.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentBanner(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentBanner 
                        ? 'bg-white scale-125' 
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                  />
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="static" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bannerVariants.map((banner, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className={`h-48 bg-gradient-to-br ${banner.gradient} relative`}>
                  <CardContent className="h-full flex flex-col justify-center p-6 text-white">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-white/20 rounded-lg">
                        {banner.icon}
                      </div>
                      <Badge variant="secondary" className="bg-white/20 text-white">
                        {banner.subtitle}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{banner.title}</h3>
                    <p className="text-sm opacity-90 line-clamp-3">{banner.description}</p>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="animated" className="space-y-4">
          <Card className="overflow-hidden">
            <div className="h-64 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 relative">
              {/* Animated Elements */}
              <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-full h-full">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-white/30 rounded-full animate-bounce"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${i * 0.5}s`,
                        animationDuration: `${2 + Math.random() * 2}s`
                      }}
                    />
                  ))}
                </div>
              </div>

              <CardContent className="relative h-full flex items-center justify-center p-8">
                <div className="text-center text-white space-y-6">
                  <div className="animate-pulse">
                    <div className="p-4 bg-white/20 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                      <Activity className="w-10 h-10" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h2 className="text-4xl font-bold animate-fade-in">Dashboard Interativo</h2>
                    <p className="text-xl opacity-90 animate-fade-in-delay">
                      Visualize dados em tempo real com animações suaves e transições elegantes
                    </p>
                  </div>

                  <div className="flex justify-center gap-4">
                    <Badge variant="secondary" className="bg-white/20 text-white animate-bounce">
                      <Wifi className="w-4 h-4 mr-1" />
                      Tempo Real
                    </Badge>
                    <Badge variant="secondary" className="bg-white/20 text-white animate-bounce delay-1000">
                      <BarChart3 className="w-4 h-4 mr-1" />
                      Analytics
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export { BannerShowcase };
export default BannerShowcase; 
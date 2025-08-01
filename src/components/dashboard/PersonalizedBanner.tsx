import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Lightbulb, 
  TrendingUp, 
  Users, 
  Globe, 
  Target,
  Award,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  MapPin
} from 'lucide-react';
import { MicroRegionData, EIXOS_NAMES } from "@/types/dashboard";
import { getStatusAppearance } from '@/lib/statusUtils';

interface PersonalizedBannerProps {
  selectedData: MicroRegionData | undefined;
  medians: Record<string, number>;
}

interface BannerInsight {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
  stats?: { label: string; value: string }[];
}

const PersonalizedBanner: React.FC<PersonalizedBannerProps> = ({ 
  selectedData, 
  medians 
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Gerar insights baseados nos dados
  const generateInsights = (): BannerInsight[] => {
    if (!selectedData) {
      return [
        {
          id: 1,
          title: "Selecione uma Microrregião",
          description: "Escolha uma microrregião para visualizar insights personalizados e análises detalhadas.",
          icon: <MapPin className="w-8 h-8" />,
          color: "blue",
          gradient: "from-blue-600 to-purple-600"
        }
      ];
    }

    const indiceGeral = parseFloat(String(selectedData.indice_geral).replace(',', '.'));
    const eixosValues = EIXOS_NAMES.map((_, index) => {
      const eixoKey = `eixo_${index + 1}` as keyof MicroRegionData;
      return parseFloat(String(selectedData[eixoKey]).replace(',', '.'));
    });

    const maxEixo = eixosValues.indexOf(Math.max(...eixosValues));
    const minEixo = eixosValues.indexOf(Math.min(...eixosValues));
    const eixosAcimaMediana = eixosValues.filter((valor, index) => {
      const eixoKey = `eixo_${index + 1}` as keyof MicroRegionData;
      return valor > (medians[eixoKey] || 0);
    }).length;

    const classification = indiceGeral > 0.66 ? 'Avançado' : indiceGeral > 0.33 ? 'Em Evolução' : 'Emergente';
    const statusAppearance = getStatusAppearance(classification);

    return [
      {
        id: 1,
        title: `Maturidade Digital: ${classification}`,
        description: `${selectedData.microrregiao} apresenta um índice geral de ${(indiceGeral * 100).toFixed(1)}%, classificando-se como ${classification.toLowerCase()}.`,
        icon: <Target className="w-8 h-8" />,
        color: "blue",
        gradient: "from-blue-600 via-blue-700 to-purple-600",
        stats: [
          { label: "Índice Geral", value: `${(indiceGeral * 100).toFixed(1)}%` },
          { label: "Classificação", value: classification }
        ]
      },
      {
        id: 2,
        title: "Eixo de Destaque",
        description: `${EIXOS_NAMES[maxEixo]} é o eixo com melhor desempenho em ${selectedData.microrregiao}, com ${(eixosValues[maxEixo] * 100).toFixed(1)}% de maturidade.`,
        icon: <Award className="w-8 h-8" />,
        color: "green",
        gradient: "from-green-600 via-emerald-600 to-teal-600",
        stats: [
          { label: "Melhor Eixo", value: EIXOS_NAMES[maxEixo] },
          { label: "Pontuação", value: `${(eixosValues[maxEixo] * 100).toFixed(1)}%` }
        ]
      },
      {
        id: 3,
        title: "Oportunidade de Melhoria",
        description: `${EIXOS_NAMES[minEixo]} apresenta a menor pontuação (${(eixosValues[minEixo] * 100).toFixed(1)}%) e representa a principal oportunidade de evolução.`,
        icon: <TrendingUp className="w-8 h-8" />,
        color: "orange",
        gradient: "from-orange-600 via-red-600 to-pink-600",
        stats: [
          { label: "Eixo Crítico", value: EIXOS_NAMES[minEixo] },
          { label: "Pontuação", value: `${(eixosValues[minEixo] * 100).toFixed(1)}%` }
        ]
      },
      {
        id: 4,
        title: "Comparação Nacional",
        description: `${eixosAcimaMediana} de ${EIXOS_NAMES.length} eixos estão acima da mediana nacional, demonstrando ${eixosAcimaMediana > EIXOS_NAMES.length / 2 ? 'bom' : 'potencial de'} desempenho.`,
        icon: <BarChart3 className="w-8 h-8" />,
        color: "purple",
        gradient: "from-purple-600 via-violet-600 to-fuchsia-600",
        stats: [
          { label: "Acima da Mediana", value: `${eixosAcimaMediana}/${EIXOS_NAMES.length}` },
          { label: "Percentual", value: `${((eixosAcimaMediana / EIXOS_NAMES.length) * 100).toFixed(0)}%` }
        ]
      }
    ];
  };

  const insights = generateInsights();

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % insights.length);
    }, 6000); // 6 segundos por slide

    return () => clearInterval(interval);
  }, [isAutoPlaying, insights.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % insights.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + insights.length) % insights.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const currentInsight = insights[currentSlide];

  return (
    <div className="w-full">
      <Card className="overflow-hidden shadow-lg">
        <div 
          className={`h-48 bg-gradient-to-r ${currentInsight.gradient} relative`}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-4 w-32 h-32 rounded-full bg-white/20"></div>
            <div className="absolute bottom-8 left-8 w-16 h-16 rounded-full bg-white/20"></div>
            <div className="absolute top-1/2 left-1/4 w-8 h-8 rounded-full bg-white/20"></div>
          </div>

          {/* Content */}
          <CardContent className="relative h-full flex items-center justify-between p-6">
            <div className="flex-1 text-white">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  {currentInsight.icon}
                </div>
                <h2 className="text-2xl font-bold">{currentInsight.title}</h2>
              </div>
              <p className="text-lg opacity-90 max-w-2xl leading-relaxed mb-4">
                {currentInsight.description}
              </p>
              {currentInsight.stats && (
                <div className="flex gap-6">
                  {currentInsight.stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-sm opacity-80">{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Navigation Arrows */}
            <div className="flex flex-col gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={prevSlide}
                className="text-white hover:bg-white/20 rounded-full w-10 h-10 p-0"
              >
                ←
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={nextSlide}
                className="text-white hover:bg-white/20 rounded-full w-10 h-10 p-0"
              >
                →
              </Button>
            </div>
          </CardContent>

          {/* Slide Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {insights.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-white scale-125' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
            <div 
              className="h-full bg-white transition-all duration-500 ease-linear"
              style={{ 
                width: `${((currentSlide + 1) / insights.length) * 100}%` 
              }}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export { PersonalizedBanner };
export default PersonalizedBanner; 
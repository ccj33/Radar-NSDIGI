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
  MapPin,
  ChevronLeft,
  ChevronRight
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

  // Gerar insights baseados nos dados
  const insights: BannerInsight[] = React.useMemo(() => {
    if (!selectedData) {
      return [];
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
        title: "Comparação com Mediana",
        description: `${selectedData.microrregiao} está acima da mediana em ${eixosAcimaMediana} de ${EIXOS_NAMES.length} eixos, demonstrando ${eixosAcimaMediana > EIXOS_NAMES.length / 2 ? 'bom' : 'potencial de'} desempenho.`,
        icon: <BarChart3 className="w-8 h-8" />,
        color: "purple",
        gradient: "from-purple-600 via-violet-600 to-fuchsia-600",
        stats: [
          { label: "Eixos Acima da Mediana", value: `${eixosAcimaMediana}/${EIXOS_NAMES.length}` },
          { label: "Desempenho", value: eixosAcimaMediana > EIXOS_NAMES.length / 2 ? 'Acima da Média' : 'Abaixo da Média' }
        ]
      }
    ];
  }, [selectedData, medians]);

  // Auto-play functionality
  useEffect(() => {
    if (insights.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % insights.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [insights.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % insights.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + insights.length) % insights.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Estado vazio - quando não há dados selecionados
  if (!selectedData || insights.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Target className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Selecione uma Microrregião
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Escolha uma microrregião nos filtros para visualizar insights personalizados sobre sua maturidade digital.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentInsight = insights[currentSlide];

  return (
    <Card className="w-full">
      <CardContent className="p-0">
        <div 
          className={`relative h-32 bg-gradient-to-r ${currentInsight.gradient} transition-all duration-700 ease-in-out rounded-lg shadow-lg`}
        >
          {/* Content */}
          <div className="relative h-full flex items-center justify-between p-6">
            <div className="flex-1 text-white">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  {currentInsight.icon}
                </div>
                <h2 className="text-2xl font-bold">{currentInsight.title}</h2>
              </div>
              <p className="text-lg opacity-90 max-w-2xl">
                {currentInsight.description}
              </p>
              
              {/* Stats */}
              {currentInsight.stats && (
                <div className="flex flex-wrap gap-3 mt-4">
                  {currentInsight.stats.map((stat, index) => (
                    <div key={index} className="bg-white/10 px-3 py-1.5 rounded-full text-sm font-medium">
                      <span className="opacity-75">{stat.label}:</span> {stat.value}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Navigation Arrows */}
            {insights.length > 1 && (
              <div className="flex flex-col gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={prevSlide}
                  className="text-white hover:bg-white/20 rounded-full w-10 h-10 p-0"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={nextSlide}
                  className="text-white hover:bg-white/20 rounded-full w-10 h-10 p-0"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            )}
          </div>

          {/* Slide Indicators */}
          {insights.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {insights.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-white' 
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export { PersonalizedBanner };
export default PersonalizedBanner; 
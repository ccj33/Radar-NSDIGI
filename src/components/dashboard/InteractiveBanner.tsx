import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Lightbulb, 
  TrendingUp, 
  Users, 
  Globe, 
  ChevronLeft,
  ChevronRight,
  BarChart3
} from 'lucide-react';

interface BannerSlide {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const bannerSlides: BannerSlide[] = [
  {
    id: 1,
    title: "Maturidade Digital",
    description: "Sabia que a média do Índice de Maturidade Digital em Minas Gerais é de 0.45? Veja como sua microrregião se compara!",
    icon: <TrendingUp className="w-6 h-6" />,
    color: "from-blue-600 to-purple-600"
  },
  {
    id: 2,
    title: "Análise Avançada",
    description: "Descubra tendências e padrões nos dados de saúde digital. Visualize indicadores em tempo real.",
    icon: <BarChart3 className="w-6 h-6" />,
    color: "from-green-600 to-blue-600"
  },
  {
    id: 3,
    title: "População Atendida",
    description: "Acompanhe a cobertura populacional dos serviços digitais em saúde em cada microrregião.",
    icon: <Users className="w-6 h-6" />,
    color: "from-purple-600 to-pink-600"
  },
  {
    id: 4,
    title: "Cobertura Nacional",
    description: "Visualize a distribuição geográfica dos serviços digitais em saúde em todo o Brasil.",
    icon: <Globe className="w-6 h-6" />,
    color: "from-orange-600 to-red-600"
  }
];

const InteractiveBanner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const currentSlideData = bannerSlides[currentSlide];

  return (
    <div className="w-full relative">
      <div 
        className={`relative h-32 bg-gradient-to-r ${currentSlideData.color} transition-all duration-700 ease-in-out rounded-lg shadow-lg`}
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
        <div className="relative h-full flex items-center justify-between p-6">
          <div className="flex-1 text-white">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                {currentSlideData.icon}
              </div>
              <h2 className="text-2xl font-bold">{currentSlideData.title}</h2>
            </div>
            <p className="text-lg opacity-90 max-w-2xl leading-relaxed">
              {currentSlideData.description}
            </p>
          </div>

          {/* Navigation Arrows */}
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
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {bannerSlides.map((_, index) => (
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
              width: `${((currentSlide + 1) / bannerSlides.length) * 100}%` 
            }}
          />
        </div>
      </div>
    </div>
  );
};

export { InteractiveBanner };
export default InteractiveBanner; 
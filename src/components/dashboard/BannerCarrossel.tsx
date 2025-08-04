import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import { FaCheckCircle, FaChartLine, FaUsers, FaTarget } from 'react-icons/fa';

const banners = [
  {
    title: 'Visão Geral',
    subtitle: 'Acompanhe o panorama completo da maturidade digital em saúde.',
    stats: ['89 Microrregiões', '45.0% Maturidade Média', '21.2M População Atendida'],
    icon: FaCheckCircle,
    bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  {
    title: 'Dashboard Ativo',
    subtitle: 'Visualize indicadores-chave e descubra oportunidades de melhoria.',
    stats: ['Dados em tempo real', 'Atualização mensal', 'Comparações por eixo'],
    icon: FaChartLine,
    bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
  },
  {
    title: 'Análises Avançadas',
    subtitle: 'Explore o potencial da sua microrregião com dados estratégicos.',
    stats: ['+1000 Insights', '7 Eixos avaliados', 'Ranking regional'],
    icon: FaTarget,
    bg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
  }
];

export default function BannerCarrossel() {
  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-lg">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop
        className="h-64"
      >
        {banners.map((item, idx) => {
          const Icon = item.icon;
          return (
            <SwiperSlide key={idx}>
              <div
                className="w-full h-full bg-cover bg-center text-white flex flex-col justify-between p-6 relative"
                style={{
                  background: item.bg
                }}
              >
                {/* Overlay escuro para melhor contraste */}
                <div className="absolute inset-0 bg-black/20"></div>
                
                {/* Conteúdo */}
                <div className="relative z-10">
                  <div className="text-xl font-bold flex items-center gap-2 mb-2">
                    <Icon className="text-white/90" /> 
                    {item.title}
                  </div>
                  <div className="text-2xl md:text-3xl font-semibold leading-tight mb-4">
                    {item.subtitle}
                  </div>
                </div>
                
                {/* Estatísticas */}
                <div className="relative z-10 flex flex-wrap gap-4 text-sm md:text-base font-medium">
                  {item.stats.map((stat, i) => (
                    <div key={i} className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
                      {stat}
                    </div>
                  ))}
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
} 
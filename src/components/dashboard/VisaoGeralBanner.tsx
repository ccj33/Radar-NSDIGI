import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import { FaCheckCircle, FaChartLine, FaBullseye, FaUsers, FaChartBar, FaChartPie, FaCrosshairs, FaTable, FaBookOpen, FaArrowUp } from 'react-icons/fa';

interface VisaoGeralBannerProps {
  selectedMicroregiao?: string;
  totalMicrorregioes?: number;
  maturidadeMedia?: number;
  populacaoAtendida?: number;
  activeSection?: string;
}

const getBannersForSection = (activeSection: string = 'overview') => {
  const baseBanners = {
    overview: [
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
        icon: FaBullseye,
        bg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
      }
    ],
    populacao: [
      {
        title: 'Análise Populacional',
        subtitle: 'Explore a distribuição demográfica e seus impactos na saúde digital.',
        stats: ['21.2M Habitantes', '89 Microrregiões', 'Dados Demográficos'],
        icon: FaUsers,
        bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      },
      {
        title: 'Distribuição Regional',
        subtitle: 'Visualize como a população se distribui entre as microrregiões.',
        stats: ['Densidade Populacional', 'Faixas Etárias', 'Indicadores Sociais'],
        icon: FaChartLine,
        bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
      },
      {
        title: 'Impacto Demográfico',
        subtitle: 'Entenda como a demografia influencia a maturidade digital.',
        stats: ['Correlações', 'Tendências', 'Projeções'],
        icon: FaArrowUp,
        bg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
      }
    ],
    barras: [
      {
        title: 'Ranking de Maturidade',
        subtitle: 'Compare a maturidade digital entre as microrregiões.',
        stats: ['89 Microrregiões', 'Ranking Completo', 'Comparações'],
        icon: FaChartBar,
        bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      },
      {
        title: 'Top Performers',
        subtitle: 'Descubra as regiões com melhor desempenho digital.',
        stats: ['Líderes Regionais', 'Melhores Práticas', 'Benchmarks'],
        icon: FaCrosshairs,
        bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
      },
      {
        title: 'Análise Comparativa',
        subtitle: 'Compare indicadores entre diferentes microrregiões.',
        stats: ['Métricas Chave', 'Gap Analysis', 'Oportunidades'],
        icon: FaChartLine,
        bg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
      }
    ],
    radar: [
      {
        title: 'Análise por Eixos',
        subtitle: 'Avalie o desempenho em cada eixo da transformação digital.',
        stats: ['7 Eixos Estratégicos', 'Avaliação Detalhada', 'Diagnóstico'],
        icon: FaChartPie,
        bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      },
      {
        title: 'Eixos de Maturidade',
        subtitle: 'Explore cada eixo e identifique pontos de melhoria.',
        stats: ['Gestão e Governança', 'Infraestrutura', 'Sistemas e Dados'],
        icon: FaCrosshairs,
        bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
      },
      {
        title: 'Diagnóstico Completo',
        subtitle: 'Obtenha insights detalhados sobre cada dimensão.',
        stats: ['Capacitação', 'Serviços Digitais', 'Inovação'],
        icon: FaCheckCircle,
        bg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
      }
    ],
    executivo: [
      {
        title: 'Dashboard Executivo',
        subtitle: 'Obtenha uma visão estratégica com os principais indicadores.',
        stats: ['KPIs Estratégicos', 'Visão Executiva', 'Tomada de Decisão'],
        icon: FaCrosshairs,
        bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      },
      {
        title: 'Indicadores-Chave',
        subtitle: 'Acompanhe os principais indicadores de maturidade digital.',
        stats: ['Métricas Críticas', 'Tendências', 'Alertas'],
        icon: FaChartLine,
        bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
      },
      {
        title: 'Visão Estratégica',
        subtitle: 'Transforme dados em insights para decisões estratégicas.',
        stats: ['Análise Executiva', 'Relatórios', 'Projeções'],
        icon: FaArrowUp,
        bg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
      }
    ],
    tabela: [
      {
        title: 'Detalhamento',
        subtitle: 'Veja os detalhamentos por eixo de maturidade.',
        stats: ['Dados Detalhados', 'Análise Granular', 'Insights'],
        icon: FaTable,
        bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      },
      {
        title: 'Análise Granular',
        subtitle: 'Explore dados detalhados de cada microrregião.',
        stats: ['Métricas Específicas', 'Comparações', 'Tendências'],
        icon: FaChartLine,
        bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
      },
      {
        title: 'Insights Detalhados',
        subtitle: 'Obtenha insights profundos sobre cada indicador.',
        stats: ['Análise Avançada', 'Correlações', 'Recomendações'],
        icon: FaBullseye,
        bg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
      }
    ],
    recomendacoes: [
      {
        title: 'Recomendações',
        subtitle: 'Receba recomendações personalizadas para evoluir.',
        stats: ['Sugestões Personalizadas', 'Planos de Ação', 'Melhorias'],
        icon: FaBookOpen,
        bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      },
      {
        title: 'Planos de Ação',
        subtitle: 'Implemente melhorias baseadas em dados e análises.',
        stats: ['Estratégias', 'Roadmap', 'Execução'],
        icon: FaCrosshairs,
        bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
      },
      {
        title: 'Evolução Digital',
        subtitle: 'Transforme sua região com recomendações estratégicas.',
        stats: ['Transformação', 'Inovação', 'Resultados'],
        icon: FaArrowUp,
        bg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
      }
    ],
    avancada: [
      {
        title: 'Análise Avançada',
        subtitle: 'Compare regiões e descubra padrões complexos.',
        stats: ['Análise Comparativa', 'Padrões Complexos', 'Insights Avançados'],
        icon: FaArrowUp,
        bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      },
      {
        title: 'Correlações Avançadas',
        subtitle: 'Identifique relações entre diferentes indicadores.',
        stats: ['Análise Multivariada', 'Correlações', 'Causalidade'],
        icon: FaChartLine,
        bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
      },
      {
        title: 'Insights Estratégicos',
        subtitle: 'Transforme dados complexos em insights acionáveis.',
        stats: ['Machine Learning', 'Predições', 'Estratégias'],
        icon: FaBullseye,
        bg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
      }
    ]
  };

  return baseBanners[activeSection as keyof typeof baseBanners] || baseBanners.overview;
};

export const VisaoGeralBanner: React.FC<VisaoGeralBannerProps> = ({
  selectedMicroregiao,
  totalMicrorregioes = 89,
  maturidadeMedia = 0.45,
  populacaoAtendida = 21.2,
  activeSection = 'overview'
}) => {
  const banners = getBannersForSection(activeSection);

  return (
    <div className="w-full">
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
    </div>
  );
};

export default VisaoGeralBanner; 
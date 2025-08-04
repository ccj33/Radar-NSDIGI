import React from 'react';
import { InteractiveBanner } from './InteractiveBanner';
import { BannerShowcase } from './BannerShowcase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Lightbulb, 
  TrendingUp, 
  Users, 
  Globe, 
  Activity, 
  BarChart3,
  Smartphone,
  Wifi,
  ChevronRight
} from 'lucide-react';

const BannerExample: React.FC = () => {
  return (
    <div className="space-y-8 p-6">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">
          Banners Interativos
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Exemplos de banners modernos com animações, transições suaves e conteúdo dinâmico que mudam automaticamente
        </p>
      </div>

      {/* Banner Principal Interativo */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Banner Principal</h2>
        <InteractiveBanner />
      </section>

      {/* Showcase de Diferentes Tipos */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Tipos de Banners</h2>
        <BannerShowcase />
      </section>

      {/* Banners Específicos por Categoria */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">Banners por Categoria</h2>
        
        {/* Banner de Serviços Digitais */}
        <Card className="overflow-hidden banner-hover">
          <div className="h-48 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 relative floating-particles">
            <div className="absolute inset-0 bg-black/10"></div>
            <CardContent className="relative h-full flex items-center justify-between p-8">
              <div className="flex-1 text-white space-y-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm animate-pulse-glow">
                    <Smartphone className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold animate-fade-in">Serviços Digitais</h3>
                    <Badge variant="secondary" className="bg-white/20 text-white mt-2">
                      Cobertura Nacional
                    </Badge>
                  </div>
                </div>
                <p className="text-xl opacity-90 max-w-2xl leading-relaxed animate-fade-in-delay">
                  O eixo de 'Serviços Digitais' apresenta maior variabilidade entre microrregiões. 
                  Confira o desempenho da sua região!
                </p>
                <div className="flex gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold">87%</div>
                    <div className="text-sm opacity-80">Cobertura</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">156</div>
                    <div className="text-sm opacity-80">Microrregiões</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>

        {/* Banner de Análise Avançada */}
        <Card className="overflow-hidden banner-hover">
          <div className="h-48 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 relative gradient-animate">
            <CardContent className="relative h-full flex items-center justify-between p-8">
              <div className="flex-1 text-white space-y-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                    <TrendingUp className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold">Tendências em Tempo Real</h3>
                    <Badge variant="secondary" className="bg-white/20 text-white mt-2">
                      Análise Avançada
                    </Badge>
                  </div>
                </div>
                <p className="text-xl opacity-90 max-w-2xl leading-relaxed">
                  Visualize indicadores e métricas em tempo real. Descubra padrões e tendências nos dados de saúde digital.
                </p>
                <div className="flex gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold">+23%</div>
                    <div className="text-sm opacity-80">Crescimento</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">2.4M</div>
                    <div className="text-sm opacity-80">Usuários</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>

        {/* Banner de População */}
        <Card className="overflow-hidden banner-hover">
          <div className="h-48 bg-gradient-to-r from-purple-600 via-violet-600 to-fuchsia-600 relative">
            <div className="absolute inset-0">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white/40 rounded-full animate-bounce"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.3}s`,
                    animationDuration: `${1.5 + Math.random() * 1}s`
                  }}
                />
              ))}
            </div>
            <CardContent className="relative h-full flex items-center justify-between p-8">
              <div className="flex-1 text-white space-y-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                    <Users className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold">População Atendida</h3>
                    <Badge variant="secondary" className="bg-white/20 text-white mt-2">
                      Impacto Social
                    </Badge>
                  </div>
                </div>
                <p className="text-xl opacity-90 max-w-2xl leading-relaxed">
                  Acompanhe a cobertura populacional dos serviços digitais em saúde em cada microrregião do Brasil.
                </p>
                <div className="flex gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold">45M</div>
                    <div className="text-sm opacity-80">Atendidos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">5.570</div>
                    <div className="text-sm opacity-80">Regiões</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
      </section>

      {/* Seção de Estatísticas */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Estatísticas Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: <Smartphone className="w-6 h-6" />, label: "Serviços Ativos", value: "1.2K", color: "bg-blue-500" },
            { icon: <Users className="w-6 h-6" />, label: "Usuários", value: "2.4M", color: "bg-green-500" },
            { icon: <TrendingUp className="w-6 h-6" />, label: "Crescimento", value: "+23%", color: "bg-purple-500" },
            { icon: <Globe className="w-6 h-6" />, label: "Cobertura", value: "87%", color: "bg-orange-500" }
          ].map((stat, index) => (
            <Card key={index} className="banner-hover">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${stat.color} text-white`}>
                    {stat.icon}
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export { BannerExample };
export default BannerExample; 
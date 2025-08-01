import React from 'react';
import { InteractiveBanner } from '@/components/dashboard/InteractiveBanner';
import { BannerShowcase } from '@/components/dashboard/BannerShowcase';
import { BannerExample } from '@/components/dashboard/BannerExample';
import { PersonalizedBanner } from '@/components/dashboard/PersonalizedBanner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BannerTest: React.FC = () => {
  const navigate = useNavigate();

  // Dados mock para teste do PersonalizedBanner
  const mockData = {
    microrregiao: "Belo Horizonte",
    indice_geral: "0.75",
    eixo_1: "0.80",
    eixo_2: "0.65",
    eixo_3: "0.90",
    eixo_4: "0.70",
    eixo_5: "0.85",
    eixo_6: "0.60",
    eixo_7: "0.75"
  };

  const mockMedians = {
    eixo_1: 0.65,
    eixo_2: 0.60,
    eixo_3: 0.70,
    eixo_4: 0.55,
    eixo_5: 0.75,
    eixo_6: 0.50,
    eixo_7: 0.65
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Dashboard
          </Button>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Teste de Banners Interativos
            </h1>
            <p className="text-xl text-gray-600 mt-2">
              Visualize todos os tipos de banners criados para o projeto
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-12">
        {/* Banner Interativo Simples */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900">
                1. Banner Interativo Simples
              </CardTitle>
              <p className="text-gray-600">
                Banner com carrossel automático que muda a cada 5 segundos
              </p>
            </CardHeader>
            <CardContent>
              <InteractiveBanner />
            </CardContent>
          </Card>
        </section>

        {/* Banner Personalizado */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900">
                2. Banner Personalizado com Dados
              </CardTitle>
              <p className="text-gray-600">
                Banner que mostra insights baseados nos dados da microrregião selecionada
              </p>
            </CardHeader>
            <CardContent>
              <PersonalizedBanner 
                selectedData={mockData as any} 
                medians={mockMedians} 
              />
            </CardContent>
          </Card>
        </section>

        {/* Showcase de Diferentes Tipos */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900">
                3. Showcase de Diferentes Tipos
              </CardTitle>
              <p className="text-gray-600">
                Demonstração de diferentes estilos de banners em abas
              </p>
            </CardHeader>
            <CardContent>
              <BannerShowcase />
            </CardContent>
          </Card>
        </section>

        {/* Exemplo Completo */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900">
                4. Exemplo Completo
              </CardTitle>
              <p className="text-gray-600">
                Página completa com todos os tipos de banners e estatísticas
              </p>
            </CardHeader>
            <CardContent>
              <BannerExample />
            </CardContent>
          </Card>
        </section>

        {/* Instruções */}
        <section>
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-blue-900">
                Como Usar os Banners
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-blue-800 mb-2">Funcionalidades:</h4>
                  <ul className="space-y-1 text-sm text-blue-700">
                    <li>• Transições automáticas a cada 5-6 segundos</li>
                    <li>• Navegação manual com setas</li>
                    <li>• Indicadores de progresso clicáveis</li>
                    <li>• Pausa automática no hover</li>
                    <li>• Barra de progresso animada</li>
                    <li>• Responsividade completa</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-800 mb-2">Integração:</h4>
                  <ul className="space-y-1 text-sm text-blue-700">
                    <li>• Já integrado no Dashboard Executivo</li>
                    <li>• Já integrado na seção Overview</li>
                    <li>• Personalizável com dados reais</li>
                    <li>• Animações CSS personalizadas</li>
                    <li>• Compatível com tema existente</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export { BannerTest };
export default BannerTest; 
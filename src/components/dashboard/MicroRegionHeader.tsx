import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MicroRegionData } from '@/types/dashboard';
import { getStatusAppearance } from '@/lib/statusUtils';
import { MapPin, TrendingUp, Target, Mail, User, Building, Users, BarChart3 } from 'lucide-react';
import { formatPopulation } from '@/lib/utils';

interface MicroRegionHeaderProps {
  data: MicroRegionData;
  allData: MicroRegionData[];
}

export function MicroRegionHeader({ data, allData }: MicroRegionHeaderProps) {
  const indiceGeral = parseFloat(String(data.indice_geral).replace(',', '.'));
  const classification = data.classificacao_inmsd || (indiceGeral > 0.66 ? 'Avançado' : indiceGeral > 0.33 ? 'Em Evolução' : 'Emergente');
  const statusAppearance = getStatusAppearance(classification);

  // Calcular ranking da microrregião
  const sortedData = [...allData].sort((a, b) => {
    const aIndex = parseFloat(String(a.indice_geral).replace(',', '.'));
    const bIndex = parseFloat(String(b.indice_geral).replace(',', '.'));
    return bIndex - aIndex;
  });
  
  const ranking = sortedData.findIndex(item => item.microrregiao === data.microrregiao) + 1;
  const totalMicrorregioes = allData.length;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white shadow-2xl">
      {/* Background com gradiente que cobre toda a área */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-80" />
      
      {/* Elementos decorativos de fundo */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100/30 to-purple-100/30 rounded-full -translate-y-32 translate-x-32 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-purple-100/30 to-blue-100/30 rounded-full translate-y-24 -translate-x-24 blur-3xl pointer-events-none" />
      
      {/* Conteúdo principal */}
      <div className="relative z-10 p-8 space-y-8">
        {/* Header Principal */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Coluna Esquerda - Informações Gerais */}
          <div className="flex-1 space-y-6">
            {/* Título e Status */}
        <div className="flex items-center gap-4 min-w-0">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 break-words">{data.microrregiao}</h1>
              <Badge 
                variant={statusAppearance.variant as any}
                className={`${statusAppearance.className} text-sm font-semibold px-4 py-2 shadow-lg`}
              >
                {classification}
              </Badge>
            </div>

            {/* Informações Gerais com melhor estilização */}
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg backdrop-blur-sm">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span><strong>Macrorregião:</strong> {data.macrorregiao}</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg backdrop-blur-sm">
                <Users className="w-5 h-5 text-green-600" />
                <span><strong>População:</strong> {formatPopulation(data.populacao)}</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg backdrop-blur-sm">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                <span><strong>Status INMSD:</strong> {data.classificacao_inmsd}</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg backdrop-blur-sm">
                <Target className="w-5 h-5 text-orange-600" />
                <span><strong>Regional de Saúde:</strong> {data.regional_saude}</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg backdrop-blur-sm">
                <BarChart3 className="w-5 h-5 text-indigo-600" />
                <span><strong>IDH:</strong> {data.idh_completo}</span>
              </div>
            </div>
          </div>

          {/* Coluna Direita - Cards de Índice com melhor estilização */}
          <div className="lg:w-80 space-y-6">
            {/* Índice Geral de Maturidade Digital */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="p-6 text-center relative z-10">
                <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                  {parseFloat(String(data.indice_geral).replace(',', '.')).toFixed(2)}
                </div>
                <div className="text-blue-100 font-medium">
                  Índice Geral de Maturidade Digital
                </div>
              </CardContent>
            </Card>

            {/* Classificação Administrativa */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-gray-50 to-white overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  {data.macro_micro}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  Classificação Administrativa
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Informações de Contato e Municípios */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Informações de Contato */}
          <div className="space-y-6">
            {/* Ponto Focal Central */}
            <div className="p-6 bg-white/60 rounded-xl backdrop-blur-sm border border-white/20">
              <h3 className="font-bold text-gray-900 mb-4 text-lg">Ponto Focal Central</h3>
              <div className="flex items-center gap-3 mb-2">
                <User className="w-5 h-5 text-blue-600" />
                <span className="text-gray-700 font-medium">{data.analista}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-green-600" />
                <a 
                  href={`mailto:${data.email_analista}`}
                  className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                >
                  {data.email_analista}
                </a>
              </div>
            </div>

            {/* Pontos Focais Locais */}
            <div className="p-6 bg-white/60 rounded-xl backdrop-blur-sm border border-white/20">
              <h3 className="font-bold text-gray-900 mb-4 text-lg">Ponto(s) Focal(is) Local(is)</h3>
              {data.ponto_focal.split(' / ').map((pontoFocal, index) => {
                const emails = data.email_ponto_focal.split(' / ');
                return (
                  <div key={index} className="mb-4 last:mb-0">
                    <div className="text-gray-700 mb-2 font-medium">
                      {pontoFocal}
                    </div>
                    {emails[index] && (
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-green-600" />
                        <a 
                          href={`mailto:${emails[index]}`}
                          className="text-blue-600 hover:text-blue-800 hover:underline text-sm"
                        >
                          {emails[index]}
                        </a>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Municípios da Microrregião */}
          <div className="p-6 bg-white/60 rounded-xl backdrop-blur-sm border border-white/20">
            <h3 className="font-bold text-gray-900 mb-4 text-lg">Municípios da Microrregião:</h3>
            <div className="flex flex-wrap gap-3">
              {data.municipios.split(',').map((municipio, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="text-sm bg-white/80 text-gray-700 hover:bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  {municipio.trim()}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
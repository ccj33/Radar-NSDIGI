import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MicroRegionData } from '@/types/dashboard';
import { getStatusAppearance } from '@/lib/statusUtils';
import { MapPin, TrendingUp, Target } from 'lucide-react';

interface MicroRegionHeaderProps {
  data: MicroRegionData;
  allData: MicroRegionData[];
}

export function MicroRegionHeader({ data, allData }: MicroRegionHeaderProps) {
  const indiceGeral = parseFloat(String(data.indice_geral).replace(',', '.'));
  const classification = indiceGeral > 0.66 ? 'Avançado' : indiceGeral > 0.33 ? 'Em Evolução' : 'Emergente';
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
    <Card className="mb-8 border-0 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-md">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                {data.microrregiao}
                <Badge 
                  variant={statusAppearance.variant as any}
                  className={`${statusAppearance.className} text-xs font-semibold`}
                >
                  {classification}
                </Badge>
              </CardTitle>
              <p className="text-gray-600 mt-1">
                {data.macrorregiao} • Ranking: {ranking}º de {totalMicrorregioes}
              </p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-600">
              {(indiceGeral * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600">Índice Geral</div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Maturidade</div>
              <div className="text-lg font-semibold text-gray-900">{classification}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Target className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Ranking</div>
              <div className="text-lg font-semibold text-gray-900">{ranking}º lugar</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
            <div className="p-2 bg-purple-100 rounded-lg">
              <MapPin className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Região</div>
              <div className="text-lg font-semibold text-gray-900">{data.macrorregiao}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 
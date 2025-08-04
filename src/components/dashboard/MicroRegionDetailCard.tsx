import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Users, 
  TrendingUp, 
  Target, 
  BarChart3,
  Mail,
  User,
  Building
} from 'lucide-react';

interface MicroRegionDetailCardProps {
  data: {
    nome: string;
    status: string;
    macrorregiao: string;
    populacao: number;
    statusINMSD: string;
    regionalSaude: string;
    idh: number;
    classificacaoIDH: string;
    indiceMaturidade: number;
    classificacaoAdmin: string;
    pontoFocalCentral: {
      nome: string;
      email: string;
    };
    pontosFocaisLocais: Array<{
      nome: string;
      email: string;
    }>;
    municipios: string[];
  };
}

export const MicroRegionDetailCard: React.FC<MicroRegionDetailCardProps> = ({ data }) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'emergente':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'intermediário':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'avançado':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getIDHColor = (classificacao: string) => {
    switch (classificacao.toLowerCase()) {
      case 'muito alto':
        return 'text-green-600';
      case 'alto':
        return 'text-blue-600';
      case 'médio':
        return 'text-yellow-600';
      case 'baixo':
        return 'text-orange-600';
      case 'muito baixo':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold text-gray-900">{data.nome}</h1>
          <Badge className={`px-3 py-1 text-sm font-medium border ${getStatusColor(data.status)}`}>
            {data.status}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Data */}
        <div className="lg:col-span-2 space-y-4">
          {/* Key Metrics */}
          <Card className="border border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Macrorregião</p>
                    <p className="text-gray-900 font-semibold">{data.macrorregiao}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Users className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">População</p>
                    <p className="text-gray-900 font-semibold">{data.populacao.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Status INMSD</p>
                    <p className="text-gray-900 font-semibold">{data.statusINMSD}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Target className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Regional de Saúde</p>
                    <p className="text-gray-900 font-semibold">{data.regionalSaude}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">IDH</p>
                    <p className={`font-semibold ${getIDHColor(data.classificacaoIDH)}`}>
                      {data.idh.toFixed(3)} - {data.classificacaoIDH}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-gray-900">Ponto Focal Central</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                <User className="w-5 h-5 text-blue-600" />
                <div className="flex-1">
                  <p className="text-gray-900 font-medium">{data.pontoFocalCentral.nome}</p>
                </div>
                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                  <Mail className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="text-sm text-gray-600">
                <a href={`mailto:${data.pontoFocalCentral.email}`} className="text-blue-600 hover:text-blue-700 underline">
                  {data.pontoFocalCentral.email}
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Local Focal Points */}
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-gray-900">Ponto(s) Focal(is) Local(is)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {data.pontosFocaisLocais.map((ponto, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <User className="w-5 h-5 text-gray-600" />
                  <div className="flex-1">
                    <p className="text-gray-900 font-medium">{ponto.nome}</p>
                    <a href={`mailto:${ponto.email}`} className="text-sm text-blue-600 hover:text-blue-700 underline">
                      {ponto.email}
                    </a>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Index Cards */}
        <div className="space-y-4">
          {/* Digital Maturity Index */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-600 to-blue-700 text-white">
            <CardContent className="p-6 text-center">
              <div className="text-4xl font-bold mb-2">{data.indiceMaturidade.toFixed(2)}</div>
              <p className="text-blue-100 text-sm font-medium">Índice Geral de Maturidade Digital</p>
            </CardContent>
          </Card>

          {/* Administrative Classification */}
          <Card className="border border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Building className="w-5 h-5 text-gray-600" />
                <h3 className="font-semibold text-gray-900">Classificação Administrativa</h3>
              </div>
              <p className="text-lg font-bold text-gray-900">{data.classificacaoAdmin}</p>
            </CardContent>
          </Card>

          {/* Municipalities */}
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-gray-900">Municípios da Microrregião</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {data.municipios.map((municipio, index) => (
                  <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-700 border-gray-200">
                    {municipio}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}; 
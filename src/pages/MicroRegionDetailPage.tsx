import React from 'react';
import { MicroRegionDetailCard } from '@/components/dashboard/MicroRegionDetailCard';
import { MicrosoftHeader } from '@/components/dashboard/MicrosoftHeader';

const MicroRegionDetailPage: React.FC = () => {
  // Dados de exemplo baseados na imagem mostrada
  const mockData = {
    nome: "Além Paraíba",
    status: "Emergente",
    macrorregiao: "Sudeste",
    populacao: 52192,
    statusINMSD: "Emergente",
    regionalSaude: "GRS Leopoldina",
    idh: 0.709,
    classificacaoIDH: "Alto",
    indiceMaturidade: 0.14,
    classificacaoAdmin: "Micro - Além Paraíba",
    pontoFocalCentral: {
      nome: "Nilcilene de Oliveira",
      email: "nilcilene.oliveira@saude.mg.gov.br"
    },
    pontosFocaisLocais: [
      {
        nome: "Tânia Mara Pires Corbelli",
        email: "tania.corbelli@saude.mg.gov.br"
      }
    ],
    municipios: [
      "Alem Paraiba",
      "Estrela Dalva", 
      "Pirapetinga",
      "Santo Antonio do Aventureiro",
      "Volta Grande"
    ]
  };

  const handleNavigate = (section: string) => {
    console.log('Navegando para:', section);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MicrosoftHeader 
        activeSection="microrregiao" 
        onNavigate={handleNavigate} 
      />
      
      <main className="pt-6">
        <MicroRegionDetailCard data={mockData} />
      </main>
    </div>
  );
};

export default MicroRegionDetailPage; 
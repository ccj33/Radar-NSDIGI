import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  FileText,
  FileSpreadsheet,
  FileJson,
  Download,
  AlertCircle,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Info,
  Settings,
  ListChecks,
  Wrench,
  ClipboardList,
  ArrowLeft,
  ArrowRight,
  List,
  GalleryHorizontal,
  Target,
  LineChart,
  AlertTriangle,
  Lightbulb
} from "lucide-react";
import { recomendacaoEixo1 } from "@/data/recomendacoesEixo1";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useMacrosRecommendations, MacrosRecommendation } from "@/hooks/useMacrosRecommendations";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { MicroRegionData } from "@/types/dashboard";
import { useMediaQuery } from "@/hooks/use-mobile";
import React from "react"; // Added missing import for React

interface RecommendationsPanelProps {
  data?: MicroRegionData;
  initialEixoIndex?: number;
}

// Componente para formatação de texto otimizada para mobile
export const FormattedText = ({ text, className = "" }: { text: string; className?: string }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  if (!text) return null;

  // Palavras importantes para destacar
  const highlightWords = [
    'estratégia', 'estrutura mínima', 'profissionais', 'saúde digital', 'equipes', 'conceitos básicos',
    'sistemas disponíveis', 'boas práticas', 'formação', 'informal', 'pontual', 'fornecedores de tecnologia',
    'política de educação permanente', 'competências digitais', 'tecnologia', 'políticas públicas',
    'governança', 'grupos de trabalho', 'documentos institucionais', 'articulações', 'planejamento',
    'gestão superior', 'iniciativas', 'alinhamento', 'microrregião', 'municípios', 'decisões', 'soluções digitais'
  ];

  // Função para aplicar negrito nas palavras importantes
  const boldImportantWords = (sentence: string) => {
    let result = sentence;
    highlightWords.forEach(word => {
      // Regex para destacar a palavra, ignorando maiúsculas/minúsculas
      const regex = new RegExp(`(${word})`, 'gi');
      result = result.replace(regex, '<strong>$1</strong>');
    });
    return result;
  };

  // Separar o texto em frases/pontos (pode ser por ponto final ou quebra de linha)
  const items = text.split(/(?<=\.)\s+|\n/).filter(p => p.trim());

  return (
    <ul className={`list-disc pl-5 space-y-2 ${className}`}
        style={{paddingLeft: isMobile ? '1.2em' : '2em'}}>
      {items.map((item, idx) => (
        <li key={idx} className="text-sm leading-relaxed text-gray-700" dangerouslySetInnerHTML={{ __html: boldImportantWords(item.trim()) }} />
      ))}
    </ul>
  );
};

// Componente para tabs otimizadas para mobile
const MobileTabs = ({ defaultValue, children }: { defaultValue: string; children: React.ReactNode }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  return (
    <Tabs defaultValue={defaultValue} className={isMobile ? "space-y-4" : ""}>
      {children}
    </Tabs>
  );
};

const ToolCard = ({ ferramenta }: { ferramenta: { id: number; tipo: string; titulo: string; descricao: string } }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return <FileText className="h-8 w-8 text-red-500" />;
      case 'word':
        return <FileJson className="h-8 w-8 text-blue-500" />;
      case 'excel':
        return <FileSpreadsheet className="h-8 w-8 text-green-500" />;
      default:
        return <FileText className="h-8 w-8 text-gray-500" />;
    }
  };

  if (isMobile) {
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            {getFileIcon(ferramenta.tipo)}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-gray-800 mb-1">{ferramenta.titulo}</p>
              <p className="text-xs text-gray-500 mb-3">{ferramenta.descricao}</p>
              <Button size="sm" variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Baixar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4 flex items-center gap-4">
        {getFileIcon(ferramenta.tipo)}
        <div className="flex-1">
          <p className="font-semibold text-sm text-gray-800">{ferramenta.titulo} ({ferramenta.tipo})</p>
          <p className="text-xs text-gray-500">{ferramenta.descricao}</p>
        </div>
        <Button size="sm" variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Baixar
        </Button>
      </CardContent>
    </Card>
  );
};

const RecommendationStep = ({ recomendacao, index, isLast }: { recomendacao: { id: number; titulo: string; detalhes: string }, index: number, isLast: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  if (isMobile) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-500 text-white font-bold text-sm">
              {index + 1}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-800 text-sm mb-2">{recomendacao.titulo}</p>
            <Button 
              variant="link" 
              size="sm" 
              className="px-0 text-xs h-auto p-0"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? "Ocultar detalhes" : "Ver detalhes"}
              {isOpen ? <ChevronDown className="h-3 w-3 ml-1" /> : <ChevronRight className="h-3 w-3 ml-1" />}
            </Button>
            {isOpen && recomendacao.detalhes && recomendacao.detalhes.trim() !== '' && recomendacao.detalhes.trim() !== recomendacao.titulo.trim() && (
              <div className="mt-3 p-3 bg-gray-50 rounded-md border">
                <FormattedText text={recomendacao.detalhes} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <div className="flex flex-col items-center mr-4">
        <div>
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-500 text-white font-bold">
            {index + 1}
          </div>
        </div>
        {!isLast && <div className="w-px h-full bg-gray-300" />}
      </div>
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
        <div className="pb-8 w-full">
          <p className="font-semibold text-gray-800">{recomendacao.titulo}</p>
          <CollapsibleTrigger asChild>
            <Button variant="link" size="sm" className="px-0 text-xs">
              {isOpen ? "Ocultar detalhes" : "Ver detalhes"}
              {isOpen ? <ChevronDown className="h-4 w-4 ml-1" /> : <ChevronRight className="h-4 w-4 ml-1" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            {recomendacao.detalhes && recomendacao.detalhes.trim() !== '' && recomendacao.detalhes.trim() !== recomendacao.titulo.trim() && (
              <p className="text-sm text-gray-600 mt-2 p-4 bg-gray-50 rounded-md border">
                <FormattedText text={recomendacao.detalhes} />
              </p>
            )}
          </CollapsibleContent>
        </div>
      </Collapsible>
    </div>
  );
};

const getColorClasses = (color: string) => {
    const colorMap = {
      blue: { bg: "bg-blue-100", text: "text-blue-600", border: "border-blue-200" },
      green: { bg: "bg-green-100", text: "text-green-600", border: "border-green-200" },
      purple: { bg: "bg-purple-100", text: "text-purple-600", border: "border-purple-200" },
      orange: { bg: "bg-orange-100", text: "text-orange-600", border: "border-orange-200" },
      red: { bg: "bg-red-100", text: "text-red-600", border: "border-red-200" },
      teal: { bg: "bg-teal-100", text: "text-teal-600", border: "border-teal-200" },
      indigo: { bg: "bg-indigo-100", text: "text-indigo-600", border: "border-indigo-200" }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

export function RecommendationsPanel({ data, initialEixoIndex = 0 }: RecommendationsPanelProps) {
  const [currentEixoIndex, setCurrentEixoIndex] = useState(initialEixoIndex);
  const [viewMode, setViewMode] = useState<'list' | 'carousel'>('carousel');
  const { data: macrosData, loading: macrosLoading, error: macrosError } = useMacrosRecommendations();
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  // Função para processar os dados dos eixos baseados nos dados reais
  const processEixosData = () => {
    if (!data) return [];
    
    const eixosNames = [
      "Gestão e Governança",
      "Infraestrutura e Conectividade", 
      "Sistemas e Dados",
      "Capacitação e Desenvolvimento",
      "Serviços Digitais",
      "Cidadania Digital",
      "Inovação e Pesquisa"
    ];
    
    const eixosColors = ["blue", "green", "purple", "orange", "red", "teal", "indigo"];
    
    return eixosNames.map((nome, index) => {
      const eixoKey = `eixo_${index + 1}` as keyof MicroRegionData;
      const pontuacao = Math.round(parseFloat(String(data[eixoKey] || 0).replace(',', '.')) * 100) / 100;
      
      // Determinar classificação baseada na pontuação
      let classificacao = "Emergente";
      if (pontuacao >= 0.6) classificacao = "Avançado";
      else if (pontuacao >= 0.5) classificacao = "Em Evolução 2";
      else if (pontuacao >= 0.4) classificacao = "Em Evolução 1";
      else if (pontuacao >= 0.3) classificacao = "Emergente 2";
      
      return {
        id: index + 1,
        nome,
        pontuacao,
        classificacao,
        icon: Settings,
        color: eixosColors[index],
        situacaoAtual: `Situação atual do eixo ${nome}`
      };
    });
  };
  
  const eixosData = processEixosData();
  const currentEixo = eixosData[currentEixoIndex];
  const Icon = currentEixo?.icon;
  
  // Função para obter recomendações baseadas na classificação do eixo
  const getRecommendationsForEixo = (eixoId: number, classificacao: string) => {
    if (!macrosData || macrosData.length === 0) return { recomendacoes: [], ferramentas: [] };
    
    // Mapear o ID do eixo para o nome no macros.xlsx
    const eixoMapping: { [key: number]: string } = {
      1: 'eixo_1',
      2: 'eixo_2', 
      3: 'eixo_3',
      4: 'eixo_4',
      5: 'eixo_5',
      6: 'eixo_6',
      7: 'eixo_7'
    };
    
    const eixoKey = eixoMapping[eixoId];
    if (!eixoKey) return { recomendacoes: [], ferramentas: [] };
    
    // Encontrar o eixo correspondente no macros.xlsx
    const eixoData = macrosData.find(item => item.eixo === eixoKey);
    if (!eixoData) return { recomendacoes: [], ferramentas: [] };
    
    // Determinar qual tier usar baseado na classificação
    let tier = 'emergente1';
    if (classificacao.includes('Evolução 1')) tier = 'evolucao1';
    else if (classificacao.includes('Evolução 2')) tier = 'evolucao2';
    else if (classificacao.includes('Avançado')) tier = 'avancado';
    else if (classificacao.includes('Emergente 2')) tier = 'emergente2';
    
    console.log(`Classificação recebida: "${classificacao}" -> Tier selecionado: "${tier}"`);
    console.log(`Classificação inclui 'Evolução 1': ${classificacao.includes('Evolução 1')}`);
    console.log(`Classificação inclui 'Evolução 2': ${classificacao.includes('Evolução 2')}`);
    console.log(`Classificação inclui 'Avançado': ${classificacao.includes('Avançado')}`);
    console.log(`Classificação inclui 'Emergente 2': ${classificacao.includes('Emergente 2')}`);
    
    // Buscar os dados específicos do tier
    const situacao = eixoData[`${tier}_situacao`] || '';
    const recomendacoesText = eixoData[`${tier}_recomendacoes`] || '';
    const ferramentasText = eixoData[`${tier}_ferramentas`] || '';
    
    // Debug: verificar se os dados estão sendo encontrados
    console.log(`Eixo ${eixoId} - Classificação: ${classificacao} - Tier: ${tier}`);
    console.log(`Dados encontrados:`, {
      eixo: eixoKey,
      tier,
      situacao: situacao ? 'Sim' : 'Não',
      recomendacoes: recomendacoesText ? 'Sim' : 'Não',
      ferramentas: ferramentasText ? 'Sim' : 'Não'
    });
    if (recomendacoesText) {
      console.log(`Texto das recomendações:`, recomendacoesText.substring(0, 500) + '...');
      console.log(`Texto completo das recomendações:`, recomendacoesText);
    }
    
         // Processar recomendações - dividir por números (1., 2., 3., etc.)
     console.log(`Dividindo texto por números...`);
     const partes = recomendacoesText ? recomendacoesText.split(/(?=\d+\.)/) : [];
     console.log(`Partes encontradas:`, partes.length);
     partes.forEach((parte, index) => {
       console.log(`Parte ${index + 1}:`, parte.substring(0, 100) + '...');
     });
     
     const recomendacoes = recomendacoesText ? recomendacoesText
       .split(/(?=\d+\.)/) // Dividir por números seguidos de ponto
       .filter(rec => rec.trim()) // Remover itens vazios
       .map((rec, index) => {
         const lines = rec.trim().split('\n').filter(line => line.trim());
         const titulo = lines[0] || '';
         
         // Procurar por "Recomendação:" no texto - regex mais robusta
         const recomendacaoMatch = rec.match(/Recomendação:\s*([^]*?)(?=\nComo implementar|\n\d+\.|$)/);
         let recomendacao = recomendacaoMatch ? recomendacaoMatch[1].trim() : '';
         
         // Fallback: se não encontrou "Recomendação:", procurar por texto após o título
         if (!recomendacao && lines.length > 1) {
           const segundaLinha = lines[1];
           if (segundaLinha && !segundaLinha.includes('Como implementar') && !segundaLinha.startsWith('-')) {
             recomendacao = segundaLinha;
           }
         }
         
         console.log(`[Debug] Texto completo da parte:`, rec);
         console.log(`[Debug] Match da recomendação:`, recomendacaoMatch);
         
         // Procurar por "Como implementar:" no texto
         const implementacaoMatch = rec.match(/Como implementar[^:]*:\s*([\s\S]*?)(?=\d+\.|$)/);
         const implementacaoText = implementacaoMatch ? implementacaoMatch[1].trim() : '';
         
         // Extrair passos de implementação (linhas que começam com -)
         const implementacao = implementacaoText ? 
           implementacaoText.split('\n')
             .filter(line => line.trim().startsWith('-'))
             .map(line => line.replace(/^-\s*/, '').trim())
             .filter(line => line.length > 0) : [];
         
         console.log(`[Processamento] Tópico: ${titulo.replace(/^\d+\.\s*/, '')}`);
         console.log(`[Processamento] Recomendação encontrada: ${recomendacao ? 'Sim' : 'Não'}`);
         console.log(`[Processamento] Texto da recomendação: "${recomendacao}"`);
         console.log(`[Processamento] Passos de implementação: ${implementacao.length}`);
         
         return {
      id: index + 1,
           titulo: titulo.replace(/^\d+\.\s*/, ''), // Remove o número do início
           detalhes: recomendacao,
           implementacao: implementacao
         };
       }) : [];
    
    console.log(`Recomendações processadas para ${tier}:`, recomendacoes.length, 'itens');
    recomendacoes.forEach((rec, index) => {
      console.log(`  ${index + 1}. ${rec.titulo.substring(0, 50)}...`);
      console.log(`     Detalhes: ${rec.detalhes.substring(0, 100)}...`);
      console.log(`     Implementação: ${rec.implementacao.length} passos`);
    });
    
    // Processar ferramentas (dividir por quebras de linha)
    const ferramentas = ferramentasText ? ferramentasText.split('\n').filter(line => line.trim()).map((ferramenta, index) => ({
      id: index + 1,
      tipo: 'PDF',
      titulo: ferramenta.trim(),
      descricao: `Ferramenta para: ${ferramenta.trim()}`
    })) : [];
    
    console.log(`[Final] Retornando ${recomendacoes.length} recomendações para tier ${tier}`);
    console.log(`[Final] Primeira recomendação:`, recomendacoes[0]);
    return { situacao, recomendacoes, ferramentas };
  };

  const colorClasses = getColorClasses(currentEixo?.color || "blue");
  
  // Debug: verificar dados do eixo atual (após a definição da função)
  if (currentEixo) {
    const eixoRecommendations = getRecommendationsForEixo(currentEixo.id, currentEixo.classificacao);
    console.log(`[Debug] Eixo ${currentEixo.id} - ${currentEixo.classificacao}:`, eixoRecommendations.recomendacoes.length, 'recomendações');
    console.log(`[Debug] Dados completos:`, eixoRecommendations.recomendacoes);
  }

  return (
    <div className="space-y-8">
      {/* Header Moderno */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 rounded-xl shadow-sm">
              <Icon className="h-8 w-8 text-blue-600" />
          </div>
          <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Recomendações para Microrregião
              </h2>
              <p className="text-lg text-gray-600">
                Navegue pelos 7 eixos estratégicos de maturidade digital
              </p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Seletor de Modo de Visualização */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-gray-700">Modo de Visualização:</span>
            <ToggleGroup 
              type="single" 
              value={viewMode}
              onValueChange={(value) => value && setViewMode(value as 'list' | 'carousel')}
                className="bg-white rounded-lg p-1 shadow-sm border border-gray-200"
            >
              <ToggleGroupItem 
                value="list" 
                  className="data-[state=on]:bg-blue-600 data-[state=on]:text-white px-4 py-2 rounded-md transition-all duration-200 hover:bg-blue-50"
                aria-label="Visualização em lista"
              >
                <div className="flex items-center gap-2">
                  <List className="h-4 w-4" />
                  <span className="text-sm font-medium">Lista</span>
                </div>
              </ToggleGroupItem>
              <ToggleGroupItem 
                value="carousel" 
                  className="data-[state=on]:bg-blue-600 data-[state=on]:text-white px-4 py-2 rounded-md transition-all duration-200 hover:bg-blue-50"
                aria-label="Visualização em carrossel"
              >
                <div className="flex items-center gap-2">
                  <GalleryHorizontal className="h-4 w-4" />
                  <span className="text-sm font-medium">Carrossel</span>
                </div>
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          
          {/* Contador */}
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200">
              <span className="text-sm font-medium text-gray-700">Progresso:</span>
              <span className="text-sm font-bold text-blue-600">
              {viewMode === 'carousel' 
                ? `${currentEixoIndex + 1} de ${eixosData.length}`
                : `${eixosData.length} eixos`
              }
            </span>
            </div>
          </div>
        </div>
      </div>

      {/* Instrução de Ajuda Moderna */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-indigo-100 rounded-lg flex-shrink-0">
            <Info className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Como Navegar</h3>
            <p className="text-gray-600 leading-relaxed">
              Use o modo <strong className="text-indigo-700">Carrossel</strong> para navegar entre os 7 eixos um por vez, 
              ou alterne para o modo <strong className="text-indigo-700">Lista</strong> para ver todos os eixos de uma vez. 
              Cada eixo contém <strong className="text-indigo-700">diagnóstico</strong>, <strong className="text-indigo-700">plano de ação</strong> e 
              <strong className="text-indigo-700"> kit de ferramentas</strong> para ajudar no desenvolvimento da maturidade 
              digital da sua região.
            </p>
          </div>
        </div>
      </div>

      {/* Container do Carrossel com overflow hidden */}
      <div className="relative overflow-hidden px-8 sm:px-12">
        {viewMode === 'carousel' ? (
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
            onSelect={(api) => {
              if (api && typeof api === 'object' && 'selectedScrollSnap' in api) {
                setCurrentEixoIndex((api as any).selectedScrollSnap());
              }
            }}
          >
            <CarouselContent>
              {eixosData.map((eixo, index) => {
                const EixoIcon = eixo.icon;
                const eixoColorClasses = getColorClasses(eixo.color);
                const eixoRecommendations = getRecommendationsForEixo(eixo.id, eixo.classificacao);
                
                return (
                  <CarouselItem key={eixo.id} className="md:basis-1/1 lg:basis-1/1">
                    <Card className="shadow-xl border-0 overflow-hidden">
                      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b border-gray-200">
                        <div className="flex items-center gap-6">
                          <div className={`p-4 rounded-xl shadow-sm ${eixoColorClasses.bg}`}>
                            <EixoIcon className={`h-10 w-10 ${eixoColorClasses.text}`} />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">
                              Eixo {eixo.id} - {eixo.nome}
                            </h3>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-600">Pontuação:</span>
                                <span className="text-lg font-bold text-gray-800">{eixo.pontuacao.toFixed(2)}</span>
                            </div>
                              <Badge 
                                variant="secondary" 
                                className={`px-3 py-1 text-sm font-semibold ${
                                  eixo.classificacao === 'Emergente' ? 'bg-orange-100 text-orange-700 border-orange-200' :
                                  eixo.classificacao === 'Evolução' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                                  'bg-green-100 text-green-700 border-green-200'
                                }`}
                              >
                                {eixo.classificacao}
                              </Badge>
                          </div>
                        </div>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <MobileTabs defaultValue="diagnostico">
                          <TabsList className={`grid w-full bg-gray-100 p-1 rounded-xl ${isMobile ? 'grid-cols-1 gap-2' : 'grid-cols-3'}`}>
                            <TabsTrigger 
                              value="diagnostico" 
                              className={`${isMobile ? 'flex-col py-4' : 'py-3'} data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-600 rounded-lg transition-all duration-200`}
                            >
                              <AlertCircle className={`${isMobile ? 'h-6 w-6 mb-2' : 'h-5 w-5 mr-2'}`}/>
                              <span className="font-medium">Diagnóstico</span>
                            </TabsTrigger>
                            <TabsTrigger 
                              value="plano" 
                              className={`${isMobile ? 'flex-col py-4' : 'py-3'} data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-600 rounded-lg transition-all duration-200`}
                            >
                              <ListChecks className={`${isMobile ? 'h-6 w-6 mb-2' : 'h-5 w-5 mr-2'}`}/>
                              <span className="font-medium">{isMobile ? 'Plano de Ação' : 'Plano de Ação'}</span>
                            </TabsTrigger>
                            <TabsTrigger 
                              value="ferramentas" 
                              className={`${isMobile ? 'flex-col py-4' : 'py-3'} data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-600 rounded-lg transition-all duration-200`}
                            >
                              <Wrench className={`${isMobile ? 'h-6 w-6 mb-2' : 'h-5 w-5 mr-2'}`}/>
                              <span className="font-medium">{isMobile ? 'Ferramentas' : 'Kit de Ferramentas'}</span>
                            </TabsTrigger>
                          </TabsList>

                          <TabsContent value="diagnostico" className="pt-6">
                            <div className="space-y-6">
                              {/* Header da seção */}
                              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                  <Info className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                  <h3 className="text-lg font-semibold text-gray-800">Diagnóstico da Situação</h3>
                                  <p className="text-sm text-gray-600">Análise detalhada do cenário atual do eixo</p>
                                </div>
                              </div>

                              {/* Conteúdo do diagnóstico */}
                              {macrosLoading ? (
                                <div className="flex items-center justify-center py-12">
                                  <div className="text-center">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-3"></div>
                                    <p className="text-sm text-gray-500">Carregando diagnóstico...</p>
                                  </div>
                                </div>
                              ) : (eixoRecommendations.situacao || eixo.situacaoAtual) ? (
                                <div className="space-y-6">
                                  <Card className="bg-blue-50 border-blue-200">
                                    <CardHeader className="flex flex-row items-center gap-3 pb-2">
                                      <Info className="h-5 w-5 text-blue-600" />
                                      <CardTitle className="text-lg text-blue-800">Análise Atual</CardTitle>
                              </CardHeader>
                              <CardContent>
                                  <FormattedText 
                                    text={eixoRecommendations.situacao || eixo.situacaoAtual} 
                                  />
                              </CardContent>
                            </Card>
                                  
                                  {/* Indicadores visuais */}
                                  <div className="grid gap-4 md:grid-cols-3">
                                    <Card>
                                      <CardContent className="p-4 flex items-center gap-4">
                                        <div className="p-3 bg-blue-100 rounded-lg">
                                          <LineChart className="h-6 w-6 text-blue-600" />
                                        </div>
                                        <div>
                                          <h5 className="font-semibold text-gray-800">Situação Atual</h5>
                                          <p className="text-xs text-gray-600">Diagnóstico completo</p>
                                        </div>
                                      </CardContent>
                                    </Card>
                                    <Card>
                                      <CardContent className="p-4 flex items-center gap-4">
                                        <div className="p-3 bg-orange-100 rounded-lg">
                                          <AlertTriangle className="h-6 w-6 text-orange-600" />
                                        </div>
                                        <div>
                                          <h5 className="font-semibold text-gray-800">Pontos de Atenção</h5>
                                          <p className="text-xs text-gray-600">Identificados</p>
                                        </div>
                                      </CardContent>
                                    </Card>
                                    <Card>
                                      <CardContent className="p-4 flex items-center gap-4">
                                        <div className="p-3 bg-green-100 rounded-lg">
                                          <Lightbulb className="h-6 w-6 text-green-600" />
                                        </div>
                                        <div>
                                          <h5 className="font-semibold text-gray-800">Oportunidades</h5>
                                          <p className="text-xs text-gray-600">Para melhoria</p>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  </div>
                                </div>
                              ) : (
                                <Card className="border-0 bg-gray-50">
                                  <CardContent className="p-8 text-center">
                                    <div className="p-3 bg-gray-200 rounded-full w-fit mx-auto mb-4">
                                      <Info className="h-8 w-8 text-gray-500" />
                                    </div>
                                    <h4 className="text-lg font-semibold text-gray-700 mb-2">Diagnóstico em Desenvolvimento</h4>
                                    <p className="text-sm text-gray-500">
                                      Estamos preparando uma análise detalhada da situação atual deste eixo. 
                                      Em breve você terá acesso ao diagnóstico completo.
                                    </p>
                                  </CardContent>
                                </Card>
                              )}
                            </div>
                          </TabsContent>

                          <TabsContent value="plano" className="pt-6">
                            <div className="space-y-6">
                              {/* Header da seção */}
                              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100">
                                <div className="p-2 bg-purple-100 rounded-lg">
                                  <ClipboardList className="h-6 w-6 text-purple-600" />
                                </div>
                                <div>
                                  <h3 className="text-lg font-semibold text-gray-800">Plano de Ação Estratégico</h3>
                                  <p className="text-sm text-gray-600">Recomendações personalizadas para o desenvolvimento da microrregião</p>
                                </div>
                              </div>

                              {/* Conteúdo das recomendações */}
                                {macrosLoading ? (
                                <div className="flex items-center justify-center py-12">
                                  <div className="text-center">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-3"></div>
                                    <p className="text-sm text-gray-500">Carregando plano de ação...</p>
                                  </div>
                                </div>
                                ) : eixoRecommendations.recomendacoes.length > 0 ? (
                                <div className="space-y-6">
                                  {eixoRecommendations.recomendacoes.map((rec, index) => (
                                    <Card key={rec.id} className="border-0 shadow-sm hover:shadow-md transition-all duration-300 bg-white overflow-hidden">
                                      {/* Header do Tópico */}
                                      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b border-gray-200">
                                        <div className="flex items-start gap-4">
                                          {/* Número do Tópico */}
                                          <div className="flex-shrink-0">
                                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-xl shadow-lg">
                                              {index + 1}
                                            </div>
                                          </div>
                                          
                                          {/* Título do Tópico */}
                                          <div className="flex-1 min-w-0">
                                            <h4 className="text-lg font-semibold text-gray-800 leading-tight mb-2">
                                              {rec.titulo}
                                            </h4>
                                            <Badge variant="secondary" className="bg-purple-100 text-purple-700 border-purple-200">
                                              Tópico Estratégico
                                            </Badge>
                                          </div>
                                        </div>
                                      </div>

                                      {/* Conteúdo Expandível */}
                                      <div className="p-6">
                                        {/* Seção de Recomendação */}
                                        <div className="mb-6">
                                          <div className="flex items-start gap-3 mb-3">
                                            <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                                              <CheckCircle className="h-5 w-5 text-green-600" />
                                            </div>
                                            <div className="flex-1">
                                              <h5 className="font-semibold text-gray-800 mb-2">Recomendação</h5>
                                              <p className="text-sm text-gray-600 leading-relaxed">
                                                {rec.detalhes}
                                              </p>
                                            </div>
                                          </div>
                                        </div>

                                        {/* Seção de Implementação */}
                                        <div>
                                          <div className="flex items-start gap-3 mb-4">
                                            <div className="p-2 bg-orange-100 rounded-lg flex-shrink-0">
                                              <Target className="h-5 w-5 text-orange-600" />
                                            </div>
                                            <div className="flex-1">
                                              <h5 className="font-semibold text-gray-800 mb-3">Como implementar a recomendação:</h5>
                                              
                                              {/* Lista de Passos */}
                                              <div className="space-y-3">
                                                {rec.implementacao && rec.implementacao.map((passo, passoIndex) => (
                                                  <div key={passoIndex} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                                                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white text-xs font-bold flex-shrink-0 mt-0.5">
                                                      {passoIndex + 1}
                                                    </div>
                                                    <p className="text-sm text-gray-700 leading-relaxed">
                                                      {passo}
                                                    </p>
                                                  </div>
                                                ))}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </Card>
                                  ))}
                                </div>
                              ) : (
                                <Card className="border-0 bg-gray-50">
                                  <CardContent className="p-8 text-center">
                                    <div className="p-3 bg-gray-200 rounded-full w-fit mx-auto mb-4">
                                      <ClipboardList className="h-8 w-8 text-gray-500" />
                                    </div>
                                    <h4 className="text-lg font-semibold text-gray-700 mb-2">Plano de Ação em Desenvolvimento</h4>
                                    <p className="text-sm text-gray-500">
                                      Estamos preparando recomendações personalizadas para este eixo. 
                                      Em breve você terá acesso a um plano de ação completo.
                                    </p>
                              </CardContent>
                            </Card>
                              )}
                            </div>
                          </TabsContent>

                          <TabsContent value="ferramentas" className="pt-6">
                            <div className="space-y-6">
                              {/* Header da seção */}
                              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100">
                                <div className="p-2 bg-green-100 rounded-lg">
                                  <Wrench className="h-6 w-6 text-green-600" />
                                </div>
                                <div>
                                  <h3 className="text-lg font-semibold text-gray-800">Kit de Ferramentas</h3>
                                  <p className="text-sm text-gray-600">Recursos e materiais para implementação das recomendações</p>
                                </div>
                              </div>

                              {/* Conteúdo das ferramentas */}
                                {macrosLoading ? (
                                <div className="flex items-center justify-center py-12">
                                  <div className="text-center">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-3"></div>
                                    <p className="text-sm text-gray-500">Carregando ferramentas...</p>
                                  </div>
                                </div>
                                ) : eixoRecommendations.ferramentas.length > 0 ? (
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                  {eixoRecommendations.ferramentas.map((ferramenta) => (
                                    <Card key={ferramenta.id} className="group hover:shadow-lg transition-all duration-300 border bg-white overflow-hidden">
                                      <CardContent className="p-6">
                                        <div className="flex items-start gap-4">
                                          {/* Ícone da ferramenta */}
                                          <div className="flex-shrink-0">
                                            <div className="p-3 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                                              <FileText className="h-6 w-6 text-green-600" />
                                            </div>
                                          </div>
                                          
                                          {/* Conteúdo da ferramenta */}
                                          <div className="flex-1 min-w-0">
                                            <h4 className="font-semibold text-gray-800 mb-2 leading-tight">
                                              {ferramenta.titulo}
                                            </h4>
                                            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                                              {ferramenta.descricao}
                                            </p>
                                            
                                          </div>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  ))}
                                </div>
                              ) : (
                                <Card className="border-0 bg-gray-50">
                                  <CardContent className="p-8 text-center">
                                    <div className="p-3 bg-gray-200 rounded-full w-fit mx-auto mb-4">
                                      <Wrench className="h-8 w-8 text-gray-500" />
                                    </div>
                                    <h4 className="text-lg font-semibold text-gray-700 mb-2">Kit de Ferramentas em Desenvolvimento</h4>
                                    <p className="text-sm text-gray-500">
                                      Estamos preparando ferramentas e recursos específicos para este eixo. 
                                      Em breve você terá acesso a materiais de apoio completos.
                                    </p>
                              </CardContent>
                            </Card>
                              )}
                            </div>
                          </TabsContent>
                        </MobileTabs>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            
            {/* Botões de navegação posicionados fora do container de overflow */}
            <CarouselPrevious className="absolute -left-4 top-24 -translate-y-1/2 h-12 w-12 bg-white/80 backdrop-blur-sm border-2 border-white shadow-lg hover:bg-white transition-all z-20" />
            <CarouselNext className="absolute -right-4 top-24 -translate-y-1/2 h-12 w-12 bg-white/80 backdrop-blur-sm border-2 border-white shadow-lg hover:bg-white transition-all z-20" />

          </Carousel>
        ) : (
          // Modo Lista - Mostra todos os eixos de uma vez
          <div className="space-y-6">
            {eixosData.map((eixo, index) => {
              const EixoIcon = eixo.icon;
              const eixoColorClasses = getColorClasses(eixo.color);
              const eixoRecommendations = getRecommendationsForEixo(eixo.id, eixo.classificacao);
              
              return (
                <Card key={eixo.id} className="shadow-xl border-0 overflow-hidden">
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b border-gray-200">
                    <div className="flex items-center gap-6">
                      <div className={`p-4 rounded-xl shadow-sm ${eixoColorClasses.bg}`}>
                        <EixoIcon className={`h-10 w-10 ${eixoColorClasses.text}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">
                          Eixo {eixo.id} - {eixo.nome}
                        </h3>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-600">Pontuação:</span>
                            <span className="text-lg font-bold text-gray-800">{eixo.pontuacao.toFixed(2)}</span>
                        </div>
                          <Badge 
                            variant="secondary" 
                            className={`px-3 py-1 text-sm font-semibold ${
                              eixo.classificacao === 'Emergente' ? 'bg-orange-100 text-orange-700 border-orange-200' :
                              eixo.classificacao === 'Evolução' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                              'bg-green-100 text-green-700 border-green-200'
                            }`}
                          >
                            {eixo.classificacao}
                          </Badge>
                      </div>
                    </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <MobileTabs defaultValue="diagnostico">
                      <TabsList className={`grid w-full bg-gray-100 p-1 rounded-xl ${isMobile ? 'grid-cols-1 gap-2' : 'grid-cols-3'}`}>
                        <TabsTrigger 
                          value="diagnostico" 
                          className={`${isMobile ? 'flex-col py-4' : 'py-3'} data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-600 rounded-lg transition-all duration-200`}
                        >
                          <AlertCircle className={`${isMobile ? 'h-6 w-6 mb-2' : 'h-5 w-5 mr-2'}`}/>
                          <span className="font-medium">Diagnóstico</span>
                        </TabsTrigger>
                        <TabsTrigger 
                          value="plano" 
                          className={`${isMobile ? 'flex-col py-4' : 'py-3'} data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-600 rounded-lg transition-all duration-200`}
                        >
                          <ListChecks className={`${isMobile ? 'h-6 w-6 mb-2' : 'h-5 w-5 mr-2'}`}/>
                          <span className="font-medium">{isMobile ? 'Plano de Ação' : 'Plano de Ação'}</span>
                        </TabsTrigger>
                        <TabsTrigger 
                          value="ferramentas" 
                          className={`${isMobile ? 'flex-col py-4' : 'py-3'} data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-600 rounded-lg transition-all duration-200`}
                        >
                          <Wrench className={`${isMobile ? 'h-6 w-6 mb-2' : 'h-5 w-5 mr-2'}`}/>
                          <span className="font-medium">{isMobile ? 'Ferramentas' : 'Kit de Ferramentas'}</span>
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="diagnostico" className="pt-6">
                        <div className="space-y-6">
                          {/* Header da seção */}
                          <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <Info className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-800">Diagnóstico da Situação</h3>
                              <p className="text-sm text-gray-600">Análise detalhada do cenário atual do eixo</p>
                            </div>
                          </div>

                          {/* Conteúdo do diagnóstico */}
                          {macrosLoading ? (
                            <div className="flex items-center justify-center py-12">
                              <div className="text-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-3"></div>
                                <p className="text-sm text-gray-500">Carregando diagnóstico...</p>
                              </div>
                            </div>
                          ) : (eixoRecommendations.situacao || eixo.situacaoAtual) ? (
                            <div className="space-y-6">
                              <Card className="bg-blue-50 border-blue-200">
                                <CardHeader className="flex flex-row items-center gap-3 pb-2">
                                  <Info className="h-5 w-5 text-blue-600" />
                                  <CardTitle className="text-lg text-blue-800">Análise Atual</CardTitle>
                          </CardHeader>
                          <CardContent>
                              <FormattedText 
                                text={eixoRecommendations.situacao || eixo.situacaoAtual} 
                              />
                          </CardContent>
                        </Card>
                              
                              {/* Indicadores visuais */}
                              <div className="grid gap-4 md:grid-cols-3">
                                <Card>
                                  <CardContent className="p-4 flex items-center gap-4">
                                    <div className="p-3 bg-blue-100 rounded-lg">
                                      <LineChart className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <div>
                                      <h5 className="font-semibold text-gray-800">Situação Atual</h5>
                                      <p className="text-xs text-gray-600">Diagnóstico completo</p>
                                    </div>
                                  </CardContent>
                                </Card>
                                <Card>
                                  <CardContent className="p-4 flex items-center gap-4">
                                    <div className="p-3 bg-orange-100 rounded-lg">
                                      <AlertTriangle className="h-6 w-6 text-orange-600" />
                                    </div>
                                    <div>
                                      <h5 className="font-semibold text-gray-800">Pontos de Atenção</h5>
                                      <p className="text-xs text-gray-600">Identificados</p>
                                    </div>
                                  </CardContent>
                                </Card>
                                <Card>
                                  <CardContent className="p-4 flex items-center gap-4">
                                    <div className="p-3 bg-green-100 rounded-lg">
                                      <Lightbulb className="h-6 w-6 text-green-600" />
                                    </div>
                                    <div>
                                      <h5 className="font-semibold text-gray-800">Oportunidades</h5>
                                      <p className="text-xs text-gray-600">Para melhoria</p>
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>
                            </div>
                          ) : (
                            <Card className="border-0 bg-gray-50">
                              <CardContent className="p-8 text-center">
                                <div className="p-3 bg-gray-200 rounded-full w-fit mx-auto mb-4">
                                  <Info className="h-8 w-8 text-gray-500" />
                                </div>
                                <h4 className="text-lg font-semibold text-gray-700 mb-2">Diagnóstico em Desenvolvimento</h4>
                                <p className="text-sm text-gray-500">
                                  Estamos preparando uma análise detalhada da situação atual deste eixo. 
                                  Em breve você terá acesso ao diagnóstico completo.
                                </p>
                              </CardContent>
                            </Card>
                          )}
                        </div>
                      </TabsContent>

                      <TabsContent value="plano" className="pt-6">
                        <div className="space-y-6">
                          {/* Header da seção */}
                          <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100">
                            <div className="p-2 bg-purple-100 rounded-lg">
                              <ClipboardList className="h-6 w-6 text-purple-600" />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-800">Plano de Ação Estratégico</h3>
                              <p className="text-sm text-gray-600">Recomendações personalizadas para o desenvolvimento da microrregião</p>
                            </div>
                          </div>

                          {/* Conteúdo das recomendações */}
                            {macrosLoading ? (
                            <div className="flex items-center justify-center py-12">
                              <div className="text-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-3"></div>
                                <p className="text-sm text-gray-500">Carregando plano de ação...</p>
                              </div>
                            </div>
                            ) : eixoRecommendations.recomendacoes.length > 0 ? (
                            <div className="space-y-6">
                              {eixoRecommendations.recomendacoes.map((rec, index) => (
                                <Card key={rec.id} className="border-0 shadow-sm hover:shadow-md transition-all duration-300 bg-white overflow-hidden">
                                  {/* Header do Tópico */}
                                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b border-gray-200">
                                    <div className="flex items-start gap-4">
                                      {/* Número do Tópico */}
                                      <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-xl shadow-lg">
                                          {index + 1}
                                        </div>
                                      </div>
                                      
                                      {/* Título do Tópico */}
                                      <div className="flex-1 min-w-0">
                                        <h4 className="text-lg font-semibold text-gray-800 leading-tight mb-2">
                                          {rec.titulo}
                                        </h4>
                                        <Badge variant="secondary" className="bg-purple-100 text-purple-700 border-purple-200">
                                          Tópico Estratégico
                                        </Badge>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Conteúdo Expandível */}
                                  <div className="p-6">
                                    {/* Seção de Recomendação */}
                                    <div className="mb-6">
                                      <div className="flex items-start gap-3 mb-3">
                                        <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                                          <CheckCircle className="h-5 w-5 text-green-600" />
                                        </div>
                                        <div className="flex-1">
                                          <h5 className="font-semibold text-gray-800 mb-2">Recomendação</h5>
                                          <p className="text-sm text-gray-600 leading-relaxed">
                                            {rec.detalhes}
                                          </p>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Seção de Implementação */}
                                    <div>
                                      <div className="flex items-start gap-3 mb-4">
                                        <div className="p-2 bg-orange-100 rounded-lg flex-shrink-0">
                                          <Target className="h-5 w-5 text-orange-600" />
                                        </div>
                                        <div className="flex-1">
                                          <h5 className="font-semibold text-gray-800 mb-3">Como implementar a recomendação:</h5>
                                          
                                          {/* Lista de Passos */}
                                          <div className="space-y-3">
                                            {rec.implementacao && rec.implementacao.map((passo, passoIndex) => (
                                              <div key={passoIndex} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                                                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white text-xs font-bold flex-shrink-0 mt-0.5">
                                                  {passoIndex + 1}
                                                </div>
                                                <p className="text-sm text-gray-700 leading-relaxed">
                                                  {passo}
                                                </p>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </Card>
                              ))}
                            </div>
                          ) : (
                            <Card className="border-0 bg-gray-50">
                              <CardContent className="p-8 text-center">
                                <div className="p-3 bg-gray-200 rounded-full w-fit mx-auto mb-4">
                                  <ClipboardList className="h-8 w-8 text-gray-500" />
                                </div>
                                <h4 className="text-lg font-semibold text-gray-700 mb-2">Plano de Ação em Desenvolvimento</h4>
                                <p className="text-sm text-gray-500">
                                  Estamos preparando recomendações personalizadas para este eixo. 
                                  Em breve você terá acesso a um plano de ação completo.
                                </p>
                          </CardContent>
                        </Card>
                          )}
                        </div>
                      </TabsContent>

                      <TabsContent value="ferramentas" className="pt-6">
                        <div className="space-y-6">
                          {/* Header da seção */}
                          <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100">
                            <div className="p-2 bg-green-100 rounded-lg">
                              <Wrench className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-800">Kit de Ferramentas</h3>
                              <p className="text-sm text-gray-600">Recursos e materiais para implementação das recomendações</p>
                            </div>
                          </div>

                          {/* Conteúdo das ferramentas */}
                            {macrosLoading ? (
                            <div className="flex items-center justify-center py-12">
                              <div className="text-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-3"></div>
                                <p className="text-sm text-gray-500">Carregando ferramentas...</p>
                              </div>
                            </div>
                            ) : eixoRecommendations.ferramentas.length > 0 ? (
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                              {eixoRecommendations.ferramentas.map((ferramenta) => (
                                <Card key={ferramenta.id} className="group hover:shadow-lg transition-all duration-300 border bg-white overflow-hidden">
                                  <CardContent className="p-6">
                                    <div className="flex items-start gap-4">
                                      {/* Ícone da ferramenta */}
                                      <div className="flex-shrink-0">
                                        <div className="p-3 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                                          <FileText className="h-6 w-6 text-green-600" />
                                        </div>
                                      </div>
                                      
                                      {/* Conteúdo da ferramenta */}
                                      <div className="flex-1 min-w-0">
                                        <h4 className="font-semibold text-gray-800 mb-2 leading-tight">
                                          {ferramenta.titulo}
                                        </h4>
                                        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                                          {ferramenta.descricao}
                                        </p>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          ) : (
                            <Card className="border-0 bg-gray-50">
                              <CardContent className="p-8 text-center">
                                <div className="p-3 bg-gray-200 rounded-full w-fit mx-auto mb-4">
                                  <Wrench className="h-8 w-8 text-gray-500" />
                                </div>
                                <h4 className="text-lg font-semibold text-gray-700 mb-2">Kit de Ferramentas em Desenvolvimento</h4>
                                <p className="text-sm text-gray-500">
                                  Estamos preparando ferramentas e recursos específicos para este eixo. 
                                  Em breve você terá acesso a materiais de apoio completos.
                                </p>
                          </CardContent>
                        </Card>
                          )}
                        </div>
                      </TabsContent>
                    </MobileTabs>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

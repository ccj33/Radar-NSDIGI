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
  GalleryHorizontal
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
const FormattedText = ({ text, className = "" }: { text: string; className?: string }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  if (!text) return null;
  
  // Dividir o texto em parágrafos
  const paragraphs = text.split('\n').filter(p => p.trim());
  
  if (isMobile) {
    return (
      <div className={`space-y-3 ${className}`}>
        {paragraphs.map((paragraph, index) => (
          <div key={index} className="text-sm leading-relaxed text-gray-700">
            {paragraph.trim()}
          </div>
        ))}
      </div>
    );
  }
  
  return (
    <p className={`text-sm text-gray-700 leading-relaxed ${className}`}>
      {text}
    </p>
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
            {isOpen && (
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
            <p className="text-sm text-gray-600 mt-2 p-4 bg-gray-50 rounded-md border">
              {recomendacao.detalhes}
            </p>
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
    
    // Buscar os dados específicos do tier
    const situacao = eixoData[`${tier}_situacao`] || '';
    const recomendacoesText = eixoData[`${tier}_recomendacoes`] || '';
    const ferramentasText = eixoData[`${tier}_ferramentas`] || '';
    
    // Processar recomendações (dividir por quebras de linha)
    const recomendacoes = recomendacoesText ? recomendacoesText.split('\n').filter(line => line.trim()).map((rec, index) => ({
      id: index + 1,
      titulo: rec.trim(),
      detalhes: `Detalhes da recomendação: ${rec.trim()}`
    })) : [];
    
    // Processar ferramentas (dividir por quebras de linha)
    const ferramentas = ferramentasText ? ferramentasText.split('\n').filter(line => line.trim()).map((ferramenta, index) => ({
      id: index + 1,
      tipo: 'PDF',
      titulo: ferramenta.trim(),
      descricao: `Ferramenta para: ${ferramenta.trim()}`
    })) : [];
    
    return { situacao, recomendacoes, ferramentas };
  };

  const colorClasses = getColorClasses(currentEixo?.color || "blue");

  return (
    <div className="space-y-6">
      {/* Header com Navegação */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-lg ${colorClasses.bg}`}>
            <Icon className={`h-8 w-8 ${colorClasses.text}`} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Eixos de Maturidade Digital</h2>
            <p className="text-sm text-gray-600">Navegue pelos 7 eixos estratégicos</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Seletor de Modo de Visualização */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Modo de Visualização:</span>
            <ToggleGroup 
              type="single" 
              value={viewMode}
              onValueChange={(value) => value && setViewMode(value as 'list' | 'carousel')}
              className="bg-gray-100 p-1 rounded-lg"
            >
              <ToggleGroupItem 
                value="list" 
                className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground px-3 py-2 rounded-md transition-all duration-200"
                aria-label="Visualização em lista"
              >
                <div className="flex items-center gap-2">
                  <List className="h-4 w-4" />
                  <span className="text-sm font-medium">Lista</span>
                </div>
              </ToggleGroupItem>
              <ToggleGroupItem 
                value="carousel" 
                className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground px-3 py-2 rounded-md transition-all duration-200"
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
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
            <span className="text-sm font-medium text-gray-700">
              {viewMode === 'carousel' 
                ? `${currentEixoIndex + 1} de ${eixosData.length}`
                : `${eixosData.length} eixos`
              }
            </span>
          </div>
        </div>
      </div>

      {/* Instrução de Ajuda */}
      <Alert className="mb-6 bg-blue-50 border-blue-200 text-blue-800">
        <Info className="h-4 w-4" />
        <AlertTitle>Como Navegar</AlertTitle>
        <AlertDescription>
          <p>
            Use o <strong className="font-semibold">modo Carrossel</strong> para navegar entre os 7 eixos um por vez,
            ou alterne para o <strong className="font-semibold">modo Lista</strong> para ver todos os eixos de uma vez.
          </p>
          <p className="mt-2">
            Cada eixo contém <strong>diagnóstico</strong>, <strong>plano de ação</strong> e <strong>kit de ferramentas</strong> 
            para ajudar no desenvolvimento da maturidade digital da sua região.
          </p>
        </AlertDescription>
      </Alert>

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
                    <Card className="shadow-lg">
                      <CardHeader>
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-lg ${eixoColorClasses.bg}`}>
                            <EixoIcon className={`h-8 w-8 ${eixoColorClasses.text}`} />
                          </div>
                          <div>
                            <CardTitle className="text-xl font-bold text-gray-800">
                              Eixo {eixo.id} - {eixo.nome}
                            </CardTitle>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-sm text-gray-600">Pontuação: {eixo.pontuacao.toFixed(2)}</span>
                              <Badge variant="secondary">{eixo.classificacao}</Badge>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <MobileTabs defaultValue="diagnostico">
                          <TabsList className={`grid w-full ${isMobile ? 'grid-cols-1 gap-2' : 'grid-cols-3'}`}>
                            <TabsTrigger value="diagnostico" className={isMobile ? 'flex-col py-3' : ''}>
                              <AlertCircle className={`${isMobile ? 'h-5 w-5 mb-1' : 'h-4 w-4 mr-2'}`}/>
                              Diagnóstico
                            </TabsTrigger>
                            <TabsTrigger value="plano" className={isMobile ? 'flex-col py-3' : ''}>
                              <ListChecks className={`${isMobile ? 'h-5 w-5 mb-1' : 'h-4 w-4 mr-2'}`}/>
                              {isMobile ? 'Plano de Ação' : 'Plano de Ação'}
                            </TabsTrigger>
                            <TabsTrigger value="ferramentas" className={isMobile ? 'flex-col py-3' : ''}>
                              <Wrench className={`${isMobile ? 'h-5 w-5 mb-1' : 'h-4 w-4 mr-2'}`}/>
                              {isMobile ? 'Ferramentas' : 'Kit de Ferramentas'}
                            </TabsTrigger>
                          </TabsList>

                          <TabsContent value="diagnostico" className="pt-6">
                            <Card>
                              <CardHeader>
                                <CardTitle className="flex items-center text-lg">
                                  <Info className="h-5 w-5 mr-2 text-blue-500" />
                                  Situação Atual
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                {macrosLoading ? (
                                  <p className="text-sm text-gray-500">Carregando situação atual...</p>
                                ) : (
                                  <FormattedText 
                                    text={eixoRecommendations.situacao || eixo.situacaoAtual} 
                                  />
                                )}
                              </CardContent>
                            </Card>
                          </TabsContent>

                          <TabsContent value="plano" className="pt-6">
                            <Card>
                              <CardHeader>
                                <CardTitle className="flex items-center text-lg">
                                  <ClipboardList className="h-5 w-5 mr-2 text-blue-500" />
                                  Recomendações
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                {macrosLoading ? (
                                  <p className="text-sm text-gray-500 text-center py-8">
                                    Carregando recomendações...
                                  </p>
                                ) : eixoRecommendations.recomendacoes.length > 0 ? (
                                  eixoRecommendations.recomendacoes.map((rec, index) => (
                                    <RecommendationStep 
                                      key={rec.id} 
                                      recomendacao={rec} 
                                      index={index} 
                                      isLast={index === eixoRecommendations.recomendacoes.length - 1} 
                                    />
                                  ))
                                ) : (
                                  <p className="text-sm text-gray-500 text-center py-8">
                                    Recomendações em desenvolvimento para este eixo.
                                  </p>
                                )}
                              </CardContent>
                            </Card>
                          </TabsContent>

                          <TabsContent value="ferramentas" className="pt-6">
                            <Card>
                              <CardHeader>
                                <CardTitle className="flex items-center text-lg">
                                  <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                                  Ferramentas Sugeridas
                                </CardTitle>
                              </CardHeader>
                              <CardContent className="grid gap-4 md:grid-cols-2">
                                {macrosLoading ? (
                                  <p className="text-sm text-gray-500 text-center py-8 col-span-2">
                                    Carregando ferramentas...
                                  </p>
                                ) : eixoRecommendations.ferramentas.length > 0 ? (
                                  eixoRecommendations.ferramentas.map((ferramenta) => (
                                    <ToolCard key={ferramenta.id} ferramenta={ferramenta} />
                                  ))
                                ) : (
                                  <p className="text-sm text-gray-500 text-center py-8 col-span-2">
                                    Ferramentas em desenvolvimento para este eixo.
                                  </p>
                                )}
                              </CardContent>
                            </Card>
                          </TabsContent>
                        </MobileTabs>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            
            {/* Botões de navegação posicionados dentro do container */}
            <div className="absolute inset-0 flex items-center justify-between pointer-events-none z-10">
              <div className="pointer-events-auto">
                <CarouselPrevious className="relative -left-2 sm:-left-4 top-0 translate-y-0 h-8 w-8 sm:h-10 sm:w-10 bg-white shadow-lg hover:shadow-xl" />
              </div>
              <div className="pointer-events-auto">
                <CarouselNext className="relative -right-2 sm:-right-4 top-0 translate-y-0 h-8 w-8 sm:h-10 sm:w-10 bg-white shadow-lg hover:shadow-xl" />
              </div>
            </div>
          </Carousel>
        ) : (
          // Modo Lista - Mostra todos os eixos de uma vez
          <div className="space-y-6">
            {eixosData.map((eixo, index) => {
              const EixoIcon = eixo.icon;
              const eixoColorClasses = getColorClasses(eixo.color);
              const eixoRecommendations = getRecommendationsForEixo(eixo.id, eixo.classificacao);
              
              return (
                <Card key={eixo.id} className="shadow-lg">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${eixoColorClasses.bg}`}>
                        <EixoIcon className={`h-8 w-8 ${eixoColorClasses.text}`} />
                      </div>
                      <div>
                        <CardTitle className="text-xl font-bold text-gray-800">
                          Eixo {eixo.id} - {eixo.nome}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-gray-600">Pontuação: {eixo.pontuacao.toFixed(2)}</span>
                          <Badge variant="secondary">{eixo.classificacao}</Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <MobileTabs defaultValue="diagnostico">
                      <TabsList className={`grid w-full ${isMobile ? 'grid-cols-1 gap-2' : 'grid-cols-3'}`}>
                        <TabsTrigger value="diagnostico" className={isMobile ? 'flex-col py-3' : ''}>
                          <AlertCircle className={`${isMobile ? 'h-5 w-5 mb-1' : 'h-4 w-4 mr-2'}`}/>
                          Diagnóstico
                        </TabsTrigger>
                        <TabsTrigger value="plano" className={isMobile ? 'flex-col py-3' : ''}>
                          <ListChecks className={`${isMobile ? 'h-5 w-5 mb-1' : 'h-4 w-4 mr-2'}`}/>
                          {isMobile ? 'Plano de Ação' : 'Plano de Ação'}
                        </TabsTrigger>
                        <TabsTrigger value="ferramentas" className={isMobile ? 'flex-col py-3' : ''}>
                          <Wrench className={`${isMobile ? 'h-5 w-5 mb-1' : 'h-4 w-4 mr-2'}`}/>
                          {isMobile ? 'Ferramentas' : 'Kit de Ferramentas'}
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="diagnostico" className="pt-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center text-lg">
                              <Info className="h-5 w-5 mr-2 text-blue-500" />
                              Situação Atual
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            {macrosLoading ? (
                              <p className="text-sm text-gray-500">Carregando situação atual...</p>
                            ) : (
                              <FormattedText 
                                text={eixoRecommendations.situacao || eixo.situacaoAtual} 
                              />
                            )}
                          </CardContent>
                        </Card>
                      </TabsContent>

                      <TabsContent value="plano" className="pt-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center text-lg">
                              <ClipboardList className="h-5 w-5 mr-2 text-blue-500" />
                              Recomendações
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            {macrosLoading ? (
                              <p className="text-sm text-gray-500 text-center py-8">
                                Carregando recomendações...
                              </p>
                            ) : eixoRecommendations.recomendacoes.length > 0 ? (
                              eixoRecommendations.recomendacoes.map((rec, index) => (
                                <RecommendationStep 
                                  key={rec.id} 
                                  recomendacao={rec} 
                                  index={index} 
                                  isLast={index === eixoRecommendations.recomendacoes.length - 1} 
                                />
                              ))
                            ) : (
                              <p className="text-sm text-gray-500 text-center py-8">
                                Recomendações em desenvolvimento para este eixo.
                              </p>
                            )}
                          </CardContent>
                        </Card>
                      </TabsContent>

                      <TabsContent value="ferramentas" className="pt-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center text-lg">
                              <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                              Ferramentas Sugeridas
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="grid gap-4 md:grid-cols-2">
                            {macrosLoading ? (
                              <p className="text-sm text-gray-500 text-center py-8 col-span-2">
                                Carregando ferramentas...
                              </p>
                            ) : eixoRecommendations.ferramentas.length > 0 ? (
                              eixoRecommendations.ferramentas.map((ferramenta) => (
                                <ToolCard key={ferramenta.id} ferramenta={ferramenta} />
                              ))
                            ) : (
                              <p className="text-sm text-gray-500 text-center py-8 col-span-2">
                                Ferramentas em desenvolvimento para este eixo.
                              </p>
                            )}
                          </CardContent>
                        </Card>
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

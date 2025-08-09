import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Server, Users, ShieldCheck, ShieldAlert, Target, ChevronDown, CheckCircle } from 'lucide-react';
import { FormattedText } from '../RecommendationsPanel';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useBaseCData } from '@/hooks/useBaseCData';
import { PlanoAcaoObjetivoAgrupado, PlanoAcaoMacroAgrupado, processBaseCExcelGroupedByObjetivo } from '@/data/baseCProcessor';
import { MicroRegionData } from '@/types/dashboard';

// Mapeamento de ícones para cada objetivo
const iconMap = {
  estrutura: <Server className="h-5 w-5" />,
  profissionais: <Users className="h-5 w-5" />,
  recursos: <ShieldCheck className="h-5 w-5" />,
  vigilancia: <ShieldAlert className="h-5 w-5" />,
  inovacao: <Target className="h-5 w-5" />,
  telessaude: <Target className="h-5 w-5" />,
};

interface PlanoDeAcaoProps {
  selectedMacroRegiao?: string;
  selectedMicroregiao?: string;
  data?: MicroRegionData[];
}

const PlanoDeAcao: React.FC<PlanoDeAcaoProps> = ({ 
  selectedMacroRegiao, 
  selectedMicroregiao, 
  data = [] 
}) => {
  const { data: baseCData, loading, error, getMacrorregiao } = useBaseCData();
  const [grouped, setGrouped] = React.useState<PlanoAcaoMacroAgrupado[] | null>(null);

  React.useEffect(() => {
    // Carrega versão agrupada por número do objetivo diretamente do base_c.xlsx
    processBaseCExcelGroupedByObjetivo().then(setGrouped).catch(() => setGrouped(null));
  }, []);
  // Função para detectar a macro-região baseada na microrregião selecionada
  const getDetectedMacroRegiao = (): string | undefined => {
    console.log('🔍 === DEBUG DETECÇÃO MACRO-REGIÃO ===');
    console.log('🔍 selectedMacroRegiao:', selectedMacroRegiao);
    console.log('🔍 selectedMicroregiao:', selectedMicroregiao);
    console.log('🔍 data.length:', data.length);
    console.log('🔍 Dados disponíveis:', data.map(d => ({ microrregiao: d.microrregiao, macrorregiao: d.macrorregiao })));
    
    // Se já tem macro-região selecionada explicitamente, usa ela
    if (selectedMacroRegiao) {
      console.log('🔍 Macro-região selecionada explicitamente:', selectedMacroRegiao);
      return selectedMacroRegiao;
    }
    
    // Se tem microrregião selecionada, detecta a macro-região correspondente
    if (selectedMicroregiao && data.length > 0) {
      const microregiaoData = data.find(item => item.microrregiao === selectedMicroregiao);
      console.log('🔍 Microrregião selecionada:', selectedMicroregiao);
      console.log('🔍 Dados encontrados:', microregiaoData);
      console.log('🔍 Macro-região detectada:', microregiaoData?.macrorregiao);
      return microregiaoData?.macrorregiao;
    }
    
    console.log('🔍 Nenhuma macro-região detectada');
    return undefined;
  };

  const detectedMacroRegiao = selectedMacroRegiao || getDetectedMacroRegiao();

  // Preparar dados vindos do base_c
  const macroData = detectedMacroRegiao
    ? getMacrorregiao(detectedMacroRegiao)
    : undefined;

  // Se houver dados agrupados disponíveis, usa-os para construir a lista (tem prioridade)
  const groupedForMacro: PlanoAcaoObjetivoAgrupado[] | undefined = React.useMemo(() => {
    if (!grouped || !detectedMacroRegiao) return undefined;
    const normalize = (s: string) =>
      s
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z0-9]/g, '')
        .toUpperCase();
    const target = normalize(detectedMacroRegiao);
    const macro = grouped.find((m) => normalize(m.macrorregiao) === target);
    return macro?.objetivos;
  }, [grouped, detectedMacroRegiao]);

  // Paleta de estilos para objetivos (cíclica)
  const stylePalette = [
    {
      color: 'from-blue-500 to-blue-600',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      badgeColor: 'bg-blue-100 text-blue-800',
      icon: iconMap.estrutura,
    },
    {
      color: 'from-purple-500 to-purple-600',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      badgeColor: 'bg-purple-100 text-purple-800',
      icon: iconMap.profissionais,
    },
    {
      color: 'from-teal-500 to-teal-600',
      textColor: 'text-teal-600',
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-200',
      badgeColor: 'bg-teal-100 text-teal-800',
      icon: iconMap.recursos,
    },
    {
      color: 'from-red-500 to-red-600',
      textColor: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      badgeColor: 'bg-red-100 text-red-800',
      icon: iconMap.vigilancia,
    },
    {
      color: 'from-orange-500 to-orange-600',
      textColor: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      badgeColor: 'bg-orange-100 text-orange-800',
      icon: iconMap.telessaude,
    },
  ];

  // Converter dados do base_c para a estrutura esperada pelo componente visual
  let planoDeAcaoData: Array<{
    id: string;
    title: string;
    number: string;
    color: string;
    textColor: string;
    bgColor: string;
    borderColor: string;
    badgeColor: string;
    icon: React.ReactNode;
    actions: Array<{ title: string; description: string; goal: string }>;
  }> = [];

  if (groupedForMacro && groupedForMacro.length > 0) {
    planoDeAcaoData = groupedForMacro.map((obj, index) => ({
      id: `objetivo_${obj.numero}`,
      title: obj.titulo,
      number: String(obj.numero),
      ...stylePalette[index % stylePalette.length],
      actions: obj.acoes.map((a) => ({
        title: a.titulo,
        description: a.exemplo || a.titulo,
        goal: a.meta || ''
      })),
    }));
  } else {
    const objetivos = (macroData?.objetivos || []);
    planoDeAcaoData = objetivos.map((objetivo, index) => {
      const style = stylePalette[index % stylePalette.length];
      return {
        id: `objetivo_${index + 1}`,
        title: objetivo.descricao || objetivo.tema,
        number: String(index + 1),
        color: style.color,
        textColor: style.textColor,
        bgColor: style.bgColor,
        borderColor: style.borderColor,
        badgeColor: style.badgeColor,
        icon: style.icon,
        actions: (objetivo.acoes || []).map((acao) => ({
          title: acao.titulo,
          description: acao.titulo,
          goal: acao.meta,
        })),
      };
    });
  }

  if (loading) {
    return (
      <div className="bg-gray-50/50 rounded-xl shadow-sm border border-gray-200/80 overflow-hidden font-sans p-6">
        <p className="text-gray-600">Carregando Plano de Ação da base_c...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 rounded-xl border border-red-200 p-6">
        <p className="text-red-700">Erro ao carregar dados do Plano de Ação: {error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50/50 rounded-xl shadow-sm border border-gray-200/80 overflow-hidden font-sans">
      {/* Header */}
      <div className="bg-white border-b border-gray-200/80 p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-600/10 rounded-lg border border-blue-200/80">
            <Target className="h-7 w-7 text-blue-600" />
          </div>
          <div>
              <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Plano de Ação Estratégico</h1>
              <p className="text-gray-500">
                  Diretrizes para a Transformação Digital da Saúde em Minas Gerais
                  {detectedMacroRegiao && (
                    <span className="ml-2 text-blue-600 font-medium">
                      - Macro-região: {detectedMacroRegiao}
                    </span>
                  )}
              </p>
          </div>
        </div>
      </div>

      {/* Accordion Content */}
      <div className="p-4 md:p-6">
        <Accordion type="single" collapsible className="w-full space-y-4">
          {planoDeAcaoData.map((objective) => (
            <AccordionItem 
              value={`item-${objective.id}`} 
              key={objective.id} 
              className="border-0"
            >
                <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg overflow-hidden">
                    <AccordionTrigger className={`px-6 py-4 text-left hover:no-underline group border-l-4 ${objective.borderColor} [&>svg]:hidden`}>
                  <div className="flex items-center gap-5 w-full">
                      {/* Number */}
                      <div className={`flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 group-hover:bg-gray-200/80 transition-colors flex-shrink-0`}>
                          <span className={`font-bold text-xl ${objective.textColor}`}>{objective.number}</span>
                      </div>
                      
                      {/* Title & Icon */}
                      <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-1.5">
                              <div className={`p-1.5 rounded-md ${objective.badgeColor}`}>
                                  {objective.icon}
                              </div>
                              <Badge variant="secondary" className="border">
                              Objetivo Estratégico
                              </Badge>
                              <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                          </div>
                          <h3 className="text-base md:text-lg font-semibold text-gray-800 leading-tight">
                              {objective.title}
                          </h3>
                      </div>
                  </div>
                  </AccordionTrigger>
                  
                  <AccordionContent className="px-6 pb-6 pt-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 items-stretch">
                          {objective.actions.map((action, actionIndex) => (
                              <Card key={actionIndex} className="flex flex-col h-full shadow-sm hover:shadow-md transition-shadow duration-200 border-gray-200/80">
                                  <CardHeader>
                                      <CardTitle className="flex items-start gap-3 text-base">
                                          <div className={`mt-1.5 w-2.5 h-2.5 rounded-full bg-gradient-to-r ${objective.color} flex-shrink-0`}></div>
                                          <span className="flex-1">{action.title}</span>
                                      </CardTitle>
                                  </CardHeader>
                                  <CardContent className="flex-grow text-sm text-gray-600 leading-relaxed">
                                      <FormattedText text={action.description} />
                                  </CardContent>
                                  <CardFooter className={`${objective.bgColor} p-4 mt-auto border-t ${objective.borderColor}`}>
                                      <div className="flex items-start gap-3">
                                          <Target className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                                          <div>
                                              <h4 className="font-semibold text-gray-700 text-sm mb-1">Meta a ser Alcançada</h4>
                                              <p className="text-gray-600 text-sm leading-relaxed">
                                                  <FormattedText text={action.goal} />
                                              </p>
                                          </div>
                                      </div>
                                  </CardFooter>
                              </Card>
                          ))}
                      </div>
                  </AccordionContent>
              </Card>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export { PlanoDeAcao };
export default PlanoDeAcao;
  
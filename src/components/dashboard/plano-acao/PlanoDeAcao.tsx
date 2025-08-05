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

// Dados completos do Plano de Ação, incluindo o 4º objetivo
const planoDeAcaoData = [
    {
        id: 'estrutura',
        icon: <Server className="h-5 w-5" />,
        title: 'Oferecer estrutura necessária e suficiente para o processamento adequado de dados e informações de saúde, bem como para a oferta de serviços de telessaúde',
        color: 'from-blue-500 to-blue-600',
        textColor: 'text-blue-600',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        badgeColor: 'bg-blue-100 text-blue-800',
        number: '1',
        actions: [
          {
            title: 'Infraestrutura para Saúde Digital',
            description: 'Modernização de unidades de saúde públicas e filantrópicas com recursos para infraestrutura digital, fortalecendo o atendimento presencial e a telessaúde, com foco em regiões remotas. Inclui implementação e manutenção para garantir a sustentabilidade dos serviços.',
            goal: 'Equipar 649 estabelecimentos com pacote de kits básicos de infraestrutura para cada CNES público e filantrópico do estado e município até junho de 2030.',
          },
          {
            title: 'Redes Dados em Saúde',
            description: 'Implementação de tecnologia blockchain para viabilizar a interoperabilidade entre sistemas de saúde em Minas Gerais, integrando dados dos três níveis de atenção e permitindo acesso facilitado às informações por Estados e Municípios.',
            goal: 'Interoperar 1.992 atendimentos mensais com a RNDS até junho de 2030.',
          },
         ],
       },
       {
        id: 'profissionais',
        icon: <Users className="h-5 w-5" />,
        title: 'Oferecer condições adequadas para a atuação dos profissionais de saúde em relação aos recursos e potencialidades da saúde digital, promovendo o fortalecimento da cultura digital e a educação permanente em saúde nos territórios',
        color: 'from-purple-500 to-purple-600',
        textColor: 'text-purple-600',
        bgColor: 'bg-purple-50',
        borderColor: 'border-purple-200',
        badgeColor: 'bg-purple-100 text-purple-800',
        number: '2',
        actions: [
          {
            title: 'Capacitações em Saúde Digital',
            description: 'Oferta contínua de cursos online e assíncronos para capacitação de profissionais em saúde digital, sistemas e práticas de telessaúde, visando reduzir a rotatividade de pessoal e difundir conhecimentos na área.',
            goal: 'Capacitar 5.971 profissionais em ao menos um curso online até dezembro de 2027.',
          },
           {
             title: 'Formação de Multiplicadores em Saúde Digital',
             description: 'Formação voltada a profissionais da saúde dos municípios mineiros, capacitando-os como referências técnicas em saúde digital, com foco na alfabetização em dados e no uso de sistemas oficiais, para fortalecer uma cultura de dados no Estado.',
             goal: 'Ter ao menos um profissional que concluiu a formação em 100% dos municípios até dezembro de 2026.',
           },
         ],
       },
       {
        id: 'recursos',
        icon: <ShieldCheck className="h-5 w-5" />,
        title: 'Prover os recursos digitais necessários para a garantia do acesso universal, integral e equânime aos serviços e insumos de saúde pública',
        color: 'from-teal-500 to-teal-600',
        textColor: 'text-teal-600',
        bgColor: 'bg-teal-50',
        borderColor: 'border-teal-200',
        badgeColor: 'bg-teal-100 text-teal-800',
        number: '3',
        actions: [
          {
            title: 'Ferramenta Estadual de Regulação Assistencial',
            description: 'Desenvolvimento de um sistema único de regulação em saúde digital para o SUS em Minas Gerais, integrando os níveis de atenção com módulos de Urgência e Emergência, Ambulatorial, Telessaúde, Eletivas e Transporte Sanitário.',
            goal: 'Regular 1.780.000 internações de U/E na nova ferramenta até o mês de junho de 2029.',
          },
           {
             title: 'Sistema para Solicitação Digital de Medicamentos do CEAF',
             description: 'Implantação de sistema com inteligência artificial para abertura e triagem de processos de medicamentos do CEAF, agilizando a análise, eliminando documentos físicos e garantindo início rápido do tratamento.',
             goal: 'Garantir resposta ao cidadão no prazo máximo de 30 dias.',
           },
         ],
       },
       {
        id: 'vigilancia',
        icon: <ShieldAlert className="h-5 w-5" />,
        title: 'Ampliar e fortalecer o uso de soluções digitais para aprimorar a atuação da Vigilância em Saúde, com foco na melhoria da experiência do cidadão junto aos serviços ofertados e no uso de dados e informações de qualidade.',
        color: 'from-red-500 to-red-600',
        textColor: 'text-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        badgeColor: 'bg-red-100 text-red-800',
        number: '4',
        actions: [
          {
            title: 'Ações de Controle do Aedes aegypti',
            description: 'Desenvolvimento de software com georreferenciamento e inteligência artificial para identificar focos da dengue, otimizar ações de campo e apoiar decisões no combate às arboviroses.',
            goal: 'Mapear 30% das áreas urbanas com IA e georreferenciamento até junho de 2027.',
          },
          {
            title: 'Vacina Mais Minas - Sistema de Vacinação',
            description: 'Implantação de sistema de informação para registro de vacinas, gestão de estoque e monitoramento da cobertura vacinal em Minas Gerais, com serviços ao cidadão e interoperabilidade com a RNDS.',
            goal: 'Ter 853 municípios aderentes ao sistema até dezembro de 2029.',
          },
          {
            title: 'VISA Digital',
            description: 'Digitalização da carta de serviços da Vigilância Sanitária com novos módulos no VISA Digital e uso de IA para triagem automática de projetos arquitetônicos, agilizando a análise e identificação de requisitos.',
            goal: 'Disponibilizar 10 serviços da Visa no sistema até junho de 2028.',
          },
        ],
      },
      {
        id: 'inovacao',
        icon: <Target className="h-5 w-5" />,
        title: 'Fomentar a inovação e o desenvolvimento de soluções digitais inovadoras para o setor da saúde, promovendo a colaboração entre setores público e privado',
        color: 'from-orange-500 to-orange-600',
        textColor: 'text-orange-600',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200',
        badgeColor: 'bg-orange-100 text-orange-800',
        number: '5',
        actions: [
          {
            title: 'Hub de Inovação em Saúde Digital',
            description: 'Criação de um centro de inovação para fomentar o desenvolvimento de soluções digitais em saúde, conectando startups, universidades e o setor público para acelerar a transformação digital.',
            goal: 'Estabelecer 50 parcerias público-privadas até dezembro de 2028.',
          },
          {
            title: 'Programa de Aceleração de Startups',
            description: 'Programa de mentoria e investimento para startups focadas em saúde digital, oferecendo suporte técnico, financeiro e acesso a dados para desenvolvimento de soluções inovadoras.',
            goal: 'Acelerar 30 startups de saúde digital até dezembro de 2029.',
          },
          {
            title: 'Laboratório de Experimentação Digital',
            description: 'Espaço para testar e validar novas tecnologias em saúde digital, permitindo a experimentação segura de soluções antes da implementação em larga escala.',
            goal: 'Validar 20 novas tecnologias até dezembro de 2027.',
          },
        ],
      },
];

const PlanoDeAcao = () => {
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
                    <AccordionTrigger className={`px-6 py-4 text-left hover:no-underline group border-l-4 ${objective.borderColor}`}>
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
                            </div>
                            <h3 className="text-base md:text-lg font-semibold text-gray-800 leading-tight">
                                {objective.title}
                            </h3>
                        </div>
                        
                        {/* Expansion Icon */}
                        <ChevronDown className="h-6 w-6 text-gray-400 group-hover:text-gray-600 transition-transform duration-300 group-data-[state=open]:rotate-180 flex-shrink-0 mx-2" />
                    </div>
                    </AccordionTrigger>
                    
                    <AccordionContent className="px-6 pb-6 pt-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                            {objective.actions.map((action, actionIndex) => (
                                <Card key={actionIndex} className="flex flex-col shadow-sm hover:shadow-md transition-shadow duration-200 border-gray-200/80">
                                    <CardHeader>
                                        <CardTitle className="flex items-start gap-3 text-base">
                                            <div className={`mt-1.5 w-2.5 h-2.5 rounded-full bg-gradient-to-r ${objective.color} flex-shrink-0`}></div>
                                            <span className="flex-1">{action.title}</span>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex-grow text-sm text-gray-600 leading-relaxed">
                                        <FormattedText text={action.description} />
                                    </CardContent>
                                    <CardFooter className="bg-gray-50/70 p-4 mt-4">
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
  
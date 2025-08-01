import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Server, Users, ShieldCheck, ShieldAlert, Target, ChevronDown } from 'lucide-react';

// Dados completos do Plano de Ação, incluindo o 4º objetivo
const planoDeAcaoData = [
  {
    id: 'estrutura',
    icon: <Server className="h-5 w-5" />,
    title: 'Oferecer estrutura necessária e suficiente para o processamento adequado de dados e informações de saúde, bem como para a oferta de serviços de telessaúde',
    color: 'from-blue-500 to-blue-600',
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
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header do Plano de Ação */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-white/20 rounded-lg">
            <Target className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold">Plano de Ação para Transformação Digital</h2>
        </div>
        <p className="text-blue-100 text-sm">
          Objetivos estratégicos para a evolução da saúde digital em Minas Gerais
        </p>
      </div>

      {/* Conteúdo do Acordeão */}
      <div className="p-6">
        <Accordion type="single" collapsible className="w-full space-y-4">
          {planoDeAcaoData.map((objective, index) => (
            <AccordionItem 
              value={`item-${index}`} 
              key={objective.id} 
              className={`border-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 ${objective.borderColor} ${objective.bgColor}`}
            >
              <AccordionTrigger className="px-6 py-4 text-left hover:no-underline group">
                <div className="flex items-start gap-4 w-full">
                  {/* Número e Ícone */}
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${objective.color} text-white flex-shrink-0`}>
                    <span className="font-bold text-lg">{objective.number}</span>
                  </div>
                  
                  {/* Conteúdo */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-lg ${objective.badgeColor}`}>
                        {objective.icon}
                      </div>
                      <Badge variant="outline" className={`${objective.badgeColor} border-0`}>
                        Objetivo {objective.number}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 leading-tight group-hover:text-gray-900 transition-colors">
                      {objective.title}
                    </h3>
                  </div>
                  
                  {/* Ícone de expansão */}
                  <ChevronDown className="h-5 w-5 text-gray-500 group-hover:text-gray-700 transition-colors flex-shrink-0" />
                </div>
              </AccordionTrigger>
              
              <AccordionContent className="px-6 pb-6 pt-0">
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="w-1/4 font-bold text-gray-700 bg-gray-50">Ação</TableHead>
                        <TableHead className="w-2/4 font-bold text-gray-700 bg-gray-50">Descrição</TableHead>
                        <TableHead className="w-1/4 font-bold text-gray-700 bg-gray-50">Meta</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {objective.actions.map((action, actionIndex) => (
                        <TableRow key={actionIndex} className="hover:bg-gray-50 transition-colors">
                          <TableCell className="font-semibold text-gray-800 align-top border-r border-gray-100">
                            <div className="flex items-start gap-2">
                              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${objective.color} mt-2 flex-shrink-0`}></div>
                              <span>{action.title}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-600 align-top border-r border-gray-100 leading-relaxed">
                            {action.description}
                          </TableCell>
                          <TableCell className="align-top">
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                              <div className="flex items-start gap-2">
                                <Target className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                                <div>
                                  <h4 className="font-bold text-yellow-800 text-sm mb-1">Meta</h4>
                                  <p className="text-yellow-700 text-sm leading-relaxed">{action.goal}</p>
                                </div>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export { PlanoDeAcao };
export default PlanoDeAcao;

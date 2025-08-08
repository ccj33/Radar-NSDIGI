// Objetivos Estratégicos do Plano de Ação
export interface ObjetivoEstrategico {
  id: string;
  title: string;
  number: string;
  color: string;
  textColor: string;
  bgColor: string;
  borderColor: string;
  badgeColor: string;
  actions: AcaoEstrategica[];
}

export interface AcaoEstrategica {
  title: string;
  description: string;
  goal: string;
}

export const objetivosEstrategicos: ObjetivoEstrategico[] = [
  {
    id: 'estrutura',
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
        goal: 'Equipar 841 estabelecimentos com pacote de kits básicos de infraestrutura para cada CNES público e filantrópico do estado e município até junho de 2030.',
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
    id: 'telessaude',
    title: 'Fortalecer o uso de soluções digitais integradas às redes de atenção à saúde, ofertando serviços de telessaúde que potencializem o acesso a um cuidado adequado e tempestivo nos diferentes níveis de atenção.',
    color: 'from-orange-500 to-orange-600',
    textColor: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    badgeColor: 'bg-orange-100 text-orange-800',
    number: '5',
    actions: [
      {
        title: 'Teleconsultoria clínica para a integração da Atenção Primária à Saúde (APS) com a Atenção Especializada (AE)',
        description: 'Implantação de teleconsultorias por médicos especialistas para a Atenção Primária, visando aumentar a resolubilidade e reduzir encaminhamentos desnecessários, com foco em linhas de cuidado prioritárias, arboviroses e vírus respiratórios, medicina fetal e otorrinolaringologia.',
        goal: 'Realizar 93.672 teleconsultorias até junho de 2029.',
      },
      {
        title: 'Implementação da Telecardiologia para a rede de urgência e emergência',
        description: 'Aquisição de eletrocardiógrafos e implantação de telecardiologia 24h no SAMU/MG, com laudos rápidos e orientações clínicas para as USBs, visando diagnóstico em até 10 minutos.',
        goal: 'Emitir e laudar 55.480 eletrocardiogramas até junho de 2029.',
      },
      {
        title: 'TeleAVC',
        description: 'Implantação de teleconsultoria e telediagnóstico 24h para apoio a diagnósticos de AVC, com análise de tomografias por neurologistas, visando decisões rápidas e intervenções em tempo oportuno.',
        goal: 'Emitir e laudar 1.745 laudos de tomógrafo até junho de 2029.',
      },
      {
        title: 'Teleconsultoria para estomatologia',
        description: 'Oferecer serviços de Teleconsultoria para cirurgiões dentistas da APS para apoio no diagnóstico das Lesões Bucais e acompanhamento dos usuários, no estado de Minas Gerais.',
        goal: 'Realizar 375 teleconsultorias até junho de 2026.',
      },
    ],
  },
];

export default objetivosEstrategicos; 
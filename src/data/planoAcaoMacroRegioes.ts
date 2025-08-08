// Dados específicos por macro-região para o Plano de Ação Estratégico
export interface PlanoAcaoMacroRegiao {
  macrorregiao: string;
  objetivos: {
    [objetivoId: string]: {
      acoes: {
        [acaoId: string]: {
          title: string;
          description: string;
          goal: string;
        };
      };
    };
  };
}

export const planoAcaoMacroRegioes: PlanoAcaoMacroRegiao[] = [
  {
    macrorregiao: "CENTRO",
    objetivos: {
      estrutura: {
        acoes: {
          infraestrutura: {
            title: "Infraestrutura para Saúde Digital",
            description: "Modernização de unidades de saúde públicas e filantrópicas com recursos para infraestrutura digital, fortalecendo o atendimento presencial e a telessaúde, com foco em regiões remotas. Inclui implementação e manutenção para garantir a sustentabilidade dos serviços.",
            goal: "Equipar 2494 estabelecimentos com pacote de kits básicos de infraestrutura para cada CNES público e filantrópico do estado e município até junho de 2030.",
          },
          redes_dados: {
            title: "Redes Dados em Saúde",
            description: "Implementação de tecnologia blockchain para viabilizar a interoperabilidade entre sistemas de saúde em Minas Gerais, integrando dados dos três níveis de atenção e permitindo acesso facilitado às informações por Estados e Municípios.",
            goal: "Interoperar 1.992 atendimentos mensais com a RNDS até junho de 2030.",
          },
        },
      },
      telessaude: {
        acoes: {
          teleconsultoria_clinica: {
            title: "Teleconsultoria clínica para a integração da Atenção Primária à Saúde (APS) com a Atenção Especializada (AE)",
            description: "Implantação de teleconsultorias por médicos especialistas para a Atenção Primária, visando aumentar a resolubilidade e reduzir encaminhamentos desnecessários, com foco em linhas de cuidado prioritárias, arboviroses e vírus respiratórios, medicina fetal e otorrinolaringologia.",
            goal: "Realizar 93.672 teleconsultorias até junho de 2029.",
          },
          telecardiologia: {
            title: "Implementação da Telecardiologia para a rede de urgência e emergência",
            description: "Aquisição de eletrocardiógrafos e implantação de telecardiologia 24h no SAMU/MG, com laudos rápidos e orientações clínicas para as USBs, visando diagnóstico em até 10 minutos.",
            goal: "Emitir e laudar 55.480 eletrocardiogramas até junho de 2029.",
          },
          teleavc: {
            title: "TeleAVC",
            description: "Implantação de teleconsultoria e telediagnóstico 24h para apoio a diagnósticos de AVC, com análise de tomografias por neurologistas, visando decisões rápidas e intervenções em tempo oportuno.",
            goal: "Emitir e laudar 1.745 laudos de tomógrafo até junho de 2029.",
          },
          teleconsultoria_estomatologia: {
            title: "Teleconsultoria para estomatologia",
            description: "Oferecer serviços de Teleconsultoria para cirurgiões dentistas da APS para apoio no diagnóstico das Lesões Bucais e acompanhamento dos usuários, no estado de Minas Gerais.",
            goal: "Realizar 375 teleconsultorias até junho de 2026.",
          },
        },
      },
    },
  },
  {
    macrorregiao: "CENTRO SUL",
    objetivos: {
      estrutura: {
        acoes: {
          infraestrutura: {
            title: "Infraestrutura para Saúde Digital",
            description: "Modernização de unidades de saúde públicas e filantrópicas com recursos para infraestrutura digital, fortalecendo o atendimento presencial e a telessaúde, com foco em regiões remotas. Inclui implementação e manutenção para garantir a sustentabilidade dos serviços.",
            goal: "Equipar 800 estabelecimentos com pacote de kits básicos de infraestrutura para cada CNES público e filantrópico do estado e município até junho de 2030.",
          },
          redes_dados: {
            title: "Redes Dados em Saúde",
            description: "Implementação de tecnologia blockchain para viabilizar a interoperabilidade entre sistemas de saúde em Minas Gerais, integrando dados dos três níveis de atenção e permitindo acesso facilitado às informações por Estados e Municípios.",
            goal: "Interoperar 1.992 atendimentos mensais com a RNDS até junho de 2030.",
          },
        },
      },
      telessaude: {
        acoes: {
          teleconsultoria_clinica: {
            title: "Teleconsultoria clínica para a integração da Atenção Primária à Saúde (APS) com a Atenção Especializada (AE)",
            description: "Implantação de teleconsultorias por médicos especialistas para a Atenção Primária, visando aumentar a resolubilidade e reduzir encaminhamentos desnecessários, com foco em linhas de cuidado prioritárias, arboviroses e vírus respiratórios, medicina fetal e otorrinolaringologia.",
            goal: "Realizar 13.096 teleconsultorias até junho de 2029.",
          },
          telecardiologia: {
            title: "Implementação da Telecardiologia para a rede de urgência e emergência",
            description: "Aquisição de eletrocardiógrafos e implantação de telecardiologia 24h no SAMU/MG, com laudos rápidos e orientações clínicas para as USBs, visando diagnóstico em até 10 minutos.",
            goal: "Emitir e laudar 10.220 eletrocardiogramas até junho de 2029.",
          },
          teleavc: {
            title: "TeleAVC",
            description: "Implantação de teleconsultoria e telediagnóstico 24h para apoio a diagnósticos de AVC, com análise de tomografias por neurologistas, visando decisões rápidas e intervenções em tempo oportuno.",
            goal: "Emitir e laudar 1.111 laudos de tomógrafo até junho de 2029.",
          },
          teleconsultoria_estomatologia: {
            title: "Teleconsultoria para estomatologia",
            description: "Oferecer serviços de Teleconsultoria para cirurgiões dentistas da APS para apoio no diagnóstico das Lesões Bucais e acompanhamento dos usuários, no estado de Minas Gerais.",
            goal: "Realizar 52 teleconsultorias até junho de 2026.",
          },
        },
      },
    },
  },
  {
    macrorregiao: "NORDESTE",
    objetivos: {
      estrutura: {
        acoes: {
          infraestrutura: {
            title: "Infraestrutura para Saúde Digital",
            description: "Modernização de unidades de saúde públicas e filantrópicas com recursos para infraestrutura digital, fortalecendo o atendimento presencial e a telessaúde, com foco em regiões remotas. Inclui implementação e manutenção para garantir a sustentabilidade dos serviços.",
            goal: "Equipar 649 estabelecimentos com pacote de kits básicos de infraestrutura para cada CNES público e filantrópico do estado e município até junho de 2030.",
          },
          redes_dados: {
            title: "Redes Dados em Saúde",
            description: "Implementação de tecnologia blockchain para viabilizar a interoperabilidade entre sistemas de saúde em Minas Gerais, integrando dados dos três níveis de atenção e permitindo acesso facilitado às informações por Estados e Municípios.",
            goal: "Interoperar 1.992 atendimentos mensais com a RNDS até junho de 2030.",
          },
        },
      },
      telessaude: {
        acoes: {
          teleconsultoria_clinica: {
            title: "Teleconsultoria clínica para a integração da Atenção Primária à Saúde (APS) com a Atenção Especializada (AE)",
            description: "Implantação de teleconsultorias por médicos especialistas para a Atenção Primária, visando aumentar a resolubilidade e reduzir encaminhamentos desnecessários, com foco em linhas de cuidado prioritárias, arboviroses e vírus respiratórios, medicina fetal e otorrinolaringologia.",
            goal: "Realizar 45.200 teleconsultorias até junho de 2029.",
          },
          telecardiologia: {
            title: "Implementação da Telecardiologia para a rede de urgência e emergência",
            description: "Aquisição de eletrocardiógrafos e implantação de telecardiologia 24h no SAMU/MG, com laudos rápidos e orientações clínicas para as USBs, visando diagnóstico em até 10 minutos.",
            goal: "Emitir e laudar 28.500 eletrocardiogramas até junho de 2029.",
          },
          teleavc: {
            title: "TeleAVC",
            description: "Implantação de teleconsultoria e telediagnóstico 24h para apoio a diagnósticos de AVC, com análise de tomografias por neurologistas, visando decisões rápidas e intervenções em tempo oportuno.",
            goal: "Emitir e laudar 850 laudos de tomógrafo até junho de 2029.",
          },
        },
      },
    },
  },
  {
    macrorregiao: "NORTE",
    objetivos: {
      estrutura: {
        acoes: {
          infraestrutura: {
            title: "Infraestrutura para Saúde Digital",
            description: "Modernização de unidades de saúde públicas e filantrópicas com recursos para infraestrutura digital, fortalecendo o atendimento presencial e a telessaúde, com foco em regiões remotas. Inclui implementação e manutenção para garantir a sustentabilidade dos serviços.",
            goal: "Equipar 450 estabelecimentos com pacote de kits básicos de infraestrutura para cada CNES público e filantrópico do estado e município até junho de 2030.",
          },
          redes_dados: {
            title: "Redes Dados em Saúde",
            description: "Implementação de tecnologia blockchain para viabilizar a interoperabilidade entre sistemas de saúde em Minas Gerais, integrando dados dos três níveis de atenção e permitindo acesso facilitado às informações por Estados e Municípios.",
            goal: "Interoperar 1.992 atendimentos mensais com a RNDS até junho de 2030.",
          },
        },
      },
      telessaude: {
        acoes: {
          teleconsultoria_clinica: {
            title: "Teleconsultoria clínica para a integração da Atenção Primária à Saúde (APS) com a Atenção Especializada (AE)",
            description: "Implantação de teleconsultorias por médicos especialistas para a Atenção Primária, visando aumentar a resolubilidade e reduzir encaminhamentos desnecessários, com foco em linhas de cuidado prioritárias, arboviroses e vírus respiratórios, medicina fetal e otorrinolaringologia.",
            goal: "Realizar 32.150 teleconsultorias até junho de 2029.",
          },
          telecardiologia: {
            title: "Implementação da Telecardiologia para a rede de urgência e emergência",
            description: "Aquisição de eletrocardiógrafos e implantação de telecardiologia 24h no SAMU/MG, com laudos rápidos e orientações clínicas para as USBs, visando diagnóstico em até 10 minutos.",
            goal: "Emitir e laudar 18.750 eletrocardiogramas até junho de 2029.",
          },
          teleavc: {
            title: "TeleAVC",
            description: "Implantação de teleconsultoria e telediagnóstico 24h para apoio a diagnósticos de AVC, com análise de tomografias por neurologistas, visando decisões rápidas e intervenções em tempo oportuno.",
            goal: "Emitir e laudar 620 laudos de tomógrafo até junho de 2029.",
          },
          teleconsultoria_estomatologia: {
            title: "Teleconsultoria para estomatologia",
            description: "Oferecer serviços de Teleconsultoria para cirurgiões dentistas da APS para apoio no diagnóstico das Lesões Bucais e acompanhamento dos usuários, no estado de Minas Gerais.",
            goal: "Realizar 180 teleconsultorias até junho de 2026.",
          },
        },
      },
    },
  },
  {
    macrorregiao: "SUL",
    objetivos: {
      estrutura: {
        acoes: {
          infraestrutura: {
            title: "Infraestrutura para Saúde Digital",
            description: "Modernização de unidades de saúde públicas e filantrópicas com recursos para infraestrutura digital, fortalecendo o atendimento presencial e a telessaúde, com foco em regiões remotas. Inclui implementação e manutenção para garantir a sustentabilidade dos serviços.",
            goal: "Equipar 800 estabelecimentos com pacote de kits básicos de infraestrutura para cada CNES público e filantrópico do estado e município até junho de 2030.",
          },
          redes_dados: {
            title: "Redes Dados em Saúde",
            description: "Implementação de tecnologia blockchain para viabilizar a interoperabilidade entre sistemas de saúde em Minas Gerais, integrando dados dos três níveis de atenção e permitindo acesso facilitado às informações por Estados e Municípios.",
            goal: "Interoperar 1.992 atendimentos mensais com a RNDS até junho de 2030.",
          },
        },
      },
      telessaude: {
        acoes: {
          teleconsultoria_clinica: {
            title: "Teleconsultoria clínica para a integração da Atenção Primária à Saúde (APS) com a Atenção Especializada (AE)",
            description: "Implantação de teleconsultorias por médicos especialistas para a Atenção Primária, visando aumentar a resolubilidade e reduzir encaminhamentos desnecessários, com foco em linhas de cuidado prioritárias, arboviroses e vírus respiratórios, medicina fetal e otorrinolaringologia.",
            goal: "Realizar 58.400 teleconsultorias até junho de 2029.",
          },
          telecardiologia: {
            title: "Implementação da Telecardiologia para a rede de urgência e emergência",
            description: "Aquisição de eletrocardiógrafos e implantação de telecardiologia 24h no SAMU/MG, com laudos rápidos e orientações clínicas para as USBs, visando diagnóstico em até 10 minutos.",
            goal: "Emitir e laudar 35.200 eletrocardiogramas até junho de 2029.",
          },
          teleavc: {
            title: "TeleAVC",
            description: "Implantação de teleconsultoria e telediagnóstico 24h para apoio a diagnósticos de AVC, com análise de tomografias por neurologistas, visando decisões rápidas e intervenções em tempo oportuno.",
            goal: "Emitir e laudar 1.120 laudos de tomógrafo até junho de 2029.",
          },
          teleconsultoria_estomatologia: {
            title: "Teleconsultoria para estomatologia",
            description: "Oferecer serviços de Teleconsultoria para cirurgiões dentistas da APS para apoio no diagnóstico das Lesões Bucais e acompanhamento dos usuários, no estado de Minas Gerais.",
            goal: "Realizar 280 teleconsultorias até junho de 2026.",
          },
        },
      },
    },
  },
  {
    macrorregiao: "SUDESTE",
    objetivos: {
      estrutura: {
        acoes: {
          infraestrutura: {
            title: "Infraestrutura para Saúde Digital",
            description: "Modernização de unidades de saúde públicas e filantrópicas com recursos para infraestrutura digital, fortalecendo o atendimento presencial e a telessaúde, com foco em regiões remotas. Inclui implementação e manutenção para garantir a sustentabilidade dos serviços.",
            goal: "Equipar 1216 estabelecimentos com pacote de kits básicos de infraestrutura para cada CNES público e filantrópico do estado e município até junho de 2030.",
          },
          redes_dados: {
            title: "Redes Dados em Saúde",
            description: "Implementação de tecnologia blockchain para viabilizar a interoperabilidade entre sistemas de saúde em Minas Gerais, integrando dados dos três níveis de atenção e permitindo acesso facilitado às informações por Estados e Municípios.",
            goal: "Interoperar 1.992 atendimentos mensais com a RNDS até junho de 2030.",
          },
        },
      },
      telessaude: {
        acoes: {
          teleconsultoria_clinica: {
            title: "Teleconsultoria clínica para a integração da Atenção Primária à Saúde (APS) com a Atenção Especializada (AE)",
            description: "Implantação de teleconsultorias por médicos especialistas para a Atenção Primária, visando aumentar a resolubilidade e reduzir encaminhamentos desnecessários, com foco em linhas de cuidado prioritárias, arboviroses e vírus respiratórios, medicina fetal e otorrinolaringologia.",
            goal: "Realizar 78.900 teleconsultorias até junho de 2029.",
          },
          telecardiologia: {
            title: "Implementação da Telecardiologia para a rede de urgência e emergência",
            description: "Aquisição de eletrocardiógrafos e implantação de telecardiologia 24h no SAMU/MG, com laudos rápidos e orientações clínicas para as USBs, visando diagnóstico em até 10 minutos.",
            goal: "Emitir e laudar 42.800 eletrocardiogramas até junho de 2029.",
          },
          teleavc: {
            title: "TeleAVC",
            description: "Implantação de teleconsultoria e telediagnóstico 24h para apoio a diagnósticos de AVC, com análise de tomografias por neurologistas, visando decisões rápidas e intervenções em tempo oportuno.",
            goal: "Emitir e laudar 1.450 laudos de tomógrafo até junho de 2029.",
          },
          teleconsultoria_estomatologia: {
            title: "Teleconsultoria para estomatologia",
            description: "Oferecer serviços de Teleconsultoria para cirurgiões dentistas da APS para apoio no diagnóstico das Lesões Bucais e acompanhamento dos usuários, no estado de Minas Gerais.",
            goal: "Realizar 320 teleconsultorias até junho de 2026.",
          },
        },
      },
    },
  },
  {
    macrorregiao: "LESTE",
    objetivos: {
      estrutura: {
        acoes: {
          infraestrutura: {
            title: "Infraestrutura para Saúde Digital",
            description: "Modernização de unidades de saúde públicas e filantrópicas com recursos para infraestrutura digital, fortalecendo o atendimento presencial e a telessaúde, com foco em regiões remotas. Inclui implementação e manutenção para garantir a sustentabilidade dos serviços.",
            goal: "Equipar 950 estabelecimentos com pacote de kits básicos de infraestrutura para cada CNES público e filantrópico do estado e município até junho de 2030.",
          },
          redes_dados: {
            title: "Redes Dados em Saúde",
            description: "Implementação de tecnologia blockchain para viabilizar a interoperabilidade entre sistemas de saúde em Minas Gerais, integrando dados dos três níveis de atenção e permitindo acesso facilitado às informações por Estados e Municípios.",
            goal: "Interoperar 1.992 atendimentos mensais com a RNDS até junho de 2030.",
          },
        },
      },
      telessaude: {
        acoes: {
          teleconsultoria_clinica: {
            title: "Teleconsultoria clínica para a integração da Atenção Primária à Saúde (APS) com a Atenção Especializada (AE)",
            description: "Implantação de teleconsultorias por médicos especialistas para a Atenção Primária, visando aumentar a resolubilidade e reduzir encaminhamentos desnecessários, com foco em linhas de cuidado prioritárias, arboviroses e vírus respiratórios, medicina fetal e otorrinolaringologia.",
            goal: "Realizar 65.300 teleconsultorias até junho de 2029.",
          },
          telecardiologia: {
            title: "Implementação da Telecardiologia para a rede de urgência e emergência",
            description: "Aquisição de eletrocardiógrafos e implantação de telecardiologia 24h no SAMU/MG, com laudos rápidos e orientações clínicas para as USBs, visando diagnóstico em até 10 minutos.",
            goal: "Emitir e laudar 38.600 eletrocardiogramas até junho de 2029.",
          },
          teleavc: {
            title: "TeleAVC",
            description: "Implantação de teleconsultoria e telediagnóstico 24h para apoio a diagnósticos de AVC, com análise de tomografias por neurologistas, visando decisões rápidas e intervenções em tempo oportuno.",
            goal: "Emitir e laudar 1.280 laudos de tomógrafo até junho de 2029.",
          },
          teleconsultoria_estomatologia: {
            title: "Teleconsultoria para estomatologia",
            description: "Oferecer serviços de Teleconsultoria para cirurgiões dentistas da APS para apoio no diagnóstico das Lesões Bucais e acompanhamento dos usuários, no estado de Minas Gerais.",
            goal: "Realizar 290 teleconsultorias até junho de 2026.",
          },
        },
      },
    },
  },
  {
    macrorregiao: "TRIÂNGULO DO SUL",
    objetivos: {
      estrutura: {
        acoes: {
          infraestrutura: {
            title: "Infraestrutura para Saúde Digital",
            description: "Modernização de unidades de saúde públicas e filantrópicas com recursos para infraestrutura digital, fortalecendo o atendimento presencial e a telessaúde, com foco em regiões remotas. Inclui implementação e manutenção para garantir a sustentabilidade dos serviços.",
            goal: "Equipar 1100 estabelecimentos com pacote de kits básicos de infraestrutura para cada CNES público e filantrópico do estado e município até junho de 2030.",
          },
          redes_dados: {
            title: "Redes Dados em Saúde",
            description: "Implementação de tecnologia blockchain para viabilizar a interoperabilidade entre sistemas de saúde em Minas Gerais, integrando dados dos três níveis de atenção e permitindo acesso facilitado às informações por Estados e Municípios.",
            goal: "Interoperar 1.992 atendimentos mensais com a RNDS até junho de 2030.",
          },
        },
      },
      telessaude: {
        acoes: {
          teleconsultoria_clinica: {
            title: "Teleconsultoria clínica para a integração da Atenção Primária à Saúde (APS) com a Atenção Especializada (AE)",
            description: "Implantação de teleconsultorias por médicos especialistas para a Atenção Primária, visando aumentar a resolubilidade e reduzir encaminhamentos desnecessários, com foco em linhas de cuidado prioritárias, arboviroses e vírus respiratórios, medicina fetal e otorrinolaringologia.",
            goal: "Realizar 72.500 teleconsultorias até junho de 2029.",
          },
          telecardiologia: {
            title: "Implementação da Telecardiologia para a rede de urgência e emergência",
            description: "Aquisição de eletrocardiógrafos e implantação de telecardiologia 24h no SAMU/MG, com laudos rápidos e orientações clínicas para as USBs, visando diagnóstico em até 10 minutos.",
            goal: "Emitir e laudar 41.200 eletrocardiogramas até junho de 2029.",
          },
          teleavc: {
            title: "TeleAVC",
            description: "Implantação de teleconsultoria e telediagnóstico 24h para apoio a diagnósticos de AVC, com análise de tomografias por neurologistas, visando decisões rápidas e intervenções em tempo oportuno.",
            goal: "Emitir e laudar 1.380 laudos de tomógrafo até junho de 2029.",
          },
          teleconsultoria_estomatologia: {
            title: "Teleconsultoria para estomatologia",
            description: "Oferecer serviços de Teleconsultoria para cirurgiões dentistas da APS para apoio no diagnóstico das Lesões Bucais e acompanhamento dos usuários, no estado de Minas Gerais.",
            goal: "Realizar 310 teleconsultorias até junho de 2026.",
          },
        },
      },
    },
  },
  {
    macrorregiao: "VALE DO AÇO",
    objetivos: {
      estrutura: {
        acoes: {
          infraestrutura: {
            title: "Infraestrutura para Saúde Digital",
            description: "Modernização de unidades de saúde públicas e filantrópicas com recursos para infraestrutura digital, fortalecendo o atendimento presencial e a telessaúde, com foco em regiões remotas. Inclui implementação e manutenção para garantir a sustentabilidade dos serviços.",
            goal: "Equipar 750 estabelecimentos com pacote de kits básicos de infraestrutura para cada CNES público e filantrópico do estado e município até junho de 2030.",
          },
          redes_dados: {
            title: "Redes Dados em Saúde",
            description: "Implementação de tecnologia blockchain para viabilizar a interoperabilidade entre sistemas de saúde em Minas Gerais, integrando dados dos três níveis de atenção e permitindo acesso facilitado às informações por Estados e Municípios.",
            goal: "Interoperar 1.992 atendimentos mensais com a RNDS até junho de 2030.",
          },
        },
      },
      telessaude: {
        acoes: {
          teleconsultoria_clinica: {
            title: "Teleconsultoria clínica para a integração da Atenção Primária à Saúde (APS) com a Atenção Especializada (AE)",
            description: "Implantação de teleconsultorias por médicos especialistas para a Atenção Primária, visando aumentar a resolubilidade e reduzir encaminhamentos desnecessários, com foco em linhas de cuidado prioritárias, arboviroses e vírus respiratórios, medicina fetal e otorrinolaringologia.",
            goal: "Realizar 52.800 teleconsultorias até junho de 2029.",
          },
          telecardiologia: {
            title: "Implementação da Telecardiologia para a rede de urgência e emergência",
            description: "Aquisição de eletrocardiógrafos e implantação de telecardiologia 24h no SAMU/MG, com laudos rápidos e orientações clínicas para as USBs, visando diagnóstico em até 10 minutos.",
            goal: "Emitir e laudar 31.500 eletrocardiogramas até junho de 2029.",
          },
          teleavc: {
            title: "TeleAVC",
            description: "Implantação de teleconsultoria e telediagnóstico 24h para apoio a diagnósticos de AVC, com análise de tomografias por neurologistas, visando decisões rápidas e intervenções em tempo oportuno.",
            goal: "Emitir e laudar 980 laudos de tomógrafo até junho de 2029.",
          },
          teleconsultoria_estomatologia: {
            title: "Teleconsultoria para estomatologia",
            description: "Oferecer serviços de Teleconsultoria para cirurgiões dentistas da APS para apoio no diagnóstico das Lesões Bucais e acompanhamento dos usuários, no estado de Minas Gerais.",
            goal: "Realizar 220 teleconsultorias até junho de 2026.",
          },
        },
      },
    },
  },
  {
    macrorregiao: "LESTE DO SUL",
    objetivos: {
      estrutura: {
        acoes: {
          infraestrutura: {
            title: "Infraestrutura para Saúde Digital",
            description: "Modernização de unidades de saúde públicas e filantrópicas com recursos para infraestrutura digital, fortalecendo o atendimento presencial e a telessaúde, com foco em regiões remotas. Inclui implementação e manutenção para garantir a sustentabilidade dos serviços.",
            goal: "Equipar 400 estabelecimentos com pacote de kits básicos de infraestrutura para cada CNES público e filantrópico do estado e município até junho de 2030.",
          },
          redes_dados: {
            title: "Redes Dados em Saúde",
            description: "Implementação de tecnologia blockchain para viabilizar a interoperabilidade entre sistemas de saúde em Minas Gerais, integrando dados dos três níveis de atenção e permitindo acesso facilitado às informações por Estados e Municípios.",
            goal: "Interoperar 1.992 atendimentos mensais com a RNDS até junho de 2030.",
          },
        },
      },
      telessaude: {
        acoes: {
          teleconsultoria_clinica: {
            title: "Teleconsultoria clínica para a integração da Atenção Primária à Saúde (APS) com a Atenção Especializada (AE)",
            description: "Implantação de teleconsultorias por médicos especialistas para a Atenção Primária, visando aumentar a resolubilidade e reduzir encaminhamentos desnecessários, com foco em linhas de cuidado prioritárias, arboviroses e vírus respiratórios, medicina fetal e otorrinolaringologia.",
            goal: "Realizar 28.400 teleconsultorias até junho de 2029.",
          },
          telecardiologia: {
            title: "Implementação da Telecardiologia para a rede de urgência e emergência",
            description: "Aquisição de eletrocardiógrafos e implantação de telecardiologia 24h no SAMU/MG, com laudos rápidos e orientações clínicas para as USBs, visando diagnóstico em até 10 minutos.",
            goal: "Emitir e laudar 16.800 eletrocardiogramas até junho de 2029.",
          },
          teleavc: {
            title: "TeleAVC",
            description: "Implantação de teleconsultoria e telediagnóstico 24h para apoio a diagnósticos de AVC, com análise de tomografias por neurologistas, visando decisões rápidas e intervenções em tempo oportuno.",
            goal: "Emitir e laudar 520 laudos de tomógrafo até junho de 2029.",
          },
        },
      },
    },
  },
  {
    macrorregiao: "JEQUITINHONHA",
    objetivos: {
      estrutura: {
        acoes: {
          infraestrutura: {
            title: "Infraestrutura para Saúde Digital",
            description: "Modernização de unidades de saúde públicas e filantrópicas com recursos para infraestrutura digital, fortalecendo o atendimento presencial e a telessaúde, com foco em regiões remotas. Inclui implementação e manutenção para garantir a sustentabilidade dos serviços.",
            goal: "Equipar 425 estabelecimentos com pacote de kits básicos de infraestrutura para cada CNES público e filantrópico do estado e município até junho de 2030.",
          },
          redes_dados: {
            title: "Redes Dados em Saúde",
            description: "Implementação de tecnologia blockchain para viabilizar a interoperabilidade entre sistemas de saúde em Minas Gerais, integrando dados dos três níveis de atenção e permitindo acesso facilitado às informações por Estados e Municípios.",
            goal: "Interoperar 1.992 atendimentos mensais com a RNDS até junho de 2030.",
          },
        },
      },
      telessaude: {
        acoes: {
          teleconsultoria_clinica: {
            title: "Teleconsultoria clínica para a integração da Atenção Primária à Saúde (APS) com a Atenção Especializada (AE)",
            description: "Implantação de teleconsultorias por médicos especialistas para a Atenção Primária, visando aumentar a resolubilidade e reduzir encaminhamentos desnecessários, com foco em linhas de cuidado prioritárias, arboviroses e vírus respiratórios, medicina fetal e otorrinolaringologia.",
            goal: "Realizar 22.600 teleconsultorias até junho de 2029.",
          },
          telecardiologia: {
            title: "Implementação da Telecardiologia para a rede de urgência e emergência",
            description: "Aquisição de eletrocardiógrafos e implantação de telecardiologia 24h no SAMU/MG, com laudos rápidos e orientações clínicas para as USBs, visando diagnóstico em até 10 minutos.",
            goal: "Emitir e laudar 13.200 eletrocardiogramas até junho de 2029.",
          },
          teleavc: {
            title: "TeleAVC",
            description: "Implantação de teleconsultoria e telediagnóstico 24h para apoio a diagnósticos de AVC, com análise de tomografias por neurologistas, visando decisões rápidas e intervenções em tempo oportuno.",
            goal: "Emitir e laudar 420 laudos de tomógrafo até junho de 2029.",
          },
          teleconsultoria_estomatologia: {
            title: "Teleconsultoria para estomatologia",
            description: "Oferecer serviços de Teleconsultoria para cirurgiões dentistas da APS para apoio no diagnóstico das Lesões Bucais e acompanhamento dos usuários, no estado de Minas Gerais.",
            goal: "Realizar 150 teleconsultorias até junho de 2026.",
          },
        },
      },
    },
  },
  {
    macrorregiao: "EXTREMO SUL",
    objetivos: {
      estrutura: {
        acoes: {
          infraestrutura: {
            title: "Infraestrutura para Saúde Digital",
            description: "Modernização de unidades de saúde públicas e filantrópicas com recursos para infraestrutura digital, fortalecendo o atendimento presencial e a telessaúde, com foco em regiões remotas. Inclui implementação e manutenção para garantir a sustentabilidade dos serviços.",
            goal: "Equipar 425 estabelecimentos com pacote de kits básicos de infraestrutura para cada CNES público e filantrópico do estado e município até junho de 2030.",
          },
          redes_dados: {
            title: "Redes Dados em Saúde",
            description: "Implementação de tecnologia blockchain para viabilizar a interoperabilidade entre sistemas de saúde em Minas Gerais, integrando dados dos três níveis de atenção e permitindo acesso facilitado às informações por Estados e Municípios.",
            goal: "Interoperar 1.992 atendimentos mensais com a RNDS até junho de 2030.",
          },
        },
      },
      telessaude: {
        acoes: {
          teleconsultoria_clinica: {
            title: "Teleconsultoria clínica para a integração da Atenção Primária à Saúde (APS) com a Atenção Especializada (AE)",
            description: "Implantação de teleconsultorias por médicos especialistas para a Atenção Primária, visando aumentar a resolubilidade e reduzir encaminhamentos desnecessários, com foco em linhas de cuidado prioritárias, arboviroses e vírus respiratórios, medicina fetal e otorrinolaringologia.",
            goal: "Realizar 22.600 teleconsultorias até junho de 2029.",
          },
          telecardiologia: {
            title: "Implementação da Telecardiologia para a rede de urgência e emergência",
            description: "Aquisição de eletrocardiógrafos e implantação de telecardiologia 24h no SAMU/MG, com laudos rápidos e orientações clínicas para as USBs, visando diagnóstico em até 10 minutos.",
            goal: "Emitir e laudar 13.200 eletrocardiogramas até junho de 2029.",
          },
          teleavc: {
            title: "TeleAVC",
            description: "Implantação de teleconsultoria e telediagnóstico 24h para apoio a diagnósticos de AVC, com análise de tomografias por neurologistas, visando decisões rápidas e intervenções em tempo oportuno.",
            goal: "Emitir e laudar 420 laudos de tomógrafo até junho de 2029.",
          },
          teleconsultoria_estomatologia: {
            title: "Teleconsultoria para estomatologia",
            description: "Oferecer serviços de Teleconsultoria para cirurgiões dentistas da APS para apoio no diagnóstico das Lesões Bucais e acompanhamento dos usuários, no estado de Minas Gerais.",
            goal: "Realizar 150 teleconsultorias até junho de 2026.",
          },
        },
      },
    },
  },
  {
    macrorregiao: "NOROESTE",
    objetivos: {
      estrutura: {
        acoes: {
          infraestrutura: {
            title: "Infraestrutura para Saúde Digital",
            description: "Modernização de unidades de saúde públicas e filantrópicas com recursos para infraestrutura digital, fortalecendo o atendimento presencial e a telessaúde, com foco em regiões remotas. Inclui implementação e manutenção para garantir a sustentabilidade dos serviços.",
            goal: "Equipar 425 estabelecimentos com pacote de kits básicos de infraestrutura para cada CNES público e filantrópico do estado e município até junho de 2030.",
          },
          redes_dados: {
            title: "Redes Dados em Saúde",
            description: "Implementação de tecnologia blockchain para viabilizar a interoperabilidade entre sistemas de saúde em Minas Gerais, integrando dados dos três níveis de atenção e permitindo acesso facilitado às informações por Estados e Municípios.",
            goal: "Interoperar 1.992 atendimentos mensais com a RNDS até junho de 2030.",
          },
        },
      },
      telessaude: {
        acoes: {
          teleconsultoria_clinica: {
            title: "Teleconsultoria clínica para a integração da Atenção Primária à Saúde (APS) com a Atenção Especializada (AE)",
            description: "Implantação de teleconsultorias por médicos especialistas para a Atenção Primária, visando aumentar a resolubilidade e reduzir encaminhamentos desnecessários, com foco em linhas de cuidado prioritárias, arboviroses e vírus respiratórios, medicina fetal e otorrinolaringologia.",
            goal: "Realizar 22.600 teleconsultorias até junho de 2029.",
          },
          telecardiologia: {
            title: "Implementação da Telecardiologia para a rede de urgência e emergência",
            description: "Aquisição de eletrocardiógrafos e implantação de telecardiologia 24h no SAMU/MG, com laudos rápidos e orientações clínicas para as USBs, visando diagnóstico em até 10 minutos.",
            goal: "Emitir e laudar 13.200 eletrocardiogramas até junho de 2029.",
          },
          teleavc: {
            title: "TeleAVC",
            description: "Implantação de teleconsultoria e telediagnóstico 24h para apoio a diagnósticos de AVC, com análise de tomografias por neurologistas, visando decisões rápidas e intervenções em tempo oportuno.",
            goal: "Emitir e laudar 420 laudos de tomógrafo até junho de 2029.",
          },
          teleconsultoria_estomatologia: {
            title: "Teleconsultoria para estomatologia",
            description: "Oferecer serviços de Teleconsultoria para cirurgiões dentistas da APS para apoio no diagnóstico das Lesões Bucais e acompanhamento dos usuários, no estado de Minas Gerais.",
            goal: "Realizar 150 teleconsultorias até junho de 2026.",
          },
        },
      },
    },
  },
  {
    macrorregiao: "OESTE",
    objetivos: {
      estrutura: {
        acoes: {
          infraestrutura: {
            title: "Infraestrutura para Saúde Digital",
            description: "Modernização de unidades de saúde públicas e filantrópicas com recursos para infraestrutura digital, fortalecendo o atendimento presencial e a telessaúde, com foco em regiões remotas. Inclui implementação e manutenção para garantir a sustentabilidade dos serviços.",
            goal: "Equipar 425 estabelecimentos com pacote de kits básicos de infraestrutura para cada CNES público e filantrópico do estado e município até junho de 2030.",
          },
          redes_dados: {
            title: "Redes Dados em Saúde",
            description: "Implementação de tecnologia blockchain para viabilizar a interoperabilidade entre sistemas de saúde em Minas Gerais, integrando dados dos três níveis de atenção e permitindo acesso facilitado às informações por Estados e Municípios.",
            goal: "Interoperar 1.992 atendimentos mensais com a RNDS até junho de 2030.",
          },
        },
      },
      telessaude: {
        acoes: {
          teleconsultoria_clinica: {
            title: "Teleconsultoria clínica para a integração da Atenção Primária à Saúde (APS) com a Atenção Especializada (AE)",
            description: "Implantação de teleconsultorias por médicos especialistas para a Atenção Primária, visando aumentar a resolubilidade e reduzir encaminhamentos desnecessários, com foco em linhas de cuidado prioritárias, arboviroses e vírus respiratórios, medicina fetal e otorrinolaringologia.",
            goal: "Realizar 22.600 teleconsultorias até junho de 2029.",
          },
          telecardiologia: {
            title: "Implementação da Telecardiologia para a rede de urgência e emergência",
            description: "Aquisição de eletrocardiógrafos e implantação de telecardiologia 24h no SAMU/MG, com laudos rápidos e orientações clínicas para as USBs, visando diagnóstico em até 10 minutos.",
            goal: "Emitir e laudar 13.200 eletrocardiogramas até junho de 2029.",
          },
          teleavc: {
            title: "TeleAVC",
            description: "Implantação de teleconsultoria e telediagnóstico 24h para apoio a diagnósticos de AVC, com análise de tomografias por neurologistas, visando decisões rápidas e intervenções em tempo oportuno.",
            goal: "Emitir e laudar 420 laudos de tomógrafo até junho de 2029.",
          },
          teleconsultoria_estomatologia: {
            title: "Teleconsultoria para estomatologia",
            description: "Oferecer serviços de Teleconsultoria para cirurgiões dentistas da APS para apoio no diagnóstico das Lesões Bucais e acompanhamento dos usuários, no estado de Minas Gerais.",
            goal: "Realizar 150 teleconsultorias até junho de 2026.",
          },
        },
      },
    },
  },
  {
    macrorregiao: "SUDOESTE",
    objetivos: {
      estrutura: {
        acoes: {
          infraestrutura: {
            title: "Infraestrutura para Saúde Digital",
            description: "Modernização de unidades de saúde públicas e filantrópicas com recursos para infraestrutura digital, fortalecendo o atendimento presencial e a telessaúde, com foco em regiões remotas. Inclui implementação e manutenção para garantir a sustentabilidade dos serviços.",
            goal: "Equipar 841 estabelecimentos com pacote de kits básicos de infraestrutura para cada CNES público e filantrópico do estado e município até junho de 2030.",
          },
          redes_dados: {
            title: "Redes Dados em Saúde",
            description: "Implementação de tecnologia blockchain para viabilizar a interoperabilidade entre sistemas de saúde em Minas Gerais, integrando dados dos três níveis de atenção e permitindo acesso facilitado às informações por Estados e Municípios.",
            goal: "Interoperar 1.992 atendimentos mensais com a RNDS até junho de 2030.",
          },
        },
      },
      telessaude: {
        acoes: {
          teleconsultoria_clinica: {
            title: "Teleconsultoria clínica para a integração da Atenção Primária à Saúde (APS) com a Atenção Especializada (AE)",
            description: "Implantação de teleconsultorias por médicos especialistas para a Atenção Primária, visando aumentar a resolubilidade e reduzir encaminhamentos desnecessários, com foco em linhas de cuidado prioritárias, arboviroses e vírus respiratórios, medicina fetal e otorrinolaringologia.",
            goal: "Realizar 22.600 teleconsultorias até junho de 2029.",
          },
          telecardiologia: {
            title: "Implementação da Telecardiologia para a rede de urgência e emergência",
            description: "Aquisição de eletrocardiógrafos e implantação de telecardiologia 24h no SAMU/MG, com laudos rápidos e orientações clínicas para as USBs, visando diagnóstico em até 10 minutos.",
            goal: "Emitir e laudar 13.200 eletrocardiogramas até junho de 2029.",
          },
          teleavc: {
            title: "TeleAVC",
            description: "Implantação de teleconsultoria e telediagnóstico 24h para apoio a diagnósticos de AVC, com análise de tomografias por neurologistas, visando decisões rápidas e intervenções em tempo oportuno.",
            goal: "Emitir e laudar 420 laudos de tomógrafo até junho de 2029.",
          },
          teleconsultoria_estomatologia: {
            title: "Teleconsultoria para estomatologia",
            description: "Oferecer serviços de Teleconsultoria para cirurgiões dentistas da APS para apoio no diagnóstico das Lesões Bucais e acompanhamento dos usuários, no estado de Minas Gerais.",
            goal: "Realizar 150 teleconsultorias até junho de 2026.",
          },
        },
      },
    },
  },
  {
    macrorregiao: "TRIÂNGULO DO NORTE",
    objetivos: {
      estrutura: {
        acoes: {
          infraestrutura: {
            title: "Infraestrutura para Saúde Digital",
            description: "Modernização de unidades de saúde públicas e filantrópicas com recursos para infraestrutura digital, fortalecendo o atendimento presencial e a telessaúde, com foco em regiões remotas. Inclui implementação e manutenção para garantir a sustentabilidade dos serviços.",
            goal: "Equipar 425 estabelecimentos com pacote de kits básicos de infraestrutura para cada CNES público e filantrópico do estado e município até junho de 2030.",
          },
          redes_dados: {
            title: "Redes Dados em Saúde",
            description: "Implementação de tecnologia blockchain para viabilizar a interoperabilidade entre sistemas de saúde em Minas Gerais, integrando dados dos três níveis de atenção e permitindo acesso facilitado às informações por Estados e Municípios.",
            goal: "Interoperar 1.992 atendimentos mensais com a RNDS até junho de 2030.",
          },
        },
      },
      telessaude: {
        acoes: {
          teleconsultoria_clinica: {
            title: "Teleconsultoria clínica para a integração da Atenção Primária à Saúde (APS) com a Atenção Especializada (AE)",
            description: "Implantação de teleconsultorias por médicos especialistas para a Atenção Primária, visando aumentar a resolubilidade e reduzir encaminhamentos desnecessários, com foco em linhas de cuidado prioritárias, arboviroses e vírus respiratórios, medicina fetal e otorrinolaringologia.",
            goal: "Realizar 22.600 teleconsultorias até junho de 2029.",
          },
          telecardiologia: {
            title: "Implementação da Telecardiologia para a rede de urgência e emergência",
            description: "Aquisição de eletrocardiógrafos e implantação de telecardiologia 24h no SAMU/MG, com laudos rápidos e orientações clínicas para as USBs, visando diagnóstico em até 10 minutos.",
            goal: "Emitir e laudar 13.200 eletrocardiogramas até junho de 2029.",
          },
          teleavc: {
            title: "TeleAVC",
            description: "Implantação de teleconsultoria e telediagnóstico 24h para apoio a diagnósticos de AVC, com análise de tomografias por neurologistas, visando decisões rápidas e intervenções em tempo oportuno.",
            goal: "Emitir e laudar 420 laudos de tomógrafo até junho de 2029.",
          },
          teleconsultoria_estomatologia: {
            title: "Teleconsultoria para estomatologia",
            description: "Oferecer serviços de Teleconsultoria para cirurgiões dentistas da APS para apoio no diagnóstico das Lesões Bucais e acompanhamento dos usuários, no estado de Minas Gerais.",
            goal: "Realizar 150 teleconsultorias até junho de 2026.",
          },
        },
      },
    },
  },
];

// Função para obter dados específicos de uma macro-região
export function getPlanoAcaoMacroRegiao(macrorregiao: string): PlanoAcaoMacroRegiao | null {
  console.log('🔍 getPlanoAcaoMacroRegiao chamada com:', macrorregiao);
  console.log('🔍 Macro-regiões disponíveis:', planoAcaoMacroRegioes.map(m => m.macrorregiao));
  
  // Normalizar a string de entrada (remover espaços extras e converter para maiúsculo)
  const normalizedInput = macrorregiao.trim().toUpperCase();
  console.log('🔍 Input normalizado:', normalizedInput);
  
  const result = planoAcaoMacroRegioes.find(item => 
    item.macrorregiao.trim().toUpperCase() === normalizedInput
  ) || null;
  
  console.log('🔍 Resultado encontrado:', result ? 'SIM' : 'NÃO');
  
  return result;
}

// Função para obter goal específico de uma ação
export function getGoalByMacroRegiao(
  macrorregiao: string, 
  objetivoId: string, 
  acaoId: string
): string | null {
  const macroRegiaoData = getPlanoAcaoMacroRegiao(macrorregiao);
  if (!macroRegiaoData) return null;
  
  return macroRegiaoData.objetivos[objetivoId]?.acoes[acaoId]?.goal || null;
}

// Função para obter ações específicas de uma macro-região
export function getAcoesByMacroRegiao(
  macrorregiao: string, 
  objetivoId: string
): Array<{id: string, title: string, description: string, goal: string}> | null {
  console.log('🔍 getAcoesByMacroRegiao chamada com:', { macrorregiao, objetivoId });
  
  const macroRegiaoData = getPlanoAcaoMacroRegiao(macrorregiao);
  console.log('🔍 Dados da macro-região encontrados:', macroRegiaoData);
  
  if (!macroRegiaoData) {
    console.log('❌ Macro-região não encontrada:', macrorregiao);
    return null;
  }
  
  const acoes = macroRegiaoData.objetivos[objetivoId]?.acoes;
  console.log('🔍 Ações encontradas para objetivo:', objetivoId, acoes);
  
  if (!acoes) {
    console.log('❌ Nenhuma ação encontrada para objetivo:', objetivoId, 'na macro-região:', macrorregiao);
    return null;
  }
  
  const result = Object.entries(acoes).map(([id, acao]) => ({
    id,
    title: acao.title,
    description: acao.description,
    goal: acao.goal
  }));
  
  console.log('✅ Ações retornadas:', result);
  return result;
} 
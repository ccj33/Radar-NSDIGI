import { useEffect, useState } from 'react';

// Interface baseada na estrutura processada do base_c.xlsx
export interface BaseCObjetivo {
  tema: string;
  descricao: string;
  acoes: Array<{
    titulo: string;
    meta: string;
    origem: string;
    tipo: 'meta padrão' | 'meta específica';
  }>;
}

export interface BaseCMacrorregiao {
  macrorregiao: string;
  objetivos: BaseCObjetivo[];
}

export interface BaseCResumo {
  [macrorregiao: string]: {
    temas: string[];
    totalMetas: number;
    metasPorTema: { [tema: string]: number };
  };
}

export function useBaseCData() {
  const [data, setData] = useState<BaseCMacrorregiao[]>([]);
  const [resumo, setResumo] = useState<BaseCResumo>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        // Tentar carregar o arquivo consolidado
        const consolidadoResponse = await fetch('/output/planos_acao_consolidado.json');
        if (consolidadoResponse.ok) {
          const consolidadoData = await consolidadoResponse.json();
          console.log('📊 Dados consolidados carregados:', consolidadoData);
          
          // O arquivo consolidado tem estrutura: { macrorregioes: [...] }
          const macrosData = consolidadoData.macrorregioes || consolidadoData;
          console.log('📊 Macrorregiões extraídas:', Array.isArray(macrosData) ? macrosData.length : 'não é array');
          setData(Array.isArray(macrosData) ? macrosData : []);
        } else {
          // Fallback: carregar arquivos individuais das macrorregiões
          const macrorregioes = [
            'CENTRO', 'CENTRO_SUL', 'NORDESTE', 'NORTE', 'SUL', 'SUDESTE',
            'LESTE', 'TRI_NGULO_DO_SUL', 'VALE_DO_A_O', 'LESTE_DO_SUL',
            'JEQUITINHONHA', 'EXTREMO_SUL', 'NOROESTE', 'OESTE', 'SUDOESTE',
            'TRI_NGULO_DO_NORTE'
          ];

          const dataPromises = macrorregioes.map(async (macro) => {
            try {
              const response = await fetch(`/output/${macro}.json`);
              if (response.ok) {
                return await response.json();
              }
              return null;
            } catch (err) {
              console.warn(`Erro ao carregar dados de ${macro}:`, err);
              return null;
            }
          });

          const results = await Promise.all(dataPromises);
          const validData = results.filter((item): item is BaseCMacrorregiao => item !== null);
          console.log('📊 Dados individuais carregados:', validData.length, 'macrorregiões');
          setData(validData);
        }

        // Carregar resumo
        try {
          const resumoResponse = await fetch('/output/resumo_por_macrorregiao.json');
          if (resumoResponse.ok) {
            const resumoData = await resumoResponse.json();
            setResumo(resumoData);
          }
        } catch (err) {
          console.warn('Erro ao carregar resumo:', err);
        }

      } catch (err) {
        console.error('Erro ao carregar dados do base_c:', err);
        setError('Erro ao carregar dados do Plano de Ação Estratégico');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Função para obter dados de uma macrorregião específica
  const getMacrorregiao = (nome: string): BaseCMacrorregiao | undefined => {
    if (!Array.isArray(data) || data.length === 0) {
      return undefined;
    }
    const normalizedNome = nome.toUpperCase().trim();
    return data.find(item => 
      item.macrorregiao.toUpperCase().trim() === normalizedNome
    );
  };

  // Função para obter objetivos por tema
  const getObjetivosPorTema = (macrorregiao: string): { [tema: string]: BaseCObjetivo } => {
    const macroData = getMacrorregiao(macrorregiao);
    if (!macroData || !Array.isArray(macroData.objetivos)) return {};

    const objetivosPorTema: { [tema: string]: BaseCObjetivo } = {};
    macroData.objetivos.forEach(objetivo => {
      objetivosPorTema[objetivo.tema] = objetivo;
    });
    
    return objetivosPorTema;
  };

  // Função para obter estatísticas de uma macrorregião
  const getEstatisticas = (macrorregiao: string) => {
    const macroData = getMacrorregiao(macrorregiao);
    const resumoData = resumo[macrorregiao.toUpperCase()];
    
    if (!macroData || !Array.isArray(macroData.objetivos)) return null;

    const totalAcoes = macroData.objetivos.reduce((total, obj) => 
      total + (Array.isArray(obj.acoes) ? obj.acoes.length : 0), 0
    );
    const totalTemas = macroData.objetivos.length;
    const metasPadrao = macroData.objetivos.reduce((total, obj) => 
      total + (Array.isArray(obj.acoes) ? obj.acoes.filter(acao => acao.tipo === 'meta padrão').length : 0), 0
    );
    const metasEspecificas = macroData.objetivos.reduce((total, obj) => 
      total + (Array.isArray(obj.acoes) ? obj.acoes.filter(acao => acao.tipo === 'meta específica').length : 0), 0
    );

    return {
      totalAcoes,
      totalTemas,
      metasPadrao,
      metasEspecificas,
      resumoDetalhado: resumoData
    };
  };

  return {
    data,
    resumo,
    loading,
    error,
    getMacrorregiao,
    getObjetivosPorTema,
    getEstatisticas
  };
}
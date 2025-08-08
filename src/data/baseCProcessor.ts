import * as XLSX from 'xlsx';

// Interface para os dados da planilha base_c.xlsx
interface PlanoAcaoItem {
  objetivo: string;
  tema: string;
  descricao: string;
  meta: string;
  macrorregiao: string;
  origem?: string;
}

// Interface para o JSON estruturado por macrorregião
interface ObjetivoEstrategico {
  tema: string;
  descricao: string;
  acoes: {
    titulo: string;
    meta: string;
    origem: string;
    tipo: 'meta padrão' | 'meta específica';
  }[];
}

interface MacrorregiaoData {
  macrorregiao: string;
  objetivos: ObjetivoEstrategico[];
}

// Estruturas focadas no agrupamento por número do objetivo
export interface PlanoAcaoAcaoAgrupada {
  titulo: string;
  meta?: string;
  exemplo?: string;
}

export interface PlanoAcaoObjetivoAgrupado {
  numero: number;
  titulo: string;
  acoes: PlanoAcaoAcaoAgrupada[];
}

export interface PlanoAcaoMacroAgrupado {
  macrorregiao: string;
  objetivos: PlanoAcaoObjetivoAgrupado[];
}

// Função para ler e processar a planilha base_c.xlsx
export async function processBaseCExcel(): Promise<MacrorregiaoData[]> {
  try {
    // Carregar o arquivo base_c.xlsx da pasta public
    const response = await fetch('/base_c.xlsx');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    
    // Procurar pela aba 'PA - objetivos, ações e metas'
    let sheetName = 'PA - objetivos, ações e metas';
    if (!workbook.SheetNames.includes(sheetName)) {
      // Se não encontrar, usar a primeira aba disponível
      sheetName = workbook.SheetNames[0];
      console.warn(`Aba '${sheetName}' não encontrada. Usando: ${sheetName}`);
    }
    
    const worksheet = workbook.Sheets[sheetName];
    
    // Converter para JSON
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { 
      header: 1,
      defval: '',
      raw: false 
    });
    
    if (!jsonData || jsonData.length < 2) {
      throw new Error('Arquivo base_c.xlsx vazio ou sem dados válidos');
    }
    
    // Primeira linha como cabeçalho
    const headers = jsonData[0] as string[];
    const rows = jsonData.slice(1) as any[][];
    
    console.log('Cabeçalhos encontrados:', headers);
    
    // Mapear os dados para a interface
    const planoAcaoItems: PlanoAcaoItem[] = rows
      .map((row, index) => {
        const item: any = {};
        headers.forEach((header, colIndex) => {
          const normalizedHeader = normalizeColumnName(header);
          const value = row[colIndex];
          if (value !== undefined && value !== null && value !== '') {
            item[normalizedHeader] = String(value).trim();
          }
        });
        
        // Verificar se tem os campos essenciais
        if (item.objetivo || item.tema || item.descricao || item.meta) {
          return {
            objetivo: item.objetivo || '',
            tema: item.tema || '',
            descricao: item.descricao || '',
            meta: item.meta || '',
            macrorregiao: item.macrorregiao || item.macro || item.macroregiao || '',
            origem: `Linha ${index + 2}`
          };
        }
        return null;
      })
      .filter((item): item is PlanoAcaoItem => item !== null);
    
    console.log(`Processados ${planoAcaoItems.length} itens da planilha`);
    
    // Agrupar por macrorregião
    const macrosData = groupByMacrorregiao(planoAcaoItems);
    
    // Classificar metas como padrão ou específica
    const processedData = classifyMetas(macrosData);
    
    return processedData;
    
  } catch (error) {
    console.error('Erro ao processar base_c.xlsx:', error);
    return [];
  }
}

// Lê o base_c.xlsx e agrupa ações por número do objetivo (B: numero_objetivo, C: objetivo, D: acao)
export async function processBaseCExcelGroupedByObjetivo(): Promise<PlanoAcaoMacroAgrupado[]> {
  try {
    const response = await fetch('/base_c.xlsx');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });

    let sheetName = 'PA - objetivos, ações e metas';
    if (!workbook.SheetNames.includes(sheetName)) {
      sheetName = workbook.SheetNames[0];
    }

    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '', raw: false });
    if (!jsonData || jsonData.length < 2) {
      return [];
    }

    const headers = (jsonData[0] as string[]).map(h => normalizeColumnName(String(h)));
    const rows = jsonData.slice(1) as any[][];

    type RawRow = {
      numero_objetivo?: string | number;
      objetivo?: string;
      acao?: string;
      macrorregiao?: string;
      meta?: string;
      [key: string]: any;
    };

    const toRow = (row: any[]): RawRow => {
      const obj: any = {};
      headers.forEach((h, i) => {
        const value = row[i];
        if (value !== undefined && value !== null && String(value).trim() !== '') {
          obj[h] = String(value).trim();
        }
      });
      return obj;
    };

    const rawRows: RawRow[] = rows.map(toRow);

    // Agrupar por macrorregião -> (numero,titulo) -> acoes
    const macroToObjetivos: Map<string, Map<string, PlanoAcaoObjetivoAgrupado>> = new Map();

    const getFirst = (obj: any, keys: string[], fallback: string = ''): string => {
      for (const k of keys) {
        if (obj[k] !== undefined && obj[k] !== null && String(obj[k]).trim() !== '') {
          return String(obj[k]).trim();
        }
      }
      return fallback;
    };

    for (const r of rawRows) {
      const macro = getFirst(r, ['macrorregiao', 'macro', 'macroregiao']).toUpperCase();
      const numeroStr = getFirst(r, ['numero_objetivo', 'numero', 'n_objetivo', 'objetivo_numero', 'b']);
      const titulo = getFirst(r, ['objetivo', 'titulo_objetivo', 'tema', 'c']);
      const acao = getFirst(r, ['acao', 'acao_nome', 'd']);
      const meta = getFirst(r, ['meta', 'e']);
      const exemplo = getFirst(r, ['exemplo', 'exemplos', 'descricao', 'detalhe', 'observacao']);

      const numero = Number(String(numeroStr).trim());
      if (!macro || !Number.isFinite(numero) || !titulo || !acao) {
        continue;
      }

      if (!macroToObjetivos.has(macro)) {
        macroToObjetivos.set(macro, new Map());
      }
      const objetivosMap = macroToObjetivos.get(macro)!;

      const key = `${numero}::${titulo}`;
      if (!objetivosMap.has(key)) {
        objetivosMap.set(key, { numero, titulo, acoes: [] });
      }
      const entry = objetivosMap.get(key)!;
      const exists = entry.acoes.some(a => a.titulo === acao && (a.meta || '') === (meta || '') && (a.exemplo || '') === (exemplo || ''));
      if (!exists) {
        entry.acoes.push({ titulo: acao, meta, exemplo });
      }
    }

    // Converter para array ordenado
    const result: PlanoAcaoMacroAgrupado[] = [];
    for (const [macro, objetivosMap] of macroToObjetivos.entries()) {
      const objetivos = Array.from(objetivosMap.values()).sort((a, b) =>
        a.numero === b.numero ? a.titulo.localeCompare(b.titulo) : a.numero - b.numero
      );
      result.push({ macrorregiao: macro, objetivos });
    }

    return result;
  } catch (error) {
    console.error('Erro ao processar base_c.xlsx (agrupado por objetivo):', error);
    return [];
  }
}

// Função para normalizar nomes de colunas
function normalizeColumnName(name: string): string {
  return name
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-zA-Z0-9]+/g, '_') // Troca caracteres especiais por _
    .replace(/_+/g, '_') // Remove _ duplicados
    .replace(/^_|_$/g, '') // Remove _ do início/fim
    .toLowerCase();
}

// Função para agrupar dados por macrorregião e tema
function groupByMacrorregiao(items: PlanoAcaoItem[]): MacrorregiaoData[] {
  const macrosMap = new Map<string, Map<string, ObjetivoEstrategico>>();
  
  items.forEach(item => {
    if (!item.macrorregiao) return;
    
    const macroKey = item.macrorregiao.trim();
    const temaKey = item.tema.trim() || 'Sem tema definido';
    
    if (!macrosMap.has(macroKey)) {
      macrosMap.set(macroKey, new Map());
    }
    
    const macroObjetivos = macrosMap.get(macroKey)!;
    
    if (!macroObjetivos.has(temaKey)) {
      macroObjetivos.set(temaKey, {
        tema: temaKey,
        descricao: item.descricao,
        acoes: []
      });
    }
    
    const objetivo = macroObjetivos.get(temaKey)!;
    
    // Adicionar ação se tiver meta
    if (item.meta) {
      objetivo.acoes.push({
        titulo: item.descricao || `Ação do ${item.objetivo}`,
        meta: item.meta,
        origem: item.origem || 'Origem não identificada',
        tipo: 'meta específica' // Será reclassificado depois
      });
    }
  });
  
  // Converter Map para array
  const result: MacrorregiaoData[] = [];
  macrosMap.forEach((objetivos, macrorregiao) => {
    const objetivosArray: ObjetivoEstrategico[] = [];
    objetivos.forEach(objetivo => {
      if (objetivo.acoes.length > 0) {
        objetivosArray.push(objetivo);
      }
    });
    
    if (objetivosArray.length > 0) {
      result.push({
        macrorregiao,
        objetivos: objetivosArray
      });
    }
  });
  
  return result;
}

// Função para classificar metas como padrão ou específica
function classifyMetas(macrosData: MacrorregiaoData[]): MacrorregiaoData[] {
  // Criar mapa de frequência das metas
  const metaFrequency = new Map<string, number>();
  
  macrosData.forEach(macro => {
    macro.objetivos.forEach(objetivo => {
      objetivo.acoes.forEach(acao => {
        const metaNormalized = acao.meta.toLowerCase().trim();
        metaFrequency.set(metaNormalized, (metaFrequency.get(metaNormalized) || 0) + 1);
      });
    });
  });
  
  // Classificar metas que aparecem em mais de uma macrorregião como "padrão"
  const totalMacros = macrosData.length;
  
  macrosData.forEach(macro => {
    macro.objetivos.forEach(objetivo => {
      objetivo.acoes.forEach(acao => {
        const metaNormalized = acao.meta.toLowerCase().trim();
        const frequency = metaFrequency.get(metaNormalized) || 0;
        
        // Se a meta aparece em mais de uma macrorregião, é padrão
        acao.tipo = frequency > 1 ? 'meta padrão' : 'meta específica';
      });
    });
  });
  
  return macrosData;
}

// Função para gerar resumo por macrorregião
export function generateSummary(macrosData: MacrorregiaoData[]): any {
  const summary: any = {};
  
  macrosData.forEach(macro => {
    const macroSummary: any = {
      temas: [],
      totalMetas: 0,
      metasPorTema: {}
    };
    
    macro.objetivos.forEach(objetivo => {
      macroSummary.temas.push(objetivo.tema);
      macroSummary.totalMetas += objetivo.acoes.length;
      macroSummary.metasPorTema[objetivo.tema] = objetivo.acoes.length;
    });
    
    summary[macro.macrorregiao] = macroSummary;
  });
  
  return summary;
}

// Função para salvar os dados processados em JSON
export function saveProcessedData(macrosData: MacrorregiaoData[], summary: any): void {
  const output = {
    timestamp: new Date().toISOString(),
    totalMacrorregioes: macrosData.length,
    macrorregioes: macrosData,
    resumo: summary
  };
  
  console.log('Dados processados:', JSON.stringify(output, null, 2));
}
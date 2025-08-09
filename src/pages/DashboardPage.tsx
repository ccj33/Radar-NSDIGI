import { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MicroRegionData, FilterOptions, EIXOS_NAMES } from '@/types/dashboard';
import { MicrosoftHeader } from '@/components/dashboard/MicrosoftHeader';
// import { NavigationMenu } from '@/components/dashboard/NavigationMenu';
import MicrosoftSidebar from '@/components/dashboard/MicrosoftSidebar';
import MobileBottomFilters from '@/components/dashboard/MobileBottomFilters';
import { StatsOverview } from '@/components/dashboard/StatsOverview';
import { DashboardRadarChart } from '@/components/dashboard/RadarChart';
import { BarChartComponent } from '@/components/dashboard/BarChartComponent';
import { PopulationChartComponent } from '@/components/dashboard/PopulationChartComponent';
import { EixosTable } from '@/components/dashboard/EixosTable';
import { RecommendationsPanel } from '@/components/dashboard/RecommendationsPanel';
import { ExecutiveDashboard } from '@/components/dashboard/ExecutiveDashboard';
import { AdvancedAnalysis } from '@/components/dashboard/AdvancedAnalysis';
import { HelpButton } from '@/components/ui/help-button';
import { calculateMedians } from '@/data/mockData';
import { toast } from 'sonner';
import { useExcelData } from '@/hooks/useExcelData';
import { PlanoAcaoModalContent } from "@/components/dashboard/plano-acao/PlanoAcaoModal";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { HelpCircle, X, Home, ArrowUp, Download, Settings, Target, Lightbulb, PieChart, Table, BookOpen, TrendingUp } from 'lucide-react';
import { useEffect } from 'react';
import React from 'react'; // Added missing import for React
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';
import { MicroRegionHeader } from '@/components/dashboard/MicroRegionHeader';
import { DistribuicaoINMSD } from '@/components/dashboard/DistribuicaoINMSD';

import PlanoDeAcao from '@/components/dashboard/plano-acao/PlanoDeAcao';
import { EmptyState } from '@/components/ui/empty-state';
import { Menu, Filter } from 'lucide-react'; // Importar ícones
import { Drawer, DrawerContent, DrawerTrigger, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from '@/components/ui/drawer'; // Importar Drawer com mais componentes
import { VisaoGeralBanner } from '@/components/dashboard/VisaoGeralBanner';
import ScrollReveal from '@/components/ScrollReveal';
import RegionPicker from '@/components/dashboard/RegionPicker';
import type { Region } from '@/types/region';
import { Separator } from '@/components/ui/separator';

const GUIDE_STORAGE_KEY = 'mrh-guide-dismissed';

const joyrideSteps: Step[] = [
  {
    target: 'body',
    content: ( 
      <div className="text-center p-2">
        <img src="/logo_sus_digital-removebg-preview.png" alt="AlexSUS" className="w-16 h-16 mx-auto mb-2 rounded-full shadow-lg" />
        <h2 className="text-2xl font-extrabold text-blue-700 mb-1">Bem-vindo ao Radar NSD!</h2>
        <p className="text-base text-slate-800">Sou o AlexSUS, seu guia digital. Vou te mostrar como extrair o máximo de insights desta ferramenta. Vamos começar? 🚀</p>
      </div>
    ),
    placement: 'center',
    disableBeacon: true,
  },
  {
    target: '[data-tour="filtros"]',
    content: (
      <div className="p-2">
        <h3 className="text-xl font-bold text-blue-700 mb-2">1. Comece pelos Filtros</h3>
        <p className="text-slate-800">Este é o seu ponto de partida. Use esses controles para selecionar a <strong>Macrorregião</strong> e depois a <strong>Microrregião</strong> que deseja analisar.</p>
        <p className="mt-2 text-sm text-blue-800 bg-blue-50 p-2 rounded-md"><strong>Dica:</strong> A análise começa de verdade após escolher uma microrregião!</p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '[data-tour="menu-overview"]',
    content: (
      <div className="p-2">
        <h3 className="text-xl font-bold text-blue-700 mb-2">2. Navegue pelas Seções</h3>
        <p className="text-slate-800">Use este menu para explorar as diferentes áreas de análise. Você está na <strong>Visão Geral</strong>, o resumo inicial.</p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '[data-tour="menu-populacao"]',
    content: (
      <div className="p-2">
        <h3 className="text-xl font-bold text-blue-700 mb-2">População</h3>
        <p className="text-slate-800">Acesse dados demográficos e compare o tamanho das microrregiões para entender o impacto das ações.</p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '[data-tour="menu-barras"]',
    content: (
      <div className="p-2">
        <h3 className="text-xl font-bold text-blue-700 mb-2">Ranking de Maturidade</h3>
        <p className="text-slate-800">Veja o ranking completo das microrregiões ordenadas pelo Índice Geral de Maturidade Digital.</p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '[data-tour="menu-radar"]',
    content: (
      <div className="p-2">
        <h3 className="text-xl font-bold text-blue-700 mb-2">Análise por Eixos</h3>
        <p className="text-slate-800">Visualize forças e fraquezas em cada um dos 7 eixos de maturidade digital de forma gráfica.</p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '[data-tour="menu-executivo"]',
    content: (
      <div className="p-2">
        <h3 className="text-xl font-bold text-blue-700 mb-2">Dashboard Executivo</h3>
        <p className="text-slate-800">Acesse KPIs, pontos fortes, oportunidades e recomendações estratégicas para tomada de decisão.</p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '[data-tour="menu-tabela"]',
    content: (
      <div className="p-2">
        <h3 className="text-xl font-bold text-blue-700 mb-2">Detalhamento por Eixos</h3>
        <p className="text-slate-800">Veja o desempenho detalhado de cada um dos 7 eixos de maturidade digital em formato tabular.</p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '[data-tour="menu-recomendacoes"]',
    content: (
      <div className="p-2">
        <h3 className="text-xl font-bold text-blue-700 mb-2">Recomendações</h3>
        <p className="text-slate-800">Encontre um plano de ação detalhado para cada eixo, com sugestões específicas para evolução da maturidade digital.</p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '[data-tour="menu-analise-avancada"]',
    content: (
      <div className="p-2">
        <h3 className="text-xl font-bold text-blue-700 mb-2">Análise Avançada</h3>
        <p className="text-slate-800">Compare duas microrregiões lado a lado e identifique diferenças específicas em cada eixo de maturidade.</p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '[data-tour="distribuicao-inmsd"]',
    content: (
      <div className="p-2">
        <h3 className="text-xl font-bold text-blue-700 mb-2">Distribuição e Desempenho</h3>
        <p className="text-slate-800">Este painel mostra como as microrregiões da macrorregião selecionada se distribuem entre os níveis de maturidade (Emergente, Em Evolução, Avançado) e destaca a de <strong>melhor desempenho</strong>.</p>
      </div>
    ),
    placement: 'top',
  },
  {
    target: '[data-tour="barras"]',
    content: (
      <div className="p-2">
        <h3 className="text-xl font-bold text-blue-700 mb-2">Ranking de Maturidade</h3>
        <p className="text-slate-800">Este gráfico de barras ordena todas as microrregiões da macrorregião selecionada pelo <strong>Índice Geral de Maturidade</strong>, permitindo uma comparação visual rápida.</p>
      </div>
    ),
    placement: 'top',
  },
  {
    target: '[data-tour="scroll-top"]',
    content: (
      <div className="p-2">
        <h3 className="text-xl font-bold text-blue-700 mb-2">⬆️ Voltar ao Topo</h3>
        <p className="text-slate-800">Este botão azul no <strong>canto inferior direito</strong> faz você subir rapidamente para o início da página. Útil quando você está explorando muitos dados!</p>
      </div>
    ),
    placement: 'top',
  },
  {
    target: '#faq-fab',
    content: (
      <div className="p-2">
        <h3 className="text-xl font-bold text-blue-700 mb-2">❓ Dúvidas? Consulte o FAQ</h3>
        <p className="text-slate-800">Este botão vermelho no <strong>canto inferior direito</strong> abre o Dicionário e Perguntas Frequentes. Encontre explicações sobre termos técnicos e tire suas dúvidas!</p>
      </div>
    ),
    placement: 'top',
  },
  {
    target: '[data-tour="configuracoes"]',
    content: (
      <div className="p-2">
        <h3 className="text-xl font-bold text-blue-700 mb-2">⚙️ Revise o Tour Quando Quiser</h3>
        <p className="text-slate-800">Este botão azul no <strong>canto inferior esquerdo</strong> permite que você reviva este tour a qualquer momento. Clique nele para relembrar como usar a ferramenta!</p>
      </div>
    ),
    placement: 'top',
  },
  {
    target: 'body',
    content: (
      <div className="text-center p-2">
        <h2 className="text-2xl font-extrabold text-blue-700 mb-2">Exploração Concluída!</h2>
        <p className="text-base text-slate-800">Você aprendeu o básico para navegar no Radar NSD. Explore à vontade e, se precisar, clique na engrenagem ⚙️ no canto inferior para rever este guia.</p>
        <p className="mt-3 text-lg font-semibold text-blue-800">Boas análises!</p>
      </div>
    ),
    placement: 'center',
    disableBeacon: true,
  },
];

function UserGuideModal({ open, setOpen }: { open: boolean, setOpen: (v: boolean) => void }) {
  const steps = [
    {
      title: 'Bem-vindo ao Radar Digital!',
      emoji: '👋',
      content: (
        <>
          <div className="text-blue-900 text-center text-base sm:text-lg font-bold mb-2 flex flex-col items-center gap-2">
            <span>Descubra o potencial digital da sua região!</span>
            <img src="/logo_sus_digital-removebg-preview.png" alt="Logo Micro-Region Insights Hub" className="inline-block w-10 h-10 sm:w-12 sm:h-12 align-middle mx-auto" />
          </div>
          <div className="text-blue-800 text-sm sm:text-base text-center mb-2">
            Este painel mostra, de forma simples, onde sua microrregião está bem e onde pode melhorar no mundo digital.
          </div>
        </>
      )
    },
    {
      title: 'Filtre e Compare',
      emoji: '🔎',
      content: (
        <div className="text-blue-900 text-sm sm:text-base text-center">
          <b>Escolha a macrorregião e microrregião</b> que deseja analisar.<br />
          Veja como sua região se compara com as outras.
        </div>
      )
    },
    {
      title: 'Veja os Indicadores',
      emoji: '📊',
      content: (
        <div className="text-blue-900 text-sm sm:text-base text-center">
          <b>População, maturidade digital e classificação</b> aparecem em cartões coloridos.<br />
          <span className="text-blue-700">Passe o mouse</span> para ver detalhes extras!
        </div>
      )
    },
    {
      title: 'Explore os Gráficos',
      emoji: '📈',
      content: (
        <div className="text-blue-900 text-sm sm:text-base text-center">
          <b>Radar</b> mostra forças e fraquezas.<br />
          <b>Barras</b> mostram o ranking.<br />
          <b>Tabela</b> detalha cada área.
        </div>
      )
    },
    {
      title: 'Receba Recomendações',
      emoji: '💡',
      content: (
        <div className="text-blue-900 text-sm sm:text-base text-center">
          <b>Dicas automáticas</b> para melhorar cada área.<br />
          Veja o que fazer para avançar!
        </div>
      )
    },
    {
      title: 'Compartilhe Resultados',
      emoji: '📄',
      content: (
        <div className="text-blue-900 text-sm sm:text-base text-center">
          <b>Exporte relatórios em PDF</b> para reuniões e decisões.<br />
          Fácil de salvar e compartilhar.
        </div>
      )
    },
    {
      title: 'Dúvidas? Consulte o FAQ!',
      emoji: '❓',
      content: (
        <div className="text-blue-900 text-sm sm:text-base text-center">
          <b>Tem alguma dúvida?</b> Clique no botão abaixo para abrir o Dicionário e Perguntas Frequentes.<br />
          <span className="text-blue-700">Tudo explicado de forma simples!</span>
        </div>
      )
    },
  ];
  const [step, setStep] = useState(0);
  // Lembrar se já viu o guia
  React.useEffect(() => {
    if (open) {
      localStorage.setItem('mrh-guide-dismissed', '1');
    }
  }, [open]);
  // Abrir FAQ externo
  const openFAQ = () => {
    const helpBtn = document.querySelector('[data-tour="ajuda"]') as HTMLElement;
    if (helpBtn) helpBtn.click();
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md p-0 overflow-hidden border border-blue-200 bg-white shadow-lg shadow-blue-100 animate-fade-in-up">
        <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 p-4 sm:p-6 relative min-h-[340px] flex flex-col justify-between">
          <button onClick={() => setOpen(false)} className="absolute top-3 right-3 z-50 bg-white/80 rounded-full p-1 shadow hover:bg-blue-100 text-blue-900 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"><X size={20} /></button>
          <div className="flex flex-col items-center gap-2">
            <div className="text-4xl sm:text-5xl mb-1 drop-shadow">{steps[step].emoji}</div>
            <div className="font-bold text-blue-900 text-lg sm:text-xl mb-1 text-center">{steps[step].title}</div>
            <div className="w-full">{steps[step].content}</div>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <div className="flex items-center justify-center gap-1 mb-2">
              {steps.map((_, i) => (
                <span key={i} className={`w-2 h-2 rounded-full ${i === step ? 'bg-blue-600' : 'bg-blue-200'} transition-all`} />
              ))}
            </div>
            <div className="flex gap-2 justify-between">
              <button
                className="flex-1 py-2 rounded-lg bg-blue-100 text-blue-700 font-semibold shadow hover:bg-blue-200 transition-all text-xs sm:text-sm disabled:opacity-50"
                onClick={() => setStep(s => Math.max(0, s - 1))}
                disabled={step === 0}
              >Voltar</button>
              {step === steps.length - 1 ? (
                <button
                  className="flex-1 py-2 rounded-lg bg-pink-600 text-white font-semibold shadow hover:bg-pink-700 transition-all text-xs sm:text-sm"
                  onClick={openFAQ}
                >Abrir FAQ</button>
              ) : (
                <button
                  className="flex-1 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition-all text-xs sm:text-sm"
                  onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))}
                >Próximo</button>
              )}
            </div>
            {step === steps.length - 2 && (
              <button
                className="mt-2 w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold py-2 rounded-lg shadow hover:from-blue-700 hover:to-blue-500 transition-all text-xs sm:text-sm"
                onClick={() => setOpen(false)}
              >🚀 Explorar Dashboard</button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}



const Index = () => {
  const { data, loading, error, dataSource, refreshData } = useExcelData();
  const location = useLocation();
  const [selectedMicroregiao, setSelectedMicroregiao] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({});
  // Estados locais para rótulos do bottom sheet (persistentes)
  const [macroRegion, setMacroRegion] = useState<Region | null>(null);
  const [microRegion, setMicroRegion] = useState<Region | null>(null);
  
  // Ler parâmetro section da URL
  const urlParams = new URLSearchParams(location.search);
  const sectionFromUrl = urlParams.get('section');
  
  const [activeSection, setActiveSection] = useState(
    sectionFromUrl || location.state?.activeSection || 'overview'
  );
  const [runTour, setRunTour] = useState(() => !localStorage.getItem(GUIDE_STORAGE_KEY));
  const [showAdvanced, setShowAdvanced] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isFabMenuOpen, setIsFabMenuOpen] = useState(false);
  const [selectedEixoIndex, setSelectedEixoIndex] = useState(0);



  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Atualizar seção ativa quando a URL mudar
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const sectionFromUrl = urlParams.get('section');
    if (sectionFromUrl && sectionFromUrl !== activeSection) {
      setActiveSection(sectionFromUrl);
      // Scroll para a seção após um pequeno delay para garantir que foi renderizada
      setTimeout(() => {
        const element = document.querySelector(`[data-section="${sectionFromUrl}"]`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [location.search, activeSection]);

  // Atualizar seção ativa quando o location.state mudar
  useEffect(() => {
    if (location.state?.activeSection && location.state.activeSection !== activeSection) {
      setActiveSection(location.state.activeSection);
      // Scroll para a seção após um pequeno delay para garantir que foi renderizada
      setTimeout(() => {
        const element = document.querySelector(`[data-section="${location.state.activeSection}"]`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [location.state, activeSection]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calcular medianas dos eixos
  const medians = useMemo(() => calculateMedians(data), [data]);

  // Encontrar dados da microrregião selecionada
  const selectedData = useMemo(() => {
    return data.find(item => item.microrregiao === selectedMicroregiao);
  }, [selectedMicroregiao, data]);

  // Filtrar dados baseado nos filtros ativos
  const filteredData = useMemo(() => {
    return data.filter(item => {
      const itemMacro = (item.macrorregiao ?? '').toString().trim();
      const filterMacro = (filters.macrorregiao ?? '').toString().trim();
      const macroOk = !filters.macrorregiao || itemMacro === filterMacro;
      const classOk = !filters.classificacao_inmsd || item.classificacao_inmsd === filters.classificacao_inmsd;
      return macroOk && classOk;
    });
  }, [data, filters]);

  const handleMicroregiaoChange = (microrregiao: string) => {
    setSelectedMicroregiao(microrregiao);
    if (microrregiao) {
      toast.success(`Microrregião selecionada: ${microrregiao}`, {
        duration: 2000, // 2 segundos em vez do padrão (4 segundos)
      });
    }
  };

  const handleFiltersChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    // Limpar microrregião selecionada se não estiver nos dados filtrados
    if (selectedMicroregiao && !filteredData.find(item => item.microrregiao === selectedMicroregiao)) {
      setSelectedMicroregiao('');
    }
  };

  // Persistir escolhas do bottom sheet
  React.useEffect(() => {
    const raw = localStorage.getItem('regionSelection');
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as { macro: Region | null; micro: Region | null };
        setMacroRegion(parsed.macro ?? null);
        setMicroRegion(parsed.micro ?? null);
      } catch {}
    }
  }, []);
  React.useEffect(() => {
    localStorage.setItem('regionSelection', JSON.stringify({ macro: macroRegion, micro: microRegion }));
  }, [macroRegion, microRegion]);

  // Listas derivadas dos dados carregados
  const MACROS: Region[] = useMemo(() => {
    const normalized = data
      .map((d) => (d.macrorregiao ?? '').toString().trim())
      .filter(Boolean) as string[];
    const unique = Array.from(new Set(normalized));
    const sorted = [...unique].sort((a, b) => a.localeCompare(b, 'pt', { sensitivity: 'base' }));
    const items = ["Todas", ...sorted];
    return items.map((name, idx) => ({
      id: String(idx + 1),
      name,
      slug: name
        .toLowerCase()
        .replace(/\s+/g, '-')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
    }));
  }, [data]);
  const MICROS: Region[] = useMemo(() => {
    const base = data
      .filter((d) => {
        if (!filters.macrorregiao) return true;
        const dm = (d.macrorregiao ?? '').toString().trim();
        const fm = (filters.macrorregiao ?? '').toString().trim();
        return dm === fm;
      })
      .map((d) => d.microrregiao)
      .filter(Boolean) as string[];
    const uniqueSorted = Array.from(new Set(base)).sort((a, b) =>
      a.localeCompare(b, 'pt', { sensitivity: 'base' })
    );
    const items = ["Todas", ...uniqueSorted];
    return items.map((name, idx) => ({
      id: `m${idx}`,
      name,
      slug: name
        .toLowerCase()
        .replace(/\s+/g, '-')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
    }));
  }, [data, filters.macrorregiao]);

  // Navegar ao alterar macro/micro (mantém query atual)
  const updateUrlWithRegions = (nextMacro: Region | null, nextMicro: Region | null) => {
    const params = new URLSearchParams(window.location.search);
    if (nextMacro) params.set('macro', nextMacro.slug); else params.delete('macro');
    if (nextMicro) params.set('micro', nextMicro.slug); else params.delete('micro');
    const next = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, '', next);
  };

  const handleFiltersOpenChange = (open: boolean) => {
    setIsFiltersOpen(open);
    // Fecha o menu FAB se a gaveta de filtros for aberta
    if (open) {
      setIsFabMenuOpen(false);
    }
  };

  const handleFabMenuToggle = () => {
    // Fecha a gaveta de filtros se o menu FAB for aberto
    if (isFiltersOpen) {
      setIsFiltersOpen(false);
    }
    setIsFabMenuOpen(!isFabMenuOpen);
  };

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    // Scroll suave para a seção
    const element = document.querySelector(`[data-section="${section}"]`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleNavigateToRecommendations = (eixoIndex: number) => {
    setSelectedEixoIndex(eixoIndex);
    setActiveSection('recomendacoes');
    setTimeout(() => {
      const element = document.querySelector(`#eixo-${eixoIndex + 1}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        // Fallback: tentar novamente após mais tempo
        setTimeout(() => {
          const elementRetry = document.querySelector(`#eixo-${eixoIndex + 1}`);
          if (elementRetry) {
            elementRetry.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 500);
      }
    }, 200); // Aumentado de 100ms para 200ms
  };

  // Navegação por gesto (swipe) entre áreas
  const sectionsOrder = [
    'overview',
    'populacao',
    'barras',
    'radar',
    'executivo',
    'tabela',
    'recomendacoes',
    'analise-avancada',
  ] as const;

  const goToAdjacentSection = (direction: 'prev' | 'next') => {
    const idx = sectionsOrder.indexOf(activeSection as typeof sectionsOrder[number]);
    if (idx === -1) return;
    const nextIndex = direction === 'next' ? Math.min(idx + 1, sectionsOrder.length - 1) : Math.max(idx - 1, 0);
    const next = sectionsOrder[nextIndex];
    if (next !== activeSection) handleNavigate(next);
  };

  const touchStartRef = React.useRef<{ x: number; y: number } | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    const t = e.changedTouches[0];
    touchStartRef.current = { x: t.clientX, y: t.clientY };
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const start = touchStartRef.current;
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) > 60 && Math.abs(dy) < 50) {
      if (dx < 0) goToAdjacentSection('next');
      else goToAdjacentSection('prev');
    }
    touchStartRef.current = null;
  };

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    if (["finished", "skipped"].includes(status)) {
      setRunTour(false);
      localStorage.setItem(GUIDE_STORAGE_KEY, '1');
    }
  };

  // Macroregião ativa
  const macroAtiva = filters.macrorregiao ? filters.macrorregiao : 'Todas as macrorregiões';

  // Contagem por classificação INMSD
  const classificationCounts = useMemo(() => {
    return filteredData.reduce((acc, item) => {
      const key = item?.classificacao_inmsd ?? 'Desconhecido';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
  }, [filteredData]);

  // Melhor desempenho
  const topPerformer = useMemo(() => {
    return filteredData.reduce((best, current) => {
      const currentMaturity = current?.indice_geral ? parseFloat(String(current.indice_geral).replace(',', '.')) : 0;
      const bestMaturity = best?.indice_geral ? parseFloat(String(best.indice_geral).replace(',', '.')) : 0;
      return currentMaturity > bestMaturity ? current : best;
    }, filteredData[0]);
  }, [filteredData]);

  // Controle de exibição do bloco
  const [showDistribuicao, setShowDistribuicao] = useState(true);


  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-semibold text-blue-900 mb-2">Carregando Dashboard</h2>
          <p className="text-blue-700">Preparando sua análise de maturidade digital...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-semibold text-red-900 mb-2">Erro ao Carregar Dados</h2>
          <p className="text-red-700 mb-4">{error}</p>
          <Button onClick={refreshData} className="bg-red-600 hover:bg-red-700">
            Tentar Novamente
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <Joyride
        steps={joyrideSteps}
        run={runTour}
        continuous
        showSkipButton
        locale={{
          back: 'Voltar',
          close: 'Fechar',
          last: 'Finalizar',
          next: 'Próximo',
          skip: 'Pular Guia',
        }}
        styles={{
          options: {
            zIndex: 9999,
            primaryColor: '#2563eb',
            textColor: '#1e293b',
            arrowColor: '#fff',
          },
        }}
        callback={handleJoyrideCallback}
      />
      {/* Navigation Menu */}
      <MicrosoftHeader activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Banner - Aparece em todas as áreas */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <VisaoGeralBanner selectedMicroregiao={selectedMicroregiao} activeSection={activeSection} />
        </div>
      </div>

      {/* Botão de Filtros para Mobile (oculto, substituído pela barra inferior) */}
      <div className="hidden sm:hidden md:hidden lg:hidden fixed top-4 right-4 z-50">
        <Drawer open={isFiltersOpen} onOpenChange={handleFiltersOpenChange}>
          <DrawerTrigger asChild>
            <Button size="icon" className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg">
              <Filter className="h-5 w-5" />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="text-left">
              <DrawerTitle>Filtros de Análise</DrawerTitle>
              <DrawerDescription>
                Selecione os filtros para refinar os dados exibidos no dashboard.
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4 overflow-y-auto">
              <MicrosoftSidebar
                data={data}
                selectedMicroregiao={selectedMicroregiao}
                filters={filters}
                onMicroregiaoChange={(microrregiao) => {
                  handleMicroregiaoChange(microrregiao);
                  // Opcional: fechar ao selecionar, mas vamos manter aberto para múltiplos filtros
                  // setIsFiltersOpen(false); 
                }}
                onFiltersChange={handleFiltersChange}
                selectedData={selectedData}
              />
            </div>
            <DrawerFooter>
              <Button onClick={() => setIsFiltersOpen(false)}>Ver Resultados</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>



      {/* Conteúdo Principal */}
      <main className="container mx-auto px-4 py-8 pb-28 md:pb-8 flex gap-8 relative">
        {/* Microsoft Style Sidebar - Visível apenas em telas grandes */}
        <aside className="hidden lg:block w-1/4 xl:w-1/5 sticky top-20 self-start">
          <div data-tour="filtros">
            <MicrosoftSidebar
              data={data}
              selectedMicroregiao={selectedMicroregiao}
              filters={filters}
              onMicroregiaoChange={handleMicroregiaoChange}
              onFiltersChange={handleFiltersChange}
              selectedData={selectedData}
            />
          </div>
        </aside>

                          {/* Conteúdo do Dashboard */}
        <div className="flex-1 min-w-0">

          {/* Cabeçalho detalhado da microrregião - só na aba Geral */}
          {activeSection === 'overview' && selectedData && (
            <ScrollReveal>
              <div className="mb-8">
                <MicroRegionHeader data={selectedData} allData={data} />
              </div>
            </ScrollReveal>
          )}

          {/* Plano de Ação - Disponível quando há microrregião selecionada OU apenas macrorregião */}
          {activeSection === 'overview' && (filters.macrorregiao || selectedData) && (
            <ScrollReveal delay={100}>
              <div className="mb-8">
                <PlanoDeAcao 
                  selectedMacroRegiao={filters.macrorregiao}
                  selectedMicroregiao={selectedMicroregiao}
                  data={data}
                />
              </div>
            </ScrollReveal>
          )}

          {/* Seções do Dashboard */}
          {activeSection === 'overview' && (
            <div className="space-y-8">

              <ScrollReveal delay={200}>
                <div data-tour="cards-overview">
                  <StatsOverview data={data} selectedData={selectedData} macroFiltro={filters.macrorregiao} />
                </div>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <div data-tour="populacao">
                  <PopulationChartComponent
                    data={filteredData}
                    selectedMicroregiao={selectedMicroregiao}
                  />
                </div>
              </ScrollReveal>
              
              <div className="w-full h-0.5 bg-gray-200 my-6 rounded-full" />
              
              <ScrollReveal delay={400}>
                <DistribuicaoINMSD
                  showDistribuicao={showDistribuicao}
                  macroAtiva={macroAtiva}
                  classificationCounts={classificationCounts}
                  filteredData={filteredData}
                  topPerformer={topPerformer}
                />
              </ScrollReveal>
              
              <div className="mt-8" />
              
              <ScrollReveal delay={500}>
                <div data-tour="barras">
                  <BarChartComponent
                    data={filteredData}
                    selectedMicroregiao={selectedMicroregiao}
                    macroFiltro={filters.macrorregiao}
                  />
                </div>
              </ScrollReveal>
              
              <div className="mt-12" />
              
              {selectedData ? (
                <>
                  <ScrollReveal delay={600}>
                    <div data-tour="radar">
                      <DashboardRadarChart
                        data={selectedData}
                        allData={data}
                        medians={medians}
                        onNavigateToRecommendations={handleNavigateToRecommendations}
                      />
                    </div>
                  </ScrollReveal>
                  
                  <ScrollReveal delay={700}>
                    <ExecutiveDashboard
                      data={data}
                      selectedMicroregiao={selectedMicroregiao}
                      medians={medians}
                    />
                  </ScrollReveal>
                  
                  <ScrollReveal delay={800}>
                    <div data-tour="tabela-eixos">
                      <EixosTable data={selectedData} medians={medians} />
                    </div>
                  </ScrollReveal>
                  
                  <ScrollReveal delay={900}>
                    <div data-tour="recomendacoes">
                      <RecommendationsPanel data={selectedData} initialEixoIndex={selectedEixoIndex} />
                    </div>
                  </ScrollReveal>
                  
                  <ScrollReveal delay={1000}>
                    <AdvancedAnalysis
                      data={data}
                      selectedMicroregiao={selectedMicroregiao}
                      medians={medians}
                    />
                  </ScrollReveal>
                </>
              ) : null}
            </div>
          )}

          {activeSection === 'radar' && (
            <ScrollReveal>
              {selectedData ? (
                <div data-tour="radar">
                <DashboardRadarChart
                  data={selectedData}
                  allData={data}
                  medians={medians}
                  onNavigateToRecommendations={handleNavigateToRecommendations}
                />
              </div>
                          ) : (
                <EmptyState
                  icon={PieChart}
                  title="Selecione uma Microrregião"
                  description="Para visualizar o gráfico radar, selecione uma microrregião nos filtros."
                  tip={{
                    title: "Como usar",
                    content: "Use os filtros na barra lateral para escolher uma região e ver sua análise por eixos."
                  }}
                />
              )}
            </ScrollReveal>
          )}

          {activeSection === 'barras' && (
            <ScrollReveal>
              <div data-tour="barras">
              <BarChartComponent
                data={filteredData}
                selectedMicroregiao={selectedMicroregiao}
                macroFiltro={filters.macrorregiao}
              />
            </div>
            </ScrollReveal>
          )}

          {activeSection === 'populacao' && (
            <ScrollReveal>
              <div data-tour="populacao">
              <PopulationChartComponent
                data={filteredData}
                selectedMicroregiao={selectedMicroregiao}
              />
            </div>
            </ScrollReveal>
          )}

          {activeSection === 'tabela' && (
            <ScrollReveal>
              {selectedData ? (
              <div data-tour="tabela-eixos">
                <EixosTable data={selectedData} medians={medians} />
              </div>
            ) : (
              <EmptyState
                icon={Table}
                title="Selecione uma Microrregião"
                description="Para visualizar a tabela de eixos, selecione uma microrregião nos filtros."
                tip={{
                  title: "Como usar",
                  content: "Use os filtros na barra lateral para escolher uma região e ver os detalhamentos por eixo."
                }}
              />
            )}
            </ScrollReveal>
          )}

          {activeSection === 'recomendacoes' && (
            <ScrollReveal>
              {selectedData ? (
              <div data-tour="recomendacoes">
                <RecommendationsPanel data={selectedData} initialEixoIndex={selectedEixoIndex} />
              </div>
            ) : (
              <EmptyState
                icon={BookOpen}
                title="Selecione uma Microrregião"
                description="Para visualizar as recomendações, selecione uma microrregião nos filtros."
                tip={{
                  title: "Como usar",
                  content: "Use os filtros na barra lateral para escolher uma região e ver as recomendações personalizadas."
                }}
              />
            )}
            </ScrollReveal>
          )}

          {activeSection === 'executivo' && (
            <ScrollReveal>
              {selectedData ? (
              <ExecutiveDashboard
                data={data}
                selectedMicroregiao={selectedMicroregiao}
                medians={medians}
              />
            ) : (
              <EmptyState
                icon={Target}
                title="Selecione uma Microrregião"
                description="Para visualizar o dashboard executivo, selecione uma microrregião nos filtros."
                tip={{
                  title: "Como usar",
                  content: "Use os filtros na barra lateral para escolher uma região e ver os indicadores estratégicos."
                }}
              />
            )}
            </ScrollReveal>
          )}

          {activeSection === 'analise-avancada' && (
            <ScrollReveal>
              {selectedData ? (
              <AdvancedAnalysis
                data={data}
                selectedMicroregiao={selectedMicroregiao}
                medians={medians}
              />
            ) : (
              <EmptyState
                icon={TrendingUp}
                title="Selecione uma Microrregião"
                description="Para visualizar a análise avançada, selecione uma microrregião nos filtros."
                tip={{
                  title: "Como usar",
                  content: "Use os filtros na barra lateral para escolher uma região e explorar análises avançadas."
                }}
              />
            )}
            </ScrollReveal>
          )}
        </div>
      </main>

      {/* Menu de Ações Flutuantes (FAB) — removido do app (oculto) */}
      <div className="hidden">
        {/* Botões secundários que aparecem quando o menu está aberto */}
        {isFabMenuOpen && (
          <>
            {showScrollTop && (
              <Button
                data-tour="scroll-top"
                onClick={scrollToTop}
                size="icon"
                className="w-14 h-14 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 animate-fade-in-up"
              >
                <ArrowUp className="w-6 h-6" />
              </Button>
            )}
            <HelpButton />
          </>
        )}
        {/* Botão principal que abre/fecha o menu */}
        <Button
          data-tour="configuracoes"
          size="icon"
          className="w-16 h-16 rounded-full shadow-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-2 border-blue-400 transition-all duration-300 hover:scale-110 z-50 hover:shadow-2xl"
          onClick={handleFabMenuToggle}
        >
          <Settings className={`w-7 h-7 transition-transform duration-300 ${isFabMenuOpen ? 'rotate-90' : ''}`} />
        </Button>
      </div>

      {/* Barra inferior de filtros para mobile */}
      <div className="md:hidden">
        <MobileBottomFilters
          leftContent={
            <RegionPicker
              mode="macro"
              items={MACROS}
              value={macroRegion}
              onChange={(region) => {
                setMacroRegion(region);
                if (region.name === 'Todas') {
                  handleFiltersChange({ ...filters, macrorregiao: undefined });
                  setMicroRegion(null);
                  handleMicroregiaoChange('');
                  updateUrlWithRegions(null, null);
                } else {
                  handleFiltersChange({ ...filters, macrorregiao: region.name });
                  setMicroRegion(null);
                  handleMicroregiaoChange('');
                  updateUrlWithRegions(region, null);
                }
              }}
              buttonClassName="h-[52px] sm:h-[56px] w-full min-w-0 font-semibold rounded-full text-white bg-gradient-to-r from-blue-600 to-sky-500 ring-1 ring-white/40 hover:ring-white/60 transition-shadow shadow-none active:opacity-95 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none"
            />
          }
          rightContent={
            <RegionPicker
              mode="micro"
              items={MICROS}
              value={microRegion}
              onChange={(region) => {
                if (region.name === 'Todas') {
                  setMicroRegion(null);
                  handleMicroregiaoChange('');
                  updateUrlWithRegions(macroRegion, null);
                } else {
                  setMicroRegion(region);
                  handleMicroregiaoChange(region.name);
                  updateUrlWithRegions(macroRegion, region);
                }
              }}
              buttonClassName="h-[52px] sm:h-[56px] w-full min-w-0 font-semibold rounded-full text-white bg-gradient-to-r from-violet-600 to-fuchsia-500 ring-1 ring-white/40 hover:ring-white/60 transition-shadow shadow-none active:opacity-95 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none"
            />
          }
        />
      </div>
    </div>
  );
};

export default Index;

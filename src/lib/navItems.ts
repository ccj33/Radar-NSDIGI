import { 
  Users, 
  BarChart3, 
  PieChart, 
  LayoutDashboard, 
  ListTree, 
  Sparkles, 
  LineChart, 
  Home 
} from 'lucide-react';

export interface NavItem {
  key: string;
  label: string;
  path: string;
  icon: any;
  desc: string;
}

export const navItems: NavItem[] = [
  { 
    key: 'pop', 
    label: 'População', 
    path: '/populacao', 
    icon: Users, 
    desc: 'Distribuição e perfis demográficos' 
  },
  { 
    key: 'ranking', 
    label: 'Ranking', 
    path: '/barras', 
    icon: BarChart3, 
    desc: 'Comparativo entre microrregiões' 
  },
  { 
    key: 'axes', 
    label: 'Análise por Eixos', 
    path: '/radar', 
    icon: PieChart, 
    desc: 'Desempenho por eixo de maturidade' 
  },
  { 
    key: 'exec', 
    label: 'Dashboard Executivo', 
    path: '/dashboard/executivo', 
    icon: LayoutDashboard, 
    desc: 'Indicadores-chave e visão estratégica' 
  },
  { 
    key: 'detail', 
    label: 'Detalhamento', 
    path: '/dashboard/detalhamento', 
    icon: ListTree, 
    desc: 'Indicadores detalhados por eixo' 
  },
  { 
    key: 'recom', 
    label: 'Recomendações', 
    path: '/dashboard/recomendacoes', 
    icon: Sparkles, 
    desc: 'Ações sugeridas e planos de melhoria' 
  },
  { 
    key: 'advanced', 
    label: 'Análise Avançada', 
    path: '/dashboard/avancada', 
    icon: LineChart, 
    desc: 'Exploração avançada de dados' 
  },
  { 
    key: 'home', 
    label: 'Início', 
    path: '/', 
    icon: Home, 
    desc: 'Página inicial do sistema' 
  },
  { 
    key: 'overview', 
    label: 'Visão Geral', 
    path: '/dashboard', 
    icon: Home, 
    desc: 'Dashboard principal e visão geral' 
  }
]; 
# Correção da Navegação do Detalhamento

## Problema Identificado
O botão "Saiba mais" do detalhamento na página inicial estava funcionando corretamente, mas o mesmo item no menu "Áreas" estava levando para o lugar errado.

## Análise do Problema
- **Página Inicial (NewLandingPage.tsx)**: O botão "Saiba mais" do detalhamento navegava corretamente para `/dashboard` com `state: { activeSection: 'tabela' }`
- **Menu Áreas (AppAreaSwitcher.tsx)**: O item "Detalhamento" estava sendo mapeado incorretamente para a seção 'tabela' em vez de navegar diretamente para `/dashboard/detalhamento`

## Correções Implementadas

### 1. AppAreaSwitcher.tsx
**Arquivo**: `src/components/nav/AppAreaSwitcher.tsx`

**Mudança**: Removido o mapeamento incorreto do 'detail' para 'tabela'

```typescript
// ANTES
const sectionMapping: { [key: string]: string } = {
  'pop': 'populacao',
  'ranking': 'barras',
  'axes': 'radar',
  'exec': 'executivo',
  'detail': 'tabela', // ❌ Incorreto
  'recom': 'recomendacoes',
  'advanced': 'analise-avancada',
  'home': 'overview',
  'overview': 'overview'
};

// DEPOIS
const sectionMapping: { [key: string]: string } = {
  'pop': 'populacao',
  'ranking': 'barras',
  'axes': 'radar',
  'exec': 'executivo',
  // 'detail' removido - agora navega diretamente para /dashboard/detalhamento
  'recom': 'recomendacoes',
  'advanced': 'analise-avancada',
  'home': 'overview',
  'overview': 'overview'
};
```

### 2. MobileAppAreaSwitcher.tsx
**Arquivo**: `src/components/nav/MobileAppAreaSwitcher.tsx`

**Mudança**: Removido o mapeamento incorreto do 'detalhamento' para 'tabela'

```typescript
// ANTES
const sectionMapping: { [key: string]: string } = {
  'dashboard': 'overview',
  'populacao': 'populacao',
  'barras': 'barras',
  'radar': 'radar',
  'executivo': 'executivo',
  'detalhamento': 'tabela', // ❌ Incorreto
  'recomendacoes': 'recomendacoes',
  'avancada': 'analise-avancada'
};

// DEPOIS
const sectionMapping: { [key: string]: string } = {
  'dashboard': 'overview',
  'populacao': 'populacao',
  'barras': 'barras',
  'radar': 'radar',
  'executivo': 'executivo',
  // 'detalhamento' removido - agora navega diretamente para /dashboard/detalhamento
  'recomendacoes': 'recomendacoes',
  'avancada': 'analise-avancada'
};
```

## Resultado
Agora tanto o botão "Saiba mais" da página inicial quanto o item "Detalhamento" no menu "Áreas" navegam corretamente para a página `/dashboard/detalhamento`, que exibe o componente `DetalhamentoPage.tsx` com a tabela de eixos de maturidade.

## Verificação
- ✅ Página inicial: Botão "Saiba mais" do detalhamento funciona corretamente
- ✅ Menu Áreas (Desktop): Item "Detalhamento" navega para `/dashboard/detalhamento`
- ✅ Menu Áreas (Mobile): Item "Detalhamento" navega para `/dashboard/detalhamento`
- ✅ Consistência mantida entre todas as interfaces de navegação

## Data da Correção
$(date) 
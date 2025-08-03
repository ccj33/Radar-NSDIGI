# Navegação Moderna - AppAreaSwitcher

## 🎯 Objetivo

Implementação de uma navegação moderna e responsiva que substitui os múltiplos botões do header por um sistema mais elegante e organizado.

## 📋 Estrutura

### 1. **"Visão Geral" Fixo**
- Botão sempre visível no topo
- Não desaparece com zoom ou em telas pequenas
- Mantém a funcionalidade original

### 2. **Botão "Áreas ▾"**
- Contém todos os outros botões de navegação
- Abre um menu moderno no estilo Google/Microsoft
- Responsivo: Popover no desktop, Drawer no mobile

## 🧩 Componentes

### `AppAreaSwitcher.tsx`
- **Localização**: `src/components/nav/AppAreaSwitcher.tsx`
- **Funcionalidades**:
  - Command palette moderno
  - Busca instantânea por nome
  - Ícone, título e descrição de cada item
  - Navegação com teclado (↑ ↓ Enter)
  - Atalho global Ctrl/Cmd + K
  - Acessível (ARIA roles, foco gerenciado)
  - Responsivo (Drawer no mobile, Popover no desktop)
  - Animações suaves (fade + scale)
  - Compatível com dark mode

### `navItems.ts`
- **Localização**: `src/lib/navItems.ts`
- **Estrutura**:
```typescript
export interface NavItem {
  key: string;
  label: string;
  path: string;
  icon: any;
  desc: string;
}
```

## 📱 Responsividade

### Desktop (lg+)
- **Popover**: Menu flutuante ao lado do botão
- **Largura**: 400px
- **Posicionamento**: Alinhado à esquerda
- **Altura máxima**: 300px com scroll

### Mobile (< 768px)
- **Sheet**: Drawer que sobe da parte inferior
- **Altura**: 80% da tela
- **Grid**: 2 colunas para os botões principais
- **Scroll**: Interno para os itens do menu

## ⌨️ Acessibilidade

### Navegação por Teclado
- **Ctrl/Cmd + K**: Abre o menu
- **↑ ↓**: Navega pelos itens
- **Enter**: Seleciona item
- **Esc**: Fecha o menu
- **Tab**: Navegação natural

### ARIA e Foco
- **role="dialog"**: Para o popover/sheet
- **aria-label**: Para o input de busca
- **aria-expanded**: Para o botão trigger
- **foco gerenciado**: Retorna ao trigger ao fechar

## 🎨 Design System

### Cores
- **Primária**: Azul do tema atual
- **Hover**: `hover:bg-accent`
- **Selecionado**: `bg-primary/10`
- **Texto**: Hierarquia com `text-sm` e `text-xs`

### Animações
- **Entrada**: `fade-in-0` + `zoom-in-95`
- **Saída**: `fade-out-0` + `zoom-out-95`
- **Hover**: `scale-105` nos ícones
- **Transições**: `duration-200` suaves

## 🔧 Integração

### NavigationMenu.tsx
```typescript
// Botão "Visão Geral" fixo
<button onClick={() => handleNavigate('overview')}>
  <Home className="w-5 h-5" />
  <span>Visão Geral</span>
</button>

// AppAreaSwitcher
<AppAreaSwitcher />
```

### Rotas Mapeadas
- **População**: `/populacao`
- **Ranking**: `/barras`
- **Análise por Eixos**: `/radar`
- **Dashboard Executivo**: `/dashboard`
- **Detalhamento**: `/dashboard`
- **Recomendações**: `/dashboard`
- **Análise Avançada**: `/dashboard`
- **Início**: `/`

## 🚀 Funcionalidades Avançadas

### Busca Inteligente
- Busca por nome do item
- Busca por descrição
- Filtro em tempo real
- Case-insensitive

### Estado Persistente
- Fecha automaticamente após seleção
- Limpa busca ao fechar
- Mantém estado entre aberturas

### Performance
- Lazy loading dos ícones
- Debounce na busca (se necessário)
- Memoização de componentes

## 🧪 Testes

### Cenários de Teste
1. **Desktop**: Popover abre e fecha corretamente
2. **Mobile**: Sheet sobe e desce suavemente
3. **Busca**: Filtra itens em tempo real
4. **Teclado**: Atalhos funcionam
5. **Navegação**: Redireciona para rotas corretas
6. **Acessibilidade**: Screen readers funcionam
7. **Responsividade**: Adapta-se a todos os tamanhos

### Pontos de Atenção
- Botão "Visão Geral" sempre visível
- Menu não quebra em nenhum tamanho de tela
- Animações suaves e consistentes
- Compatibilidade com dark mode 
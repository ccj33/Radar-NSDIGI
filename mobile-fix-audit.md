# Auditoria Mobile — Radar NSDGI MG

Esta auditoria foca de 320px a 768px, com atenção especial a 390/414/480/768px. Prints são descritos textualmente.

## Sumário rápido

- Principais suspeitos de overflow: botões absolutos de carrosséis com offset negativo, containers com `px` grandes, elementos sticky/fixed com z-index alto, tabelas largas sem contenção e grids com `min-width` elevada.
- Tipografia: corpo já usa `clamp`, mas títulos não têm escala fluida consistente; alguns rótulos comprimem.
- Tap targets: maioria adequada via base CSS, porém alguns botões `size=icon` e menus exigem reforço.

## Mapa por breakpoint

### ≤ 390px (iPhone 12/13 mini)

- Header (`src/components/dashboard/MicrosoftHeader.tsx`):
  - Problema: área útil reduzida; botões com `w-8 h-8` ficam abaixo do mínimo recomendado 44×44.
  - Efeito percebido: toque impreciso; possível sobreposição do conteúdo pelo header sticky.
  - Causa raiz: tamanhos fixos pequenos; falta de `safe-area` para notch; duplicidade de sticky via `DashboardHeader` e `MicrosoftHeader`.

- Recommendations carousel (`src/components/dashboard/RecommendationsPanel.tsx`):
  - Problema: setas absolutas com classes `-left-4`/`-right-4` podem causar overflow-x.
  - Causa raiz: offsets negativos fora do container scrollável.

- Tabelas (`src/components/dashboard/EixosTable.tsx`):
  - Situação: usa wrapper `overflow-x-auto`; ok, mas checar padding lateral para evitar overflow visual.

### 414px (iPhone 11/12/13/14)

- Header: mesmos pontos de 390px, porém menos críticos. Falta de `scroll-padding-top` para navegação por âncoras.
- `DashboardPage.tsx`: FAB e Drawer com `fixed` e `z-[50..60]`; verificar interação com `MobileBottomFilters`.

### 480px (pequenos Androids)

- Carrosséis e cards: possíveis gaps inconsistentes e alturas fixas em cards destacados.
- Grids: garantir 1 coluna real com `minmax(0,1fr)` e sem alturas rígidas.

### 768px (tablets em retrato)

- Sidebar sticky (`MicrosoftSidebar`) e `aside` sticky em páginas (p.ex. `PopulationChartPage.tsx`):
  - Verificar `top-20` com header sticky para não encobrir conteúdo.
  - Checar colunas se mantêm proporção sem overflow lateral.

## Itens globais

- Meta viewport (`index.html`): está com `maximum-scale=1, user-scalable=no`; acessibilidade reduzida (ajustar em PR global dedicado).
- `#root` usando `min-height: 100vh`: ajustado para `100dvh` para Safari iOS.
- Box-sizing global ausente: adicionado.
- Scroll ancorado: adicionado `scroll-padding-top`.

## Prints (descritos)

- Header em 390px: ícone de menu pequeno, toque difícil; após correção, botões com 44×44, padding respeitando notch.
- Carousel em 390px: seta à esquerda cortada; após correção, setas dentro do container, sem barra horizontal.
- Tabela em 414px: rolagem horizontal controlada dentro do container, sem vazar o layout.

## Próximos passos

1) PR 1 — `fix/mobile-navbar-sticky`: unificar sticky, `safe-area`, tap targets ≥44px, paddings fluidos, `scroll-padding-top`.
2) PR 2 — `fix/mobile-carousels-overflow`: setas e offsets dentro do container, `scroll-snap`.
3) PR 3 — `fix/mobile-hero-sections`: 1 coluna, ordem imagem/texto, `gap` consistente.
4) PR 4 — `fix/mobile-cards-grid`: 1/2 colunas por faixa, `minmax(0,1fr)`.
5) PR 5 — `fix/mobile-forms-a11y`: empilhamento, mensagens elásticas, foco visível.
6) PR 6 — `fix/mobile-modals-sheets`: `max-h-[100dvh]`, `env(safe-area-inset-*)`, rolagem interna.
7) PR 7 — `fix/mobile-typography-fluid`: escala `clamp` para headings.
8) PR 8 — `chore/mobile-tests-and-lighthouse`: smoke Playwright e relatório Lighthouse antes/depois.

## Critérios de aceite e verificação

- Overflow horizontal: Playwright checa `document.documentElement.scrollWidth === clientWidth` em 320/360/390/414/480/768px.
- Navbar: tap targets via boundingClientRect ≥ 44×44; foco visível; `scroll-margin-top` funciona (anchors).
- A11y/contraste: audit Lighthouse Mobile ≥ 90; report anexado no PR 8.
- Desktop: snapshots visuais rápidos (manuais) ≥ 1024px; sem regressões.



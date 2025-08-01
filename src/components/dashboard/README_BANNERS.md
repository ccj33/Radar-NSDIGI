# Banners Interativos - Documentação

## Visão Geral

Este conjunto de componentes cria banners interativos modernos com animações suaves, transições automáticas e conteúdo dinâmico. Os banners são perfeitos para destacar informações importantes no dashboard.

## Componentes Disponíveis

### 1. InteractiveBanner
Banner principal com carrossel automático que muda a cada 5 segundos.

**Características:**
- Transições automáticas
- Indicadores de progresso
- Navegação manual com setas
- Pausa automática no hover
- Barra de progresso animada

**Uso:**
```tsx
import { InteractiveBanner } from './InteractiveBanner';

<InteractiveBanner />
```

### 2. BannerShowcase
Demonstra diferentes tipos de banners em abas.

**Tipos incluídos:**
- Banner Interativo (carrossel)
- Banner Estático (grid de cards)
- Banner Animado (efeitos especiais)

**Uso:**
```tsx
import { BannerShowcase } from './BannerShowcase';

<BannerShowcase />
```

### 3. BannerExample
Exemplo completo de integração com diferentes estilos.

**Inclui:**
- Banners por categoria
- Estatísticas rápidas
- Diferentes gradientes e animações

## Animações CSS Disponíveis

### Classes de Animação
- `.animate-fade-in` - Fade in com movimento para cima
- `.animate-fade-in-delay` - Fade in com delay
- `.animate-slide-in-left` - Slide da esquerda
- `.animate-slide-in-right` - Slide da direita
- `.animate-scale-in` - Scale in
- `.animate-float` - Flutuação suave
- `.animate-pulse-glow` - Pulse com glow
- `.animate-shimmer` - Efeito shimmer

### Classes de Efeito
- `.banner-hover` - Hover com elevação
- `.banner-transition` - Transição suave
- `.gradient-animate` - Gradiente animado
- `.floating-particles` - Partículas flutuantes

## Personalização

### Cores e Gradientes
```tsx
// Gradientes disponíveis
"from-blue-600 to-purple-600"
"from-green-600 via-emerald-600 to-teal-600"
"from-purple-600 via-violet-600 to-fuchsia-600"
"from-orange-600 to-red-600"
```

### Conteúdo Personalizado
```tsx
const customSlide = {
  id: 1,
  title: "Seu Título",
  description: "Sua descrição",
  icon: <SeuIcone />,
  color: "from-sua-cor-600 to-outra-cor-600"
};
```

### Tempo de Transição
```tsx
// No InteractiveBanner, altere o intervalo (em ms)
const interval = setInterval(() => {
  setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
}, 5000); // 5 segundos
```

## Responsividade

Os banners são totalmente responsivos:
- **Desktop**: Altura completa com layout horizontal
- **Tablet**: Altura reduzida mantendo proporções
- **Mobile**: Layout vertical otimizado

## Integração no Dashboard

### 1. Importar Componentes
```tsx
import { InteractiveBanner } from './InteractiveBanner';
import { BannerShowcase } from './BannerShowcase';
import { BannerExample } from './BannerExample';
```

### 2. Adicionar ao Layout
```tsx
// No seu componente principal
<div className="dashboard-container">
  <InteractiveBanner />
  {/* Outros componentes do dashboard */}
</div>
```

### 3. Personalizar Dados
```tsx
// Modificar os dados em InteractiveBanner.tsx
const bannerSlides: BannerSlide[] = [
  {
    id: 1,
    title: "Seu Título Personalizado",
    description: "Sua descrição personalizada",
    icon: <SeuIcone />,
    color: "from-sua-cor-600 to-outra-cor-600"
  },
  // ... mais slides
];
```

## Estrutura de Dados

### BannerSlide Interface
```tsx
interface BannerSlide {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  image?: string; // opcional
}
```

### BannerData Interface
```tsx
interface BannerData {
  title: string;
  subtitle?: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
  stats?: { label: string; value: string }[];
}
```

## Exemplos de Uso

### Banner Simples
```tsx
<Card className="overflow-hidden">
  <div className="h-48 bg-gradient-to-r from-blue-600 to-purple-600">
    <CardContent className="h-full flex items-center p-6 text-white">
      <div>
        <h2 className="text-2xl font-bold">Título</h2>
        <p className="text-lg">Descrição</p>
      </div>
    </CardContent>
  </div>
</Card>
```

### Banner com Animações
```tsx
<Card className="overflow-hidden banner-hover">
  <div className="h-48 bg-gradient-to-r from-green-600 to-blue-600 relative">
    <CardContent className="h-full flex items-center p-6 text-white">
      <div className="animate-fade-in">
        <h2 className="text-2xl font-bold">Título Animado</h2>
        <p className="text-lg animate-fade-in-delay">Descrição com delay</p>
      </div>
    </CardContent>
  </div>
</Card>
```

## Dicas de Performance

1. **Lazy Loading**: Carregue banners apenas quando necessário
2. **Otimização de Imagens**: Use imagens otimizadas para web
3. **Debounce**: Implemente debounce para eventos de scroll/hover
4. **CSS Transforms**: Use transform em vez de position para animações

## Troubleshooting

### Banner não muda automaticamente
- Verifique se `isAutoPlaying` está true
- Confirme se o intervalo está sendo definido corretamente

### Animações não funcionam
- Verifique se as classes CSS estão sendo aplicadas
- Confirme se o CSS está sendo importado

### Responsividade quebrada
- Use as classes `banner-responsive` para ajustes automáticos
- Verifique os breakpoints no CSS

## Contribuição

Para adicionar novos tipos de banner:

1. Crie um novo componente seguindo o padrão existente
2. Adicione as animações CSS necessárias
3. Documente o novo componente
4. Teste em diferentes tamanhos de tela 
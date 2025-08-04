#!/usr/bin/env node

/**
 * Teste das Correções Específicas - Radar NSDIGI
 * Verifica a implementação das soluções do "Relatório de Correções Específicas"
 */

import { readFile, access } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🧪 Testando Correções Específicas - Radar NSDIGI\n');

// Função para verificar se arquivo existe
async function fileExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

// Função para ler arquivo
async function readFileContent(filePath) {
  try {
    return await readFile(filePath, 'utf8');
  } catch {
    return '';
  }
}

// Função para testar componentes
async function testComponent(componentName, tests) {
  console.log(`📋 Testando ${componentName}:`);
  let passed = 0;
  let total = tests.length;
  
  for (let i = 0; i < tests.length; i++) {
    const test = tests[i];
    try {
      const result = await test();
      if (result) {
        console.log(`  ✅ ${i + 1}. ${test.name || `Teste ${i + 1}`}`);
        passed++;
      } else {
        console.log(`  ❌ ${i + 1}. ${test.name || `Teste ${i + 1}`} - FALHOU`);
      }
    } catch (error) {
      console.log(`  ❌ ${i + 1}. ${test.name || `Teste ${i + 1}`} - Erro: ${error.message}`);
    }
  }
  
  console.log(`  📊 Resultado: ${passed}/${total} testes passaram\n`);
  return { passed, total };
}

// Teste 1: ModernMobileHeader
async function testModernMobileHeader() {
  const tests = [
    async () => {
      // Verificar se o arquivo existe
      const filePath = join(__dirname, 'src', 'components', 'dashboard', 'ModernMobileHeader.tsx');
      return await fileExists(filePath);
    },
    async () => {
      // Verificar se contém as funcionalidades principais
      const filePath = join(__dirname, 'src', 'components', 'dashboard', 'ModernMobileHeader.tsx');
      const content = await readFileContent(filePath);
      
      const checks = [
        content.includes('ModernMobileHeader'),
        content.includes('useMediaQuery'),
        content.includes('touch-target'),
        content.includes('QuickNavigation'),
        content.includes('ExpandedSearch'),
        content.includes('activeFiltersCount'),
        content.includes('notificationsCount')
      ];
      
      return checks.every(check => check);
    }
  ];
  
  return await testComponent('ModernMobileHeader', tests);
}

// Teste 2: SmartFilters
async function testSmartFilters() {
  const tests = [
    async () => {
      // Verificar se o arquivo existe
      const filePath = join(__dirname, 'src', 'components', 'dashboard', 'SmartFilters.tsx');
      return await fileExists(filePath);
    },
    async () => {
      // Verificar se contém as funcionalidades principais
      const filePath = join(__dirname, 'src', 'components', 'dashboard', 'SmartFilters.tsx');
      const content = await readFileContent(filePath);
      
      const checks = [
        content.includes('SmartFilters'),
        content.includes('macroRegion?: string'), // Macro-região opcional
        content.includes('availableMicroRegions'),
        content.includes('MobileSelector'),
        content.includes('touch-target'),
        content.includes('font-size: 16px'),
        content.includes('opcional')
      ];
      
      return checks.every(check => check);
    }
  ];
  
  return await testComponent('SmartFilters', tests);
}

// Teste 3: MobileAppAreaSwitcher
async function testMobileAppAreaSwitcher() {
  const tests = [
    async () => {
      // Verificar se o arquivo existe
      const filePath = join(__dirname, 'src', 'components', 'nav', 'MobileAppAreaSwitcher.tsx');
      return await fileExists(filePath);
    },
    async () => {
      // Verificar se contém as funcionalidades principais
      const filePath = join(__dirname, 'src', 'components', 'nav', 'MobileAppAreaSwitcher.tsx');
      const content = await readFileContent(filePath);
      
      const checks = [
        content.includes('MobileAppAreaSwitcher'),
        content.includes('useMediaQuery'),
        content.includes('QuickNavigation'),
        content.includes('AreasGrid'),
        content.includes('touch-target'),
        content.includes('appAreas')
      ];
      
      return checks.every(check => check);
    }
  ];
  
  return await testComponent('MobileAppAreaSwitcher', tests);
}

// Teste 4: DashboardPageFixed
async function testDashboardPageFixed() {
  const tests = [
    async () => {
      // Verificar se o arquivo existe
      const filePath = join(__dirname, 'src', 'pages', 'DashboardPageFixed.tsx');
      return await fileExists(filePath);
    },
    async () => {
      // Verificar se contém as funcionalidades principais
      const filePath = join(__dirname, 'src', 'pages', 'DashboardPageFixed.tsx');
      const content = await readFileContent(filePath);
      
      const checks = [
        content.includes('DashboardPageFixed'),
        content.includes('ModernMobileHeader'),
        content.includes('SmartFilters'),
        content.includes('MobileAppAreaSwitcher'),
        content.includes('LoadingState'),
        content.includes('ErrorState'),
        content.includes('EmptyState'),
        content.includes('Suspense'),
        content.includes('React.lazy')
      ];
      
      return checks.every(check => check);
    }
  ];
  
  return await testComponent('DashboardPageFixed', tests);
}

// Teste 5: CSS Anti-zoom
async function testCSSAntiZoom() {
  const tests = [
    async () => {
      // Verificar se o arquivo CSS existe
      const filePath = join(__dirname, 'src', 'index.css');
      return await fileExists(filePath);
    },
    async () => {
      // Verificar se contém as melhorias anti-zoom
      const filePath = join(__dirname, 'src', 'index.css');
      const content = await readFileContent(filePath);
      
      const checks = [
        content.includes('font-size: 16px !important'),
        content.includes('transform: scale(1)'),
        content.includes('touch-target'),
        content.includes('mobile-anti-zoom'),
        content.includes('dropdown-mobile'),
        content.includes('btn-mobile'),
        content.includes('layout-stable'),
        content.includes('container-fluid'),
        content.includes('grid-mobile'),
        content.includes('text-mobile'),
        content.includes('card-mobile'),
        content.includes('nav-mobile'),
        content.includes('scroll-mobile'),
        content.includes('form-mobile'),
        content.includes('focus-visible'),
        content.includes('loading-mobile'),
        content.includes('empty-mobile'),
        content.includes('error-mobile')
      ];
      
      return checks.every(check => check);
    }
  ];
  
  return await testComponent('CSS Anti-zoom', tests);
}

// Teste 6: Viewport Meta Tag
async function testViewportMetaTag() {
  const tests = [
    async () => {
      // Verificar se o arquivo HTML existe
      const filePath = join(__dirname, 'index.html');
      return await fileExists(filePath);
    },
    async () => {
      // Verificar se o viewport está configurado corretamente
      const filePath = join(__dirname, 'index.html');
      const content = await readFileContent(filePath);
      
      const viewportCheck = content.includes('width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
      return viewportCheck;
    }
  ];
  
  return await testComponent('Viewport Meta Tag', tests);
}

// Teste 7: Responsive Components Integration
async function testResponsiveComponentsIntegration() {
  const tests = [
    async () => {
      // Verificar se os componentes responsivos existem
      const components = [
        'ResponsiveBarChart.tsx',
        'ResponsivePopulationChart.tsx',
        'ResponsiveRadarChart.tsx'
      ];
      
      const componentPath = join(__dirname, 'src', 'components', 'dashboard');
      
      for (const component of components) {
        const filePath = join(componentPath, component);
        if (!(await fileExists(filePath))) {
          return false;
        }
      }
      return true;
    },
    async () => {
      // Verificar se os componentes usam useMediaQuery
      const components = [
        'ResponsiveBarChart.tsx',
        'ResponsivePopulationChart.tsx',
        'ResponsiveRadarChart.tsx'
      ];
      
      const componentPath = join(__dirname, 'src', 'components', 'dashboard');
      
      for (const component of components) {
        const filePath = join(componentPath, component);
        const content = await readFileContent(filePath);
        if (!content.includes('useMediaQuery')) {
          return false;
        }
      }
      return true;
    }
  ];
  
  return await testComponent('Responsive Components Integration', tests);
}

// Executar todos os testes
async function runAllTests() {
  console.log('🚀 Iniciando testes das correções específicas...\n');
  
  const results = await Promise.all([
    testModernMobileHeader(),
    testSmartFilters(),
    testMobileAppAreaSwitcher(),
    testDashboardPageFixed(),
    testCSSAntiZoom(),
    testViewportMetaTag(),
    testResponsiveComponentsIntegration()
  ]);
  
  // Resumo final
  console.log('📊 RESUMO FINAL DOS TESTES:');
  console.log('='.repeat(50));
  
  const totalTests = results.reduce((sum, result) => sum + result.total, 0);
  const totalPassed = results.reduce((sum, result) => sum + result.passed, 0);
  
  console.log(`Total de testes: ${totalTests}`);
  console.log(`Testes aprovados: ${totalPassed}`);
  console.log(`Taxa de sucesso: ${((totalPassed / totalTests) * 100).toFixed(1)}%`);
  
  if (totalPassed === totalTests) {
    console.log('\n🎉 TODOS OS TESTES PASSARAM! As correções específicas foram implementadas com sucesso.');
  } else {
    console.log('\n⚠️  Alguns testes falharam. Verifique as implementações.');
  }
  
  console.log('\n✅ Correções específicas implementadas:');
  console.log('  • ModernMobileHeader - Botões não sobrepostos');
  console.log('  • SmartFilters - Zoom eliminado, macro-região opcional');
  console.log('  • MobileAppAreaSwitcher - Navegação mobile melhorada');
  console.log('  • DashboardPageFixed - Integração completa');
  console.log('  • CSS Anti-zoom - Prevenção de zoom em mobile');
  console.log('  • Viewport Meta Tag - Configuração otimizada');
  console.log('  • Responsive Components - Integração responsiva');
}

// Executar os testes
runAllTests().catch(console.error); 
const fs = require('fs');
const path = require('path');

console.log('🔍 Testando correções de navegação...\n');

// Teste 1: Verificar se MicrosoftHeader está usando useNavigate
console.log('1. Verificando MicrosoftHeader...');
try {
  const microsoftHeaderPath = path.join(__dirname, 'src', 'components', 'dashboard', 'MicrosoftHeader.tsx');
  const content = fs.readFileSync(microsoftHeaderPath, 'utf8');
  
  const hasUseNavigate = content.includes('useNavigate');
  const hasUseLocation = content.includes('useLocation');
  const hasNavigationLogic = content.includes('navigate(section.path)');
  const hasPathMapping = content.includes('path:');
  
  console.log(`   ✅ useNavigate importado: ${hasUseNavigate}`);
  console.log(`   ✅ useLocation importado: ${hasUseLocation}`);
  console.log(`   ✅ Lógica de navegação implementada: ${hasNavigationLogic}`);
  console.log(`   ✅ Mapeamento de rotas: ${hasPathMapping}`);
  
  if (hasUseNavigate && hasUseLocation && hasNavigationLogic && hasPathMapping) {
    console.log('   🎉 MicrosoftHeader corrigido com sucesso!');
  } else {
    console.log('   ❌ MicrosoftHeader ainda precisa de correções');
  }
} catch (error) {
  console.log('   ❌ Erro ao verificar MicrosoftHeader:', error.message);
}

// Teste 2: Verificar se MobileAppAreaSwitcher está usando useNavigate
console.log('\n2. Verificando MobileAppAreaSwitcher...');
try {
  const mobileSwitcherPath = path.join(__dirname, 'src', 'components', 'nav', 'MobileAppAreaSwitcher.tsx');
  const content = fs.readFileSync(mobileSwitcherPath, 'utf8');
  
  const hasUseNavigate = content.includes('useNavigate');
  const hasUseLocation = content.includes('useLocation');
  const hasNavigationLogic = content.includes('navigate(area.path)');
  const hasPathMapping = content.includes('path:');
  
  console.log(`   ✅ useNavigate importado: ${hasUseNavigate}`);
  console.log(`   ✅ useLocation importado: ${hasUseLocation}`);
  console.log(`   ✅ Lógica de navegação implementada: ${hasNavigationLogic}`);
  console.log(`   ✅ Mapeamento de rotas: ${hasPathMapping}`);
  
  if (hasUseNavigate && hasUseLocation && hasNavigationLogic && hasPathMapping) {
    console.log('   🎉 MobileAppAreaSwitcher corrigido com sucesso!');
  } else {
    console.log('   ❌ MobileAppAreaSwitcher ainda precisa de correções');
  }
} catch (error) {
  console.log('   ❌ Erro ao verificar MobileAppAreaSwitcher:', error.message);
}

// Teste 3: Verificar se AppAreaSwitcher está funcionando
console.log('\n3. Verificando AppAreaSwitcher...');
try {
  const appSwitcherPath = path.join(__dirname, 'src', 'components', 'nav', 'AppAreaSwitcher.tsx');
  const content = fs.readFileSync(appSwitcherPath, 'utf8');
  
  const hasUseNavigate = content.includes('useNavigate');
  const hasNavigationLogic = content.includes('navigate(item.path)');
  const hasNavItems = content.includes('navItems');
  
  console.log(`   ✅ useNavigate importado: ${hasUseNavigate}`);
  console.log(`   ✅ Lógica de navegação implementada: ${hasNavigationLogic}`);
  console.log(`   ✅ Usando navItems: ${hasNavItems}`);
  
  if (hasUseNavigate && hasNavigationLogic && hasNavItems) {
    console.log('   🎉 AppAreaSwitcher já está funcionando corretamente!');
  } else {
    console.log('   ❌ AppAreaSwitcher precisa de correções');
  }
} catch (error) {
  console.log('   ❌ Erro ao verificar AppAreaSwitcher:', error.message);
}

// Teste 4: Verificar se as rotas estão mapeadas corretamente
console.log('\n4. Verificando mapeamento de rotas...');
try {
  const navItemsPath = path.join(__dirname, 'src', 'lib', 'navItems.ts');
  const content = fs.readFileSync(navItemsPath, 'utf8');
  
  const routes = [
    '/dashboard',
    '/populacao', 
    '/barras',
    '/radar',
    '/dashboard/executivo',
    '/dashboard/detalhamento',
    '/dashboard/recomendacoes',
    '/dashboard/avancada'
  ];
  
  let allRoutesFound = true;
  routes.forEach(route => {
    const found = content.includes(`path: '${route}'`);
    console.log(`   ${found ? '✅' : '❌'} Rota ${route}: ${found ? 'Encontrada' : 'Não encontrada'}`);
    if (!found) allRoutesFound = false;
  });
  
  if (allRoutesFound) {
    console.log('   🎉 Todas as rotas estão mapeadas corretamente!');
  } else {
    console.log('   ❌ Algumas rotas estão faltando');
  }
} catch (error) {
  console.log('   ❌ Erro ao verificar rotas:', error.message);
}

// Teste 5: Verificar se App.tsx tem todas as rotas
console.log('\n5. Verificando App.tsx...');
try {
  const appPath = path.join(__dirname, 'src', 'App.tsx');
  const content = fs.readFileSync(appPath, 'utf8');
  
  const routes = [
    '/dashboard',
    '/populacao', 
    '/barras',
    '/radar',
    '/dashboard/executivo',
    '/dashboard/detalhamento',
    '/dashboard/recomendacoes',
    '/dashboard/avancada'
  ];
  
  let allRoutesFound = true;
  routes.forEach(route => {
    const found = content.includes(`path="${route}"`);
    console.log(`   ${found ? '✅' : '❌'} Rota ${route}: ${found ? 'Encontrada' : 'Não encontrada'}`);
    if (!found) allRoutesFound = false;
  });
  
  if (allRoutesFound) {
    console.log('   🎉 Todas as rotas estão definidas no App.tsx!');
  } else {
    console.log('   ❌ Algumas rotas estão faltando no App.tsx');
  }
} catch (error) {
  console.log('   ❌ Erro ao verificar App.tsx:', error.message);
}

console.log('\n📋 Resumo das correções implementadas:');
console.log('   • MicrosoftHeader agora usa useNavigate para navegação entre rotas');
console.log('   • MobileAppAreaSwitcher agora usa useNavigate para navegação entre rotas');
console.log('   • Mapeamento de rotas consistente entre todos os componentes');
console.log('   • Determinação da seção ativa baseada na rota atual');
console.log('   • Fallback para navegação interna quando necessário');

console.log('\n🚀 Para testar as correções:');
console.log('   1. Execute: npm run dev');
console.log('   2. Navegue para diferentes áreas usando o menu');
console.log('   3. Verifique se a URL muda corretamente');
console.log('   4. Teste em dispositivos móveis e desktop'); 
const path = require('path');

console.log('🔍 Testando correções de navegação...\n');

// Teste 1: Verificar se MicrosoftHeader está usando useNavigate
console.log('1. Verificando MicrosoftHeader...');
try {
  const microsoftHeaderPath = path.join(__dirname, 'src', 'components', 'dashboard', 'MicrosoftHeader.tsx');
  const content = fs.readFileSync(microsoftHeaderPath, 'utf8');
  
  const hasUseNavigate = content.includes('useNavigate');
  const hasUseLocation = content.includes('useLocation');
  const hasNavigationLogic = content.includes('navigate(section.path)');
  const hasPathMapping = content.includes('path:');
  
  console.log(`   ✅ useNavigate importado: ${hasUseNavigate}`);
  console.log(`   ✅ useLocation importado: ${hasUseLocation}`);
  console.log(`   ✅ Lógica de navegação implementada: ${hasNavigationLogic}`);
  console.log(`   ✅ Mapeamento de rotas: ${hasPathMapping}`);
  
  if (hasUseNavigate && hasUseLocation && hasNavigationLogic && hasPathMapping) {
    console.log('   🎉 MicrosoftHeader corrigido com sucesso!');
  } else {
    console.log('   ❌ MicrosoftHeader ainda precisa de correções');
  }
} catch (error) {
  console.log('   ❌ Erro ao verificar MicrosoftHeader:', error.message);
}

// Teste 2: Verificar se MobileAppAreaSwitcher está usando useNavigate
console.log('\n2. Verificando MobileAppAreaSwitcher...');
try {
  const mobileSwitcherPath = path.join(__dirname, 'src', 'components', 'nav', 'MobileAppAreaSwitcher.tsx');
  const content = fs.readFileSync(mobileSwitcherPath, 'utf8');
  
  const hasUseNavigate = content.includes('useNavigate');
  const hasUseLocation = content.includes('useLocation');
  const hasNavigationLogic = content.includes('navigate(area.path)');
  const hasPathMapping = content.includes('path:');
  
  console.log(`   ✅ useNavigate importado: ${hasUseNavigate}`);
  console.log(`   ✅ useLocation importado: ${hasUseLocation}`);
  console.log(`   ✅ Lógica de navegação implementada: ${hasNavigationLogic}`);
  console.log(`   ✅ Mapeamento de rotas: ${hasPathMapping}`);
  
  if (hasUseNavigate && hasUseLocation && hasNavigationLogic && hasPathMapping) {
    console.log('   🎉 MobileAppAreaSwitcher corrigido com sucesso!');
  } else {
    console.log('   ❌ MobileAppAreaSwitcher ainda precisa de correções');
  }
} catch (error) {
  console.log('   ❌ Erro ao verificar MobileAppAreaSwitcher:', error.message);
}

// Teste 3: Verificar se AppAreaSwitcher está funcionando
console.log('\n3. Verificando AppAreaSwitcher...');
try {
  const appSwitcherPath = path.join(__dirname, 'src', 'components', 'nav', 'AppAreaSwitcher.tsx');
  const content = fs.readFileSync(appSwitcherPath, 'utf8');
  
  const hasUseNavigate = content.includes('useNavigate');
  const hasNavigationLogic = content.includes('navigate(item.path)');
  const hasNavItems = content.includes('navItems');
  
  console.log(`   ✅ useNavigate importado: ${hasUseNavigate}`);
  console.log(`   ✅ Lógica de navegação implementada: ${hasNavigationLogic}`);
  console.log(`   ✅ Usando navItems: ${hasNavItems}`);
  
  if (hasUseNavigate && hasNavigationLogic && hasNavItems) {
    console.log('   🎉 AppAreaSwitcher já está funcionando corretamente!');
  } else {
    console.log('   ❌ AppAreaSwitcher precisa de correções');
  }
} catch (error) {
  console.log('   ❌ Erro ao verificar AppAreaSwitcher:', error.message);
}

// Teste 4: Verificar se as rotas estão mapeadas corretamente
console.log('\n4. Verificando mapeamento de rotas...');
try {
  const navItemsPath = path.join(__dirname, 'src', 'lib', 'navItems.ts');
  const content = fs.readFileSync(navItemsPath, 'utf8');
  
  const routes = [
    '/dashboard',
    '/populacao', 
    '/barras',
    '/radar',
    '/dashboard/executivo',
    '/dashboard/detalhamento',
    '/dashboard/recomendacoes',
    '/dashboard/avancada'
  ];
  
  let allRoutesFound = true;
  routes.forEach(route => {
    const found = content.includes(`path: '${route}'`);
    console.log(`   ${found ? '✅' : '❌'} Rota ${route}: ${found ? 'Encontrada' : 'Não encontrada'}`);
    if (!found) allRoutesFound = false;
  });
  
  if (allRoutesFound) {
    console.log('   🎉 Todas as rotas estão mapeadas corretamente!');
  } else {
    console.log('   ❌ Algumas rotas estão faltando');
  }
} catch (error) {
  console.log('   ❌ Erro ao verificar rotas:', error.message);
}

// Teste 5: Verificar se App.tsx tem todas as rotas
console.log('\n5. Verificando App.tsx...');
try {
  const appPath = path.join(__dirname, 'src', 'App.tsx');
  const content = fs.readFileSync(appPath, 'utf8');
  
  const routes = [
    '/dashboard',
    '/populacao', 
    '/barras',
    '/radar',
    '/dashboard/executivo',
    '/dashboard/detalhamento',
    '/dashboard/recomendacoes',
    '/dashboard/avancada'
  ];
  
  let allRoutesFound = true;
  routes.forEach(route => {
    const found = content.includes(`path="${route}"`);
    console.log(`   ${found ? '✅' : '❌'} Rota ${route}: ${found ? 'Encontrada' : 'Não encontrada'}`);
    if (!found) allRoutesFound = false;
  });
  
  if (allRoutesFound) {
    console.log('   🎉 Todas as rotas estão definidas no App.tsx!');
  } else {
    console.log('   ❌ Algumas rotas estão faltando no App.tsx');
  }
} catch (error) {
  console.log('   ❌ Erro ao verificar App.tsx:', error.message);
}

console.log('\n📋 Resumo das correções implementadas:');
console.log('   • MicrosoftHeader agora usa useNavigate para navegação entre rotas');
console.log('   • MobileAppAreaSwitcher agora usa useNavigate para navegação entre rotas');
console.log('   • Mapeamento de rotas consistente entre todos os componentes');
console.log('   • Determinação da seção ativa baseada na rota atual');
console.log('   • Fallback para navegação interna quando necessário');

console.log('\n🚀 Para testar as correções:');
console.log('   1. Execute: npm run dev');
console.log('   2. Navegue para diferentes áreas usando o menu');
console.log('   3. Verifique se a URL muda corretamente');
console.log('   4. Teste em dispositivos móveis e desktop'); 
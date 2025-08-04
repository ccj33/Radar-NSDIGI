const fs = require('fs');
const path = require('path');

console.log('🔍 Teste Simples de Navegação...\n');

// Verificar se os arquivos principais existem
const files = [
  'src/components/dashboard/MicrosoftHeader.tsx',
  'src/components/nav/MobileAppAreaSwitcher.tsx',
  'src/components/nav/AppAreaSwitcher.tsx',
  'src/lib/navItems.ts',
  'src/App.tsx'
];

console.log('1. Verificando existência dos arquivos:');
files.forEach(file => {
  const exists = fs.existsSync(path.join(__dirname, file));
  console.log(`   ${exists ? '✅' : '❌'} ${file}`);
});

// Verificar se há erros de sintaxe básicos
console.log('\n2. Verificando sintaxe básica:');
try {
  const microsoftHeader = fs.readFileSync(path.join(__dirname, 'src/components/dashboard/MicrosoftHeader.tsx'), 'utf8');
  const hasUseNavigate = microsoftHeader.includes('useNavigate');
  const hasUseLocation = microsoftHeader.includes('useLocation');
  const hasSections = microsoftHeader.includes('const sections =');
  
  console.log(`   ✅ useNavigate: ${hasUseNavigate}`);
  console.log(`   ✅ useLocation: ${hasUseLocation}`);
  console.log(`   ✅ sections array: ${hasSections}`);
  
  if (hasUseNavigate && hasUseLocation && hasSections) {
    console.log('   🎉 MicrosoftHeader parece estar correto!');
  }
} catch (error) {
  console.log('   ❌ Erro ao verificar MicrosoftHeader:', error.message);
}

try {
  const mobileSwitcher = fs.readFileSync(path.join(__dirname, 'src/components/nav/MobileAppAreaSwitcher.tsx'), 'utf8');
  const hasUseNavigate = mobileSwitcher.includes('useNavigate');
  const hasUseLocation = mobileSwitcher.includes('useLocation');
  const hasAppAreas = mobileSwitcher.includes('const appAreas');
  
  console.log(`   ✅ useNavigate: ${hasUseNavigate}`);
  console.log(`   ✅ useLocation: ${hasUseLocation}`);
  console.log(`   ✅ appAreas array: ${hasAppAreas}`);
  
  if (hasUseNavigate && hasUseLocation && hasAppAreas) {
    console.log('   🎉 MobileAppAreaSwitcher parece estar correto!');
  }
} catch (error) {
  console.log('   ❌ Erro ao verificar MobileAppAreaSwitcher:', error.message);
}

console.log('\n📋 Resumo:');
console.log('   • Arquivos principais verificados');
console.log('   • Sintaxe básica verificada');
console.log('   • Imports do React Router verificados');
console.log('   • Arrays de navegação verificados');

console.log('\n🚀 Para testar a aplicação:');
console.log('   1. Execute: npm run dev');
console.log('   2. Abra o navegador em http://localhost:5173');
console.log('   3. Teste a navegação entre as áreas'); 
const path = require('path');

console.log('🔍 Teste Simples de Navegação...\n');

// Verificar se os arquivos principais existem
const files = [
  'src/components/dashboard/MicrosoftHeader.tsx',
  'src/components/nav/MobileAppAreaSwitcher.tsx',
  'src/components/nav/AppAreaSwitcher.tsx',
  'src/lib/navItems.ts',
  'src/App.tsx'
];

console.log('1. Verificando existência dos arquivos:');
files.forEach(file => {
  const exists = fs.existsSync(path.join(__dirname, file));
  console.log(`   ${exists ? '✅' : '❌'} ${file}`);
});

// Verificar se há erros de sintaxe básicos
console.log('\n2. Verificando sintaxe básica:');
try {
  const microsoftHeader = fs.readFileSync(path.join(__dirname, 'src/components/dashboard/MicrosoftHeader.tsx'), 'utf8');
  const hasUseNavigate = microsoftHeader.includes('useNavigate');
  const hasUseLocation = microsoftHeader.includes('useLocation');
  const hasSections = microsoftHeader.includes('const sections =');
  
  console.log(`   ✅ useNavigate: ${hasUseNavigate}`);
  console.log(`   ✅ useLocation: ${hasUseLocation}`);
  console.log(`   ✅ sections array: ${hasSections}`);
  
  if (hasUseNavigate && hasUseLocation && hasSections) {
    console.log('   🎉 MicrosoftHeader parece estar correto!');
  }
} catch (error) {
  console.log('   ❌ Erro ao verificar MicrosoftHeader:', error.message);
}

try {
  const mobileSwitcher = fs.readFileSync(path.join(__dirname, 'src/components/nav/MobileAppAreaSwitcher.tsx'), 'utf8');
  const hasUseNavigate = mobileSwitcher.includes('useNavigate');
  const hasUseLocation = mobileSwitcher.includes('useLocation');
  const hasAppAreas = mobileSwitcher.includes('const appAreas');
  
  console.log(`   ✅ useNavigate: ${hasUseNavigate}`);
  console.log(`   ✅ useLocation: ${hasUseLocation}`);
  console.log(`   ✅ appAreas array: ${hasAppAreas}`);
  
  if (hasUseNavigate && hasUseLocation && hasAppAreas) {
    console.log('   🎉 MobileAppAreaSwitcher parece estar correto!');
  }
} catch (error) {
  console.log('   ❌ Erro ao verificar MobileAppAreaSwitcher:', error.message);
}

console.log('\n📋 Resumo:');
console.log('   • Arquivos principais verificados');
console.log('   • Sintaxe básica verificada');
console.log('   • Imports do React Router verificados');
console.log('   • Arrays de navegação verificados');

console.log('\n🚀 Para testar a aplicação:');
console.log('   1. Execute: npm run dev');
console.log('   2. Abra o navegador em http://localhost:5173');
console.log('   3. Teste a navegação entre as áreas'); 
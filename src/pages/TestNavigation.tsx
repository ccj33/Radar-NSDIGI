import React, { useState } from 'react';
import { MicrosoftHeader } from '@/components/dashboard/MicrosoftHeader';
// import { NavigationMenu } from '@/components/dashboard/NavigationMenu';

const TestNavigation = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    console.log('Navegando para:', section);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MicrosoftHeader activeSection={activeSection} onNavigate={handleNavigate} />
      
      <div className="container mx-auto px-4 py-8 mt-20">
        <h1 className="text-3xl font-bold mb-8">Teste da Nova Navegação</h1>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Seção Ativa: {activeSection}</h2>
          
          <div className="space-y-4">
            <p className="text-gray-600">
              Esta página testa a nova navegação moderna implementada.
            </p>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2">Funcionalidades Testadas:</h3>
              <ul className="text-blue-800 space-y-1">
                <li>✅ Botão "Visão Geral" fixo no header</li>
                <li>✅ Botão "Áreas ▾" com menu moderno</li>
                <li>✅ Busca instantânea no menu</li>
                <li>✅ Navegação por teclado (Ctrl+K)</li>
                <li>✅ Responsividade (desktop/mobile)</li>
                <li>✅ Animações suaves</li>
              </ul>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-medium text-green-900 mb-2">Como Testar:</h3>
              <ul className="text-green-800 space-y-1">
                <li>• Clique no botão "Áreas ▾" para abrir o menu</li>
                <li>• Digite no campo de busca para filtrar itens</li>
                <li>• Use as setas ↑↓ para navegar</li>
                <li>• Pressione Ctrl+K para abrir o menu</li>
                <li>• Teste em diferentes tamanhos de tela</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestNavigation; 
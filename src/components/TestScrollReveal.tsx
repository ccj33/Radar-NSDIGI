import React from 'react';
import ScrollReveal from './ScrollReveal';

const TestScrollReveal: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-8">Teste do ScrollReveal</h1>
      
      {/* Teste 1: Elemento simples */}
      <ScrollReveal>
        <div className="bg-blue-500 text-white p-6 rounded-lg text-center">
          <h2 className="text-xl font-bold mb-2">Teste 1: Elemento Simples</h2>
          <p>Este elemento deve aparecer com animação quando você rolar até ele.</p>
        </div>
      </ScrollReveal>

      {/* Teste 2: Com delay */}
      <ScrollReveal delay={500}>
        <div className="bg-green-500 text-white p-6 rounded-lg text-center">
          <h2 className="text-xl font-bold mb-2">Teste 2: Com Delay (500ms)</h2>
          <p>Este elemento deve aparecer com delay de 500ms.</p>
        </div>
      </ScrollReveal>

      {/* Teste 3: Múltiplos elementos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ScrollReveal delay={0}>
          <div className="bg-red-500 text-white p-4 rounded-lg text-center">
            <h3 className="font-bold">Card 1</h3>
            <p>Delay: 0ms</p>
          </div>
        </ScrollReveal>
        
        <ScrollReveal delay={200}>
          <div className="bg-purple-500 text-white p-4 rounded-lg text-center">
            <h3 className="font-bold">Card 2</h3>
            <p>Delay: 200ms</p>
          </div>
        </ScrollReveal>
        
        <ScrollReveal delay={400}>
          <div className="bg-orange-500 text-white p-4 rounded-lg text-center">
            <h3 className="font-bold">Card 3</h3>
            <p>Delay: 400ms</p>
          </div>
        </ScrollReveal>
      </div>

      {/* Espaçamento para forçar scroll */}
      <div className="h-96 bg-gray-200 flex items-center justify-center">
        <p className="text-gray-600">Role para baixo para ver as animações</p>
      </div>

      {/* Teste 4: Elemento grande */}
      <ScrollReveal delay={600}>
        <div className="bg-indigo-500 text-white p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Teste 4: Elemento Grande</h2>
          <p className="text-lg mb-4">Este é um elemento maior para testar a animação.</p>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-white/20 p-4 rounded">
              <h4 className="font-bold">Feature 1</h4>
              <p>Descrição da feature</p>
            </div>
            <div className="bg-white/20 p-4 rounded">
              <h4 className="font-bold">Feature 2</h4>
              <p>Descrição da feature</p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Mais espaçamento */}
      <div className="h-96 bg-gray-200 flex items-center justify-center">
        <p className="text-gray-600">Continue rolando...</p>
      </div>

      {/* Teste 5: Elemento final */}
      <ScrollReveal delay={800}>
        <div className="bg-pink-500 text-white p-6 rounded-lg text-center">
          <h2 className="text-xl font-bold mb-2">Teste 5: Elemento Final</h2>
          <p>Se você viu todas as animações, o ScrollReveal está funcionando!</p>
        </div>
      </ScrollReveal>
    </div>
  );
};

export default TestScrollReveal; 
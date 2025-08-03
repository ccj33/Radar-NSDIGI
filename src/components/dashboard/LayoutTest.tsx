import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

export function LayoutTest() {
  return (
    <DashboardLayout activeSection="executivo">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Teste de Layout</h2>
          <p className="text-gray-600 mb-4">
            Este é um teste para verificar se o layout está funcionando corretamente.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800">Header</h3>
              <p className="text-sm text-blue-600">Deve estar sticky no topo</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-800">Banner</h3>
              <p className="text-sm text-purple-600">Deve aparecer logo abaixo do header</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800">Conteúdo</h3>
              <p className="text-sm text-green-600">Deve aparecer abaixo do banner</p>
            </div>
          </div>
        </div>

        {/* Conteúdo adicional para testar scroll */}
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Seção de Teste {i + 1}
            </h3>
            <p className="text-gray-600">
              Esta é uma seção de teste para verificar se o scroll está funcionando corretamente.
              O banner deve desaparecer naturalmente quando você rolar para baixo.
            </p>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
} 
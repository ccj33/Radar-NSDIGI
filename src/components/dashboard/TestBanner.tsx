import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const TestBanner: React.FC = () => {
  return (
    <Card className="overflow-hidden">
      <div className="h-48 bg-gradient-to-r from-blue-600 to-purple-600">
        <CardContent className="h-full flex items-center justify-center p-6">
          <div className="text-white text-center">
            <h2 className="text-2xl font-bold mb-2">Banner de Teste</h2>
            <p className="text-lg opacity-90">
              Este é um banner de teste para verificar se as importações estão funcionando.
            </p>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export { TestBanner };
export default TestBanner; 
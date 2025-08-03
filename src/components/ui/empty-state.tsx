import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  tip?: {
    title: string;
    content: string;
  };
  className?: string;
  iconClassName?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  tip,
  className,
  iconClassName
}: EmptyStateProps) {
  return (
    <div className={cn(
      "flex items-center justify-center min-h-[400px] p-8",
      className
    )}>
      <div className="text-center max-w-md mx-auto">
        {/* Ícone moderno */}
        {Icon && (
          <div className={cn(
            "w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl flex items-center justify-center",
            iconClassName
          )}>
            <Icon className="w-8 h-8 text-blue-600" />
          </div>
        )}
        
        {/* Título principal */}
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          {title}
        </h3>
        
        {/* Descrição */}
        <p className="text-gray-600 mb-6 leading-relaxed">
          {description}
        </p>
        
        {/* Dica opcional */}
        {tip && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-amber-900 mb-1">{tip.title}</p>
                <p className="text-sm text-amber-800">
                  {tip.content}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Função para formatar população em milhões/mil
export function formatPopulation(population: number | string): string {
  const pop = typeof population === 'string' 
    ? parseFloat(String(population).replace(/\./g, '').replace(',', '.'))
    : population;
    
  if (pop >= 1000000) {
    return `${(pop / 1000000).toFixed(1)} milhões`;
  } else if (pop >= 1000) {
    return `${(pop / 1000).toFixed(1)} mil`;
  } else {
    return pop.toLocaleString('pt-BR');
  }
}

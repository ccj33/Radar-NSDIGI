import React, { useEffect, useRef, useState } from "react";

interface MobileBottomFiltersProps {
  onOpenMacro?: () => void;
  onOpenMicro?: () => void;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  className?: string;
}

/**
 * Barra fixa inferior para mobile com dois botões: Macro e Micro.
 * - Esconde ao rolar para baixo e reaparece ao rolar para cima (com debounce/threshold)
 * - Usa cores solicitadas e respeita safe-area
 */
export const MobileBottomFilters: React.FC<MobileBottomFiltersProps> = ({
  onOpenMacro,
  onOpenMicro,
  leftContent,
  rightContent,
  className = "",
}) => {
  const [hidden, setHidden] = useState(false);
  const lastScrollYRef = useRef<number>(0);
  const debounceTimerRef = useRef<number | null>(null);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY || 0;

    const handleScroll = () => {
      // Debounce ~120ms
      if (debounceTimerRef.current) {
        window.clearTimeout(debounceTimerRef.current);
      }
      debounceTimerRef.current = window.setTimeout(() => {
        const current = window.scrollY || 0;
        const delta = current - lastScrollYRef.current;
        const threshold = 16; // evita oscilações

        if (Math.abs(delta) > threshold) {
          if (delta > 0) {
            setHidden(true); // descendo
          } else {
            setHidden(false); // subindo
          }
          lastScrollYRef.current = current;
        }
      }, 120);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (debounceTimerRef.current) window.clearTimeout(debounceTimerRef.current);
    };
  }, []);

  return (
    <div
      role="toolbar"
      aria-label="Filtros de região"
      className={`md:hidden fixed left-0 right-0 bottom-0 z-[60] ${
        hidden ? "translate-y-full opacity-0" : "translate-y-0 opacity-100"
      } transition-transform duration-200 ease-in-out bg-transparent pointer-events-none ${className}`}
      style={{
        // espaço para a safe-area do iOS/Android e leve elevação visual
        paddingBottom: "max(12px, env(safe-area-inset-bottom))",
      }}
    >
      <div className="mx-4 mb-2 pointer-events-auto shadow-lg rounded-xl overflow-hidden" style={{ boxShadow: "0 6px 20px rgba(0,0,0,0.18)" }}>
        <div className="grid grid-cols-2">
          {leftContent ? (
            <div className="w-full">{leftContent}</div>
          ) : (
            <button
              type="button"
              aria-label="Selecionar Macroregião"
              onClick={onOpenMacro}
              className="h-14 sm:h-16 w-full text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-black/70 active:opacity-90 bg-[#FFA500] text-[#111111]"
            >
              Selecionar Macro
            </button>
          )}
          {rightContent ? (
            <div className="w-full border-l border-black/10">{rightContent}</div>
          ) : (
            <button
              type="button"
              aria-label="Selecionar Microrregião"
              onClick={onOpenMicro}
              className="h-14 sm:h-16 w-full text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-black/70 active:opacity-90 bg-[#FFEB3B] text-[#111111] border-l border-black/10"
            >
              Selecionar Micro
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileBottomFilters;



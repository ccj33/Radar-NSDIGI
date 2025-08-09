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
      } transition-transform duration-200 ease-in-out pointer-events-none ${className}`}
      style={{
        paddingBottom: "max(12px, env(safe-area-inset-bottom))",
      }}
    >
      <div className="mx-4 mb-3 pointer-events-auto rounded-2xl overflow-visible backdrop-blur-md bg-white/60 border border-white/40 shadow-[0_8px_24px_rgba(2,6,23,0.15)]">
        <div className="grid grid-cols-2 gap-0">
          {leftContent ? (
            <div className="w-full min-w-0">{leftContent}</div>
          ) : (
            <button
              type="button"
              aria-label="Selecionar Macroregião"
              onClick={onOpenMacro}
              className="h-[52px] sm:h-[56px] w-full font-semibold focus:outline-none active:opacity-95 text-white bg-gradient-to-r from-blue-600 to-sky-500 rounded-full ring-1 ring-white/40 hover:ring-white/60 focus-visible:ring-0 focus-visible:ring-offset-0"
            >
              Selecionar Macro
            </button>
          )}
          {rightContent ? (
            <div className="w-full min-w-0 border-l border-white/20">{rightContent}</div>
          ) : (
            <button
              type="button"
              aria-label="Selecionar Microrregião"
              onClick={onOpenMicro}
              className="h-[52px] sm:h-[56px] w-full font-semibold focus:outline-none active:opacity-95 text-white bg-gradient-to-r from-violet-600 to-fuchsia-500 rounded-full ring-1 ring-white/40 hover:ring-white/60 focus-visible:ring-0 focus-visible:ring-offset-0"
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



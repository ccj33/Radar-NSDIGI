import { useEffect, useRef } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function ScrollReveal({ children, className = "", delay = 0 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Aplicar estilos iniciais
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "opacity 0.4s ease-out, transform 0.4s ease-out";

    // Pequeno delay para garantir que a página carregou
    const initDelay = 100;

    const animateElement = () => {
      const rect = element.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

      if (isVisible) {
        // Se já está visível, animar imediatamente
        setTimeout(() => {
          if (element) {
            element.style.opacity = "1";
            element.style.transform = "translateY(0)";
          }
        }, delay);
      } else {
        // Se não está visível, usar IntersectionObserver
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                if (element) {
                  element.style.opacity = "1";
                  element.style.transform = "translateY(0)";
                  observer.unobserve(element);
                }
              }, delay);
            }
          },
          { 
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
          }
        );

        observer.observe(element);
        return () => observer.disconnect();
      }
    };

    setTimeout(animateElement, initDelay);
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
} 
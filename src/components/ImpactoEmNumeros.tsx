import { FaMapMarkedAlt, FaProjectDiagram, FaBrain } from "react-icons/fa";

export default function ImpactoEmNumeros() {
  return (
    <section className="relative bg-gradient-to-b from-white to-blue-50 py-16 px-4">
      {/* SVG decorativo no fundo */}
      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute -top-10 -left-10 opacity-10 w-96 h-96"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="100" cy="100" r="100" fill="#3B82F6" />
        </svg>
      </div>

      <div className="relative max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Impacto em Números
        </h2>
        <p className="text-gray-500 mb-10">
          Resultados que refletem a transformação digital em Minas Gerais.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <FaMapMarkedAlt className="text-blue-200 text-5xl mb-3" />
            <p className="text-5xl font-bold text-blue-600">89</p>
            <p className="text-gray-600">Microrregiões Monitoradas</p>
          </div>
          <div className="flex flex-col items-center">
            <FaProjectDiagram className="text-blue-200 text-5xl mb-3" />
            <p className="text-5xl font-bold text-blue-600">7</p>
            <p className="text-gray-600">Eixos de Maturidade Digital</p>
          </div>
          <div className="flex flex-col items-center">
            <FaBrain className="text-blue-200 text-5xl mb-3" />
            <p className="text-5xl font-bold text-blue-600">1000+</p>
            <p className="text-gray-600">Insights Gerados</p>
          </div>
        </div>
      </div>
    </section>
  );
} 
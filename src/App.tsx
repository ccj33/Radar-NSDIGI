import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import NewLandingPage from "./pages/NewLandingPage";
import RadarChartPage from "./pages/RadarChartPage";
import BarChartPage from "./pages/BarChartPage";
import PopulationChartPage from "./pages/PopulationChartPage";
import NotFound from "./pages/NotFound";
import MicroRegionPage from "./pages/MicroRegionPage";
import BannerTest from "./pages/BannerTest";
import TestNavigation from "./pages/TestNavigation";
import DashboardExecutivoPage from "./pages/DashboardExecutivoPage";
import DetalhamentoPage from "./pages/DetalhamentoPage";
import RecomendacoesPage from "./pages/RecomendacoesPage";
import AnaliseAvancadaPage from "./pages/AnaliseAvancadaPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NewLandingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/radar" element={<RadarChartPage />} />
          <Route path="/barras" element={<BarChartPage />} />
          <Route path="/populacao" element={<PopulationChartPage />} />
          <Route path="/dashboard/microrregiao/:token" element={<MicroRegionPage />} />
          <Route path="/dashboard/executivo" element={<DashboardExecutivoPage />} />
          <Route path="/dashboard/detalhamento" element={<DetalhamentoPage />} />
          <Route path="/dashboard/recomendacoes" element={<RecomendacoesPage />} />
          <Route path="/dashboard/avancada" element={<AnaliseAvancadaPage />} />
          <Route path="/banner-test" element={<BannerTest />} />
          <Route path="/test-navigation" element={<TestNavigation />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
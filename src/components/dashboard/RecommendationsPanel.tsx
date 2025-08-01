import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  FileText,
  FileSpreadsheet,
  FileJson,
  Download,
  AlertCircle,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Info,
  Settings,
  ListChecks,
  Wrench,
  ClipboardList
} from "lucide-react";
import { recomendacaoEixo1 } from "@/data/recomendacoesEixo1";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";


const ToolCard = ({ ferramenta }: { ferramenta: typeof recomendacaoEixo1.ferramentas[0] }) => {
  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return <FileText className="h-8 w-8 text-red-500" />;
      case 'word':
        return <FileJson className="h-8 w-8 text-blue-500" />;
      case 'excel':
        return <FileSpreadsheet className="h-8 w-8 text-green-500" />;
      default:
        return <FileText className="h-8 w-8 text-gray-500" />;
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4 flex items-center gap-4">
        {getFileIcon(ferramenta.tipo)}
              <div className="flex-1">
          <p className="font-semibold text-sm text-gray-800">{ferramenta.titulo} ({ferramenta.tipo})</p>
          <p className="text-xs text-gray-500">{ferramenta.descricao}</p>
        </div>
        <Button size="sm" variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Baixar
        </Button>
      </CardContent>
    </Card>
  );
};


const RecommendationStep = ({ recomendacao, index, isLast }: { recomendacao: typeof recomendacaoEixo1.recomendacoes[0], index: number, isLast: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
    return (
    <div className="flex">
      <div className="flex flex-col items-center mr-4">
        <div>
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-500 text-white font-bold">
            {index + 1}
          </div>
                    </div>
        {!isLast && <div className="w-px h-full bg-gray-300" />}
                  </div>
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
        <div className="pb-8 w-full">
          <p className="font-semibold text-gray-800">{recomendacao.titulo}</p>
          <CollapsibleTrigger asChild>
            <Button variant="link" size="sm" className="px-0 text-xs">
              {isOpen ? "Ocultar detalhes" : "Ver detalhes"}
              {isOpen ? <ChevronDown className="h-4 w-4 ml-1" /> : <ChevronRight className="h-4 w-4 ml-1" />}
            </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
            <p className="text-sm text-gray-600 mt-2 p-4 bg-gray-50 rounded-md border">
              {recomendacao.detalhes}
            </p>
            </CollapsibleContent>
              </div>
          </Collapsible>
                    </div>
  )
}

export function RecommendationsPanel() {
  const { situacaoAtual, recomendacoes, ferramentas } = recomendacaoEixo1;

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-blue-100">
            <Settings className="h-8 w-8 text-blue-600" />
              </div>
          <div>
            <CardTitle className="text-xl font-bold text-gray-800">Eixo 1 - Gestão e Governança</CardTitle>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-gray-600">Pontuação: 0.470</span>
              <Badge variant="secondary">Em Evolução 1</Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="diagnostico">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="diagnostico"><AlertCircle className="h-4 w-4 mr-2"/>Diagnóstico</TabsTrigger>
            <TabsTrigger value="plano"><ListChecks className="h-4 w-4 mr-2"/>Plano de Ação</TabsTrigger>
            <TabsTrigger value="ferramentas"><Wrench className="h-4 w-4 mr-2"/>Kit de Ferramentas</TabsTrigger>
          </TabsList>

          <TabsContent value="diagnostico" className="pt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Info className="h-5 w-5 mr-2 text-yellow-500" />
                  Situação Atual
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 leading-relaxed">{situacaoAtual}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="plano" className="pt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <ClipboardList className="h-5 w-5 mr-2 text-blue-500" />
                  Recomendações
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recomendacoes.map((rec, index) => (
                  <RecommendationStep key={rec.id} recomendacao={rec} index={index} isLast={index === recomendacoes.length - 1} />
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ferramentas" className="pt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                  Ferramentas Sugeridas
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                {ferramentas.map((ferramenta) => (
                  <ToolCard key={ferramenta.id} ferramenta={ferramenta} />
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

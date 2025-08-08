# 🎯 PROMPT DEFINITIVO PARA PLANILHA `base_c.xlsx`

## Versão Otimizada para Nova Estrutura (Macrorregião no Início)

---

### 📋 PROMPT PARA USAR COM CURSOR OU CHATGPT:

```txt
Você vai trabalhar com a planilha `base_c.xlsx`, que contém os dados organizados dos Planos de Ação da Saúde Digital em Minas Gerais.

A aba principal se chama **"pa"** (ou "PA - objetivos, ações e metas").

---

### 🧠 CONTEXTO E REGRAS:

- Cada linha representa uma **ação vinculada a um objetivo estratégico** de uma **macrorregião**.
- **As colunas estão organizadas assim (na ordem correta):**
  1. **Macrorregião** - Nome da região de MG
  2. **Número Objetivo** - Numeração (IGNORAR)
  3. **Objetivo** - Texto do objetivo estratégico
  4. **Ação** - Tema/categoria da ação
  5. **Descrição** - Descrição detalhada da ação
  6. **Meta** - Meta específica da ação
  7. **Abrangência** - Escopo (Estadual/Regional)

---

### 🎯 O QUE EU QUERO QUE VOCÊ FAÇA:

1. **IGNORE COMPLETAMENTE a numeração dos objetivos** (coluna "Número Objetivo"). Esses números não são confiáveis entre macrorregiões.

2. **Reestruture os dados agrupando por TEMA REAL**, baseado na coluna **"Ação"** (que contém os temas como "Infraestrutura para Saúde Digital", "Redes Dados em Saúde", etc.).

3. Para cada **macrorregião**, gere um JSON com esta estrutura:

```json
{
  "macrorregião": "NOME DA MACRO",
  "objetivos": [
    {
      "tema": "Infraestrutura para Saúde Digital",
      "descrição": "Descrição completa da ação",
      "ações": [
        {
          "título": "Título resumido baseado no tema",
          "meta": "Texto completo da meta",
          "origem": "Objetivo X, Ação Y (referência da planilha)",
          "tipo": "meta padrão" // se aparece em várias macros
        }
      ]
    }
  ]
}
```

---

### 🔍 CLASSIFICAÇÃO DAS METAS:

- **"meta padrão"**: Se a mesma meta (texto idêntico ou muito similar) aparece em **múltiplas macrorregiões**
- **"meta específica"**: Se a meta é **exclusiva** de uma macrorregião

---

### 📊 AGRUPAMENTO POR TEMA:

- Use a coluna **"Ação"** como base para os temas
- Temas similares devem ser unificados (ex: "Telessaúde" e "Teleassistência")
- Mantenha os nomes dos temas consistentes entre macrorregiões

---

### 📈 ENTREGA FINAL:

1. **JSON individual** para cada uma das 16 macrorregiões
2. **JSON consolidado** com todas as macrorregiões
3. **Resumo estatístico** por macrorregião:
   - Número de temas únicos
   - Total de metas
   - Metas padrão vs específicas
   - Distribuição de metas por tema

---

### 💡 ESTRATÉGIA DE PROCESSAMENTO:

1. Carregue a planilha e identifique todas as macrorregiões
2. Para cada macrorregião, agrupe as linhas por tema (coluna "Ação")
3. Dentro de cada tema, liste todas as metas
4. Compare metas entre macrorregiões para classificar como padrão/específica
5. Gere os JSONs estruturados

---

🚀 **COMECE AGORA**: Processe todos os dados da planilha e retorne os JSONs estruturados por tema e macrorregião, seguindo exatamente essa especificação.
```

---

## ✅ DIFERENÇAS DA VERSÃO ANTERIOR:

1. **Ordem das colunas atualizada** - Macrorregião agora está no início
2. **Nome da aba corrigido** - "pa" em vez de "PA - objetivos, ações e metas"
3. **Mapeamento correto** - Coluna "Ação" contém os temas
4. **Estrutura mais clara** - Especificação detalhada de cada coluna
5. **Instruções de processamento** - Estratégia passo a passo

---

## 🎯 RESULTADO ESPERADO:

- ✅ 16 arquivos JSON (um por macrorregião)
- ✅ 1 arquivo JSON consolidado
- ✅ 1 resumo estatístico
- ✅ Classificação correta de metas padrão vs específicas
- ✅ Agrupamento por tema real (não por numeração)
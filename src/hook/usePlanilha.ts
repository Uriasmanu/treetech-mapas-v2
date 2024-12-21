import { useState } from 'react';
import Papa from 'papaparse';

type Linha = (string | number)[];

export const usePlanilha = () => {
  const [novaPlanilha, setNovaPlanilha] = useState<File | null>(null);
  const [planilhaCompleta, setPlanilhaCompleta] = useState<File | null>(null);
  const [planilhaModificada, setPlanilhaModificada] = useState<Linha[]>([]);
  const [erro, setErro] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleErrorClose = () => setErro('');

  // Função para adicionar "Mnemônico" na posição 26
  const adicionarColunaMnemonico = (dados: Linha[]): Linha[] => {
    return dados.map((linha, index) => {
      const novaLinha = [...linha];
      novaLinha[25] = index === 0 ? 'Mnemônico' : ''; // Adiciona no cabeçalho ou mantém vazio
      return novaLinha;
    });
  };

  // Ajustando a função corrigirCodificacao para aceitar string | number
  const corrigirCodificacao = (texto: string | number): string => {
    try {
      // Convertendo texto para string antes de aplicar decodeURIComponent
      const textoStr = texto.toString();
      return decodeURIComponent(escape(textoStr));
    } catch {
      return texto.toString(); // Retorna o texto original caso não consiga decodificar
    }
  };

  // Função para converter os dados modificados diretamente para CSV
  const gerarCsv = (dados: Linha[], fileName: string) => {
    const csvContent = dados.map(linha => linha.join(';')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8-bom;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Função para comparar os IDs das planilhas e atualizar a coluna Z da novaPlanilha
  const compararPlanilhas = (planilhaCompletaData: Linha[], novaPlanilhaData: Linha[]) => {
    // Cria um mapa de IDs e os dados da coluna Z da planilhaCompleta
    const mapaPlanilhaCompleta = planilhaCompletaData.reduce((mapa: Record<string | number, string | number>, linha: Linha) => {
      const id = linha[0]; // ID da coluna A
      const colunaZ = linha[25]; // Dados da coluna Z
      mapa[id] = colunaZ; // Mapeia o ID para o valor da coluna Z
      return mapa;
    }, {} as Record<string | number, string | number>);

    // Atualiza a coluna Z da novaPlanilha com base nos dados da planilhaCompleta
    return novaPlanilhaData.map((linha) => {
      const idNovaPlanilha = linha[0]; // ID da novaPlanilha (coluna A)
      if (mapaPlanilhaCompleta[idNovaPlanilha]) {
        // Se o ID for encontrado, atualiza a coluna Z da novaPlanilha com o valor da planilhaCompleta
        linha[25] = mapaPlanilhaCompleta[idNovaPlanilha]; // Coluna Z
      }
      return linha;
    });
  };

  // Manipular a nova planilha e a planilha completa
  const atualizarPlanilha = async () => {
    if (!novaPlanilha || !planilhaCompleta) {
      setErro('A nova planilha e a planilha completa precisam ser selecionadas.');
      return;
    }

    // Definindo o tipo para o resultado do Papa.parse
    type ResultadoPapaParse = {
      data: Linha[]; // Um array de linhas, onde cada linha é um array de string ou number
    };

    setLoading(true);
    try {
      // Ler a nova planilha
      Papa.parse(novaPlanilha, {
        header: false,
        skipEmptyLines: true,
        complete: (resultadoNovaPlanilha: ResultadoPapaParse) => {
          const dadosNovaPlanilha = resultadoNovaPlanilha.data.map(linha =>
            linha.map(corrigirCodificacao) // Aplica a conversão em cada célula
          );

          // Ler a planilha completa
          Papa.parse(planilhaCompleta, {
            header: false,
            skipEmptyLines: true,
            complete: (resultadoPlanilhaCompleta: ResultadoPapaParse) => {
              const dadosPlanilhaCompleta = resultadoPlanilhaCompleta.data.map(linha =>
                linha.map(corrigirCodificacao) // Aplica a conversão em cada célula
              );

              // Comparar as planilhas e atualizar a coluna Z da novaPlanilha
              const novaPlanilhaAtualizada = compararPlanilhas(dadosPlanilhaCompleta, dadosNovaPlanilha);

              // Atualizar o estado com a planilha modificada
              setPlanilhaModificada(novaPlanilhaAtualizada);

              // Gerar e fazer o download do CSV
              gerarCsv(novaPlanilhaAtualizada, 'nova_planilha_atualizada.csv');

              setTimeout(() => setLoading(false), 4000);
            },
            error: () => {
              setErro('Erro ao ler a planilha completa.');
              setLoading(false);
            }
          });
        },
        error: () => {
          setErro('Erro ao ler a nova planilha.');
          setLoading(false);
        }
      });
    } catch {
      setErro('Ocorreu um erro ao processar as planilhas.');
      setLoading(false);
    }
  };

  return {
    novaPlanilha,
    planilhaCompleta,
    erro,
    setErro,
    loading,
    setNovaPlanilha,
    setPlanilhaCompleta,
    atualizarPlanilha,
    handleErrorClose,
    planilhaModificada
  };
};

import { useState } from 'react';
import Papa from 'papaparse';

export const usePlanilha = () => {
  const [novaPlanilha, setNovaPlanilha] = useState<File | null>(null);
  const [planilhaCompleta, setPlanilhaCompleta] = useState<File | null>(null);
  const [planilhaModificada, setPlanilhaModificada] = useState<any[]>([]);
  const [erro, setErro] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleErrorClose = () => setErro('');

  // Função para adicionar "Mnemônico" na posição 26
  const adicionarColunaMnemonico = (dados: any[]) => {
    return dados.map((linha: any, index: number) => {
      const novaLinha = [...linha];
      novaLinha[25] = index === 0 ? 'Mnemônico' : ''; // Adiciona no cabeçalho ou mantém vazio
      return novaLinha;
    });
  };

  // Função para corrigir codificação de caracteres (UTF-8)
  const corrigirCodificacao = (texto: string) => {
    try {
      return decodeURIComponent(escape(texto));
    } catch (e) {
      return texto; // Se não der certo, retorna o texto original
    }
  };

  // Função para converter os dados modificados diretamente para CSV
  const gerarCsv = (dados: any[], fileName: string) => {
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
  const compararPlanilhas = (planilhaCompletaData: any[], novaPlanilhaData: any[]) => {
    // Cria um mapa de IDs e os dados da coluna Z da planilhaCompleta
    const mapaPlanilhaCompleta = planilhaCompletaData.reduce((mapa: any, linha: any) => {
      const id = linha[0]; // ID da coluna A
      const colunaZ = linha[25]; // Dados da coluna Z
      mapa[id] = colunaZ; // Mapeia o ID para o valor da coluna Z
      return mapa;
    }, {});

    // Atualiza a coluna Z da novaPlanilha com base nos dados da planilhaCompleta
    return novaPlanilhaData.map((linha: any) => {
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

    setLoading(true);
    try {
      // Ler a nova planilha
      Papa.parse(novaPlanilha, {
        header: false,
        skipEmptyLines: true,
        complete: resultadoNovaPlanilha => {
          const dadosNovaPlanilha = resultadoNovaPlanilha.data.map(linha =>
            linha.map(corrigirCodificacao) // Aplica a conversão em cada célula
          );

          // Ler a planilha completa
          Papa.parse(planilhaCompleta, {
            header: false,
            skipEmptyLines: true,
            complete: resultadoPlanilhaCompleta => {
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
    } catch (error) {
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

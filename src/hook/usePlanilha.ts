import { useState } from 'react';
import Papa from 'papaparse';

export const usePlanilha = () => {
  const [novaPlanilha, setNovaPlanilha] = useState<File | null>(null);
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

  // Manipular a nova planilha
  const atualizarPlanilha = async () => {
    if (!novaPlanilha) {
      setErro('A nova planilha precisa ser selecionada.');
      return;
    }

    setLoading(true);
    try {
      Papa.parse(novaPlanilha, {
        header: false,
        skipEmptyLines: true,
        complete: resultadoNovaPlanilha => {
          const dadosNovaPlanilha = resultadoNovaPlanilha.data.map(linha =>
            linha.map(corrigirCodificacao) // Aplica a conversão em cada célula
          );

          // Adicionar "Mnemônico" na posição 26
          const novaPlanilha = adicionarColunaMnemonico(dadosNovaPlanilha);

          // Atualizar estado
          setPlanilhaModificada(novaPlanilha);

          // Gerar e fazer o download do CSV
          gerarCsv(novaPlanilha, 'planilha_modificada.csv');

          setTimeout(() => setLoading(false), 4000);
        },
        error: () => {
          setErro('Erro ao ler a nova planilha.');
          setLoading(false);
        }
      });
    } catch (error) {
      setErro('Ocorreu um erro ao processar a planilha.');
      setLoading(false);
    }
  };

  return {
    novaPlanilha,
    erro,
    setErro,
    loading,
    setNovaPlanilha,
    atualizarPlanilha,
    handleErrorClose,
    planilhaModificada
  };
};

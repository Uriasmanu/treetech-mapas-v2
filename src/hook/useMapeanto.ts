import { useState } from 'react';
import Papa from 'papaparse';

type Linha = (string | number)[];

export const useMapeamento = () => {
  const [novaPlanilha, setNovaPlanilha] = useState<File | null>(null);
  const [planilhaModificada, setPlanilhaModificada] = useState<Linha[]>([]);
  const [erro, setErro] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleErrorClose = () => setErro('');

  // Função para corrigir a codificação de texto
  const corrigirCodificacao = (texto: string | number): string => {
    try {
      const textoStr = texto.toString();
      return decodeURIComponent(escape(textoStr));
    } catch {
      return texto.toString();
    }
  };

  // Função para remover caracteres especiais e converter para Titlecase
  const formatarTexto = (texto: string): string => {
    // Remove espaços extras e caracteres especiais, deixando apenas letras e números
    const siglas = ['BM', 'MM'];

    const textoSemEspacosESpeciais = texto
      .normalize('NFD') // Normaliza para decompor caracteres acentuados
      .replace(/[\u0300-\u036f]/g, '') // Remove os acentos
      .replace(/[^\w\s]|_/g, '') // Remove caracteres especiais
      .replace(/\s+/g, ' ') // Substitui múltiplos espaços por um único
      .replace(/ç/g, 'c') // Substitui 'ç' por 'c'
      .replace(/Ç/g, 'C') // Substitui 'Ç' por 'C'
      .trim(); // Remove espaços no início e fim

    // Converte para Titlecase, mas preserva as siglas
    const textoEmTitleCase = textoSemEspacosESpeciais.replace(/\w\S*/g, (palavra) => {
      // Verifica se a palavra é uma sigla
      if (siglas.includes(palavra.toUpperCase())) {
        return palavra.toUpperCase(); // Mantém as siglas em maiúsculas
      }
      return palavra.charAt(0).toUpperCase() + palavra.substr(1).toLowerCase(); // Normaliza o restante
    });

    const textoFinal = textoEmTitleCase.replace(/\s+/g, '')

    return textoFinal
  };

  // Função para gerar o CSV
  const gerarCsv = (dados: Linha[], fileName: string) => {
    const csvContent = dados.map((linha) => linha.join(';')).join('\n');
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

  // Função para adicionar a coluna "Mnemônico" na posição 25
  const adicionarColunaMnemonico = (dados: Linha[]) => {
    return dados.map((linha, index) => {
      if (index === 0) {
        // Adiciona a coluna "Mnemônico" como o título da nova coluna
        linha.splice(25, 0, 'Mnemônico');
      } else {
        // Processa o texto da coluna W (índice 22) e coloca na coluna 25
        if (linha[22]) {
          const textoFormatado = formatarTexto(linha[22].toString());
          linha.splice(25, 0, textoFormatado);
        } else {
          linha.splice(25, 0, ''); // Se não houver texto na coluna W, coloca vazio
        }
      }
      return linha;
    });
  };

  const atualizarPlanilha = async () => {
    if (!novaPlanilha) {
      setErro('A nova planilha precisa ser selecionada.');
      return;
    }

    type ResultadoPapaParse = {
      data: Linha[];
    };

    setLoading(true);
    try {
      Papa.parse(novaPlanilha, {
        header: false,
        skipEmptyLines: true,
        complete: (resultadoNovaPlanilha: ResultadoPapaParse) => {
          const dadosNovaPlanilha = resultadoNovaPlanilha.data.map((linha) =>
            linha.map(corrigirCodificacao)
          );

          // Adicionar a nova coluna "Mnemônico" e processar os dados
          const novaPlanilhaAtualizada = adicionarColunaMnemonico(dadosNovaPlanilha);

          setPlanilhaModificada(novaPlanilhaAtualizada);

          const nomeArquivoOriginal = novaPlanilha.name.split('.')[0];
          const nomeArquivoFinal = `${nomeArquivoOriginal}_atualizada.csv`;

          gerarCsv(novaPlanilhaAtualizada, nomeArquivoFinal);

          setTimeout(() => setLoading(false), 4000);
        },
        error: () => {
          setErro('Erro ao ler a nova planilha.');
          setLoading(false);
        },
      });
    } catch {
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
    planilhaModificada,
  };
};

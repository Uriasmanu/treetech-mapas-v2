import { useState } from 'react';
import Papa from 'papaparse';

export const usePlanilha = () => {
    const [novaPlanilha, setNovaPlanilha] = useState<File | null>(null);
    const [planilhaCompleta, setPlanilhaCompleta] = useState<File | null>(null);
    const [planilhaModificada, setPlanilhaModificada] = useState<any[]>([]); // Novo estado
    const [erro, setErro] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const handleErrorClose = () => {
        setErro('');
    };

    // Função para adicionar a coluna "Mnemônico" na posição desejada
    const adicionarColunaMnemonico = (dados: any[], posicao: number) => {
        return dados.map((linha, index) => {
            const novaLinha = [...linha]; // Cria uma cópia da linha
            if (index === 0) { // Adiciona o cabeçalho "Mnemônico" na primeira linha (cabeçalho)
                novaLinha.splice(posicao, 0, 'Mnemônico');
            } else { // Para as demais linhas, adiciona um valor vazio ou um valor desejado
                novaLinha.splice(posicao, 0, ''); // Ou outro valor para a célula
            }
            return novaLinha;
        });
    };

    // Função para manipular a nova planilha
    const atualizarPlanilha = async () => {
        if (!novaPlanilha) {
            setErro('A nova planilha precisa ser selecionada.');
            return;
        }

        setLoading(true);
        try {
            // Ler o CSV da nova planilha
            Papa.parse(novaPlanilha, {
                encoding: 'UTF-8', // Especificando a codificação como UTF-8
                complete: (resultadoNovaPlanilha) => {
                    const dadosNovaPlanilha = resultadoNovaPlanilha.data;

                    // Adicionar a coluna "Mnemônico" na posição desejada (exemplo: na posição 26)
                    const posicaoColuna = 26; // Defina a posição desejada para a coluna "Mnemônico"
                    const novaPlanilhaComColuna = adicionarColunaMnemonico(dadosNovaPlanilha, posicaoColuna);

                    // Atualiza o estado da nova planilha com a coluna "Mnemônico" adicionada
                    setPlanilhaModificada(novaPlanilhaComColuna); // Armazena os dados modificados no estado
                    console.log("Nova Planilha com Coluna:", novaPlanilhaComColuna);

                    setLoading(false);
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

    // Retornando todos os estados e funções
    return {
        novaPlanilha,
        erro,
        setErro,
        loading,
        setNovaPlanilha,
        atualizarPlanilha,
        handleErrorClose,
        setPlanilhaCompleta,
        planilhaModificada, // Exportando a planilha modificada
    };
};

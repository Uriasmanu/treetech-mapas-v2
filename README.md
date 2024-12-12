# Treetech Maps V2

## Descrição do Projeto
O **Treetech Maps V2** é um sistema que automatiza o processamento e o cruzamento de dados provenientes de dois arquivos `.csv`, gerando uma planilha final enriquecida com informações complementares.

---

## Funcionamento

### Entrada de Dados:
- **Primeiro Arquivo:** Contém o mapeamento original, sem a coluna "Mnemônico".
- **Segundo Arquivo:** Inclui uma correspondência entre IDs (na coluna 1) e mnemônicos (na coluna 2), que representam a versão anterior do módulo.

### Processamento:
O sistema aplica a seguinte lógica:

```excel
=SE(A2<>"";SE(PROCV(A2;Planilha1!A:B;2;FALSO)=0;"";PROCV(A2;Planilha1!A:B;2;FALSO));"")
```
Essa lógica realiza os seguintes passos:
1. Busca o **mnemônico** correspondente no segundo arquivo para cada ID presente no primeiro arquivo.
2. Caso o mnemônico não seja encontrado, retorna uma célula vazia.

### Saída:
- Uma nova coluna é adicionada na posição "Z" com o título **"Mnemônico"**.
- Essa coluna é preenchida com os **mnemônicos** alinhados corretamente aos seus respectivos **IDs**.

---

## Tecnologias Utilizadas

### Frontend:
- **React com Next.js:** Framework para desenvolvimento de interfaces modernas com rotas otimizadas e rendering eficiente.
- **TailwindCSS:** Framework CSS para criação de interfaces responsivas e consistentes.

### Integração:
- **Axios:** Biblioteca para chamadas HTTP e integração com APIs.

---

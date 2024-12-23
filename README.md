# Treetech Mapas

**Treetech Mapas** é uma aplicação desenvolvida em **Next.js** para simplificar o processo de atualização de mapeamentos de mnemônicos em planilhas. O sistema compara duas planilhas, localiza os IDs correspondentes e atualiza automaticamente os mnemônicos na planilha principal, gerando um novo arquivo.

## ✨ Funcionalidades

- **Upload de Planilhas**: Selecione e envie duas planilhas para o sistema.
- **Atualização Automatizada**: Substitui os mnemônicos da nova planilha com base nos IDs corretos da planilha de referência.
- **Download Automatizado**: Gera um arquivo `.csv` atualizado e o disponibiliza para download.
- **Mensagens de Erro**: Orienta o usuário em caso de problemas durante o processo.
- **Interface Intuitiva**: Design responsivo e fácil de usar.

## 🚀 Tecnologias Utilizadas

- **[Next.js](https://nextjs.org/)**: Framework React para desenvolvimento web.
- **React Hooks**: Gerenciamento eficiente de estado e efeitos colaterais.
- **[Papaparse](https://www.papaparse.com/)**: Manipulação avançada de arquivos CSV.
- **[Tailwind CSS](https://tailwindcss.com/)**: Framework utilitário para estilização.
- **SCSS**: Pré-processador CSS para maior flexibilidade e organização.
- **TypeScript**: Tipagem estática para maior segurança e clareza no código.

## 📋 Pré-requisitos

- Node.js 20 ou superior.
- Gerenciador de pacotes (npm ou yarn).

## 🛠️ Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/Uriasmanu/treetech-mapas-v2.git
   cd treetech-mapas
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

4. Acesse a aplicação em: [http://localhost:3000](http://localhost:3000)  
   Ou acesse a versão publicada em: [https://treetech-mapas-v2.vercel.app/](https://treetech-mapas-v2.vercel.app/)

## 📝 Como Usar

1. **Carregue as planilhas**:
   - **Nova Planilha**: Planilha que precisa ser atualizada.
   - **Planilha Completa**: Planilha de referência contendo os mnemônicos corretos.

2. **Clique no botão "Atualizar Planilha"** para iniciar o processo.

3. **Aguarde o processamento**:
   - Um indicador de carregamento será exibido durante a operação.
   - Mensagens de erro aparecerão em caso de problemas.

4. **Baixe a planilha corrigida**:
   - O download será iniciado automaticamente ao finalizar o processo.

## 📦 Dependências

- `next`
- `react`
- `papaparse`
- `tailwindcss`
- `scss`
- `typescript`
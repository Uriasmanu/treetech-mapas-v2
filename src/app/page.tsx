import Image from 'next/image';
import logo from './logo.png';

export default function Home() {
  
  return (
    <div className='flex-col flex items-center w-[100vw] h-[100vh] py-8'>
      <header className='w-full flex-col items-centerr'>
        <div className='flex items-center justify-center gap-4'>
          <h1 className='text-3xl'>Treetech Mapas</h1>
          <Image src={logo} alt="Logo da Empresa" className='w-[80px] h-[80px]'/>
        </div>
        <p className=' text-center'>Sistema que automatiza o processo de atualização dos Mnemônicos de acordo com a verção anterior do mapeamento.</p>
      </header>

      <main className='w-full h-full bg-green-500'>
        <section>
          <h2>Arquivo para Comparação</h2>
          <p>Arraste e solte o arquivo ou clique para escolher o arquivo CSV que precisa ser adicionado. A coluna e os mnemonicos serão usados para comparação.</p>
          <div id="file-upload-comparison">

          </div>
        </section>

        <section>
          <h2>Arquivo para Descrição</h2>
          <p>Arraste e solte o arquivo ou clique para escolher o arquivo CSV que será usado para fornecer a descrição dos mnemonicos de acordo com os IDs.</p>
          <div id="file-upload-description">

          </div>
        </section>

        <section>
          <button id="start-process">Iniciar Processo</button>
        </section>

        <section>
          <h2>Progresso</h2>
          <div id="progress-bar">

          </div>
        </section>
      </main>

    </div>
  );
}

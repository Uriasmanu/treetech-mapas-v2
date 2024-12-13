import Image from 'next/image';
import logo from './logo.png';
import planilhaIcon from '../image/planilha.png';
import planilhaIcon2 from '../image/planilha2.png';
import BotaoAtualizar from '@/component/BotaoAtualizar/BotaoAtualizar';

export default function Home() {

  return (
    <div className='flex-col flex items-center w-[100vw] h-[100vh] py-8'>
      <header className='w-full flex flex-col items-center gap-3 py-4'>
        <div className='flex items-center justify-center gap-4'>
          <h1 className='text-6xl font-bold'>Treetech Mapas</h1>
          <Image src={logo} alt="Logo da Empresa" className='w-[80px] h-[80px]' />
        </div>
      </header>

      <main className="w-full h-screen bg-green-500 p-4 flex flex-col items-center justify-center gap-8">
        <section className='flex gap-16 justify-center'>

          <div className="p-28 border-4 border-dashed border-green-900">
            <input type="file" className="hidden" id="file-upload" />
            <label htmlFor="file-upload" className="flex flex-col items-center cursor-pointer w-[20rem] text-center mx-auto gap-4">
              <Image src={planilhaIcon} alt="Ícone de planilha" className='w-[30px] h-[30px]' />
              <h2 className="text-base font-bold ">Arraste aqui ou selecione o mapeamento que precisa ser atualizado</h2>
            </label>
          </div>

          <div className="p-28 border-4 border-dashed border-green-900">
            <input type="file" className="hidden" id="file-upload" />
            <label htmlFor="file-upload" className="flex flex-col items-center cursor-pointer w-[20rem] text-center mx-auto gap-4">
              <Image src={planilhaIcon2} alt="Ícone de planilha" className='w-[30px] h-[30px]' />
              <h2 className="text-base font-bold ">Arraste aqui ou selecione o mapeamento que contem os Mnemônicos</h2>
            </label>
          </div>

        </section>

        <section className='flex gap-10 justify-center'>
          <BotaoAtualizar/>

        </section>

      </main>

    </div>
  );
}
